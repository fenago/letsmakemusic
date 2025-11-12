const admin = require('firebase-admin')
admin.initializeApp()

const triggers = require('./triggers')

const media = require('./media/upload')
exports.uploadMedia = media.uploadMedia


// user reporting
const userReporting = require('./user-reporting/user-reporting')
const { onReportWrite } = require('./user-reporting/triggers')
exports.fetchBlockedUsers = userReporting.fetchBlockedUsers
exports.markAbuse = userReporting.markAbuse
exports.unblockUser = userReporting.unblockUser
exports.onReportWrite = onReportWrite

// chat
const chat = require('./chat/chat')
exports.fetchMessagesOfFormerParticipant = chat.fetchMessagesOfFormerParticipant
exports.listMessages = chat.listMessages
exports.insertMessage = chat.insertMessage

exports.deleteMessage = chat.deleteMessage
exports.createChannel = chat.createChannel
exports.markAsRead = chat.markAsRead
exports.markUserAsTypingInChannel = chat.markUserAsTypingInChannel
exports.addMessageReaction = chat.addMessageReaction

exports.listChannels = chat.listChannels

// dating - REMOVED (this is a social network app, not a dating app)
// const datingRecommendation = require('./dating/recommendationTriggers')
// const datingSwipes = require('./dating/dating')
// exports.onDatingUserDataWrite = datingRecommendation.onUserDataWrite
// exports.onDatingUserRecommendationsUpdate =
//   datingRecommendation.onUserRecommendationsUpdate
// exports.addUserSwipe = datingSwipes.addUserSwipe
// exports.fetchMatches = datingSwipes.fetchMatches

// Production triggers
exports.propagateUserProfileUpdates = triggers.propagateUserProfileUpdates

// socialgraph - feed
const feed = require('./socialgraph/feed')
exports.addPost = feed.addPost
exports.deletePost = feed.deletePost
exports.addStory = feed.addStory
exports.addStoryReaction = feed.addStoryReaction
exports.listStories = feed.listStories
exports.listHomeFeedPosts = feed.listHomeFeedPosts
exports.addReaction = feed.addReaction
exports.addComment = feed.addComment
exports.listComments = feed.listComments
exports.listDiscoverFeedPosts = feed.listDiscoverFeedPosts
exports.listHashtagFeedPosts = feed.listHashtagFeedPosts
exports.listProfileFeedPosts = feed.listProfileFeedPosts
exports.fetchProfile = feed.fetchProfile

// const imageProcessing = require('./core/imageProcessing')
// exports.generateThumbnail = imageProcessing.generateThumbnail;


/* INSERT_FIREBASE_FUNCTION */

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });