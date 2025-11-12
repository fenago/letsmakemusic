import { useRef } from 'react'
import { addReaction as addReactionAPI } from './firebaseFeedClient'

export const useReactions = setPosts => {
  const inFlightReactionRequest = useRef(false)

  const handleFeedReaction = async (post, reactionType, author) => {
    console.log('[REACTION] handleFeedReaction called with:', {
      postID: post.id,
      reactionType,
      currentMyReaction: post.myReaction,
      currentReactionsCount: post.reactionsCount,
    })

    if (inFlightReactionRequest.current === true) {
      // we already have a reaction request in flight so we don't trigger another one
      console.log('[REACTION] Request already in flight, ignoring')
      return
    }
    inFlightReactionRequest.current = true

    // Store original state for potential rollback
    const originalMyReaction = post.myReaction
    const originalReactionsCount = post.reactionsCount

    // We first update the UI optimistically, so the app feels fast - compute the new reaction
    // reactionType null means we want to REMOVE the reaction
    // reactionType non-null means we want to ADD or CHANGE the reaction
    const shouldRemove = reactionType === null
    console.log('[REACTION] Decision:', shouldRemove ? 'REMOVE' : 'ADD/CHANGE', {
      reactionType,
      'post.myReaction': post.myReaction,
    })

    if (shouldRemove) {
      // we want to remove the reaction (user clicked their existing reaction to toggle it off)
      setPosts(oldPosts => {
        return oldPosts?.map(oldPost => {
          if (oldPost.id === post.id) {
            return {
              ...oldPost,
              myReaction: null,
              reactionsCount: Math.max(0, oldPost.reactionsCount - 1),
            }
          }
          return oldPost
        })
      })
    } else {
      // we want to add or change the reaction
      const reactionsCount = post.myReaction
        ? post.reactionsCount // changing reaction, count stays same
        : post.reactionsCount + 1 // adding new reaction, count increases
      setPosts(oldPosts => {
        return oldPosts?.map(oldPost => {
          if (oldPost.id === post.id) {
            return { ...oldPost, myReaction: reactionType, reactionsCount }
          }
          return oldPost
        })
      })
    }

    // Then we send the reaction to the server
    try {
      // Determine what reaction to send to the server
      // If reactionType is provided, use it
      // If reactionType is null and we had a reaction, we're removing it - send the current reaction to toggle it off
      // If reactionType is null and we had no reaction, this shouldn't happen (defensive)
      const reactionToSend = reactionType || post.myReaction || 'like'

      console.log('[REACTION] Calling addReaction API:', {
        postID: post.id,
        authorID: author.id,
        reactionType: reactionToSend,
        originalMyReaction: originalMyReaction,
        requestedReactionType: reactionType,
      })

      const res = await addReactionAPI(
        post.id,
        author.id,
        reactionToSend,
      )

      console.log('[REACTION] Success! Response:', res)
      inFlightReactionRequest.current = false
      return res
    } catch (error) {
      console.error('[REACTION] ERROR - Failed to save reaction to database:', error)
      console.error('[REACTION] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })

      // Roll back the optimistic update since it failed
      setPosts(oldPosts => {
        return oldPosts?.map(oldPost => {
          if (oldPost.id === post.id) {
            return {
              ...oldPost,
              myReaction: originalMyReaction,
              reactionsCount: originalReactionsCount,
            }
          }
          return oldPost
        })
      })

      inFlightReactionRequest.current = false
      return null
    }
  }

  const handleSinglePostReaction = async (post, reactionType, author) => {
    if (inFlightReactionRequest.current === true) {
      // we already have a reaction request in flight so we don't trigger another one
      return
    }
    inFlightReactionRequest.current = true

    // Store original state for potential rollback
    const originalMyReaction = post.myReaction
    const originalReactionsCount = post.reactionsCount

    // We first update the UI optimistically, so the app feels fast - compute the new reaction
    // reactionType null means we want to REMOVE the reaction
    // reactionType non-null means we want to ADD or CHANGE the reaction
    if (reactionType === null || (post.myReaction && post.myReaction === reactionType)) {
      // we want to remove the reaction (user clicked same reaction again, or explicitly passed null)
      setPosts(oldPost => ({
        ...oldPost,
        myReaction: null,
        reactionsCount: Math.max(0, oldPost.reactionsCount - 1),
      }))
    } else {
      // we want to add or change the reaction
      const reactionsCount = post.myReaction
        ? post.reactionsCount // changing reaction, count stays same
        : post.reactionsCount + 1 // adding new reaction, count increases
      setPosts(oldPost => ({
        ...oldPost,
        myReaction: reactionType,
        reactionsCount,
      }))
    }

    // Then we send the reaction to the server
    try {
      // Determine what reaction to send to the server
      // If reactionType is provided, use it
      // If reactionType is null and we had a reaction, we're removing it - send the current reaction to toggle it off
      // If reactionType is null and we had no reaction, this shouldn't happen (defensive)
      const reactionToSend = reactionType || post.myReaction || 'like'

      console.log('[REACTION] (Single Post) Calling addReaction API:', {
        postID: post.id,
        authorID: author.id,
        reactionType: reactionToSend,
        originalMyReaction: originalMyReaction,
        requestedReactionType: reactionType,
      })

      const res = await addReactionAPI(
        post.id,
        author.id,
        reactionToSend,
      )

      console.log('[REACTION] (Single Post) Success! Response:', res)
      inFlightReactionRequest.current = false
      return res
    } catch (error) {
      console.error('[REACTION] (Single Post) ERROR - Failed to save reaction:', error)
      console.error('[REACTION] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
      })

      // Roll back the optimistic update since it failed
      setPosts(oldPost => ({
        ...oldPost,
        myReaction: originalMyReaction,
        reactionsCount: originalReactionsCount,
      }))

      inFlightReactionRequest.current = false
      return null
    }
  }

  return {
    handleFeedReaction,
    handleSinglePostReaction,
  }
}
