import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { Platform, Share } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme, useTranslations, TouchableIcon } from '../../core/dopebase'
import { Profile } from '../../components'
import { storageAPI } from '../../core/media'
import { updateUser } from '../../core/users'
import { setUserData } from '../../core/onboarding/redux/auth'
import { useCurrentUser } from '../../core/onboarding'
import { useProfile, usePostMutations } from '../../core/socialgraph/feed'
import { setLocallyDeletedPost } from '../../core/socialgraph/feed/redux'
import { useSocialGraphMutations } from '../../core/socialgraph/friendships'

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

const ProfileScreen = props => {
  const { navigation, route } = props
  const otherUser = route?.params?.user
  const lastScreenTitle = route?.params?.lastScreenTitle ?? 'Profile'
  const stackKeyTitle = route?.params?.stackKeyTitle ?? 'Profile'

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const currentUser = useCurrentUser()

  const {
    profile,
    posts,
    refreshing,
    isLoadingBottom,
    subscribeToProfileFeedPosts,
    loadMorePosts,
    pullToRefresh,
    addReaction,
    batchSize,
  } = useProfile(otherUser?.id ?? currentUser?.id, currentUser?.id)
  const { user, friends, moreFriendsAvailable, actionButtonType } =
    profile ?? {}

  const { addEdge } = useSocialGraphMutations()
  const { deletePost } = usePostMutations()

  const dispatch = useDispatch()

  const [localActionButtonType, setLocalActionButtonType] = useState(
    !otherUser ? 'settings' : null,
  )
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false)
  const [selectedFeedItems, setSelectedFeedItems] = useState([])
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null)

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('Profile'),
      headerRight: () =>
        !otherUser && (
          <TouchableIcon
            imageStyle={{ tintColor: colorSet.primaryForeground }}
            iconSource={theme.icons.bell}
            onPress={navigateToNotifications}
          />
        ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
      },
      headerTintColor: colorSet.primaryText,
    })

    if (!otherUser && Platform.OS !== 'ios') {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableIcon
            imageStyle={{ tintColor: colorSet.primaryText }}
            iconSource={theme.icons.menuHamburger}
            onPress={openDrawer}
          />
        ),
      })
    }
  }, [lastScreenTitle])

  useEffect(() => {
    const postsUnsubscribe = subscribeToProfileFeedPosts(
      otherUser?.id ?? currentUser?.id,
    )
    return () => {
      postsUnsubscribe && postsUnsubscribe()
    }
  }, [currentUser?.id])

  const navigateToNotifications = useCallback(() => {
    navigation.navigate(lastScreenTitle + 'Notification', {
      lastScreenTitle,
    })
  }, [navigation, lastScreenTitle])

  const openDrawer = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const onMainButtonPress = useCallback(() => {
    const actionType = localActionButtonType
      ? localActionButtonType
      : actionButtonType
    if (actionType === 'add') {
      addFriend()
      return
    }
    if (actionType === 'message') {
      onMessage()
      return
    }
    if (actionType === 'settings') {
      const settingsScreen = lastScreenTitle
        ? lastScreenTitle + 'ProfileSettings'
        : 'ProfileProfileSettings'
      navigation.navigate(settingsScreen, {
        lastScreenTitle,
      })
    }
  }, [
    localActionButtonType,
    actionButtonType,
    addFriend,
    onMessage,
    navigation,
  ])

  const onMessage = useCallback(() => {
    const viewerID = currentUser.id
    const friendID = otherUser.id
    let channel = {
      id: viewerID < friendID ? viewerID + friendID : friendID + viewerID,
      participants: [otherUser],
    }
    navigation.navigate('PersonalChat', { channel })
  }, [navigation, currentUser, otherUser])

  const onMediaClose = useCallback(() => {
    setIsMediaViewerOpen(false)
  }, [setIsMediaViewerOpen])

  const startUpload = useCallback(
    async source => {
      dispatch(
        setUserData({
          user: {
            ...currentUser,
            profilePictureURL: source?.path || source.uri,
          },
          profilePictureURL: source?.path || source.uri,
        }),
      )

      const { downloadURL } = await storageAPI.processAndUploadMediaFile(source)

      const data = {
        profilePictureURL: downloadURL,
      }
      dispatch(
        setUserData({
          user: { ...currentUser, profilePictureURL: downloadURL },
        }),
      )

      updateUser(currentUser.id, data)
    },
    [dispatch, setUserData, storageAPI, localized],
  )

  const removePhoto = useCallback(async () => {
    const res = await updateUser(currentUser.id, {
      profilePictureURL: defaultAvatar,
    })
    if (res.success) {
      dispatch(
        setUserData({
          user: { ...currentUser, profilePictureURL: defaultAvatar },
        }),
      )
    } else {
      alert(
        localized(
          'Oops! An error occured while trying to remove your profile picture. Please try again.',
        ),
      )
    }
  }, [updateUser, currentUser, localized])

  const addFriend = useCallback(async () => {
    if (!currentUser || !user) {
      return
    }
    setLocalActionButtonType('message')
    await addEdge(currentUser, user)
  }, [currentUser, user, addEdge, setLocalActionButtonType])

  const onEmptyStatePress = useCallback(() => {
    navigation.navigate('CreatePost')
  }, [navigation])

  const handleOnEndReached = useCallback(
    distanceFromEnd => {
      if (posts.length >= batchSize) {
        loadMorePosts(otherUser?.id ?? currentUser?.id)
      }
    },
    [loadMorePosts, posts],
  )

  const pullToRefreshConfig = {
    refreshing: refreshing,
    onRefresh: () => {
      pullToRefresh(otherUser?.id ?? currentUser?.id)
    },
  }

  const onReaction = useCallback(
    async (reaction, item) => {
      await addReaction(item, currentUser, reaction)
    },
    [currentUser, addReaction],
  )

  const onSharePost = useCallback(
    async item => {
      let url = ''
      if (item.postMedia?.length > 0) {
        url = item.postMedia[0]?.url || item.postMedia[0]
      }
      try {
        const result = await Share.share(
          {
            title: 'Share SocialNetwork post.',
            message: item.postText,
            url,
          },
          {
            dialogTitle: 'Share SocialNetwork post.',
          },
        )
      } catch (error) {
        alert(error.message)
      }
    },
    [Share],
  )

  const onDeletePost = useCallback(
    async item => {
      dispatch(setLocallyDeletedPost(item.id))
      const res = await deletePost(item.id, currentUser?.id)
      if (res.error) {
        alert(res.error)
      }
    },
    [deletePost],
  )

  const onFriendItemPress = useCallback(
    item => {
      if (item.id === currentUser.id) {
        navigation.push(stackKeyTitle, {
          stackKeyTitle: stackKeyTitle,
        })
      } else {
        navigation.push(stackKeyTitle, {
          user: item,
          stackKeyTitle: stackKeyTitle,
        })
      }
    },
    [navigation, currentUser?.id],
  )

  const onSubButtonTitlePress = useCallback(() => {
    navigation.push(lastScreenTitle + 'AllFriends', {
      lastScreenTitle: lastScreenTitle,
      title: localized('Friends'),
      stackKeyTitle: stackKeyTitle,
      otherUser: otherUser,
      includeReciprocal: true,
      followEnabled: false,
    })
  }, [navigation, lastScreenTitle, stackKeyTitle])

  const onFeedUserItemPress = useCallback(
    async author => {
      if ((otherUser?.id || currentUser?.id) === author?.id) {
        return
      }

      navigation.navigate(lastScreenTitle + 'Profile', {
        stackKeyTitle: stackKeyTitle,
        lastScreenTitle: 'Profile',
      })
    },
    [navigation, lastScreenTitle, stackKeyTitle],
  )

  const onMediaPress = useCallback(
    (media, mediaIndex) => {
      setSelectedMediaIndex(mediaIndex)
       const mediaUrls = media.map(item => item.url)
      setSelectedFeedItems(mediaUrls)
      setIsMediaViewerOpen(true)
    },
    [setSelectedMediaIndex, setSelectedFeedItems, setIsMediaViewerOpen],
  )

  const onCommentPress = useCallback(
    item => {
      navigation.navigate(`${stackKeyTitle}PostDetails`, {
        item: item,
        lastScreenTitle: 'Profile',
      })
    },
    [navigation],
  )

  const actionType = localActionButtonType
    ? localActionButtonType
    : actionButtonType
  const mainButtonTitle =
    actionType === 'settings'
      ? localized('Profile Settings')
      : actionType === 'message'
      ? localized('Send Message')
      : actionType === 'add'
      ? localized('Add Friend')
      : null

  const subButtonTitle = moreFriendsAvailable
    ? localized('See All Friends')
    : null

  return (
    <Profile
      user={otherUser ? { ...otherUser, ...(user ?? {}) } : currentUser}
      loggedInUser={currentUser}
      mainButtonTitle={mainButtonTitle}
      subButtonTitle={subButtonTitle}
      friends={friends}
      recentUserFeeds={posts}
      onFriendItemPress={onFriendItemPress}
      onMainButtonPress={onMainButtonPress}
      selectedMediaIndex={selectedMediaIndex}
      onSubButtonTitlePress={onSubButtonTitlePress}
      onCommentPress={onCommentPress}
      onFeedUserItemPress={onFeedUserItemPress}
      isMediaViewerOpen={isMediaViewerOpen}
      feedItems={selectedFeedItems}
      onMediaClose={onMediaClose}
      onReaction={onReaction}
      onMediaPress={onMediaPress}
      removePhoto={removePhoto}
      startUpload={startUpload}
      handleOnEndReached={handleOnEndReached}
      isFetching={isLoadingBottom}
      isOtherUser={otherUser}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onEmptyStatePress={onEmptyStatePress}
      pullToRefreshConfig={pullToRefreshConfig}
      navigation={navigation}
    />
  )
}

export default ProfileScreen
