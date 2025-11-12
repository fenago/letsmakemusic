# LetsMake.Music - Brand Analysis & Feature Mapping

**Version:** 1.0
**Date:** November 11, 2025
**Platform Concept:** "Spotify meets Instagram" for AI-powered music creation & social sharing

---

## Executive Summary

LetsMake.Music transforms the Instamobile React Native Social Network template into a music-first social platform powered by the Suno API. This document maps every base template feature to music-centric rebranding and identifies required database schema changes and cloud functions.

**Brand Voice:** Creative, Social, Confident
**Key Differentiator:** AI-powered music creation via Suno API (watermark-free, commercial-ready)
**Target User:** Creative individuals (like Alex, 27, graphic designer) who want to create music without technical barriers
**Core Actions:** Create, Share, Discover music

---

## Feature Mapping Table

| Feature | Base Template Description | LetsMake.Music Rebrand | DB/Cloud Function Needed? |
|---------|--------------------------|------------------------|---------------------------|
| **CORE SOCIAL FEATURES** |
| Stories | Add new stories, browse friends' stories, stories tray, interactive story viewer, disappearing after 24h, photo & video stories, story composer, story reactions, story grouping, delete story | **Music Stories**: Share AI-generated tracks or discoveries as 15-second audio clips with custom backgrounds, soundwave visualizations, album art overlays, and text stickers. Auto-generated visual templates featuring album colors. Disappears after 24h. | **DB:** Add `musicTrackId` field to stories schema to link to Suno-generated tracks. Add `audioClipUrl` field for 15-second previews. Add `visualTemplate` field for storing background style preference.<br>**Cloud Function:** `generateStoryPreview` - Takes full track, extracts 15-second clip, generates visual template from album art colors |
| Feeds | Home feed, explore feed, profile feed, comments feed, friends feed, stories feed with "crazy fast real-time feeds" | **The Feed**: Visual grid discovery engine showing album art, music posts, and video clips. Home feed shows followed creators' tracks. Explore feed algorithmically surfaces trending music. Profile feed displays user's created/shared tracks. All feeds optimized for music playback without leaving feed view. | **DB:** Add `trackMetadata` object to posts schema (title, artist, duration, genre, sunoTrackId). Add `playbackState` field to track currently playing item in feed. Add `waveformData` for visual audio display.<br>**Cloud Function:** `calculateTrendingScore` - Analyzes engagement metrics to populate explore feed. `generateWaveformData` - Creates visual waveform for each track |
| Posts | Text, photo and video formats, multi-photo support/carousel, location check-ins, hashtags, mentions, post composer, delete post, location picker, in-feed autoplay, mute/unmute videos | **Music Posts**: Primary format is a track post (single song with album art). Support for playlist posts (collection of tracks). Video posts for music videos. Genre tags replace general hashtags. Artist mentions. Post composer integrates Suno API creation flow. In-feed audio autoplay on scroll. Play/pause toggle. | **DB:** Add `postType` enum (track, playlist, musicVideo, textWithTrack). Add `sunoApiResponse` object storing full Suno metadata. Add `genreTags` array. Add `collaborators` array for featured artists. Add `isOriginalCreation` boolean.<br>**Cloud Function:** `processNewTrackPost` - Validates Suno track, extracts metadata, generates thumbnail. `syncPlaylistPosts` - Updates posts when playlists are modified |
| Reactions & Comments | Custom reactions, reactions tray, undo reaction, comment composer, comments feed, delete comment, inline counts, performance optimizations | **Vibes & Comments**: Music-themed emoji reactions (🔥 Fire, 🎧 Headphones, 🤯 Mind Blown, 🕺 Dance, ❤️‍🔥 Heart on Fire, 💎 Gem, 🌊 Wave, ⚡ Lightning). Reactions tray with springy animations. Timestamped comments that link to specific moments in a track. | **DB:** Add `reactionType` enum with music emojis. Add `timestamp` field to comments for track position references. Add `reactionCounts` object with breakdown by type.<br>**Cloud Function:** `updateReactionCounters` - Efficiently updates reaction totals. `linkTimestampedComment` - Validates timestamp is within track duration |
| **SOCIAL GRAPH & FRIENDSHIPS** |
| Social Graph Management | Social graph management, add new friend, send friend requests, decline/accept friend requests, friends list, search users, friend counts | **Your Crew**: Follow-based model (like Instagram) instead of mutual friendship. Follow favorite artists, producers, and tastemakers. Follower/following counts displayed on profiles. Discover new creators through "People who listen to this also follow..." recommendations. | **DB:** Change schema from bidirectional friendship to unidirectional follow model. Add `followersCount`, `followingCount` to user profile. Add `isVerified` boolean for verified artists. Add `musicGenrePreferences` array for recommendation engine.<br>**Cloud Function:** `updateFollowCounts` - Maintains accurate follower counts. `generateFollowRecommendations` - Suggests users based on listening history and mutual follows |
| Add New Friend | Send friend requests functionality | **Follow Artist/User**: One-tap follow (no mutual acceptance needed). Instant notification to followed user. Following appears immediately in user's feed. | **DB:** Simplified schema - just add follow relationship record with timestamp.<br>**Cloud Function:** `sendFollowNotification` - Triggers real-time notification to followed user |
| Friend Requests | Send/receive friend requests, accept/decline | **N/A - Removed**: Follow model eliminates request system entirely | **DB:** Remove pending request states from social graph schema |
| Friends List | View and manage friends | **Following/Followers Lists**: Two separate lists. Following = artists you follow. Followers = people who follow you. Sorted by recent activity. Shows mutual follows. | **DB:** Add `lastActiveAt` timestamp to follow records for sorting. Add `isMutual` calculated field.<br>**Cloud Function:** `calculateMutualFollows` - Determines if two users follow each other |
| Search Users | Search for users to connect with | **Discover Creators**: Search by username, display name, or music genre specialization. Filter by creator type (AI creators, uploaders, curators). Sort by follower count, recent activity, or relevance. | **DB:** Add `searchableText` field combining username, displayName, bio, genres. Add `creatorType` enum. Add `lastTrackPostedAt` timestamp.<br>**Cloud Function:** `indexUserForSearch` - Updates search index when profile changes. `rankSearchResults` - Applies relevance scoring |
| **MESSAGING & CHAT** |
| Real-time Chat | Real-time chat with photo & video messages, audio recording, group chats, typing indicators, online status, seen status, message reactions, in-reply to functionality | **Backstage Chat**: All base features remain. Enhanced with ability to share tracks as rich embeds (playable within chat without leaving). Share playlist links. Send voice note reactions to songs. Create collaborative playlist channels. | **DB:** Add `sharedTrackId` field to message schema. Add `playlistId` for playlist shares. Add `messageType` enum including 'trackShare', 'playlistShare', 'voiceNote'.<br>**Cloud Function:** `generateTrackSharePreview` - Creates rich embed for shared tracks with album art and play button. `syncCollaborativePlaylist` - Updates playlist when members add tracks via chat |
| Audio Recording | Record and send audio messages | **Voice Notes + Song Snippets**: Record voice messages with live waveform visualization. Option to record singing/humming and let Suno AI transform it into a full track (uses Suno upload-extend feature). | **DB:** Add `sunoTransformRequest` object to voice messages that tracks transformation status.<br>**Cloud Function:** `transformVoiceToTrack` - Integrates with Suno upload-extend API to convert humming into full song |
| Group Chats | Create and manage group conversations | **Listening Parties & Collab Rooms**: Group chats specialized for music. Host listening parties where all members hear track simultaneously. Collaborative studio rooms for co-creating tracks. | **DB:** Add `groupType` enum (general, listeningParty, collabRoom). Add `currentlyPlaying` field for synchronized playback. Add `collabTrackId` for in-progress group creations.<br>**Cloud Function:** `syncListeningParty` - Broadcasts play/pause/seek commands to all participants. `mergeCollabContributions` - Combines multiple Suno generations into collaborative track |
| **ACCOUNT MANAGEMENT** |
| Login with SMS (OTP) | SMS-based phone authentication | **Quick Entry via SMS**: Same SMS login - optimized for fast access to discover music and create | **DB:** No changes needed to base auth schema |
| Email & Password Auth | Traditional email/password login | **Creator Account Access**: Standard email/password for serious creators who want full account control | **DB:** No changes to base auth |
| Social Sign-in | Apple/Facebook/Google sign-in | **One-Tap Social Login**: Prioritize Apple and Google for quick onboarding. Pre-fill music genre preferences from social profile data where available. | **DB:** Add `importedMusicPreferences` field to track if we pulled genre data from social login.<br>**Cloud Function:** `extractMusicPreferences` - Analyzes social profile for music interests during signup |
| Reset Password | Password recovery flow | **Account Recovery**: Standard recovery flow | **DB:** No changes |
| Logout | Sign out functionality | **Sign Out**: Standard logout | **DB:** No changes |
| Delete Account | Permanent account deletion | **Delete Account + Content**: Deletes account and all created tracks. Warning about losing AI-generated music library. Option to download all tracks before deletion. | **DB:** No schema change.<br>**Cloud Function:** `archiveUserTracks` - Generates downloadable ZIP of all user's Suno tracks before deletion. `cleanupSunoAssets` - Removes tracks from Suno API and our storage |
| **MEDIA & CONTENT** |
| Camera & Library | Camera & library integration, photo & video compression, media uploads | **Visual Content Creation**: Camera for profile photos, story backgrounds. Library for uploading custom album art. Video for creating music videos or performance clips to pair with tracks. | **DB:** Add `customAlbumArt` field to track posts. Add `videoClipUrl` for user-recorded performance overlays.<br>**Cloud Function:** `processAlbumArt` - Resizes/optimizes uploaded album art. `compressVideoClip` - Optimizes user videos before pairing with audio |
| Geolocation | Geolocation support, location check-ins | **Venue Check-ins + Music Discovery**: Check in at concerts, venues, studios. Auto-surfaces trending tracks at that location. Discover what's playing nearby. Creates location-based music discovery. | **DB:** Add `venueType` enum (concert, studio, club, cafe, festival). Add `geoHash` for location-based queries. Add `associatedTracks` array linking popular tracks to locations.<br>**Cloud Function:** `getTrendingTracksAtLocation` - Returns popular tracks near a geolocation. `updateVenueTrendingTracks` - Maintains real-time trending music per venue |
| **TECHNICAL INFRASTRUCTURE** |
| Dark Mode | Full dark mode support | **Dark Mode (Music-Optimized)**: Dark mode designed for low-light listening. Album art colors dynamically influence UI accent colors in dark mode. | **DB:** Add `preferredTheme` enum (light, dark, auto) to user preferences.<br>**Cloud Function:** `extractAlbumArtColors` - Uses vision API to extract dominant colors from album art for dynamic theming |
| Multi-language Support | Localization, multi-language, modular theming | **Global Music Community**: Support for 15+ languages. Genre/style terms auto-translate for Suno API. Lyrics can be in any language. | **DB:** Add `preferredLanguage` to user profile. Add `originalLanguage` to track metadata.<br>**Cloud Function:** `translatePromptForSuno` - Translates user's Suno prompt to English if needed for better results |
| Real-time Infrastructure | Real-time data sync, persisted login | **Live Music Feed**: WebSocket connections for real-time feed updates. Live notification when someone you follow drops a track. Optimistic UI updates when generating music. | **DB:** No changes - leverages existing real-time Firebase listeners |
| Secure Authentication | Firebase Auth integration, persistent login | **Secure Creator Accounts**: Same secure Firebase auth. Protects user's music library and credits. | **DB:** No changes |
| **ADDITIONAL FEATURES** |
| Push Notifications | Real-time push notifications | **Music Notifications**: "🎵 [Artist] just dropped a new track". "🔥 Your track just hit 100 vibes!". "🎧 Check out this week's trending genre: Lo-fi Hip Hop". Custom notification sounds. | **DB:** Add `notificationPreferences` object (newTrackFromFollowing, vibesOnMyTrack, trendingGenres, collaborationInvite). Add `customSoundEnabled` boolean.<br>**Cloud Function:** `sendNewTrackNotification` - Notifies followers when user posts. `sendMilestoneNotification` - Celebrates engagement milestones |
| Pull to Refresh | Pull down to refresh content | **Refresh Feed**: Same UX - pull to load newest music posts | **DB:** No changes |
| Infinite Scroll | Endless content loading | **Endless Discovery**: Infinite scroll through music feed. Pre-loads next tracks for seamless playback. | **DB:** No changes.<br>**Cloud Function:** `preloadFeedTracks` - Preloads audio URLs for next 5 tracks in queue |
| Emojis | Emoji support in messages/posts | **Music Emojis Enhanced**: All standard emojis plus custom music emoji set (🎹, 🎸, 🎤, 🎧, 🎵, 🎶, 🎼, 🥁, 🎺, 🎷, 🪕, 🎻) | **DB:** No changes |
| User Reporting | Block users, report content | **Report + Block**: Report tracks for copyright issues (though Suno is commercial-free). Block users from commenting on your tracks. Report inappropriate lyrics/content. | **DB:** Add `reportType` enum (copyright, inappropriateContent, spam, harassment). Add `reportedTrackId` field.<br>**Cloud Function:** `processTrackReport` - Handles content moderation workflow. Auto-flags tracks with high report count |
| Video Player | In-app video playback | **Music Video Player**: Full-screen music video player with synchronized lyrics (uses Suno timestamped lyrics API). Picture-in-picture for multitasking. | **DB:** Add `videoUrl` field to tracks. Add `timestampedLyricsId` reference.<br>**Cloud Function:** `syncVideoWithLyrics` - Fetches and formats Suno timestamped lyrics for display |
| Facebook Audience Ads | Ad integration support | **Music-Focused Ads**: Native ad format showing promoted tracks from emerging artists. "Featured Creator" sponsorship slots in feed. Non-intrusive audio ads between free tier plays. | **DB:** Add `isPromoted` boolean to posts. Add `adCampaignId` for tracking. Add `promotedArtistTier` enum.<br>**Cloud Function:** `insertFeedAd` - Intelligently places promoted tracks in feed based on user preferences |

---

## NEW FEATURES for LetsMake.Music (Not in Base Template)

| Feature | Description | Suno API Integration | DB/Cloud Function Needed? |
|---------|-------------|----------------------|---------------------------|
| **AI MUSIC CREATION FEATURES** |
| Quick Create | Single-tap music generation from text prompt. Beginner-friendly. | `POST /api/v1/generate` (customMode: false)<br>User enters simple prompt like "sad lo-fi beat for studying". Suno auto-generates lyrics and music. Returns 2 track versions. | **DB:** Create `sunoGenerations` collection storing {userId, taskId, prompt, status, selectedVersion, createdAt, trackA_url, trackB_url}. Add `creditsUsed` tracking.<br>**Cloud Function:** `initiateQuickCreate` - Calls Suno API, stores taskId. `handleSunoCallback` - Webhook receiver for when tracks are ready. Updates generation status. `selectTrackVersion` - Marks which of A/B user chose |
| Pro Studio | Advanced creation with separate lyrics, style, title inputs. Toggles for instrumental mode, vocal gender, creative freedom sliders. | `POST /api/v1/generate` (customMode: true)<br>Maps UI controls to Suno params: styleWeight, weirdnessConstraint, vocalGender, negativeTags, instrumental flag | **DB:** Add `proStudioSessions` collection with full parameter set {lyrics, style, title, styleWeight, weirdnessConstraint, vocalGender, negativeTags, instrumental, model}.<br>**Cloud Function:** `validateProStudioInput` - Checks character limits (3000/5000 for lyrics, 200/1000 for style based on model). `initiateProCreate` - Formats and sends custom mode request to Suno |
| Remix & Riff | Take any track in feed and generate a continuation/remix. Creates your own version of someone else's song. | `POST /api/v1/extend`<br>Extends existing Suno track maintaining style coherence | **DB:** Add `remixHistory` collection {originalTrackId, remixedTrackId, remixerUserId, timestamp}. Add `remixCount` to original track metadata.<br>**Cloud Function:** `initiateRemix` - Calls Suno extend API with original track ID. `linkRemixToOriginal` - Creates parent-child relationship in DB. Notifies original creator |
| Vocal Booth | Upload instrumental, AI generates vocals based on your lyrics. | `POST /api/v1/add-vocals`<br>Synthesizes vocals for instrumental tracks | **DB:** Add `vocalSessions` collection {instrumentalUrl, lyrics, generatedVocalTrackId, userId}.<br>**Cloud Function:** `addVocalsToTrack` - Handles instrumental upload, calls Suno API. `mergeVocalAndInstrumental` - Combines outputs |
| Karaoke Mode | Separate vocals from any track, display timestamped lyrics for sing-along. | `POST /api/v1/separate-vocals` + `POST /api/v1/timestamped-lyrics`<br>Extracts vocals/instrumental, gets synced lyrics | **DB:** Add `karaokeTracks` collection {originalTrackId, instrumentalUrl, vocalsUrl, timestampedLyricsUrl}.<br>**Cloud Function:** `generateKaraokeVersion` - Calls vocal separation API. `fetchSyncedLyrics` - Gets timestamped lyrics for display overlay |
| Cover Song Generator | Upload any song, AI reinterprets in completely new style (e.g., "turn this rock song into reggae"). | `POST /api/v1/upload-cover`<br>Style transfer on uploaded audio | **DB:** Add `covers` collection {originalSongUpload, targetStyle, generatedCoverId, userId}.<br>**Cloud Function:** `generateCoverVersion` - Handles upload, sends to Suno with style prompt |
| Track Extender | Upload your own audio clip, AI extends it to full song. Perfect for finishing musical ideas. | `POST /api/v1/upload-extend`<br>Extends user-uploaded audio | **DB:** Add `extensions` collection {originalClipUrl, extendedTrackId, userId}.<br>**Cloud Function:** `extendUserClip` - Uploads clip to Suno, extends to full length |
| AI Music Video | Generate abstract animated music video for your track. Premium feature. | `POST /api/v1/create-video`<br>Creates visual video from audio | **DB:** Add `musicVideos` collection {trackId, videoUrl, generationStatus, userId}.<br>**Cloud Function:** `generateMusicVideo` - Calls Suno video API. Notifies when ready |
| **MUSIC-SPECIFIC SOCIAL FEATURES** |
| Radio Stations | User-curated collections that auto-play like radio. Theme-based (e.g., "Late Night Transmissions", "Workout Bangers"). Users can follow stations. | N/A - Uses existing Suno-generated tracks | **DB:** Create `radioStations` collection {stationName, description, curatorId, trackIds[], followerIds[], isPublic}. Add `stationType` enum (personal, collaborative, genre-based).<br>**Cloud Function:** `addTrackToStation` - Updates station playlist. `generateStationFeed` - Creates feed view for station followers. `autoPopulateGenreStation` - AI suggests tracks for genre-based stations |
| Collaborative Playlists | Multiple users contribute tracks to shared playlist. Perfect for friend groups or collab projects. | N/A - Organizational feature | **DB:** Create `collaborativePlaylists` collection {playlistName, ownerUserId, collaboratorIds[], trackIds[], permissions}.<br>**Cloud Function:** `inviteCollaborator` - Sends invite notification. `addTrackToCollabPlaylist` - Validates user has permission, adds track, notifies others |
| Genre-Based Discovery | Explore tracks by genre tags. AI analyzes your listening to suggest new genres. | N/A - Uses Suno-generated metadata | **DB:** Add `genrePreferences` to user profile with play counts per genre. Create `genreExplore` aggregation collection.<br>**Cloud Function:** `updateGenrePreferences` - Tracks listens by genre. `suggestNewGenres` - Recommends unexplored genres based on taste profile |
| Trending Tracks | Algorithmic trending page showing viral tracks. Time-based (trending today, this week). Genre-specific trending. | N/A - Analytics on existing tracks | **DB:** Create `trendingScores` collection {trackId, score, period, genreSpecific}. Add `viralityMetrics` object tracking shares, listens, creation speed.<br>**Cloud Function:** `calculateTrendingScores` - Runs hourly, computes weighted score (vibes + plays + shares + creation velocity). `updateTrendingFeed` - Refreshes trending collections |
| Suno Credit Management | Display remaining Suno API credits. Purchase more credits. Free tier limits. Subscription tiers. | `GET /api/v1/credits`<br>Checks credit balance | **DB:** Add `sunoCredits` collection {userId, creditsRemaining, totalCreditsUsed, subscriptionTier, lastPurchase}. Add `creditTransactions` collection for history.<br>**Cloud Function:** `checkCreditsBeforeGeneration` - Validates sufficient credits. `deductCredits` - Subtracts credits after successful generation. `rechargeCredits` - Adds credits after purchase or subscription renewal |
| Lyrics Display | Show lyrics while track plays. Highlight current line (using Suno timestamped lyrics). | `POST /api/v1/timestamped-lyrics`<br>Gets synced lyrics for any track | **DB:** Add `lyrics` collection {trackId, timestampedLyrics[], plainTextLyrics}.<br>**Cloud Function:** `fetchAndCacheLyrics` - Retrieves from Suno, caches for performance. `syncLyricDisplay` - Returns current lyric line based on playback position |
| Download Tracks | Download AI-generated tracks in MP3/WAV. Commercial-ready, watermark-free. | Suno tracks are commercial-ready by default<br>`POST /api/v1/convert-wav` for WAV format | **DB:** Add `downloads` collection {userId, trackId, format, downloadedAt}. Track download count per track.<br>**Cloud Function:** `generateDownloadLink` - Creates signed URL. `convertToWAV` - Calls Suno WAV conversion API if needed. `trackDownloadAnalytics` - Records download for creator insights |
| Creator Analytics | Track plays, vibes, shares, follower growth. Genre performance breakdown. Best performing tracks. | N/A - Analytics dashboard | **DB:** Create `creatorAnalytics` collection {userId, totalPlays, totalVibes, followerGrowth[], topTracks[], genreBreakdown}.<br>**Cloud Function:** `aggregateCreatorStats` - Daily rollup of all creator metrics. `generateAnalyticsReport` - Creates weekly summary for creators |
| Verified Artist Badges | Blue checkmark for legitimate artists and notable creators. | N/A - Moderation feature | **DB:** Add `isVerified` boolean to user schema. Add `verificationRequestId` for pending requests.<br>**Cloud Function:** `processVerificationRequest` - Handles verification workflow. `notifyVerificationStatus` - Informs user of approval/denial |
| Monetization (Future) | Tip jar for favorite creators. Fractional ownership of viral tracks. Paid exclusive content. | Suno commercial rights enable monetization | **DB:** Create `monetization` collection {userId, tipsReceived, exclusiveContent[], fractionalShares[]}. Add `isPremiumContent` to tracks.<br>**Cloud Function:** `processCreatorTip` - Handles payment. `splitFractionalRevenue` - Distributes earnings for collaborative tracks. `unlockPremiumContent` - Grants access after payment |

---

## Suno API Integration Summary

### Primary Endpoints Used:
1. **Music Generation** (`POST /api/v1/generate`) - Core creation feature, both Quick Create and Pro Studio modes
2. **Track Extension** (`POST /api/v1/extend`) - Powers Remix & Riff feature
3. **Add Vocals** (`POST /api/v1/add-vocals`) - Vocal Booth feature
4. **Vocal Separation** (`POST /api/v1/separate-vocals`) - Karaoke Mode
5. **Timestamped Lyrics** (`POST /api/v1/timestamped-lyrics`) - Lyrics display, Karaoke Mode
6. **Upload Cover** (`POST /api/v1/upload-cover`) - Cover Song Generator
7. **Upload Extend** (`POST /api/v1/upload-extend`) - Track Extender
8. **Create Video** (`POST /api/v1/create-video`) - AI Music Video (premium)
9. **WAV Conversion** (`POST /api/v1/convert-wav`) - High-quality downloads
10. **Check Credits** (`GET /api/v1/credits`) - Credit management system

### Webhook Strategy:
- All generation endpoints use `callBackUrl` for async notifications
- Cloud Function `handleSunoCallback` receives all webhooks
- Callback stages: text generation → first track → complete
- Real-time UI updates via Firebase listeners when webhook updates status

### Model Selection Strategy:
- **Free Tier:** V3.5 (up to 4 min, 3000 char prompts)
- **Creator Pro:** V4 (enhanced vocals, up to 4 min)
- **Creator Elite:** V4.5+ or V5 (up to 8 min, 5000 char prompts, richer tones)

---

## Database Schema Changes Summary

### New Collections:
- `sunoGenerations` - Tracks all Suno API generation requests
- `sunoCredits` - Per-user credit management
- `creditTransactions` - Credit purchase/usage history
- `radioStations` - User-curated stations
- `collaborativePlaylists` - Multi-user playlists
- `musicVideos` - Generated video content
- `creatorAnalytics` - Aggregated creator statistics
- `trendingScores` - Algorithmic trending calculations
- `vocalSessions`, `karaokeTracks`, `covers`, `extensions` - Feature-specific collections

### Modified Collections:
- `users` - Add: followersCount, followingCount, isVerified, genrePreferences, sunoCreditsRemaining, subscriptionTier, creatorType
- `posts` - Add: postType, sunoApiResponse, trackMetadata, genreTags, collaborators, isOriginalCreation, remixCount
- `stories` - Add: musicTrackId, audioClipUrl, visualTemplate
- `messages` - Add: sharedTrackId, messageType, sunoTransformRequest
- `groupChats` - Add: groupType, currentlyPlaying, collabTrackId
- `comments` - Add: timestamp (for track position linking)

---

## Cloud Functions Summary (18 Total)

### Suno API Integration (8 functions):
1. `initiateQuickCreate` - Quick Create flow
2. `initiateProCreate` - Pro Studio flow
3. `handleSunoCallback` - Webhook receiver for all Suno callbacks
4. `initiateRemix` - Remix & Riff feature
5. `addVocalsToTrack` - Vocal Booth
6. `generateKaraokeVersion` - Karaoke Mode
7. `generateMusicVideo` - AI video generation
8. `convertToWAV` - High-quality downloads

### Content Processing (5 functions):
9. `processNewTrackPost` - Validates and enriches new music posts
10. `generateStoryPreview` - Creates 15-second clips for stories
11. `processAlbumArt` - Optimizes uploaded album art
12. `extractAlbumArtColors` - Dynamic theme colors from artwork
13. `generateWaveformData` - Visual audio waveforms

### Social & Discovery (5 functions):
14. `calculateTrendingScore` - Powers trending/explore feeds
15. `updateFollowCounts` - Maintains follower statistics
16. `generateFollowRecommendations` - Suggests creators to follow
17. `sendNewTrackNotification` - Notifies followers of new music
18. `aggregateCreatorStats` - Daily analytics rollup

---

## Brand Voice Application

**Creative**:
- UI copy: "Describe your dream song" not "Enter music parameters"
- Notifications: "Your vibe is spreading! 🔥" not "You received a like"
- Empty states: "Your feed is quiet. Follow some creators to fill it with music." not "No content available"

**Social**:
- Discovery prompts: "See what your crew is vibing to"
- Sharing CTAs: "Drop this in the group chat"
- Collaborative features: "Start a listening party"

**Confident**:
- Onboarding: "From idea to track in 60 seconds"
- Creation flow: "Generate" not "Try to generate"
- Suno integration: "Commercial-ready. No watermarks. It's yours."

---

## Conclusion

This rebrand transforms a generic social network into a **music-first creative community** powered by cutting-edge AI. Every base template feature has been reimagined through a music lens, and 15+ new features leverage the Suno API's capabilities. The result is a platform where creators like Alex can finally express their musical ideas without technical barriers—a true "Spotify meets Instagram" for the AI music generation era.

**Next Steps:**
1. Prioritize Quick Create + Feed as MVP
2. Implement Suno webhook handler for async generation
3. Design Pro Studio advanced controls UI
4. Build credit management system
5. Launch with V3.5 model, upgrade path to V4.5+/V5 for premium tiers
