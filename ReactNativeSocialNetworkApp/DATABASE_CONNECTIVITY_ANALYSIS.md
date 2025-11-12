# Database Connectivity Analysis

**Project:** React Native Social Network App
**Database:** Firebase Firestore (`teachingandlearningwithai`)
**Date:** 2025-11-11

## Summary

**ISSUE IDENTIFIED:** The app relies on Firebase Cloud Functions for critical operations (likes, reactions, posts, comments), but these functions may not be deployed or properly configured.

---

## Database Configuration

### Firebase Project
- **Project ID:** `teachingandlearningwithai`
- **Region:** us-central1 (based on uploadMedia function URL)
- **Configuration File:** `src/core/firebase/config.js`

```javascript
// Firebase is properly configured
import fauth from '@react-native-firebase/auth'
import ffirestore from '@react-native-firebase/firestore'
import ffunctions from '@react-native-firebase/functions'

export const db = ffirestore()
export const auth = fauth
export const firestore = ffirestore
export const functions = ffunctions
```

**Status:** ✅ Firebase SDK is correctly configured

---

## Critical Dependency: Firebase Cloud Functions

### Problem: All write operations depend on Cloud Functions

The app architecture uses Cloud Functions for ALL data modifications:

1. **Reactions/Likes** → `addReaction` cloud function
2. **Comments** → `addComment` cloud function
3. **Posts** → `addPost` cloud function
4. **Stories** → `addStory` cloud function
5. **Profile Updates** → likely cloud function based

### Function Definitions

Located in: `src/core/socialgraph/feed/api/firebase/feedRef.js`

```javascript
export const FeedFunctions = () => {
  return {
    addPost: functions().httpsCallable('addPost'),
    deletePost: functions().httpsCallable('deletePost'),
    addStory: functions().httpsCallable('addStory'),
    addStoryReaction: functions().httpsCallable('addStoryReaction'),
    listStories: functions().httpsCallable('listStories'),
    listHomeFeedPosts: functions().httpsCallable('listHomeFeedPosts'),
    addReaction: functions().httpsCallable('addReaction'),      // ← LIKES
    addComment: functions().httpsCallable('addComment'),
    listComments: functions().httpsCallable('listComments'),
    listDiscoverFeedPosts: functions().httpsCallable('listDiscoverFeedPosts'),
    listHashtagFeedPosts: functions().httpsCallable('listHashtagFeedPosts'),
    listProfileFeedPosts: functions().httpsCallable('listProfileFeedPosts'),
    fetchProfile: functions().httpsCallable('fetchProfile'),
  }
}
```

---

## How Reactions (Likes) Work

### Flow:

1. **User clicks thumbs up** → `FeedItem.js:73` (`onReactionPress`)
2. **Calls** `onReaction` prop from parent
3. **Parent (FeedScreen)** calls → `useHomeFeedPosts.addReaction()`
4. **Hook** calls → `useReactions.handleFeedReaction()`
5. **Updates UI optimistically** (lines 15-47 in `useReactions.js`)
   - Changes icon color immediately
   - Updates reaction count locally
6. **Calls Firebase Function** → `addReactionAPI(postID, authorID, reaction)`
7. **Firebase Function** should:
   - Update `posts/{postID}` document
   - Add/remove reaction from `posts/{postID}/reactions/{authorID}`
   - Update reaction counts
   - Trigger listeners to sync data

### Identified Issues:

#### Issue #1: Firebase Functions Not Deployed ❌

**Location:** `useReactions.js:50-54`

```javascript
// Then we send the reaction to the server
const res = await addReactionAPI(
  post.id,
  author.id,
  reactionType ? reactionType : post.myReaction,
)
// TOOO: handle error case  ← NOTE THE TYPO AND NO ERROR HANDLING!
```

**Problems:**
1. No error handling - if function fails, user never knows
2. UI shows optimistic update (blue thumbs up) but database never persists
3. No retry logic
4. No feedback to user if function call fails

#### Issue #2: Optimistic Updates Without Rollback ⚠️

The code updates the UI immediately (optimistic update) but doesn't roll back if the API call fails:

```javascript
// Lines 20-31: Updates UI first
setPosts(oldPosts => {
  return oldPosts?.map(oldPost => {
    if (oldPost.id === post.id) {
      return {
        ...oldPost,
        myReaction: null,
        reactionsCount: oldPost.reactionsCount - 1,
      }
    }
    return oldPost
  })
})

// Lines 50-54: Then calls API (but doesn't handle failure)
const res = await addReactionAPI(...)
// No rollback if this fails!
```

**Result:** User sees reaction persist in UI, but it's not saved to database.

---

## Database Connectivity Check

### ✅ Working (Read Operations)

These use Firestore listeners directly - NO cloud functions needed:

1. **Feed Posts** → `subscribeToHomeFeedPosts` (`firebaseFeedClient.js:59`)
   ```javascript
   return DocRef(userID)
     .homeFeedLive.orderBy('createdAt', 'desc')
     .onSnapshot(...)
   ```

2. **Comments** → `subscribeToComments` (`firebaseFeedClient.js:157`)
3. **Stories** → `subscribeToStories` (`firebaseFeedClient.js:93`)
4. **Single Post** → `subscribeToSinglePost` (`firebaseFeedClient.js:191`)

**Status:** ✅ These work because they're direct Firestore reads

### ❌ Broken (Write Operations)

These ALL require Cloud Functions to be deployed:

1. **addReaction** - Likes/reactions
2. **addComment** - Comments
3. **addPost** - Creating posts
4. **addStory** - Creating stories
5. **deletePost** - Deleting posts

**Status:** ❌ These fail silently if functions aren't deployed

---

## Profile Picture Issue

### Likely Cause: Same Pattern

Profile updates likely use a similar cloud function pattern. Need to check:

```bash
grep -r "updateProfile\|uploadProfilePicture" src/
```

Expected pattern:
- Uses cloud function for profile updates
- Same silent failure issue

---

## Required Fixes

### Priority 1: Deploy Firebase Functions ⭐⭐⭐

**Location:** `/firebase/functions/`

**Action Required:**
```bash
cd /path/to/firebase/functions
firebase deploy --only functions
```

**Functions that MUST be deployed:**
- `addReaction`
- `addComment`
- `addPost`
- `deletePost`
- `addStory`
- `addStoryReaction`
- `listHomeFeedPosts`
- `listStories`
- `listComments`
- `listDiscoverFeedPosts`
- `listHashtagFeedPosts`
- `listProfileFeedPosts`
- `fetchProfile`

### Priority 2: Add Error Handling

**File:** `src/core/socialgraph/feed/api/firebase/useReactions.js`

**Changes Needed:**
1. Add try/catch around `addReactionAPI`
2. Roll back optimistic update if API fails
3. Show user-friendly error message
4. Add retry logic

### Priority 3: Add Logging

Add console.error() when API calls fail so we can debug:

```javascript
const res = await addReactionAPI(post.id, author.id, reactionType)
if (!res) {
  console.error('Failed to add reaction to database')
  // Roll back UI changes
  // Show error to user
}
```

---

## Testing Checklist

After deploying functions:

- [ ] Click like button → verify it persists after navigation
- [ ] Add comment → verify it saves to database
- [ ] Create post → verify it appears in feed
- [ ] Upload profile picture → verify it persists
- [ ] Add story → verify it persists
- [ ] Check Firebase Console → verify data is being written

---

## Firestore Collections Used

```
posts/                              ← All posts
  {postID}/
    - authorID
    - text
    - media
    - reactionsCount
    - createdAt
    comments_live/                  ← Comments subcollection
      {commentID}/
    reactions/                      ← Reactions subcollection
      {userID}/

social_feeds/                       ← User-specific feeds
  {userID}/
    home_feed_live/                ← Posts in user's home feed
    stories_feed_live/             ← Stories in user's feed
    main_feed/                     ← Master feed
    profile_feed_live/             ← User's own posts

hashtags/                          ← Hashtag feeds
  {hashtag}/
    feed_live/

users/                             ← User profiles
  {userID}/
    - profilePictureURL
    - firstName
    - lastName
    - etc.
```

---

## Next Steps

1. **Verify Firebase Functions are deployed**
   ```bash
   firebase functions:list
   ```

2. **Deploy if missing**
   ```bash
   cd firebase/functions
   npm install
   firebase deploy --only functions
   ```

3. **Test in app** - Click like button and check Firebase Console

4. **Add error handling** to all mutation hooks

5. **Fix profile picture** issue using same approach

---

## Conclusion

**Root Cause:** Firebase Cloud Functions are likely not deployed or not working properly.

**Impact:**
- ❌ Likes/reactions appear to work but don't persist
- ❌ Comments may not save
- ❌ Profile updates may not save
- ✅ Reading data works fine (uses Firestore listeners)

**Solution:** Deploy Firebase Functions and add proper error handling.

