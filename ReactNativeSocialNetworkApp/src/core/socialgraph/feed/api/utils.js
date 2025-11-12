export const hydratePostsWithMyReactions = (posts, userID) => {
  return posts?.map(post => {
    const myReaction = getMyReaction(post.reactions, userID)
    const reactionsCount = getReactionsCount(post.reactions)
    console.log('[HYDRATE] Post ID:', post.id, 'reactions:', post.reactions, 'reactionsCount:', reactionsCount, 'myReaction:', myReaction)
    return { ...post, myReaction, reactionsCount }
  })
}

export const hydrateSinglePostWithMyReaction = (post, userID) => {
  const myReaction = getMyReaction(post.reactions, userID)
  const reactionsCount = getReactionsCount(post.reactions)
  return { ...post, myReaction, reactionsCount }
}

const getMyReaction = (reactionsDict, userID) => {
  const reactionKeys = [
    'like',
    'love',
    'laugh',
    'angry',
    'suprised',
    'cry',
    'sad',
  ]
  var result = null
  reactionKeys.forEach(reactionKey => {
    if (
      reactionsDict &&
      reactionsDict[reactionKey] &&
      reactionsDict[reactionKey].includes(userID)
    ) {
      result = reactionKey
    }
  })

  return result
}

const getReactionsCount = (reactionsDict) => {
  if (!reactionsDict) {
    return 0
  }
  const reactionKeys = [
    'like',
    'love',
    'laugh',
    'angry',
    'suprised',
    'cry',
    'sad',
  ]
  let totalCount = 0
  reactionKeys.forEach(reactionKey => {
    if (reactionsDict[reactionKey] && Array.isArray(reactionsDict[reactionKey])) {
      totalCount += reactionsDict[reactionKey].length
    }
  })
  return totalCount
}
