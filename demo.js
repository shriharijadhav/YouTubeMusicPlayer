const puppeteer = require('puppeteer');
const { google } = require('googleapis');


// Replace 'VIDEO_URL' with the URL of the YouTube video you want to scrape
const videoUrl = 'https://www.youtube.com/watch?v=hV8EGTjzD2s';

async function getYouTubeVideoDetails() {
  const browser = await puppeteer.launch({  headless: 'new'});
  const page = await browser.newPage();

  try {
    await page.goto(videoUrl);
    await page.waitForSelector('h1.title');
     

    // Extract video details
    const title = await page.$eval('meta[name="title"]', (element) => element.getAttribute('content'));
    
    console.log('Title:', title);
   

       // Extract the raw player response from the page source
     // Use Puppeteer to extract the audio URL
     const rawPlayerResponse = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      for (const script of scripts) {
        if (script.textContent.includes('ytInitialPlayerResponse')) {
          const match = /ytInitialPlayerResponse\s*=\s*({.*?});/s.exec(script.textContent);
          if (match) {
            return JSON.parse(match[1]);
          }
        }
      }
      return null;
    });

    if (rawPlayerResponse && rawPlayerResponse.streamingData && rawPlayerResponse.streamingData.formats) {
      const audioURL = rawPlayerResponse.streamingData.formats
        .filter((format) => format.mimeType && format.mimeType.includes('audio'))
        .map((format) => format.url)[0];

      console.log('Title:', title);
      // console.log('Description:', description);
      console.log('Audio URL:', audioURL);
    } else {
      console.error('Audio URL not found.');
    }
    myIndex = audioFormats.length-1;
      console.log(audio.url);
      console.log('URL:', audioFormats[myIndex].url);
      console.log('thumbnail url ',`https://i.ytimg.com/vi/GXmMn8wEYKE/hqdefault.jpg`);
 
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
  } finally {
    await browser.close();
  }
}

getYouTubeVideoDetails();



// to extract video thumbnail use url formats and id video id only


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
