import { Platform } from 'react-native'

const HORIZONTAL_SPACING_BASE = Platform.OS === 'web' ? 4 : 2
const VERTICAL_SPACING_BASE = 4

const icons = {
  logo: require('../assets/images/app-logo.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  backArrow: require('../assets/icons/arrow-back-icon.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  homeUnfilled: require('../assets/icons/home-unfilled.png'),
  homefilled: require('../assets/icons/home-filled.png'),
  home_android: require('../assets/icons/home-icon-24.png'),
  search: require('../assets/icons/search.png'),
  magnifier: require('../assets/icons/magnifier.png'),
  commentUnfilled: require('../assets/icons/comment-unfilled.png'),
  commentFilled: require('../assets/icons/comment-filled.png'),
  friendsUnfilled: require('../assets/icons/friends-unfilled.png'),
  friendsFilled: require('../assets/icons/friends-filled.png'),
  profileUnfilled: require('../assets/icons/profile-unfilled.png'),
  profileFilled: require('../assets/icons/profile-filled.png'),
  camera: require('../assets/icons/camera.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  inscription: require('../assets/icons/inscription.png'),
  more: require('../assets/icons/more.png'),
  send: require('../assets/icons/send.png'),
  pinpoint: require('../assets/icons/pinpoint.png'),
  checked: require('../assets/icons/checked.png'),
  bell: require('../assets/icons/bell.png'),
  suprised: require('../assets/icons/wow.png'),
  laugh: require('../assets/icons/crylaugh.png'),
  cry: require('../assets/icons/crying.png'),
  thumbsupUnfilled: require('../assets/icons/thumbsup-unfilled.png'),
  heartUnfilled: require('../assets/icons/heart-unfilled.png'),
  like: require('../assets/icons/blue-like.png'),
  love: require('../assets/icons/red-heart.png'),
  angry: require('../assets/icons/anger.png'),
  cameraRotate: require('../assets/icons/camera-rotate.png'),
  videoCamera: require('../assets/icons/video-camera.png'),
  libraryLandscape: require('../assets/icons/library-landscape.png'),
  playButton: require('../assets/icons/play-button.png'),
  logout: require('../assets/icons/logout-drawer.png'),
  sound: require('../assets/icons/sound.png'),
  soundMute: require('../assets/icons/sound_mute.png'),
  users_android: require('../assets/icons/users-icon-48.png'),
  user_android: require('../assets/icons/account-detail.png'),
}

const lightColors = {
  primaryBackground: '#F8F9FA', // Neutral 50 - Main app background
  secondaryBackground: '#ffffff', // Surface - Cards, modals
  primaryForeground: '#009688', // Sonic Teal 500 - Primary brand color
  secondaryForeground: '#E91E63', // Vibrant Magenta 500 - Secondary/accent color
  foregroundContrast: 'white',
  primaryText: '#212529', // Neutral 900 - Headings, primary text
  secondaryText: '#868E96', // Neutral 600 - Subheadings, muted text
  hairline: '#E9ECEF', // Neutral 200 - Dividers, borders
  grey0: '#F8F9FA', // Neutral 50
  grey3: '#DEE2E6', // Neutral 300
  grey6: '#ADB5BD', // Neutral 500
  grey9: '#495057', // Neutral 700
  red: '#F44336', // Error red from brand guidelines
}

const navContainerTheme = {
  dark: {
    colors: {
      primary: '#26A69A', // Teal 400 for dark mode
      background: '#121212',
      card: '#1E1E1E',
      text: '#F5F5F5',
      border: '#2C2C2C',
      notification: '#EC407A', // Magenta 400
    },
    dark: true,
    light: false,
    fonts: {  // NEW: Add this block
      regular: Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
      }),
      medium: Platform.select({
        ios: 'System-Semibold',
        android: 'Roboto-Medium',
        default: 'System-Semibold',
      }),
      bold: Platform.select({
        ios: 'System-Bold',
        android: 'Roboto-Bold',
        default: 'System-Bold',
      }),
    },
  },
  light: {
    colors: {
      primary: '#009688', // Sonic Teal 500
      background: '#F8F9FA',
      card: '#ffffff',
      text: '#212529',
      border: '#E9ECEF',
      notification: '#E91E63', // Vibrant Magenta 500
    },
    dark: false,
    light: true,
    fonts: {  // NEW: Add this block (same as dark for consistency)
      regular: Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
      }),
      medium: Platform.select({
        ios: 'System-Semibold',
        android: 'Roboto-Medium',
        default: 'System-Semibold',
      }),
      bold: Platform.select({
        ios: 'System-Bold',
        android: 'Roboto-Bold',
        default: 'System-Bold',
      }),
    },
  },
}

const InstamobileTheme = {
  navContainerTheme,
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: {
      primaryBackground: '#121212', // Neutral 50 (Dark) - Main app background
      secondaryBackground: '#1E1E1E', // Neutral 100 (Dark) - Surface/cards
      primaryForeground: '#26A69A', // Teal 400 - Primary brand color (adjusted for dark)
      secondaryForeground: '#EC407A', // Magenta 400 - Secondary/accent (adjusted for dark)
      foregroundContrast: 'white',
      primaryText: '#F5F5F5', // Neutral 900 (Dark) - Primary text
      secondaryText: '#A0A0A0', // Neutral 600 (Dark) - Secondary text
      hairline: '#2C2C2C', // Neutral 200 (Dark) - Dividers
      grey0: '#121212', // Neutral 50 (Dark)
      grey3: '#3E3E3E', // Neutral 300 (Dark)
      grey6: '#707070', // Neutral 500 (Dark)
      grey9: '#C2C2C2', // Neutral 700 (Dark)
      red: '#F44336', // Error red
    },
  },
  spaces: {
    horizontal: {
      s: 2 * HORIZONTAL_SPACING_BASE,
      m: 4 * HORIZONTAL_SPACING_BASE,
      l: 6 * HORIZONTAL_SPACING_BASE,
      xl: 8 * HORIZONTAL_SPACING_BASE,
    },
    vertical: {
      s: 2 * VERTICAL_SPACING_BASE,
      m: 4 * VERTICAL_SPACING_BASE,
      l: 6 * VERTICAL_SPACING_BASE,
      xl: 8 * VERTICAL_SPACING_BASE,
    },
  },
  fontSizes: {
    xxs: 8,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    s: '400',
    m: '600',
    l: '800',
  },
  icons: icons,
  // color, font size, space / margin / padding, vstack / hstack
  button: {
    borderRadius: 8,
  },
  webContainerStyle: {
    // backgroundColor: '#FFFFFF',
    maxWidth: 1024,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
}

export default InstamobileTheme
