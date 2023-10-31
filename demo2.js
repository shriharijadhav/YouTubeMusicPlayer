const { google } = require('googleapis');

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = 'AIzaSyCVred84qZKRIVAZhuZmZLVm9fUbYIUuyY';

// Replace 'PLAYLIST_ID' with the ID of the YouTube playlist you want to retrieve video IDs for
const playlistId = 'PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

async function getVideoIdsFromPlaylist() {
  try {
    const response = await youtube.playlistItems.list({
      part: 'snippet',
      maxResults:100, // Maximum number of playlist items to retrieve per request
      playlistId: playlistId,
    });

    const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId);

    console.log('Lenght:', videoIds.length);
    console.log('Video IDs in the Playlist:', videoIds);
  } catch (error) {
    console.error('Error fetching video IDs from the YouTube playlist:', error);
  }
}

getVideoIdsFromPlaylist();
