#!/bin/bash

# Firebase Cloud Functions Deployment Script
# This script handles login and deployment of Cloud Functions

echo "=========================================="
echo "Firebase Cloud Functions Deployment"
echo "=========================================="
echo ""

# Unset NODE_OPTIONS to avoid conflicts
unset NODE_OPTIONS

# Get the npm global bin directory
NPM_BIN=$(npm bin -g 2>/dev/null || echo "/usr/local/bin")
FIREBASE_CMD="$NPM_BIN/firebase"

# Check if firebase is installed
if [ ! -f "$FIREBASE_CMD" ]; then
    echo "Firebase CLI not found at $FIREBASE_CMD"
    echo "Trying to locate firebase..."
    FIREBASE_CMD=$(which firebase 2>/dev/null)

    if [ -z "$FIREBASE_CMD" ]; then
        echo "ERROR: Firebase CLI not found. Installing now..."
        npm install -g firebase-tools
        FIREBASE_CMD=$(npm bin -g)/firebase
    fi
fi

echo "Using Firebase CLI at: $FIREBASE_CMD"
echo ""

# Check if already logged in
echo "Checking Firebase authentication status..."
$FIREBASE_CMD login:list

if [ $? -ne 0 ]; then
    echo ""
    echo "Not logged in. Opening browser for authentication..."
    echo "Please complete the login in your browser."
    $FIREBASE_CMD login

    if [ $? -ne 0 ]; then
        echo "ERROR: Firebase login failed"
        exit 1
    fi
fi

echo ""
echo "=========================================="
echo "Current Firebase project configuration:"
echo "=========================================="
cat .firebaserc
echo ""

echo "Default project: development-69cdc"
echo ""
read -p "Do you want to use the default project (development-69cdc)? [Y/n] " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    PROJECT="development-69cdc"
else
    echo "Available projects:"
    echo "  1) development-69cdc (default)"
    echo "  2) production-a9404"
    echo "  3) instaflutter-85faa"
    read -p "Enter project name: " PROJECT
fi

echo ""
echo "=========================================="
echo "Deploying Cloud Functions to: $PROJECT"
echo "=========================================="
echo ""

# Deploy functions
$FIREBASE_CMD deploy --only functions --project "$PROJECT"

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "SUCCESS! Cloud Functions deployed."
    echo "=========================================="
    echo ""
    echo "The following functions are now available:"
    echo "  - addPost"
    echo "  - deletePost"
    echo "  - addStory"
    echo "  - addStoryReaction"
    echo "  - listStories"
    echo "  - listHomeFeedPosts"
    echo "  - addReaction"
    echo "  - addComment"
    echo "  - listComments"
    echo "  - listDiscoverFeedPosts"
    echo "  - listHashtagFeedPosts"
    echo "  - listProfileFeedPosts"
    echo "  - fetchProfile"
    echo ""
    echo "You can now test Create Post functionality in your app!"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "ERROR: Deployment failed"
    echo "=========================================="
    echo ""
    echo "Common issues:"
    echo "  1. Firebase project needs to be on Blaze (pay-as-you-go) plan"
    echo "  2. Billing account not set up"
    echo "  3. Insufficient permissions"
    echo ""
    echo "To upgrade to Blaze plan:"
    echo "  1. Go to https://console.firebase.google.com"
    echo "  2. Select your project"
    echo "  3. Click on the gear icon > Usage and billing"
    echo "  4. Click 'Modify plan' and select Blaze"
    echo ""
    exit 1
fi
