import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { useTheme, useTranslations } from '../core/dopebase'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    isDelayedLoginEnabled: false,
    appIdentifier: `rn-social-network-${Platform.OS}`,
    facebookIdentifier: '1288726485109267',
    videoMaxDuration: 30,
    webClientId: Platform.select({
      ios: '22965687108-k9uqgstoahao7bndat1lgbhmlektp2jb.apps.googleusercontent.com',
      default:
        '22965687108-eb2r7krmmebfrd7ks8cl4pc073kek39g.apps.googleusercontent.com',
    }),
    googleAPIKey: 'AIzaSyABq2WJNGXFZC2u-_9Z9SjWovSdmTe29ko', // This is used for Google Places API (location feature in Checkin  - when creating a post)
    onboardingConfig: {
      welcomeTitle: localized('Welcome to LetsMake.Music'),
      welcomeCaption: localized(
        'The soundtrack to your world starts here.',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/images/file.png'),
          title: localized('Drops'),
          description: localized(
            'Share your music with your fans.',
          ),
        },
        {
          icon: require('../assets/images/photo.png'),
          title: localized('Stories'),
          description: localized('Share moments that disappear after 24 hours.'),
        },
        {
          icon: require('../assets/images/like.png'),
          title: localized('Reactions'),
          description: localized(
            'Show love with likes, hearts, and fire reactions.',
          ),
        },
        {
          icon: require('../assets/images/chat.png'),
          title: localized('Chat'),
          description: localized(
            'Connect with your crew through direct messages.',
          ),
        },
        {
          icon: require('../assets/icons/friends-unfilled.png'),
          title: localized('Community'),
          description: localized('Build your fanbase. Follow creators you vibe with.'),
        },
        {
          icon: require('../assets/images/instagram.png'),
          title: localized('Share'),
          description: localized(
            'Post photos, videos, and music to your feed.',
          ),
        },
        {
          icon: require('../assets/images/pin.png'),
          title: localized('Check In'),
          description: localized(
            'Tag your location and let fans know where you are.',
          ),
        },
        {
          icon: require('../assets/images/notification.png'),
          title: localized('Stay Connected'),
          description: localized(
            'Get notified when your community engages with your content.',
          ),
        },
      ],
    },
    tabIcons: {
      HomeFeed: {
        focus: theme.icons.homefilled,
        unFocus: theme.icons.homeUnfilled,
      },
      Discover: {
        focus: theme.icons.search,
        unFocus: theme.icons.search,
      },
      Chat: {
        focus: theme.icons.commentFilled,
        unFocus: theme.icons.commentUnfilled,
      },
      Friends: {
        focus: theme.icons.friendsFilled,
        unFocus: theme.icons.friendsUnfilled,
      },
      Profile: {
        focus: theme.icons.profileFilled,
        unFocus: theme.icons.profileUnfilled,
      },
    },
    drawerMenu: {
      upperMenu: [
        {
          title: localized('Home'),
          icon: theme.icons.homeUnfilled,
          navigationPath: 'Feed',
        },
        {
          title: localized('Discover'),
          icon: theme.icons.search,
          navigationPath: 'Discover',
        },
        {
          title: localized('Chat'),
          icon: theme.icons.commentUnfilled,
          navigationPath: 'Chat',
        },
        {
          title: localized('Friends'),
          icon: theme.icons.friendsUnfilled,
          navigationPath: 'Friends',
        },
        {
          title: localized('Profile'),
          icon: theme.icons.profileUnfilled,
          navigationPath: 'Profile',
        },
      ],
      lowerMenu: [
        {
          title: localized('Logout'),
          icon: theme.icons.logout,
          action: 'logout',
        },
      ],
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: true,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('GENERAL'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: localized('Feed'),
          fields: [
            {
              displayName: localized('Autoplay Videos'),
              type: 'switch',
              editable: true,
              key: 'autoplay_video_enabled',
              value: true,
            },
            {
              displayName: localized('Always Mute Videos'),
              type: 'switch',
              editable: true,
              key: 'mute_video_enabled',
              value: true,
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'push_notifications_enabled',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504850000',
    adsConfig: {
      facebookAdsPlacementID:
        Platform.OS === 'ios'
          ? '834318260403282_834914470343661'
          : '834318260403282_834390467062728',
      adSlotInjectionInterval: 10,
    },
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
