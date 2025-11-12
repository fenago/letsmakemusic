#!/bin/bash

# Build and Run Script for React Native Social Network App
# This script performs a clean build and launches the app in the iOS simulator

set -e  # Exit on any error

echo "================================================"
echo "React Native Social Network App - Build & Run"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Detect project directory - handle both execution contexts
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "package.json" ] && [ -d "ios" ]; then
    # Already in ReactNativeSocialNetworkApp directory
    PROJECT_DIR="$(pwd)"
    echo -e "${GREEN}Running from project directory: $PROJECT_DIR${NC}"
elif [ -d "$SCRIPT_DIR/ReactNativeSocialNetworkApp" ]; then
    # In parent directory, need to navigate to ReactNativeSocialNetworkApp
    PROJECT_DIR="$SCRIPT_DIR/ReactNativeSocialNetworkApp"
    cd "$PROJECT_DIR"
    echo -e "${GREEN}Navigated to project directory: $PROJECT_DIR${NC}"
else
    echo -e "${RED}Error: Cannot find ReactNativeSocialNetworkApp directory${NC}"
    echo -e "${RED}Please run this script from either:${NC}"
    echo -e "${RED}  1. The react-native-social-network-app root directory${NC}"
    echo -e "${RED}  2. The ReactNativeSocialNetworkApp subdirectory${NC}"
    exit 1
fi
echo ""

echo -e "${BLUE}Step 1: Setting Node version to 22${NC}"
fnm use 22 || {
    echo -e "${RED}Error: Failed to set Node version. Is fnm installed?${NC}"
    exit 1
}

echo ""
echo -e "${BLUE}Step 2: Killing existing Metro bundler processes${NC}"
pkill -f "node.*react-native.*start" || true
pkill -f "Metro" || true
sleep 2

echo ""
echo -e "${BLUE}Step 3: Cleaning iOS build artifacts${NC}"
cd ios
rm -rf build/
rm -rf Pods/
rm -rf ~/Library/Developer/Xcode/DerivedData/*Instamobile* || true
cd ..

echo ""
echo -e "${BLUE}Step 4: Installing CocoaPods dependencies${NC}"
cd ios
pod install
cd ..

echo ""
echo -e "${BLUE}Step 5: Starting Metro bundler in background${NC}"
yarn start --reset-cache > /tmp/metro.log 2>&1 &
METRO_PID=$!
echo -e "${GREEN}Metro bundler started (PID: $METRO_PID)${NC}"
echo "Metro logs: /tmp/metro.log"

echo ""
echo -e "${BLUE}Step 6: Waiting for Metro to initialize (10 seconds)${NC}"
sleep 10

echo ""
echo -e "${BLUE}Step 7: Opening iOS Simulator${NC}"
open -a Simulator

echo ""
echo -e "${BLUE}Step 8: Building and launching app on iPhone 17 Pro${NC}"
echo -e "${YELLOW}This will take 2-5 minutes...${NC}"
cd ios
xcodebuild \
  -workspace Instamobile.xcworkspace \
  -scheme Instamobile \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  build
cd ..

echo ""
echo -e "${BLUE}Step 9: Installing app on simulator${NC}"
xcrun simctl install booted ios/build/Debug-iphonesimulator/Instamobile.app

echo ""
echo -e "${BLUE}Step 10: Launching app${NC}"
xcrun simctl launch booted com.learningscience.letsmakemusic

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}Build and launch complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "Bundle ID: ${BLUE}com.learningscience.letsmakemusic${NC}"
echo -e "Metro PID: ${BLUE}$METRO_PID${NC}"
echo -e "Metro logs: ${BLUE}/tmp/metro.log${NC}"
echo ""
echo -e "${YELLOW}To stop Metro bundler: kill $METRO_PID${NC}"
echo -e "${YELLOW}To view Metro logs: tail -f /tmp/metro.log${NC}"
echo ""
