Running on iOS
In this section, we are describing the steps that you need to do in order to run our React Native app templates on iOS, from setting up the environment to building the project in Xcode. To run a React Native on iOS, you need Mac OS and Xcode, but there’s no need for an Apple developer account or an iPhone – you can simply run any Xcode project on the iOS simulator. If you are not new to iOS / React Native development, and you already have the dev environment set up, simply do the following steps:

Be absolutely sure you have the latest STABLE Xcode version (Make sure you are using Xcode 14.1 or latest)
Run “yarn install && cd ios && pod install” in the root folder of the downloaded project
Open .xcode.env read the instruction and set up .xcode.env.local
Go back a directory with the command “cd…” and build your app with “npx react-native run-ios“
Select the iOS simulator / device and build and run the app (Command + R)
If this is the first time you are running an iOS project on your machine, you need to set up your environment first. We recommend you to follow the official Facebook documentation first, on how to run React Native CLI apps. There are a few prerequisites that are iOS specific (you don’t need them for Android):

Install Xcode
Install CocoaPods
Install React Native
We’re assuming you already have the environment to run react native apps. If not, follow Facebook’s documentation for running native apps (do not use Expo, you don’t need it). Follow the next quick steps to get your app running on an iOS device or iOS simulator.

1. Run “yarn install” in the project root directory

Please make sure you are currently running node 18. check with command “node –version“. If not, use nvm and run “nvm use 18″. Before running yarn install, create an empty yarn.lock file:

touch yarn.lock

Then install dependencies with “yarn install“.

2. Locate the ios folder and run “pod install“

This will install all the pods that the chat app depends on, such as Firebase Auth, Storage, etc. Make sure you have Cocoapods installed beforehand. Here’s how a successful output looks like:



This will also generate a .xcworkspace file, that can be opened in Xcode.



3. Open “.xcode.env” read the instruction and set up “.xcode.env.local”

At the end of the day, you want to have a “.xcode.env.local” file containing one line of code. eg: “export NODE_BINARY=”/Users/sholaEmmanuel/.nvm/versions/node/v18.13.0/bin/node“ to get the absolute path to your node version, from command line, run the command: “command -v node“. You will get – “/Users/sholaEmmanuel/.nvm/versions/node/v18.13.0/bin/node”. now update xcode.env.local with this.

4. Go back a directory with the command

Simply go back a directory with “cd..“. Double check on the file in the terminal (make sure you are in the root project folder).

5. Run Command “npx react-native run-ios”

Now build your app with the command “npx react-native run-ios“. Once your ios app builds successfully, remember to click on your simulator and press on your keyboard, (Command + R ) to refresh js bundle after it is has finished compiling.



Frequently Asked Questions
1. I’m getting a red screen error saying the metro bundler is not running Sometimes, Xcode cannot open the metro bundler by itself, so you need to open it manually. To do that, simply open a Terminal window, locate the project folder and run:

yarn install && npm start -- --reset-cache  

Now, the packager server has started – keep this window open and re-build the project in Xcode.

2. I’m getting a glog error (/configure👎 in `node_modules/react-native/third-party/glog-0.3.4′:) This error might appear in some environments. To fix it, locate the glog folder. Assuming you’re in the root folder:

cd node_modules/react-native/third-party/glog-0.3.4/  

And run

./configure  

Now run your Xcode project again and the error will be gone.

3. I’m getting error: Build input file cannot be found: ‘node_modules/react-native/Libraries/WebSocket/libfishhook.a’ If you run into this error, click on the RTCWebSocket subproject in Xcode -> Build Phases -> Link Binary with Libraries and remove the libfishhook.a entry. Now add it again (yes, it’s crazy – welcome to react native!). Then re-build the project and everything should work now.react native xcode



Edit this page
Previous
Running on Android with React Native

Setting Up Your Dev Environment
In this section, we are going to describe how to configure your React Native development environment. The developer tools and the way we set everything up is entirely inspired by how we do the day to day mobile app development in React Native at Instamobile.

1. Run an Empty React Native App on Your Computer
If this is the first time ever that you run a React Native app, you must follow the official guide first. Create an empty app and make sure it builds and runs properly on your computer. Follow the steps outlined in the official React Native documentation. Make sure you do not use Expo CLI, but React Native CLI.

2. Install Basic React Native Development Tools
3. Configure React Native Development Environment for Android
Let’s see how you can set up your development environment in order to run React Native apps. The setup shouldn’t take more than 5 minutes. What do you need to install?

Node (NPM) and React Native

Yarn

Git

(Optional, but Recommended) Visual Studio Code

(Optional) Android Studio Alright, let’s see how we install all of these. Simply follow the next steps:

Install Node by following the official guide

Install Git by following the steps in this guide

Install Yarn by running the command:

npm install --global yarn

Before running yarn install, create an empty yarn.lock file in your project directory:
touch yarn.lock

Install & Configure React Native by following this guide, the React Native CLI version. DO NOT USE Expo CLI!!
Download & Install Visual Studio Code (recommended for developing React Native apps, especially on Windows, due to its powerful Terminal)
Download & Install Android Studio (needed only if you don’t have a physical Android device) Looks simple, right? It actually is. This is all you need to do to run React Native apps on Android devices or emulators.
4. Configure React Native Development Environment for iOS
a. Install Cocoapods

b. Install Xcode You can find detailed explanations on how to install these tools in the Running on iOS section.

5. Install More Advanced Developer Tools
We highly recommend you to install the React Native Debugger tool. It helps you debug React Native apps with breakpoints, visualize the redux state changes in real-time and inspect the view hierarchy. We wrote a full article on how to debug React Native apps using the React Native Debugger.

Edit this page
Previous
Getting Started
Next
Running on Android with React Native

Running on Android
To run our React Native templates on Android, simply follow these steps, in order:

Plug in your Android device or open an emulator
Open a Terminal window and run:
cd ~/path/to/template
touch yarn.lock
yarn install && yarn android

Replace ~/path/to/template with the correct path to the folder where you extracted the archive downloaded from our server. To make sure you are in the right folder, you can run “pwd” to see the current path. It must be the folder with the template, otherwise the app won’t run.

That’s all. The app is now running on your Android device. If you need more details or help, read on. Note: DO NOT open the project in Android Studio. Most of the times Android Studio will alter the project and you won’t be able to make it work. If you already opened the project in Android Studio, please download the template again and re-run it from a fresh unmodified copy, that was never opened in Android Studio.

Plug in an Android device or emulator
In order to run React Native apps on Android, you need an Android device or an emulator. If you have an Android phone or tablet, simply plug it in. You might need to enable USB debugging in Device Settings, under Developer Tools. Follow the official Android documentation if you run into any issues. Android emulators are bundled into Android Studio, so please install Android Studio, open it, go to Tools -> AVD Manager and start an emulator of your choosing:react native android emulatorYou can also create new emulators of your own, with your own hardware requirements. Once you have an emulator up and running, proceed to the next step.



Run the React Native app
MacOS / UNIX All you need to do is simply run the two commands we described above:

cd ~/path/to/template
yarn install && yarn android

Alternatively, you can also use Visual Studio Code, which gives you a Terminal that’s directly located at the right folder. In that case, you can simply run “yarn install && react-native run-android” and the app will just start. Windows users The command prompt on Windows is weird, so don’t use it. Instead, please install Visual Studio Code, which has a built-in Terminal that behaves exactly like the terminal on MacOS. Go to View -> Terminal to activate the Terminal:visual studio code terminalPlease make sure you find the correct path of the folder where the template resides. Here’s an example of a commands sequence you can use as an example to locate the correct folder:react native terminal



Please make sure you find the correct path of the folder where the template resides. Here’s an example of a commands sequence you can use as an example to locate the correct folder:



Edit this page
Previous
Setting Up Your Dev Environment for React Native
Next
Running on iOS with React Native

Enable Firebase Storage
If your mobile app needs access to Firebase Storage (e.g. for uploading photos and videos, for instance), you have to enable Firebase Storage, so that the functionality works properly. To enable it, just go to Storage in the left menu. This is how your Storage rules need to look like in order for the app to function correctly:

service firebase.storage {
 match /b/{bucket}/o {
   match /{allPaths=**} {
     allow read, write: if request.auth != null;
   }
 }
}



Enable Photo & Video Uploads on iOS
React Native 0.63.2 comes with a bug when accessing camera and the photo library. In order to work around this bug, you need to override RCTLocalAssetImageLoader.m entirely.

Copy the working source code from this gist
Open node_modules/react-native/Libraries/Images/RCTLocalAssetImageLoader.m file (in Xcode, Sublime, vim, or any other text editor)
Paste/Override the entire file with the content of the gist from step 1.
Re-run the app in Xcode Warning: You MUST do this every time you reinstall node_modules. So if you remove the node_modules folder (by cleaning the project, starting a fresh project, etc), you must do this change again.
Edit this page
Previous
Enable Firebase Firestore
Next
Link Firebase Account to Your Mobile App
Enable Photo & Video Uploads on iOS
Link Firebase Account to Your Mobile App
Once you’ve created the app, Firebase will generate a configuration file for you. You will add this file in your React Native app. This is how the React Native app can use your own Firebase backend. To do that, just download the configuration file and replace the existing mock files:

iOS: Download the GoogleService-Info-plist file and override the existing ios/NameOfApp/GoogleService-Info.plist file. Android: Download the google-service.json file and replace the existing android/app/google-service.json file. In both cases: If your app has a config.js file in Core/api/firebase, you’ll need to update that too, with your own project info. If you already had an app in Firebase, you can find and download this configuration file in Firebase Console -> Project Settings.



If your app has a Core/api/firebase/config.js file, you’ll need to update this configuration too:

const firebaseConfig = {
  apiKey: 'dsadas-imgQ',
  authDomain: 'production-a9404.firebaseapp.com',
  databaseURL: 'https://testapp-a9404.firebaseio.com',
  projectId: 'testapp-a9404',
  storageBucket: 'testapp-a9404.appspot.com',
  messagingSenderId: '525472070734',
  appId: '1:52522070731:web:ee873bd62c0deb7eba61ce',
};  

If you do not have an existing web app, you will have to create one to get these fields.

To create one, navigate to project settings, click on Add app and click on the web icon. Enter ur App nickname and click on Register app.

You should be able to access your firebase object after registering.



That’s it. Now, when you run your brand new React Native template, the mobile app will use your own Firebase backend, as opposed to our default one. Make sure you add all the tables and the required data in your Firebase so that the app will have items to display (e.g. food categories, chat messages, etc.). To quickly test the react-native firebase integration, try registering a new user and see if they show up in Firebase -> Authentication tab.

Edit this page
Previous
Enable Firebase Storage for Your Mobile App
Next
Enable SMS Phone Authentication with Firebase
Enable SMS Phone Authentication
To enable SMS authentication with Firebase, there are a few things we need to configure, that will allow the app to send SMS to the users.

Enable Phone Authentication in Firebase
In Firebase, go to Authentication -> Sign-in method -> Phone Authentication and check the Enable switch.



iOS Setup
Open the GoogleService-Info.plist file in Xcode, and copy the REVERSED_CLIENT_ID value to the clipboard Make sure that this is your own file which you already downloaded from Firebase at the previous steps. The string will look like this:
com.googleusercontent.apps.525472070731-448dt91ch73bmujeotrvfb280ngguib2

In Xcode, select the Info.plist file, right click on it -> Open As -> Source Code


In Info.plist source code, under CFBundleURLSchemes paste the client ID string copied at the previous step (by replacing the existing one)


That’s it. Build and run the app again in Xcode, and now you’ll be able to see real SMS texts getting sent to any phone number.

Android Setup
For Android, setting up SMS Phone Authentication with Firebase is a slightly different than iOS. 1. Generate an upload key keystore For MacOS, simply run the following command from the “android/app” folder of the React Native project:

![](keytool -genkeypair -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000)

When asked for a password, just use android. This will work when running the app in debug mode. For Windows users, you can generate a private signing key using keytool. keytool must be run from C:\Program Files\Java\jdkx.x.x_x\bin. If you are building the final app for production (Google Play publishing), follow the official React Native docs on how to generate a production signed binary. If you are still in development mode, you can use the existing debug signing config that we’ve created for you already. You can see the configuration of this signing config in android/app/build.gradle file:



2. Generate a SHA-1 fingerprint certificate from the keystore Simply run the following command (in android/app folder). Use the password android when prompted for it.

FOR IOS
<code data-enlighter-language="shell" class="EnlighterJSRAW">keytool -list -v \
-alias androiddebugkey -keystore ~/.android/debug.keystore</code>  

FOR ANDROID
<code style="padding: 0px; border: 0px; vertical-align: baseline; background-color: transparent;">keytool -list -v \
-alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore</code> 


This will generate a SHA-1 fingerprint. Copy it to clipboard.



You can find more details in the official documentation from Google if you run into any issues. 3. Add the SHA-1 code to Firebase In Firebase, go to Project Settings -> Select the Android app -> Add Fingerprint and place the SHA-1 fingerprint certificate in the corresponding field:



That’s it. Build and run the Android app again, and now you’ll be able to receive real SMS texts via Firebase.

Edit this page
Previous
Link Firebase Account to Your Mobile App
Next
Sign In with Apple Integration Guide
Sign In with Apple
You should note that by April 2020, existing apps and app updates using external 3rd party login services (such as Facebook, Twitter, Google etc) must ensure that Apple Sign-In is also provided. To learn more about these new guidelines, view the Apple announcement. Apple Sign-In is not required for Android devices. Enable Apple Sign In on Firebase Auth Since most of our mobile apps are using Firebase Auth, in order to enable Apple Sign with your own Firebase project, head over to Firebase Console -> Authentication -> Sign-in Methods -> Apple and enable apple.



Configuring Apple Sign In
Head over to Apple’s developer console. Click Account in the nav bar at the top. You will either have to sign in, or create an account. Your account dashboard ought to look like this. If you do not see Certificates, IDs & profiles as an option in the left-hand sidebar, it means you have not yet enrolled in the Apple developer program which is a prerequisite for Apple product development.


Click on Identifiers in the left-hand sidebar. Click on your project in the list or add one if you have no Identifier listed.
Tick the checkbox for Sign in with Apple and click the Edit button. Select Enable as a primary App ID and click Save button.


Click the Save button at the top of the screen.
Edit this page
Previous
Enable SMS Phone Authentication with Firebase
Next
Deploy Firebase Functions
Deploy Firebase Functions
IMPORTANT: This section only applies to you if the purchased archive contains a “Firebase” or “FirebaseFunctions” folder inside of it. Please SKIP THIS SECTION entirely if you do not have a Firebase (or FirebaseFunctions) folder in your downloaded .zip. Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. At Instamobile, we use Firebase Functions to trigger specific actions upon user activity. A few examples:

When an user updates their profile photo, we trigger a Firebase Function to update all the places in the database where that user’s info is stored, so the profile picture gets updated properly on all surfaces (chat messages, feed posts, stories, etc)
When an user places a new order in the UberEats app, we trigger a Firebase Function (dispatch.js) that searches for an available driver to deliver that order
When a user unfriends another user, we trigger a Firebase Function (triggers.js) that removes all the feed posts, stories, chat channels, etc from one user’s timeline that are authored by the other user.
We’ve already coded all the necessary Firebase Functions, but you need to deploy these functions to your own Firebase account. So basically, you need to upload the source code inside the FirebaseFunctions folder to your own Firebase account. By now, we are going to assume you’ve already followed the previous sections in this documentation, on integrating Firebase:

You already created a Firebase account, a Firebase project, and 2 apps inside that project (one for iOS and one for Android)
You were able to run the React Native project on your machine
1. Set up Node.js and the Firebase CLI
Firebase Functions source code is a Node.js project, so the code is basically JavaScript, similar to the React Native project. Nothing here is specific only to our templates, but everything applies to any Firebase project, so please use the official Firebase documentation if you encounter any issues.

1.1 Install Node You’ll need a Node.js environment to write functions, and you’ll need the Firebase CLI to deploy functions to the Cloud Functions runtime. For installing Node.js and npm, Node Version Manager is recommended.

1.2 Install Firebase CLI Once you have Node.js and npm installed, install the Firebase CLI via your preferred method. To install the CLI via npm, use:

npm install -g firebase-tools  


## 2. Initialize your project

When you initialize Firebase SDK for Cloud Functions, you create an empty project containing dependencies and some minimal sample code, using JavaScript for composing functions. To initialize your project:

Run firebase login to log in via the browser and authenticate the firebase tool.
Create a new “MyFirebaseFunctions” empty folder on your machine.
In the Terminal, go to MyFirebaseFunctions project directory.
Run firebase init functions. The tool gives you an option to install dependencies with npm. It is safe to decline if you want to manage dependencies in another way, though if you do decline you’ll need to run npm install before emulating or deploying your functions.
The tool gives you two options for language support:
JavaScript
TypeScript
Please select JavaScript.
After these commands complete successfully, your project structure looks like this:

MyFirebaseFunctions
 +- .firebaserc    # Hidden file that helps you quickly switch between
 |                 # projects with `firebase use`
 |
 +- firebase.json  # Describes properties for your project
 |
 +- functions/     # Directory containing all your functions code
      |
      +- .eslintrc.json  # Optional file containing rules for JavaScript linting.
      |
      +- package.json  # npm package file describing your Cloud Functions code
      |
      +- index.js      # main source file for your Cloud Functions code
      |
      +- node_modules/ # directory where your dependencies (declared in
                       # package.json) are installed 


The package.json file created during initialization contains an important key: "engines": {"node": "12"}. This specifies your Node.js version for writing and deploying functions. Please make sure this is version 12 for node.

3. Add Instamobile Functions into Your Own Project
Since we already provided you with the full source code for your Firebase Functions, all you need to do is add that source code into your newly created MyFirebaseFunctions project. To do this, you need to follow these steps:

In Instamobile’s FirebaseFunctions folder, copy the “functions” subfolder to clipboard.
Paste it in YOUR MyFirebaseFunctions folder, to OVERRIDE the functions folder that is already there.
That’s it. You now have a Firebase Functions project, that is linked to your Firebase account, and that uses our source code (so our Firebase Functions that work with the mobile app).

## 4. Deploy Your Firebase Functions to Firebase

To deploy Firebase Functions, you need to make sure you upgrade your Firebase Pricing Plan to Blaze.

In your project directory, simply run this command:

firebase deploy --only functions  


Do not worry if you see any warnings, they do not affect the behavior of the app. Once the deploy is complete, the output in the Terminal should look like this:

Now that the functions have been deployed, you can go to your Firebase Console and check them out there. You can see the logs for each function, to understand when it gets called and what the output of running them is.firebase functions console

5. Watch Your Firebase Functions for Errors
For some Firebase functions, you need to create indexes on certain Firestore collections, in order for them to run properly. For this, start using the app (e.g. change a profile picture for a user), and watch the logs for the Firebase Functions in the console. If you get an error related to a missing index, simply click on the URL of that error, and the index will get created automatically. You do not need to deploy your functions again, after an index gets created, but make sure you wait until the index is indeed created, before testing the app again.

Edit this page
Previous
Sign In with Apple Integration Guide
Next
How to Set Up Firebase Analytics in React Native

Firebase Analytics Integration in React Native
This guide explains how to integrate Firebase Analytics into your React Native app and track custom events. We'll also show you how to automatically track screen views and log 5 custom events as an example.

Prerequisites
A React Native project (with iOS and/or Android setup)
Firebase project created at console.firebase.google.com
Installed @react-native-firebase libraries
1. Install Dependencies
Install the Firebase Core and Analytics modules:

npm install @react-native-firebase/app @react-native-firebase/analytics

Or with yarn:

yarn add @react-native-firebase/app @react-native-firebase/analytics

2. Firebase Console Setup
Android
Add an Android app to your Firebase project.
Download the google-services.json file and place it inside:
android/app/

Update android/build.gradle:
buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.4.2'
  }
}

Update android/app/build.gradle:
apply plugin: 'com.google.gms.google-services'

iOS
Add an iOS app to your Firebase project.
Download the GoogleService-Info.plist file.
Drag it into Xcode in the ios/YourApp directory.
Run:
cd ios && pod install && cd ..

Ensure platform :ios, '17.0' or higher is set in your Podfile.
3. Screen View Tracking (React Navigation)
In your main navigation file (e.g., AppContainer.tsx), add screen view tracking:

import React, { useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator'
import analytics from '@react-native-firebase/analytics'

const AppContainer = () => {
  const routeNameRef = useRef<string | undefined>()
  const navigationRef = useRef<any>()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const initialRoute = navigationRef.current?.getCurrentRoute()?.name
        routeNameRef.current = initialRoute
        if (initialRoute) {
          analytics().logScreenView({
            screen_name: initialRoute,
            screen_class: initialRoute,
          })
        }
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name
        const previousRouteName = routeNameRef.current

        if (currentRouteName && previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          })
        }

        routeNameRef.current = currentRouteName
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

export default AppContainer

4. Log Custom Events
You can log events using analytics().logEvent() anywhere in your app.

Examples
import analytics from '@react-native-firebase/analytics'

// Log a button press event
await analytics().logEvent('button_click', {
  button_name: 'GetStarted',
})

// Log user registration
await analytics().logEvent('sign_up', {
  method: 'email',
})

// Log product view
await analytics().logEvent('view_product', {
  product_id: '12345',
  product_name: 'React Native Template',
})

// Log add to cart
await analytics().logEvent('add_to_cart', {
  product_id: '12345',
  quantity: 1,
})

// Log custom event
await analytics().logEvent('app_feedback', {
  rating: 5,
  comment_length: 42,
})

5. Debugging Analytics
Android
Enable analytics debug mode using ADB:
adb shell setprop debug.firebase.analytics.app your.package.name

Then check Logcat or visit Analytics > DebugView in the Firebase Console.
iOS
In Xcode, enable analytics debug logging by setting launch arguments:
-FIRAnalyticsDebugEnabled

Or run from terminal:
export FIRDebugEnabled=1

Summary
✅ You now have:

Firebase Analytics installed
Screen view tracking implemented
5 custom events logged
Debug mode enabled for testing
You can now monitor your users' behavior and optimize your app based on real data.

For full event list and recommendations, check the Firebase Analytics Event Reference.

Common Use Cases
Here are some common events you might want to track in different types of apps:

Chat App
// Track when user sends a message
await analytics().logEvent('send_message', {
  message_type: 'text',
  chat_type: 'private',
  character_count: 42
})

// Track when user creates a group
await analytics().logEvent('create_group', {
  group_size: 5,
  has_group_image: true
})

// Track when user opens a chat
await analytics().logEvent('open_conversation', {
  conversation_id: 'chat123',
  participant_count: 2,
  is_unread: true
})

Social Network App
// Track when user creates a post
await analytics().logEvent('create_post', {
  post_type: 'photo',
  has_location: true
})

// Track when user follows someone
await analytics().logEvent('follow_user', {
  followed_user_id: 'user123'
})

E-commerce App
// Track product purchase
await analytics().logEvent('purchase', {
  transaction_id: 'T12345',
  value: 29.99,
  currency: 'USD',
  items: [{id: 'SKU123', name: 'Premium T-shirt'}]
})

// Track when a user adds shipping information
await analytics().logEvent('add_shipping_info', {
  coupon: 'SUMMER20',
  shipping_tier: 'overnight'
})

Dating App
// Track when user creates a profile
await analytics().logEvent('create_profile', {
  photos_count: 3,
  bio_length: 120
})

// Track user match
await analytics().logEvent('match_found', {
  time_to_match: 86400 // in seconds
})

Edit this page
Previous
Deploy Firebase Functions
Next
Facebook Login

Setting Up Push Notifications
The app is using Google Cloud Messaging (within Firebase) to send push notifications to both iOS and Android devices. Push notifications are enabled by default in all of our React Native templates. However, they are set up to work with our staging Firebase project, so you’ll need to switch to your own project, similar to how you’ve done it for Firestore.

Setting Up Push Notifications with Your Own Firebase
To set them up with your own Firebase, all you need to do is to replace the Server Key of the notificationManager.js file with your own. 1. In Firebase, go to Project Settings -> Cloud Messaging and copy the Server Key to clipboard



In the 1source code, go to Core/notifications/firebase and replace the Server Key (firebaseServerKey variable) with your own:

const firebaseServerKey = "YOUR_KEY_HERE";

Here’s an example of how the updated server key should look like:


That’s all you need to set up for Android. Push notifications should now work properly (make sure you re-build and re-run your app after making this change).

Code Documentation
The main component that handles sending push notifications is notificationManager, which resides at Core/notifications/notificationManager.js. All notifications are being sent through the sendPushNotification method.

const sendPushNotification = async (toUser, title, body, type, metadata = {})

To identify all the places that trigger push notifications, simply search for this method in the project.



Edit this page
Previous
Push Notifications
Next
Push Notifications on Android

Push Notifications on Android
Enabling push notifications on Android is pretty straightforward. All you need to do is replace the Server Key of the notificationManager with your own key. The steps are detailed in the previous section. Make sure you re-build and re-run your app after switching to the correct Server Key.

Edit this page
Previous
Setting Up Push Notifications
Next
Push Notifications on iOS

Push Notifications on iOS
Setting up push notifications on iOS is slightly more difficult, since you need to properly configure your own secure certificates with Apple’s servers (APNs). On a high level, here’s what you need to do in order to enable push notifications on iOS:

1. Update your Server Key if you haven’t done so in the previous section

2. Obtain APNs certificates from Apple 3. Upload the .p12 certificate to Firebase

This is general setup, and it’s not specific to our templates. You can follow the official Apple’s documentation to set up your APNs, if you run into any issues. Otherwise, you can just follow the next steps:

Head over to Apple, click “Account” and log into your developer account.


In the left menu, select "Certificates, IDs & Profiles"
In the Identifiers section menu, select “App IDs” and click the “Add New App ID” button
Fill out App ID Description & Bundle ID fields. Check “Push Notifications” and click “Continue“. The on the next screen click “Register”


In the new “App IDs” list, select the newly created App ID and click “Edit“.




Scroll down to the “Push Notifications” section and click on “Create Certificate” (you’re good with Development SSL Certificate for now) – you’ll create the other one only when you submit your app to the App Store
Follow the instructions for creating a CSR certificate from a Certificate Authority, using Keychain Access app on your laptop. And then click “Continue”




In the next screen on Apple’s website, upload the certificate you’ve just saved to disk. If you’re getting an “Invalid Certificate” error try removing all the expired certificates in your Keychain and re-create the CSR from the previous step. Now you should have a certificate created – download and store it securely on your laptop (the file extension is .cer).
Then, open the .cer file (by double-clicking on it) and add it to your Keychain. Once in Keychain, right-click on the certificate and then choose “Export“. This will create a .p12 file for you (you can choose an encryption password as well for extra security)


In Firebase, locate your app and go to Project Settings -> Cloud Messaging tab


Locate the “APNs Certificates” section and upload the .p12 file you’ve generated previously. If you used a password, you also need to type it in the password field. You can use the same certificate for both production and development.


After completing all these steps, including the ones in the previous section, push notifications will start working on iOS devices too. Make sure you rebuild and rerun your apps after the changes.

Edit this page
Previous
Push Notifications on Android
Next
Stripe Payments

Adding New Languages
All of our premium React Native templates come with built-in support for localization and RTL. This means that making the app compatible with and translating it to any language is trivial (as long as you have someone who speaks that language, of course). In this article, you’ll learn how to add support for a new language.

1. Create a translations file
For each language that you want the app to support you need to create a translations file.

1.1 In src/translations folder, create a duplicate of the en.json file.

1.2 Rename this duplicate file with the language code (ISO 639-1 column). For example, for Spanish, the file will be “es.json”, for French, the file will be “fr.json”, and so on.

1.3 Translate all the texts into that language The file acts as a dictionary, containing keys (which are in English and should remain untouched) and values (the translation – which needs to be in the new language). For example, this is how the English file looks like:



And this is how an Arabic file will look like, as an example:



Keep in mind, that every time you add a new string, you need to add the correct translations in all files (all supported languages), otherwise that string will be displayed in English.

2. Add your new language to the list of supported languages
Open src/translations/index.js file and add your new language code mapped to the translations file you created previously as follows:



For example, if you want to add Spanish (assuming you already created the es.json file at the previous step), your translation getters will looks like this:



Now build and run the app again (restart the metro bundler too). Change your device settings to the new language and the entire app will be displayed in that language. Pretty cool, right?

Edit this page
Previous
Translations & RTL
Next
Adding New Strings to Your React Native App

Adding New Strings
As mentioned before, all the new strings that you add while customizing the app must appear in all the translations files. Otherwise, they will always be displayed in English.

1. Use useTranslations hook for all strings in the app
useTranslations is a hook that allows us to support multi languages in all of our React Native apps. This means that instead of using plain strings in the source code, we wrap them around a localized call. For example, instead of adding a text like this

<Text>Random text here</Text>

You’ll be adding it like this

<span style="font-size: 12.6px;">import { useTranslations } from '../../core/dopebase'
...<br><br>const { localized } = useTranslations()<br>...
</span><br><Text>{localized("Random text here")}</Text>  

useTranslations hook can be found in src/core/dopebase

2. Add the translations of the new string in all translations file
After adding a new string, you need to provide the correct translations in all the supported languages for that string. To do this, simply update all the .json files from src/translations folder, by adding the string as a key and the translation as the value. For example, adding the Arabic translation for the “Random string here” will look like this:



Edit this page
Previous
Adding New Languages to React Native Templates
Next
Core Modules

Getting Started
All of our React Native codebases are making use of a subset of Core Modules, which the strategy we use to make our code of high-quality and highly modularized. These are submodules that are implementing specific parts of a mobile app, and that are independent and reusable between each other. The all live in src/core, and can be modified and customized by you as needed.



As you can see, there’s a decent number of such core modules, such as:

Onboarding
Authentication
Firebase
Localization
Location
Camera
Chat
Video Chat
WooCommerce
Stripe
Profile
etc.
Edit this page
Previous
Core Modules
Next
Onboarding Module Documentation

Onboarding
The Onboarding module lives in src/Core/onboarding. This module is in charge of handling the user onboarding flow, such as:

the walkthrough flow
login
registration
welcome screen
country code picker
phone authentication
SMS code verification
Firebase Auth interactions
persistent login credentials
etc
There are 8 main UI components that reside in this module. So you need to change the code in here, if you have to make customizations in any of the following:

Walkthrough Screens
Welcome Screen (a.k.a Landing Screen)
Login Screen (Email and Password)
Phone Login Screen (with SMS verification)
Sign up Screen (Email and Password)
Phone Sign up Screen
Country Code Picker
Terms of Use and Conditions View
Implementation wise, the onboarding module contains the following components:

UI screens

A reducer called “auth” in onboarding/redux folder

Authentication Manager

lives in onboarding/utils/authManager.js
the only component that is interacting with the backend for authentication
It’s using firebaseAuth as the default backend (which lives in src/Core/firebase/auth.js)
LoadScreen

this is the first screen of the app, and it decides how the initial UI should look like, based on the persistent login credentials as well as the persisted walkthrough impression flag
Google SignIn
1. Retrieve Web Client ID

To set up Google SignIn you have to enable it in the authentication tab on your Firebase console and then retrieve your Web Client ID from the Web Configuration.



2. Insert Web Client ID into your code

The next thing you need to do is to update the config.js file with your Web Client ID:

const ChatConfig = {
  ....
  webClientId: 'your Web Client ID',
  ....
} 

Adding Your Own Backend

A common use case for our customers is that they have their own authentication backend, and they don’t want to use the default Firebase integration. If that’s the case, then you’ll need to create your own methods that interact with the registration and login endpoints. You’ll basically have to re-route these interactions from Firebase towards your own server. Fortunately, our app has been built with this in mind, so switching to your own server is extremely simple. All you need to do is to rewrite the implementation of the authManager.js (which lives in onboarding/utils/authManager.js). That’s it. A single class to write, with several methods:

const authManager = {
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  logout,
  createAccountWithEmailAndPassword,
  loginOrSignUpWithFacebook,
  sendSMSToPhoneNumber,
  loginWithSMSCode,
  registerWithPhoneNumber,
  retrieveUserByPhone,
};  

The best part is that you already have an example of implementing this in the source code (which hits the Firebase server).

Edit this page
Previous
Getting Started with Core Modules in React Native
Next
Chat Module Documentation

Chat
Our chat module, which lives in src/Core/chat contains the entire chatting functionality, including groups. Being properly modularized, the chat codebase can easily be integrated into any existing React Native app, with only a few lines of code. The main components of the Chat screen are:

IMChatScreen
This is the React Native component that handles the core chat room and its functionality.
It can be used for both 1-1 chat rooms as well as group chats
It only needs a channel ID in its props, and it will automatically pull the proper conversation messages
It communicates with Firebase, via the channelManager and firebaseStorage objects
sendMessage() is one of the most important methods, which is in charge of sending a message
It sends a push notification too all recipients, when a message is being sent, using the notificationManager
For apps that have audio and video calling integration, the call is being initiated in this component too
It looks like this:


IMConversationListView
This is a React Native component that automatically displays the list of all the conversations of the current user
It only needs a user ID in its props or redux binding
IMCreateGroupScreen
This is the screen that lets you select multiple friends to create a group chat
It depends on an existing friends reducer (from Core/socialgraph module) to fetch the list of friends
chat reducer
This reducer should be hooked into any app that’s using our chat functionality.
It’s in charge of storing and observing the list of conversations the current user is involved in
Firebase interactions
The components interacting with Firebase live in chat/firebase
They are in charge of fetching the conversations (channelsTracker.js) and uploading photos and messages (channelManager from channel.js)
Adding Chat into an Existing React Native App
If your app is not using Firebase already, you’ll need to link the app to your Firebase server first. This is pretty straightforward, and you can follow our detailed guide on how to achieve this.
Add Core/chat folder into your own source code
To navigate to a chat screen, use this code snippet:
import { IMChatScreen } from '../Core/chat';
...
const id1 = "1234";
const id2 = "5678";
const otherUsers = [
   {
       id: id1 < id2 ? id1 + id2 : id2 + id1,
       firstName: "Andrew"
   }
];
const channel = {
    id: id1 + id2,
    participants: otherUsers,
};
props.navigation.navigate('ChatScreen', {
    channel,
    appStyles: AppStyles,

Changing the Backend
By default, our chat is using Firebase as its datastore for the messages and conversations. Some customers prefer to create their own backend, so we made that possible by abstracting out the server interaction code into its own components. In order to port our chat module to your own backend, all you need to do is reimplement the methods that interact with the server, such as:

the methods in Core/chat/firebase/channel.js (sendMessage, createChannel, onRenameGroup, etc)
the methods in Core/firebase/user.js (getUserData)
the markAbuse method in Core/user-reporting/firebase.js (used for blocking users, a feature required by Apple)
Edit this page
Previous
Onboarding Module Documentation
Next
Video Chat Integration with React Native

Video Chat
Our video and audio calling functionality is implemented via WebRTC, which is a peer-to-peer communication library, open-source, supported by Google, Apple, and Microsoft, among others. The react-native-webrtc library made it possible for WebRTC protocol to be integrated into our React Native projects. It works for both iOS and Android, and video calls are even possible from an iOS device to an Android device and vice-versa.

Data Flow Overview
When a user initiates a call, we send that down to Firebase (which is used as the signaling server)
The other users’ devices are observing the Firebase signal and when they retrieve it, they pop up the incoming call screen
When another user answers the call, we signal the operation to Firebase again, which now sends the new signal back to the initial caller and the video / audio call starts
We use Google’s and Mozilla’s STUN and TURN server for the actual peer-to-peer communication
const servers = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'beaver',
      username: 'webrtc.websitebeaver@gmail.com',
    },
  ],
}; 

If you have your own server, you can update these URLs, or you can simply just continue using these.

Codebase
All the code related to audio video calls lives in src/Core/chat/audioVideo. Among the most important classes, we can list:

IMAudioVideoChat
This is the core component managing the calls, such as initiating a call, accepting a call or hanging up
It interacts directly with the WebRTC library
Renders the incoming / outgoing calls screen for both audio and video calls
AudioChatView
This is the React component in charge with the audio calling UI once the audio call started
Its only function is to render the UI
VideoChatView
This is the React component in charge with the video calling UI once the video call started
Its only function is to render the UI
firebase.js
This is the class containing all the methods that are necessary to make Firebase our signaling server
This is the file that you need to modify if you want to use a different backend
It is in charge of
observing incoming signals
sending new call signals
accepting new incoming streams (such as for each new participant into a group chat)
audioVideoChat reducer
lives in redux/index.js
this is the reducer allowing your React Native screens to listen to incoming calls (the signals)
you must add this reducer to your app if you need to integrate our video chat into an existing app
Enable Push Kit & Call Kit with Apple’s APNs
Push Kit enables your app (on iOS) to retrieve incoming calls when the app is in background, forced quit, or in locked screen. Call Kit enables your app to display the native incoming call screen UI (on iOS). This is particularly important when your iOS app is not in foreground (so in background or locked screen), since it allows the call recipient to accept an incoming call. To enable Push Kit in your app, you’ll need a server that makes the call requests to Apple’s Push Kit APNs. Fortunately, we’ve included this server code in the archive you’ve purchased. It comes as a Firebase function – check out the Firebase folder. To enable Push Kit & Call Kit, simply follow the steps:

Generate a .pem certificate with your Apple Developer account and the Bundle ID of your app. Find any online tutorial in case you didn’t do this before.
Override voipCert.pem file with your own certificate.
In Firebase/functions/pushKit.js, change two lines of code to update the correct password and the correct Bundle ID (of the iOS app):
const config = {
    production: false, /* change this when in production */
    cert: 'voipCert.pem',
    key: 'voipCert.pem',
    passphrase: 'INSERT YOUR PASSWORD HERE'
 }; 

notification.topic ='io.instamobile.chat.swift.voip'; // change this to your own Bundle ID. You have to add the .voip suffix here!!!


Enable Billing for your Firebase project (see official docs on how to enable billing – don’t worry, Google won’t charge you until you reach a certain traffic/userbase (see Firebase Pricing)
Deploy the Firebase function to your own Firebase, by running
firebase deploy

in the Firebase folder.

Update Push Kit Configuration in React Native In Core/chat/config.js, update the Push Kit Endpoint and the Bundle iOS ID with your own (the Push Kit Endpoint will be retrieved after you ran “firebase deploy” at step 4). The Bundle ID is the app identifier you chose initially when you created the iOS app in Firebase Console.

const callID = 'E621E1F8-C36C-495A-93FC-0C247A3E6E5F';
const pushKitEndpoint =
  'https://us-central1-production-a9404.cloudfunctions.net/initiateChatCall';
const iOSBundleID = 'io.instamobile.chat.rn.ios';
export { callID, pushKitEndpoint, iOSBundleID }; 

Now you will notice your function deployed properly in Firebase Console -> Functions. You can view the logs every time this method is called.



Go ahead and initiate a call between two users – you’ll notice this function will get called, and the recipient user will get a VoIP push notification call.Debugging If you don’t see any logs in Firebase, for the initiateChatCall function, this means the user that you call does not have a pushKitToken. This can happen for multiple reasons, such as they never opened the app, or they rejected the push notification permission dialog. To check whether the user has a push kit token, simply find that user in the “users” Firestore table, and see if their pushKitToken field is set up. If you do see logs in Firebase – Successful logs look like this

{"sent":[{"device":"dae0721aef5713027f7efdbf2da5d3dec3cc0df3830facd2cccf1ef96122efa8"}],"failed":[]} 


Since the “failed” field is empty, it means the request has been properly set up (correct certificate, correct bundle ID, correct password) so everything should work. Sometimes Apple APNs are a little flaky, especially when not in production, so be patient or try to initiate a call again. Failed logs look like this:

{"sent":[],"failed":[{"device":"grgwrehe69eafe441a12e34a505620","error":{}}]}

In this case, you did not set the correct Bundle ID, the correct .pem certificate or the correct password. You’ll need to go over steps 1-4 again and figure out what you missed.

Background & Locked Screen Calls on Android
To enable calls on Android while the app is in background or the device is locked, React Native uses ConnectionService (via the react-native-callkeep library). To support signal the calls between devices, remote notifications are being used, via Firebase Cloud Messaging. To enable these type of calls, you must first ensure that push notifications are working fine in your environment (e.g. push notifications when sending a text message). To be able to receive calls in background / on locked device, when in debug mode (so when the app is built from the command line), you must make sure that when the app opens, you accept the “Phone Accounts” permissions. This is done in a separate Settings screen that can be opened by clicking the dialog below (left screen). Make sure that your app’s permissions is on (the right screen), then tap the back button on that screen to go back to the app. When closing the app, check that the right screen option for your app is still ON.



In the production environment, you won’t need to do this, since the users accept that permission when downloading the app from the Play Store.

Integrating Video Chat into an Existing React Native App
If you already have a React Native app, and you’d like to integrate our video chat feature, we made it extremely easy for you to do so. Here’s an overview with the steps you need to follow:

Import src/Core/chat/audioVideo folder into your src folder
Add the audioVideoChat reducer to the lists of your supported reducers
In one of your main components (e.g. HomeScreen), connect to that reducer
const audioVideoChatConfig = useSelector(state => state.audioVideoChat);

When rendering your main UI, simply render video chat functionality too based on the reducer:
{audioVideoChatConfig && <IMAudioVideoChat {...audioVideoChatConfig} />}

## Configuring Twilio

To use Twilio service for audio/video call, you need to navigate to src/Core/chat/audioVideo/index.js file and change this line:

export * from './webRTC';
// export * from './twilio';

to:

// export * from './webRTC';
export * from './twilio';

Next, find src/Core/chat/audioVideo/twilioServerMiddleware folder. At the root of this folder, deploy a firebase cloud function. But before that, you will need to:

Run npm install -g firebase-tools to install firebase CL.
Run firebase login to log in via the browser and authenticate the firebase tool. After successfully running the commands above, run: firebase deploy --only functions to deploy your function. If you encounter any error, visit the official documentation here for assistance. Now, navigate to src/Core/chat/audioVideo/config.js file and edit:
export const TWILIO_SERVER_ENDPOINT =
  'https://us-central1-socialape-e8afb.cloudfunctions.net/getTwilioAccessToken';

In the code above, change “socialape-e8afb” to your firebase Project ID. You need to do only the steps above for ios. For android, you need some extra steps before Twilio works. You will need to navigate to react-native.config.js at the project root and replace this line of code:

dependencies: {
  'react-native-twilio-video-webrtc': {
    platforms: {
      android: null, // enable/disable react-native-twilio-video-webrtc on Android platform.
    },
  },
  'react-native-webrtc': {
    platforms: {
      // android: null, // enable/disable react-native-webrtc on Android platform.
    },
  },
}, 

to:

  dependencies: {
    'react-native-twilio-video-webrtc': {
      platforms: {
        // android: null, // enable/disable react-native-twilio-video-webrtc on Android platform.
      },
    },
    'react-native-webrtc': {
      platforms: {
        android: null, // enable/disable react-native-webrtc on Android platform.
      },
    },
  },


Also, you should delete the build folder that exists at android/app/build. Rebuild your android project from the command line to have the changes take effect.

Edit this page
Previous
Chat Module Documentation
Next
Profile Module Documentation

Profile
Core/Profile is a module containing most of the logic behind the user settings screens. These are screens that are common to any mobile app, such as:

Account Details screen IMEditProfileScreen
Settings screen IMUserSettingsScreen
Contact us screen IMContactUsScreen One of the most important components that all these screens rely on is IMFormComponent, which is a generic React Native UI component, that lives in Core/profile/ui and which has the functionality of rendering advanced forms.
Forms
As mentioned below, IMFormComponent is a custom UI component that is capable of rendering a complex form, where all its fields are passed in as a config object in its props. It has support for rendering:

text fields
button fields
select fields
switch fields
It also communicates back all the actions taken by the user, via two methods:

onFormButtonPress – this is called when a button field is pressed
onFormChange – this is called when any of the form fields changes its value (text, switch, etc)
The main important property of the IMFormComponent is its form parameter, which stores the state of the form. Here’s an example of how the form parameter looks like for our Account Details screen:

form: {
   sections: [
     {
       title: IMLocalized("PUBLIC PROFILE"),
       fields: [
         {
           displayName: IMLocalized("First Name"),
           type: 'text',
           editable: true,
           regex: regexForNames,
           key: 'firstName',
           placeholder: 'Your first name'
         },
         {
           displayName: IMLocalized("Last Name"),
           type: 'text',
           editable: true,
           regex: regexForNames,
           key: 'lastName',
           placeholder: 'Your last name'
         }
       ]
     },
     {
       title: IMLocalized("PRIVATE DETAILS"),
       fields: [
         {
           displayName: IMLocalized("E-mail Address"),
           type: 'text',
           editable: false,
           key: 'email',
           placeholder: 'Your email address'
         },
         {
           displayName: IMLocalized("Phone Number"),
           type: 'text',
           editable: true,
           regex: regexForPhoneNumber,
           key: 'phone',
           placeholder: 'Your phone number'
         }
       ]
     }
   ]
 }  

By passing this config object as the form prop into the IMFormComponent, a beautiful native form will be rendered properly. As you can see, the form config is made up of:

an array of sections
each section, contains
title
array of fields
each field contains a few parameters describing the field
type
displayName
regex (this is optional and used for form validation)
key (a unique identifier useful in processing the form)
placeholder (optional – useful for fields such as a textfield)
Changing Profile Fields
We made it easy to customize all the fields that are required by your app for the profile, settings and contact us default screens. If you open the main config.js file of your premium React Native template, you’ll notice the following three fields:

editProfileFields: {...}
userSettingsFields: {...}
contactUsFields: {...}  

You can simply edit these fields and sections to add, remove, and edit any form fields that you want. The changes will automatically be reflected in the 3 screens on the profile flow.

Edit this page
Previous
Video Chat Integration with React Native
Next
Camera Module Documentation

Camera
Camera, a module which lives in Core/camera, is our subsystem that allows taking photos and videos with the full screen camera. IMCameraModal is the most important component, which can be used as follows:

<IMCameraModal
  isCameraOpen={isCameraOpen}
  onImagePost={onImagePost}
  onCameraClose={onCameraClose}
/>  

This component handles a few complex tasks, such as:

switching between front (IMPreCamera.js) and back camera (IMPostCamera.js)
taking pictures
recording videos
importing photos and videos from the library
It sends back the asset source via _onImagePost callback. Here’s a simple implementation of handling the response of camera selection:

onPostStory = async source => {
 // use source.uri to handle the asset on device (photo / video)
}

Under the hood, it relies on expo-camera package.

Edit this page
Previous
Profile Module Documentation
Next
Integrate Facebook Ads in React Native Apps

Location
Location, which lives in src/Core/location, contains our UI code for dealing with location operations, such choosing a location in an interactive UI. The main component in this module is IMLocationSelectorModal.

IMLocationSelectorModal
This is a UI component that displays a map on the screen and allows the user to interact with it in order to choose a specific location. We use this component in situations like:

Adding real estate items (in the real estate app)
Checkins in social networks apps
Picking the store locations in universal listings app
To use this component, all you need to do is this:

<IMLocationSelectorModal
  isVisible={locationSelectorVisible}
  onCancel={onLocationSelectorPress}
  onDone={onLocationSelectorDone}
  onChangeLocation={onChangeLocation}
  appStyles={AppStyles}
/> 

The names of the props should be pretty much self-explanatory. You’ll notice that the initial coordinate on which the map is focused is a static location. You can specify that location inside the IMLocationSelectorModal file:

const [region, setRegion] = useState({
  latitude: 37.7749,
  longitude: -122.4194,
}); 

Edit this page
Previous
Integrate Facebook Ads in React Native Apps
Next
User Reporting Module Documentation

User Reporting
User blocking and reporting is a feature that is required by Apple and Google in all mobile applications where users can create and share their own content with others. This is extremely important in applications such as:

messaging
dating apps
social networks
marketplace apps
photo sharing apps
We’ve abstracted out this functionality into the User Reporting module, which lives in src/Core/user-reporting.

The module contains only a few important pieces:

userReports reducer

your app needs to support this reducer in its redux configuration, in order for the module to work properly
firebase / reportingManager

by default, our app uses Firebase for storing all user reports.
the Firestore table name is “reports“, which gets automatically created when you report a user for the first time
to use the default Firebase reporting manager, simply use the code snippet below:
import { reportingManager } from 'path to Core/user-reporting';
...
reportingManager.markAbuse(myUserID, otherUserID, type).then(response => {
    // myUserID user just blocked the otherUserID user
});

Dependencies
Given that this feature is required by Apple and Google for certain functionalities where users can share content between them, the user-reporting module is added as a dependency to the following Core Modules:

Chat
Video Chat
Feed
Social Graph
This means that if your app imports one of those modules, you’ll need to import the user-reporting module too.

The user reports are being used by those modules to filter out content from the blocked users, such as :

posts
chat messages
user lists
notifications
stories
Changing to Your Own Backend
If you are planning to use your own backend for the entire application, you’ll need to migrate the user reporting module to your own server endpoints. Fortunately, all you need to do is override these two methods in Core/user-reporting/firebase.js:

export const markAbuse = (fromUserID, toUserID, abuseType) => {
  // call the endpoint that blocks an user
}
export const unsubscribeAbuseDB = (userID, callback) => {
 // call the endpoint that retrieves the list of all users blocked by userID
}

Edit this page
Previous
Location Module Documentation
Next
In-App Purchases Guide
Dependencies
Changing to Your Own Backend

In-App Purchases
We have managed In-App purchases for iOS and Android with “react-native-iap” library. This library enables us to manage In-App purchases smoothly for both Android and iOS.

Configuring IAPs For iOS on App Store Connect.
To accept auto-renew subscriptions in ur app first, you have to log in to App Store Connect -> Agreements, Tax and Banking



Then accept all the Paid Apps Agreements and you will see something like this:



If the agreements have not been accepted you can’t see the option to create the AutoRenew subscription.

Create the subscriptions

Within App Store Connect, click Apps, followed by the App you wish to add in-app purchases to.
You should find In-App Purchases at the left side of your page, amongst the tabs.
Under In-App Purchases, click Manage. Here, we can add subscriptions as well as a “billing grace period” feature that postpones ending a subscription until a certain period of time passes after a subscription expires.
Click the __+++ icon next to your In-App Purchases subheading to add an IAP, and follow the two-step process of choosing its type, followed by its name and reference number:



Your Reference Name should be a readable and easily recognizable label for the subscription item, whereas the Product ID needs to be a unique identifier for the item.

If you host many apps, using the com.org.app.iapId may be a more manageable Product ID convention, ensuring that there are no overlapping values between apps.

From here you can jump into each of your purchase items and configure a range of metadata — here are some of the more interesting features you can configure:

Subscription pricing, with a toggle to automatically generate prices for every supported currency. This is extremely useful for displaying prices in-app.

Promotional offers and introductory offers to spur new customers. Specific start and end dates can be set (or even no end date for an ongoing promotion), as well as a specific payment type.

Be sure to check out all the options available for your In-App Purchase item to further tailor your offer.

Later on, we will fetch the configured IAPs further down and use in our project.

Create a sandbox test user

Still in App Store Connect -> My Apps -> Users and Access.
On the Users and Access page, you should find Sanbox on the left tab.


create a Tester account that will later be used to test IAPs on your app.
Configuring IAPs for Android on Google Play Console


As described in the above screenshot, you need to upload an APK and set up a merchant account before creating an In-app product.
If you’ve done it, you can create a managed product or subscribe products as shown in below screenshot.


Flow Overview
Using ‘react-native-iap” library, we fetch subscription details with the previously configured subscription SKUs for different platforms.
We display on the screen, the localized price and title of the subscription detail.
The user selects a subscription plan and completes a purchase.
The Subscription plan is immediately active and auto-renewable.
To cancel a plan, The user will have to go to the phone App settings and log in to the services provider
Select subscriptions and find the list of subscriptions available.
Codebase
All the code related to In-App purchases lives in src/Core/inAppPurchase. Among the most important classes, we can list:

IMSubScriptionScreen
This is a component for display.
Here, we have the UI for the subscription screen.
It also starts a subscription purchase when we press the Purchase button in the UI.
IAPManagerWrapped
This returns a context that wraps the main App.
It also manages the logic for completing a purchase.
It manages the logic for checking and getting a subscription plan a device.
It also loads active subscription plan from the Firebase Firestore in case we have an active subscription but we are logged in on a different device with no subscription plan.
It also validates IOS transaction receipts.
_Validating IOS Transaction Receipts. To validate a transaction receipt on IOS, you will need to generate an _App-Specific Shared Secret

In the Features screen of App Store Connect app, we can see a link

App-Specific Shared Secret

Click on it and generate a new App Secret. This app secret is necessary to validate a transaction receipt.

enter the generated shared secret in src/DatingConfig.js

IAP_SHARED_SECRET: 'enter_shared_secret_here',

Edit this page
Previous
User Reporting Module Documentation
Next
PayPal Payments Integration Guide

PayPal Payments
1. Deploying Your Payments Server
In order to setup Paypal, you’ll need your own Payments server. To test the payments in your app, you can deploy this server on your local machine.

However, when you are planning to release the app to the App Store or Google Play Store, you’ll need to deploy the server publicly, in production. You can either deploy it to Firebase or Heroku, or any other hosting service that supports Node.js (e.g. Digital Ocean, AWS, etc).

Action Required

Prior to testing you PayPal integration you have to register for sandbox Braintree at https://sandbox.braintreegateway.com/login and get your necessary credentials by clicking on the gear icon at the top right of your profile then click API.



Testing Locally
1. Create a folder and navigate into the folder via the command line:

mkdir myapp
cd myapp

2. Initialise the project and press enter for every prompt and then yes for the final question:

npm init  

3. Install the following dependencies:

npm install braintree express nodemon

The above command installs braintree the library provided by PayPal

4. Run the code using the following command

nodemon index.js 

Deploying to Firebase
For deploying to firebase you need to have gotten your production credentials at https://apply.braintreegateway.com/ then proceed to

Configure Firebase functions
Run the following command to install Firebase functions globally on your machine

npm install -g firebase-tools  

then log into your firebase on your machine by running

firebase login

Create your Firebase function
Create a folder to contain your Firebase functions project and then run the command to setup your folder structure

firebase init functions  

Please ensure that you click on the Create a new Project option then enter your preferred unique project id and use your preferred project name. You also have to choose Javascript as your choice of language to write with and select the option to install dependencies.

The final step is to deploy your firebase
npm run deploy

And your backend should be live and you will get a URL to your new functions.

Edit this page
Previous
In-App Purchases Guide
Next
Customization

Change the app icon
The quickest way to change the app logo of an iOS app is this:

Prepare a 1024x1024px app icon (you’ll need this for the App Store too)
Head over to makeappicon to generate all the app icon sizes needed for the app automatically.
iOS: Download the AppIcon.appiconset folder and override the existing one at ios/Assets.xcassets/AppIcon.appiconset
Android: Copy the folders from the downloaded “android” directory and override the subfolders of android/app/src/main/res
That’s it. Your AppIcon should look like this in Xcode now:



And for Android:



Edit this page
Previous
Customization
Next
Change the name of the app

Change the name of the app
Changing the app name on iOS
To change the app name on iOS, open the project in Xcode, select the project in the left navigation panel, then choose General and modify the Display Name (the first field). Once changed, re-run the project in Xcode, and you’ll notice the app name has changed.



Changing the app name on Android
To change the name of the Android app, you simply need to open android/app/src/main/res/values/strings.xml file, and modify the app_name value to the new app name. Now re-run the app, and you’ll notice its name has changed.



Edit this page
Previous
Change the app icon
Next
Change the Splash Screen Logo

Change the splash screen logo
iOS
To change the splash screen on iOS, you need to open the native project in Xcode (the .xcworkspace file from the ios/ folder) and locate the LaunchScreen.xib file. You can then drag and drop views, change images & texts, and add constraints into the Interface Builder. Check out this step-by-step tutorial in case you are not familiar with Xcode’s interface builder.



Note: The reason why this has been done natively is performance. Any JavaScript library managing the splash screen creates a ton of latency at app start up, which would have been a poor user experience.

Android
Similarly, changing the splash screen in Android is done natively to boost startup performance tremendously. To change the splash screen of our React Native templates, locate the android/app/src/main/res/launch_screen.xml and make changes there. You can open the android project in Android Studio, if you want to use the interface builder (drag-and-drop) to make visual changes to the launch screen.



Check out this detailed tutorial in case you are not familiar with Android’s layout system.

Edit this page
Previous
Change the name of the app
Next
React Native Errors

React Native Errors
1. Error: Activity class {com.appname/com.appname.MainActivity} does not exist.
Despite the message, this is in fact not an error. As long as you got the successful green message “BUILD SUCCESSFUL” (see image below), you can manually open the app on the device/emulator on which you built the project. Just find the app icon and tap on it. That will open the app.



2. No bundle URL present


If you’re getting this error, it means your packager server didn’t start. You’ll have to start it manually by running

 
npm start -- --reset-cache

Once the metro bundler started, simply reload the project.

3. Error: Could not find or load main class org.gradle.wrapper.GradleWrapperMain
If you’re running into this issue, it’s because you’re missing this file: android/gradle/wrapper/gradle-wrapper.jar . You can generate this binary by simply running


gradle wrapper

in the project’s android folder. If you don’t have gradle installed, follow gradle documentation on how to install it (or just run “brew install gradle” on MacOS).

4. SDK Location not found
If you’re running into this issue when building a React Native mobile app on Android, it’s because your Android SDK path is broken or it doesn’t exist. Open your ~/.bash_profile, and add the following lines at the beginning:


export ANDROID_HOME=~/Library/Android/sdk/
export PATH=~/Library/Android/sdk/tools:$PATH
export PATH=~/Library/Android/sdk/platform-tools:$PATH

Now load the new ~/.bash_profile in your Terminal (restart the Terminal or run “source ~/.bash_profile“), and re-run the Android app.

5. App gets stuck on the splash screen
If you are able to successfully build the project, but the app stays blocked on the splash screen (also known as the launch screen), this usually means you didn’t start the metro bundler in the correct folder or under the right React Native version. To start the metro bundler in the correct folder, please make sure you locate the project folder in the Terminal and run


npm start -- --reset-cache

This is usually enough to fix the error. Reload the app and see if it works. If it’s still not working, then do a full wipe out by running:


watchman watch-del-all && rm -f yarn.lock && rm -rf node_modules && yarn && yarn start -- --reset-cache


Once the metro bundler started, you can simply re-build the project again (in Xcode for iOS, or react-native run-android for Android), and you’ll see the packager loading the JS code as follows:



6. Keystore file ‘…android/app/debug.keystore’ not found for signing config ‘debug’.
You can fix this error by simply running the following command in your android/app folder and typing in all the requested information:


credential = [FIROAuthProvider credentialWithProviderID:@"apple.com" IDToken:authToken rawNonce:authTokenSecret];


to


credential = [FIROAuthProvider credentialWithProviderID:@"apple.com" IDToken:authToken accessToken:authTokenSecret];


Now re-run the Xcode project and you’ll notice the error went away.



8. warn Failed to connect to development server using “adb reverse”: spawnSync adb ENOENT
This is just an warning, and it means the build was successful, but it couldn’t open the app. Check out the app on your emulator / android device, and simply open it manually.

9. React Native Version Mismatch
This usually means that you opened the metro bundler in a different project. In 99% of the cases, running the following command in the correct folder will fix the error:


npm start -- --reset-cache

If this doesn’t work, try running


react-native bundle --platform android --dev false --entry-file index.js --bundle-output 
android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

and rebuild the project. You can also try running


adb reverse tcp:8081 tcp:8081

which sometimes helps too. If nothing worked, try restarting your computer.

10. Error: Firestore: Operation was rejected because the system is not in a state required for the operation`s execution. (firestore/failed-precondition)”
This error shows up when first running our apps that have more complex performance improvements. You need to create the proper indices in your Firestore tables, used for loading data much faster. We do console.log these errors, so simply look into the console for a custom Firebase URL that looks like this (“The query requires an index. You can create it here: “):



Clicking on that URL will automatically land you in the Firebase UI for creating that index:



Simply click the “Create Index” button, and wait for the index to be created before running your app again. You’ll notice the error will disappear as soon as the index is created. Alternatively, you can also create the index manually, in the Firebase Console UI (Firestore -> Indexes)

Edit this page
Previous
Change the Splash Screen Logo
Next
Publishing to App Stores

Social Graph
The social graph collections store the data that defines the relationships between different users, such as follow/following or friendship.

When a user makes a friend request or a follow request to another user, we store that data in the social_graph collection. In this collection, for each user ID, we store two subcollections:

inbound_users: all the users that made a friend/follow request to the current user (incoming requests)
outbound_users: all the users to whom the current user made a friend / follow request (outgoing requests) For user A, if we find user B in both subcollections, it means user A and B are friends (or they follow each other, in apps such as Instagram – mutual follow).
Here’s the exact Firebase paths for the two subcollections:

social_graph/{userID}/inbound_users/{friendID}/{friendData} social_graph/{userID}/outbound_users/{friendID}/{friendData}

Here’s how the Firebase collections look like in practice:



Please note how the second column contains the actual real user IDs. This allows us to retrieve the list of incoming and outgoing follows for a given user efficiently, making our app load fast.



Note how the IDs from the 3rd column above are the user IDs for the actual friends. This allows us to update the entries quickly for any given pair of users (user_ID, friend_ID).



Note how we store the entire user data in these subcollections. This allows us to retrieve the friends list / list of followers super fast, so the app is fast. The downside is that every time an user updates their profile (first name, last name or profile photo) we need to make sure we update these collections. This update is done via a Firebase Function that detects whenever a user changes their profile and updates the “social_graph” collection accordingly. Since we stored the data efficiently (keyed subcollections on user IDs and friend IDs), this update is super fast too.

Code Path
If you want to see where exactly the code writes and reads from the social_graph collection, simply check out all the methods in src/Core/socialgraph/friendships/api/firebase/friendship.js.

This is the only file that you need to change if you want to re-define these collections to suit your own needs.

Edit this page
Previous
Firebase Schemas
Next
Chat Data Schema for Firebase

Chat
Let’s see how we store the data for all of the chat channels and messages that users create within our apps.

For a chat feature, we have two main types of data:

messages – the actual messages that are sent between users, in various formats (text, audio, video, photo, etc) channels – the list of different channels that a user is part of (1-1 channels & group channels) To support all the use cases and features, here’s how we model our data into Firestore.

social_feeds/{userID}/chat_feed/{channelID}/{channelData}
This collection is used for quickly loading all the channels a given user is part of. For example, this is used to quickly load the home screen with all the conversations in the chat app. It contains all the conversations (channels) that a user is part of, along with the metadata needed in the UI (e.g. profile photos of the other users, name of the conversation, marked as read flag, etc).

Here’s what the fields look like:

id // the id of the channel
title // the title of the conversation as it shows in the userID's conversations timeline
content // the text message that shows as the preview of the conversation in the conversations timeline (e.g. "Someone sent a photo")
markedAsRead // boolean flag indicating whether the current user read the message or not (so it gets bolded out in the UI)
createdAt // the creation date, used for displaying the time text (e.g. "5 min ago")
participants // the list of the participants, used for display the avatars (and multi-avatars view for the group chats)  


Important!!! For a 1-1 chat (that’s a chat between exactly 2 users), the channel ID is always the concatenation of the two user IDs that participate to the chat. In React Native, it is computed as following:

const channelID = id1 < id2 ? id1 + id2 : id2 + id1 // where id1 and id2 are the IDs of the two participant users

This helps you trigger the chat screen in one line of code, from anywhere in the source code, since you only need two user IDs to trigger it.

channels/{channelID}/{channelData}
This collection gives us the metadata for a given channel. It contains data such as the name of the channel (e.g. the group name), the channel ID (unique identifier), as well as more complex data such as the user IDs that read the last message, the participant IDs, the typing users list (users who are currently typing in the chat), etc.

Here’s the exact field names:

id,
creatorID,
lastMessage,
lastMessageSenderId,
lastThreadMessageId,
name,
participantProfilePictureURLs,
participants,
readUserIDs,
typingUsers 

channels/{channelID}/thread/{messageID}/{messageData}
For a given channel, this subcollection gives us all the messages that were posted in that chat, along with all the metadata needed in the chat UI (e.g. photos, media, creation date, etc).

Here’s what the message data fields look like:

content // the text message, if the message is of text type
createdAt,
inReplyToItem // the ID of the message that was replied to (this is for the in Reply To feature)
participantProfilePictureURLs // the list of profile photo URLs for the participants in the chat
readUserIDs, // the IDs of all the users who saw this message
senderFirstName, // the sender info, used for performance (to quickly load all the data of this message)
senderID,
senderProfilePictureURL,
url // the URL of the media, if the message is of type photo, video or audio 


If the message is a media message (photo, video or audio), the url field above has the following structure:

url, // the download URL of the media asset
mime, // the mime type, specifying what type of asset this is (photo, video or audio) so we can render it properly on the client 
``


Edit this page
Previous
Social Graph Firebase Schemas
Next
Video Chat with Firebase Schemas

Getting Started with React & Node.js
important
This guide provides step-by-step instructions for setting up our Admin panels on your machine. These panels are designed to simplify the management of the applications created by our team. First, you will need to install Node.js. Follow this Official Guide to start with Node.js that includes npm, a package manager that helps install everything else we need.

1. Preparing Your Project
Once Node.js is installed, open your terminal and navigate to the admin panel folder. Your project structure should look like Admin Panel Preview

Run the following command to set up the project dependencies:

yarn install
cd client
yarn install
cd ..

This will install all required packages.

2. Configuring Your Admin Panel
Server Configuration
Client Configuration
Before running the project, you need to set up your Firebase configuration:

Create a Firebase project at Firebase Console - If you haven't set it up already.
Download your service account key (JSON file) from Firebase Console:
Go to Project Settings > Service Accounts
Click "Generate New Private Key" Admin Panel Preview
Replace contents of the file in db/firebaseDB/production-a5g04-firebase-adminsdk-nin6u-d632b424d4.json with this JSON file you just downloaded.
Finally update the bucketURL in db/firebaseDB/index.js with your Firebase Storage bucket URL
3. Running the Project
To start both the server and client applications, run the below commands from the root directory:

# In the root directory
yarn start     
cd client
yarn start        

This will launch the server and open the admin panel in your default web browser, go ahead and sigup.

Admin Panel Preview

5. Important notes and tips about the panel
API Routes
The API routes are defined in api/apiRoutes.js. This file contains all the endpoint definitions for:

Authentication (login, register)
User management
File uploads
Notifications
Email services
CRUD operations for various entities (Templates, Categories, Products, Orders)
To add new routes:

Create a new controller in the controllers directory
Import it in apiRoute.js
Define your routes following the existing pattern:
app.route('/api/your-endpoint')
    .get(requestAuth, (req, res) => { yourController.list(req, res, db) })

Database Interface
The project uses a flexible database interface pattern located in db/instamobileDB. The current implementation uses Firebase, but you can easily switch to another database by Creating a new class that implements all methods in FirebaseDBManager

Email Configuration
The email functionality uses SendGrid for sending emails.

important
Replace the SendGrid API key in your email controller with your own key:

Sign up for a SendGrid account

Generate an API key from SendGrid's dashboard

Replace the API key in api/controllers/EmailController.js:


const myKey = "YOUR_SENDGRID_API_KEY"


Your admin panel is now fully set up and linked to your Firebase account. You can manage users, posts, and stories from the admin interface.

Edit this page
Previous
Admin Panel
Next
Firebase Integration for Admin Panel

Firebase Integration
In this section we will show you how you can update your admin panel to use your own database.

We start by going to the firebase console and to your project, then go to Project settings -> Service accounts, and now click Generate new private key. This will generate a new JSON file that contains your private key.



Next you have to do is to go into the admin panel’s folder and go to /db/firebaseDB and remove the .json file and replace it with your own file that you got from the last step.

Lastly you have to edit index.js that is found in the same folder, in db/firebaseDB and change the highlighted lines of code.



Change the first line of code

    const serviceAccount = require("./production-a9404-firebase-adminsdk-nin6u-d632b424d4.json");


to:

const serviceAccount = require("./Your-Private-Key-File-You-Received.json");

And then get your link from where you generated the key and change the second line of code

const dbURL = "https://production-a9404.firebaseio.com";

to:

const dbURL = "Your-Link";



Now you can just start your admin panel, and start editing your own database!

Edit this page
Previous
Getting Started with React & Node.js

Getting Started with React & Node.js
important
This guide provides step-by-step instructions for setting up our Admin panels on your machine. These panels are designed to simplify the management of the applications created by our team. First, you will need to install Node.js. Follow this Official Guide to start with Node.js that includes npm, a package manager that helps install everything else we need.

1. Preparing Your Project
Once Node.js is installed, open your terminal and navigate to the admin panel folder. Your project structure should look like Admin Panel Preview

Run the following command to set up the project dependencies:

yarn install
cd client
yarn install
cd ..

This will install all required packages.

2. Configuring Your Admin Panel
Server Configuration
Client Configuration
Before running the project, you need to set up your Firebase configuration:

Create a Firebase project at Firebase Console - If you haven't set it up already.
Download your service account key (JSON file) from Firebase Console:
Go to Project Settings > Service Accounts
Click "Generate New Private Key" Admin Panel Preview
Replace contents of the file in db/firebaseDB/production-a5g04-firebase-adminsdk-nin6u-d632b424d4.json with this JSON file you just downloaded.
Finally update the bucketURL in db/firebaseDB/index.js with your Firebase Storage bucket URL
3. Running the Project
To start both the server and client applications, run the below commands from the root directory:

# In the root directory
yarn start     
cd client
yarn start        

This will launch the server and open the admin panel in your default web browser, go ahead and sigup.

Admin Panel Preview

5. Important notes and tips about the panel
API Routes
The API routes are defined in api/apiRoutes.js. This file contains all the endpoint definitions for:

Authentication (login, register)
User management
File uploads
Notifications
Email services
CRUD operations for various entities (Templates, Categories, Products, Orders)
To add new routes:

Create a new controller in the controllers directory
Import it in apiRoute.js
Define your routes following the existing pattern:
app.route('/api/your-endpoint')
    .get(requestAuth, (req, res) => { yourController.list(req, res, db) })

Database Interface
The project uses a flexible database interface pattern located in db/instamobileDB. The current implementation uses Firebase, but you can easily switch to another database by Creating a new class that implements all methods in FirebaseDBManager

Email Configuration
The email functionality uses SendGrid for sending emails.

important
Replace the SendGrid API key in your email controller with your own key:

Sign up for a SendGrid account

Generate an API key from SendGrid's dashboard

Replace the API key in api/controllers/EmailController.js:


const myKey = "YOUR_SENDGRID_API_KEY"


Your admin panel is now fully set up and linked to your Firebase account. You can manage users, posts, and stories from the admin interface.

Edit this page
Previous
Admin Panel
Next
Firebase Integration for Admin Panel

Client Configuration:
2. Configuring Your Admin Panel
Server Configuration
Client Configuration
Before running the project, you need to set up your Firebase configuration:

From your firebase console add a web app to your Firebase project:
Click on Project Settings (gear icon)
Under "Your apps", click the web icon and register a web app. Admin Panel Preview
Copy the provided firebaseConfig object
Replace the firebaseConfig object in client/src/admin/firebase.js that looks like:
const firebaseConfig = { 
  apiKey: "your-api-key", 
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-project-id", 
  storageBucket: "your-project-id.appspot.com", 
  messagingSenderId: "your-sender-id", 
  appId: "your-app-id", 
  measurementId: "your-measurement-id" 
};

with yours.

Setting Up Your Dev Environment
In this section, we are going to describe how to configure your React Native development environment. The developer tools and the way we set everything up is entirely inspired by how we do the day to day mobile app development in React Native at Instamobile.

1. Run an Empty React Native App on Your Computer
If this is the first time ever that you run a React Native app, you must follow the official guide first. Create an empty app and make sure it builds and runs properly on your computer. Follow the steps outlined in the official React Native documentation. Make sure you do not use Expo CLI, but React Native CLI.

2. Install Basic React Native Development Tools
3. Configure React Native Development Environment for Android
Let’s see how you can set up your development environment in order to run React Native apps. The setup shouldn’t take more than 5 minutes. What do you need to install?

Node (NPM) and React Native

Yarn

Git

(Optional, but Recommended) Visual Studio Code

(Optional) Android Studio Alright, let’s see how we install all of these. Simply follow the next steps:

Install Node by following the official guide

Install Git by following the steps in this guide

Install Yarn by running the command:

npm install --global yarn

Before running yarn install, create an empty yarn.lock file in your project directory:
touch yarn.lock

Install & Configure React Native by following this guide, the React Native CLI version. DO NOT USE Expo CLI!!
Download & Install Visual Studio Code (recommended for developing React Native apps, especially on Windows, due to its powerful Terminal)
Download & Install Android Studio (needed only if you don’t have a physical Android device) Looks simple, right? It actually is. This is all you need to do to run React Native apps on Android devices or emulators.
4. Configure React Native Development Environment for iOS
a. Install Cocoapods

b. Install Xcode You can find detailed explanations on how to install these tools in the Running on iOS section.

5. Install More Advanced Developer Tools
We highly recommend you to install the React Native Debugger tool. It helps you debug React Native apps with breakpoints, visualize the redux state changes in real-time and inspect the view hierarchy. We wrote a full article on how to debug React Native apps using the React Native Debugger.

Edit this page
Previous
Getting Started
Next
Running on Android with React Native




