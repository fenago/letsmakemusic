const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

const db = admin.firestore()

const postsRef = db.collection('posts')
const hashtagsRef = db.collection('hashtags')
const socialFeedsRef = db.collection('social_feeds')
const socialGraphRef = db.collection('social_graph')
const usersRef = db.collection('users')

const userClient = require('../core/user')
const { fetchUser } = userClient

const collectionsUtils = require('../core/collections')
const { add, remove, getList, getDoc, getCount } = collectionsUtils

// Helper function to extract hashtags from post text
const extractHashtags = text => {
  if (!text) return []
  const hashtagRegex = /#(\w+)/g
  const matches = text.match(hashtagRegex)
  return matches ? matches.map(tag => tag.toLowerCase()) : []
}

// Helper function to hydrate home feeds for all friends
const hydrateFeedsForAllFriends = async (authorID, postData) => {
  console.log(`Hydrating feeds for post ${postData.id} by author ${authorID}`)

  // Get all inbound friendships (people who follow the author)
  const inboundSnapshot = await socialGraphRef
    .doc(authorID)
    .collection('inbound_users')
    .get()

  if (inboundSnapshot?.docs?.length > 0) {
    const promises = inboundSnapshot.docs.map(async doc => {
      const friendID = doc.id
      try {
        // Add post to friend's home feed
        await add(socialFeedsRef.doc(friendID), 'home_feed', postData, true)
        console.log(`Added post to home feed of user ${friendID}`)
      } catch (error) {
        console.error(
          `Error adding post to home feed of user ${friendID}:`,
          error,
        )
      }
    })

    await Promise.all(promises)
  }

  // Also add to author's own home feed
  try {
    await add(socialFeedsRef.doc(authorID), 'home_feed', postData, true)
    console.log(`Added post to author's own home feed`)
  } catch (error) {
    console.error(`Error adding post to author's own home feed:`, error)
  }
}

// Helper function to hydrate stories feed for all friends
const hydrateStoriesForAllFriends = async (authorID, storyData) => {
  console.log(`Hydrating stories for story ${storyData.id} by author ${authorID}`)

  // Get all inbound friendships (people who follow the author)
  const inboundSnapshot = await socialGraphRef
    .doc(authorID)
    .collection('inbound_users')
    .get()

  if (inboundSnapshot?.docs?.length > 0) {
    const promises = inboundSnapshot.docs.map(async doc => {
      const friendID = doc.id
      try {
        // Add story to friend's stories feed
        await add(socialFeedsRef.doc(friendID), 'stories_feed', storyData, true)
        console.log(`Added story to stories feed of user ${friendID}`)
      } catch (error) {
        console.error(
          `Error adding story to stories feed of user ${friendID}:`,
          error,
        )
      }
    })

    await Promise.all(promises)
  }

  // Also add to author's own stories feed
  try {
    await add(socialFeedsRef.doc(authorID), 'stories_feed', storyData, true)
    console.log(`Added story to author's own stories feed`)
  } catch (error) {
    console.error(`Error adding story to author's own stories feed:`, error)
  }
}

// Helper function to remove post from all friends' feeds
const removePostFromAllFeeds = async (authorID, postID) => {
  console.log(`Removing post ${postID} from all feeds`)

  // Get all inbound friendships
  const inboundSnapshot = await socialGraphRef
    .doc(authorID)
    .collection('inbound_users')
    .get()

  if (inboundSnapshot?.docs?.length > 0) {
    const promises = inboundSnapshot.docs.map(async doc => {
      const friendID = doc.id
      try {
        await remove(socialFeedsRef.doc(friendID), 'home_feed', postID, true)
        console.log(`Removed post from home feed of user ${friendID}`)
      } catch (error) {
        console.error(
          `Error removing post from home feed of user ${friendID}:`,
          error,
        )
      }
    })

    await Promise.all(promises)
  }

  // Also remove from author's own feed
  try {
    await remove(socialFeedsRef.doc(authorID), 'home_feed', postID, true)
  } catch (error) {
    console.error(`Error removing post from author's own feed:`, error)
  }
}

// Add Post Function
exports.addPost = functions.https.onCall(async (data, context) => {
  console.log('Adding post:')
  console.log(JSON.stringify(data))

  const { authorID, postData } = data

  if (!authorID || !postData) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Fetch author data
    const author = await fetchUser(authorID)
    if (!author) {
      return { success: false, error: 'Author not found' }
    }

    // Create post document
    const postID = postData.id || uuidv4()
    const timestamp = Math.floor(new Date().getTime() / 1000)

    const post = {
      id: postID,
      authorID: authorID,
      postText: postData.postText || '',
      postMedia: postData.postMedia || [],
      location: postData.location || null,
      createdAt: timestamp,
      reactionsCount: 0,
      reactions: {
        like: [],
        love: [],
        laugh: [],
        angry: [],
        surprised: [],
        cry: [],
        sad: [],
      },
      commentsCount: 0,
      author: {
        id: author.id,
        firstName: author.firstName || '',
        lastName: author.lastName || '',
        profilePictureURL: author.profilePictureURL || '',
        username: author.username || '',
      },
    }

    // Save post to posts collection
    await postsRef.doc(postID).set(post)
    console.log(`Post saved to posts collection: ${postID}`)

    // Add to author's profile feed
    await add(socialFeedsRef.doc(authorID), 'profile_feed', post, true)
    console.log(`Post added to author's profile feed`)

    // Add to main_feed collection for the author
    await socialFeedsRef.doc(authorID).collection('main_feed').doc(postID).set(post)
    console.log(`Post added to author's main feed`)

    // Hydrate home feeds for all friends
    await hydrateFeedsForAllFriends(authorID, post)

    // Extract and index hashtags
    const hashtags = extractHashtags(postData.postText)
    if (hashtags.length > 0) {
      const hashtagPromises = hashtags.map(async hashtag => {
        try {
          await add(hashtagsRef.doc(hashtag), 'feed', post, true)
          console.log(`Post indexed under hashtag: ${hashtag}`)
        } catch (error) {
          console.error(`Error indexing hashtag ${hashtag}:`, error)
        }
      })
      await Promise.all(hashtagPromises)
    }

    return { success: true, post }
  } catch (error) {
    console.error('Error adding post:', error)
    return { success: false, error: error.message }
  }
})

// Delete Post Function
exports.deletePost = functions.https.onCall(async (data, context) => {
  console.log('Deleting post:')
  console.log(JSON.stringify(data))

  const { postID, authorID } = data

  if (!postID || !authorID) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Verify post exists and belongs to author
    const postDoc = await postsRef.doc(postID).get()
    if (!postDoc.exists) {
      return { success: false, error: 'Post not found' }
    }

    const postData = postDoc.data()
    if (postData.authorID !== authorID) {
      return { success: false, error: 'Unauthorized' }
    }

    // Delete from posts collection
    await postsRef.doc(postID).delete()
    console.log(`Post deleted from posts collection: ${postID}`)

    // Remove from author's profile feed
    await remove(socialFeedsRef.doc(authorID), 'profile_feed', postID, true)
    console.log(`Post removed from author's profile feed`)

    // Remove from author's main_feed
    await socialFeedsRef
      .doc(authorID)
      .collection('main_feed')
      .doc(postID)
      .delete()

    // Remove from all friends' home feeds
    await removePostFromAllFeeds(authorID, postID)

    // Remove from hashtag indexes
    const hashtags = extractHashtags(postData.postText)
    if (hashtags.length > 0) {
      const hashtagPromises = hashtags.map(async hashtag => {
        try {
          await remove(hashtagsRef.doc(hashtag), 'feed', postID, true)
          console.log(`Post removed from hashtag: ${hashtag}`)
        } catch (error) {
          console.error(`Error removing from hashtag ${hashtag}:`, error)
        }
      })
      await Promise.all(hashtagPromises)
    }

    // Delete all comments
    const commentsLiveSnapshot = await postsRef
      .doc(postID)
      .collection('comments_live')
      .get()
    const commentsHistoricalSnapshot = await postsRef
      .doc(postID)
      .collection('comments_historical')
      .get()

    const deleteCommentsPromises = []
    commentsLiveSnapshot?.docs?.forEach(doc => {
      deleteCommentsPromises.push(doc.ref.delete())
    })
    commentsHistoricalSnapshot?.docs?.forEach(doc => {
      deleteCommentsPromises.push(doc.ref.delete())
    })
    await Promise.all(deleteCommentsPromises)

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: error.message }
  }
})

// Add Story Function
exports.addStory = functions.https.onCall(async (data, context) => {
  console.log('Adding story:')
  console.log(JSON.stringify(data))

  const { authorID, storyData } = data

  if (!authorID || !storyData) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Fetch author data
    const author = await fetchUser(authorID)
    if (!author) {
      return { success: false, error: 'Author not found' }
    }

    // Create story document
    const storyID = storyData.id || uuidv4()
    const timestamp = Math.floor(new Date().getTime() / 1000)

    const story = {
      id: storyID,
      authorID: authorID,
      storyType: storyData.storyType || 'photo',
      storyMediaURL: storyData.storyMediaURL || '',
      createdAt: timestamp,
      expiresAt: timestamp + 86400, // 24 hours
      views: [],
      viewsCount: 0,
      reactions: [],
      reactionsCount: 0,
      author: {
        id: author.id,
        firstName: author.firstName || '',
        lastName: author.lastName || '',
        profilePictureURL: author.profilePictureURL || '',
        username: author.username || '',
      },
    }

    // Save story (we don't have a dedicated stories collection, so we use the stories_feed)
    // Note: Stories are typically only stored in feeds, not in a separate collection

    // Hydrate stories feeds for all friends
    await hydrateStoriesForAllFriends(authorID, story)

    return { success: true, story }
  } catch (error) {
    console.error('Error adding story:', error)
    return { success: false, error: error.message }
  }
})

// Add Story Reaction Function
exports.addStoryReaction = functions.https.onCall(async (data, context) => {
  console.log('Adding story reaction:')
  console.log(JSON.stringify(data))

  const { userID, storyID } = data

  if (!userID || !storyID) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Fetch user data
    const user = await fetchUser(userID)
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Find the story in the user's stories feed
    const storyDoc = await getDoc(socialFeedsRef.doc(userID), 'stories_feed', storyID)

    if (!storyDoc || !storyDoc.exists) {
      return { success: false, error: 'Story not found' }
    }

    const story = storyDoc.data()
    const authorID = story.authorID

    // Update story reactions in author's feed
    const authorStoryDoc = await getDoc(socialFeedsRef.doc(authorID), 'stories_feed', storyID)

    if (authorStoryDoc && authorStoryDoc.exists) {
      const authorStory = authorStoryDoc.data()
      const reactions = authorStory.reactions || []

      // Check if user already reacted
      if (!reactions.includes(userID)) {
        const updatedReactions = [...reactions, userID]
        const updatedStory = {
          ...authorStory,
          reactions: updatedReactions,
          reactionsCount: updatedReactions.length,
        }

        // Update in author's stories feed
        await add(socialFeedsRef.doc(authorID), 'stories_feed', updatedStory, true)

        // Also update the story in the user's own feed
        await add(socialFeedsRef.doc(userID), 'stories_feed', updatedStory, true)

        return { success: true, story: updatedStory }
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding story reaction:', error)
    return { success: false, error: error.message }
  }
})

// List Stories Function
exports.listStories = functions.https.onCall(async (data, context) => {
  console.log('Listing stories:')
  console.log(JSON.stringify(data))

  const { userID, page = 0, size = 1000 } = data

  if (!userID) {
    return { success: false, error: 'Missing userID' }
  }

  try {
    const stories = await getList(
      socialFeedsRef.doc(userID),
      'stories_feed',
      page,
      size,
      true,
    )

    // Filter out expired stories
    const currentTime = Math.floor(new Date().getTime() / 1000)
    const validStories = stories?.filter(
      story => !story.expiresAt || story.expiresAt > currentTime,
    )

    return { success: true, stories: validStories || [] }
  } catch (error) {
    console.error('Error listing stories:', error)
    return { success: false, error: error.message, stories: [] }
  }
})

// List Home Feed Posts Function
exports.listHomeFeedPosts = functions.https.onCall(async (data, context) => {
  console.log('Listing home feed posts:')
  console.log(JSON.stringify(data))

  const { userID, page = 0, size = 1000 } = data

  if (!userID) {
    return { success: false, error: 'Missing userID' }
  }

  try {
    const posts = await getList(
      socialFeedsRef.doc(userID),
      'home_feed',
      page,
      size,
      true,
    )

    return { success: true, posts: posts || [] }
  } catch (error) {
    console.error('Error listing home feed posts:', error)
    return { success: false, error: error.message, posts: [] }
  }
})

// Add Reaction Function
exports.addReaction = functions.https.onCall(async (data, context) => {
  console.log('Adding reaction to post:')
  console.log(JSON.stringify(data))

  const reactionKeys = [
    'like',
    'love',
    'laugh',
    'angry',
    'surprised',
    'cry',
    'sad',
  ]

  const { authorID, postID, reaction } = data

  if (!postID || !authorID || !reaction) {
    return { success: false, error: 'Missing required fields' }
  }

  if (!reactionKeys.includes(reaction)) {
    return { success: false, error: 'Invalid reaction type' }
  }

  try {
    const postDoc = await postsRef.doc(postID).get()
    if (!postDoc.exists) {
      return { success: false, error: 'Post not found' }
    }

    const post = postDoc.data()
    const postReactionsDict = post?.reactions
      ? post?.reactions
      : reactionKeys.reduce(
          (a, v) => ({
            ...a,
            [v]: [],
          }),
          {},
        )

    var newPostReactionsDict = {}
    var reactionsCount = post?.reactionsCount ? post?.reactionsCount : 0

    // Check if user already reacted
    const userReactionKey = reactionKeys?.find(
      key =>
        postReactionsDict[key] && postReactionsDict[key]?.includes(authorID),
    )

    if (userReactionKey) {
      // User already had a reaction on this post
      if (userReactionKey === reaction) {
        // Same reaction, so we remove it
        newPostReactionsDict = { ...postReactionsDict }
        newPostReactionsDict[userReactionKey] = postReactionsDict[
          userReactionKey
        ].filter(id => id !== authorID)
        reactionsCount = Math.max(0, reactionsCount - 1)
      } else {
        // Different reaction, so we replace it
        newPostReactionsDict = { ...postReactionsDict }
        newPostReactionsDict[userReactionKey] = postReactionsDict[
          userReactionKey
        ].filter(id => id !== authorID)
        newPostReactionsDict[reaction] = [
          ...newPostReactionsDict[reaction],
          authorID,
        ]
      }
    } else {
      // User had no reaction, so we add it
      newPostReactionsDict = { ...postReactionsDict }
      newPostReactionsDict[reaction] = [
        ...newPostReactionsDict[reaction],
        authorID,
      ]
      reactionsCount = reactionsCount + 1
    }

    const updatedPost = {
      ...post,
      reactions: newPostReactionsDict,
      reactionsCount,
    }

    // Update the post in the posts collection
    await postsRef.doc(postID).set(updatedPost, { merge: true })

    return { success: true, post: updatedPost }
  } catch (error) {
    console.error('Error adding reaction:', error)
    return { success: false, error: error.message }
  }
})

// Add Comment Function
exports.addComment = functions.https.onCall(async (data, context) => {
  console.log('Adding comment:')
  console.log(JSON.stringify(data))

  const { authorID, commentText, postID } = data

  if (!authorID || !commentText || !postID) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Verify post exists
    const postDoc = await postsRef.doc(postID).get()
    if (!postDoc.exists) {
      return { success: false, error: 'Post not found' }
    }

    // Fetch author data
    const author = await fetchUser(authorID)
    if (!author) {
      return { success: false, error: 'Author not found' }
    }

    // Create comment
    const commentID = uuidv4()
    const timestamp = Math.floor(new Date().getTime() / 1000)

    const comment = {
      id: commentID,
      postID: postID,
      authorID: authorID,
      commentText: commentText,
      createdAt: timestamp,
      author: {
        id: author.id,
        firstName: author.firstName || '',
        lastName: author.lastName || '',
        profilePictureURL: author.profilePictureURL || '',
        username: author.username || '',
      },
    }

    // Add comment to post's comments collection
    await add(postsRef.doc(postID), 'comments', comment, true)

    // Update post's comments count
    const post = postDoc.data()
    const commentsCount = (post.commentsCount || 0) + 1
    await postsRef.doc(postID).set({ commentsCount }, { merge: true })

    return { success: true, comment }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { success: false, error: error.message }
  }
})

// List Comments Function
exports.listComments = functions.https.onCall(async (data, context) => {
  console.log('Listing comments:')
  console.log(JSON.stringify(data))

  const { postID, page = 0, size = 1000 } = data

  if (!postID) {
    return { success: false, error: 'Missing postID' }
  }

  try {
    const comments = await getList(
      postsRef.doc(postID),
      'comments',
      page,
      size,
      true,
    )

    return { success: true, comments: comments || [] }
  } catch (error) {
    console.error('Error listing comments:', error)
    return { success: false, error: error.message, comments: [] }
  }
})

// List Discover Feed Posts Function
exports.listDiscoverFeedPosts = functions.https.onCall(async (data, context) => {
  console.log('Listing discover feed posts:')
  console.log(JSON.stringify(data))

  const { userID, page = 0, size = 20 } = data

  if (!userID) {
    return { success: false, error: 'Missing userID' }
  }

  try {
    // Get posts from all users ordered by creation date
    // This is a simplified version - in production, you'd want more sophisticated
    // recommendation algorithms
    const snapshot = await postsRef
      .orderBy('createdAt', 'desc')
      .limit(size)
      .offset(page * size)
      .get()

    const posts = snapshot?.docs?.map(doc => doc.data()) || []

    return { success: true, posts }
  } catch (error) {
    console.error('Error listing discover feed posts:', error)
    return { success: false, error: error.message, posts: [] }
  }
})

// List Hashtag Feed Posts Function
exports.listHashtagFeedPosts = functions.https.onCall(async (data, context) => {
  console.log('Listing hashtag feed posts:')
  console.log(JSON.stringify(data))

  const { userID, hashtag, page = 0, size = 1000 } = data

  if (!hashtag) {
    return { success: false, error: 'Missing hashtag' }
  }

  try {
    // Normalize hashtag (remove # if present and make lowercase)
    const normalizedHashtag = hashtag.replace('#', '').toLowerCase()

    const posts = await getList(
      hashtagsRef.doc(normalizedHashtag),
      'feed',
      page,
      size,
      true,
    )

    return { success: true, posts: posts || [] }
  } catch (error) {
    console.error('Error listing hashtag feed posts:', error)
    return { success: false, error: error.message, posts: [] }
  }
})

// List Profile Feed Posts Function
exports.listProfileFeedPosts = functions.https.onCall(async (data, context) => {
  console.log('Listing profile feed posts:')
  console.log(JSON.stringify(data))

  const { userID, page = 0, size = 1000 } = data

  if (!userID) {
    return { success: false, error: 'Missing userID' }
  }

  try {
    const posts = await getList(
      socialFeedsRef.doc(userID),
      'profile_feed',
      page,
      size,
      true,
    )

    return { success: true, posts: posts || [] }
  } catch (error) {
    console.error('Error listing profile feed posts:', error)
    return { success: false, error: error.message, posts: [] }
  }
})

// Fetch Profile Function
exports.fetchProfile = functions.https.onCall(async (data, context) => {
  console.log('Fetching profile:')
  console.log(JSON.stringify(data))

  const { profileID, viewerID } = data

  if (!profileID) {
    return { success: false, error: 'Missing profileID' }
  }

  try {
    // Fetch user data
    const user = await fetchUser(profileID)
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Get posts count
    const postsCount = await getCount(
      socialFeedsRef.doc(profileID),
      'profile_feed',
    )

    // Get followers count (inbound friendships)
    const inboundSnapshot = await socialGraphRef
      .doc(profileID)
      .collection('inbound_users')
      .get()
    const followersCount = inboundSnapshot?.docs?.length || 0

    // Get following count (outbound friendships)
    const outboundSnapshot = await socialGraphRef
      .doc(profileID)
      .collection('outbound_users')
      .get()
    const followingCount = outboundSnapshot?.docs?.length || 0

    // Check if viewer is following this profile (if viewerID provided)
    let isFollowing = false
    if (viewerID && viewerID !== profileID) {
      const friendshipDoc = await socialGraphRef
        .doc(viewerID)
        .collection('outbound_users')
        .doc(profileID)
        .get()
      isFollowing = friendshipDoc.exists
    }

    const profileData = {
      ...user,
      postsCount,
      followersCount,
      followingCount,
      isFollowing,
    }

    return { success: true, profileData }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return { success: false, error: error.message }
  }
})
