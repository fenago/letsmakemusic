import React, { useCallback, useLayoutEffect } from 'react'
import { View, Keyboard } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import deviceStorage from '../../utils/AuthDeviceStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/auth'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'

const LoadScreen = () => {
  const navigation = useNavigation()

  const dispatch = useDispatch()
  const authManager = useAuth()

  const { config } = useOnboardingConfig()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      setAppState()
    }, [config]),
  )

  const setAppState = async () => {
    console.log('[LoadScreen] setAppState called')
    const shouldShowOnboardingFlow =
      await deviceStorage.getShouldShowOnboardingFlow()
    console.log('[LoadScreen] shouldShowOnboardingFlow:', shouldShowOnboardingFlow)
    console.log('[LoadScreen] isDelayedLoginEnabled:', config?.isDelayedLoginEnabled)
    if (!shouldShowOnboardingFlow) {
      if (config?.isDelayedLoginEnabled) {
        console.log('[LoadScreen] Navigating to fetchPersistedUserIfNeeded')
        fetchPersistedUserIfNeeded()
        return
      }
      console.log('[LoadScreen] Navigating to LoginStack')
      navigation.navigate('LoginStack', { screen: 'Welcome' })
    } else {
      console.log('[LoadScreen] Navigating to Walkthrough')
      navigation.navigate('Walkthrough')
    }
  }

  const fetchPersistedUserIfNeeded = async () => {
    if (!authManager?.retrievePersistedAuthUser) {
      return navigation.navigate('MainStack')
    }
    authManager
      ?.retrievePersistedAuthUser(config)
      .then(response => {
        if (response?.user) {
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
        }
        navigation.navigate('MainStack')
      })
      .catch(error => {
        console.log(error)
        navigation.navigate('MainStack')
      })
  }
  return <View />
}

export default LoadScreen
