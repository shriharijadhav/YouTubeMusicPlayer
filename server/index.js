const express = require('express');
const ytdl = require('ytdl-core');
// const puppeteer = require('puppeteer');

const ytpl = require('ytpl');
const { google } = require('googleapis');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

 
app.get('/getAudioAndThumbnail', async (req, res) => {
  const videoUrl = req.query.videoUrl;
  console.log(videoUrl);
 try {
    // Validate if the provided URL is a valid YouTube video URL
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube video URL' });
    }

    // Get video info
    const info = await ytdl.getInfo(videoUrl);
    // console.log(info);

     // Get video ID
     const videoId = info.videoDetails.videoId;
    // Get video title
    const videoTitle = info.videoDetails.title;

    // Get name of author/creator
    const authorName = info.videoDetails.author.name;

    // Find the audio format with the highest audio quality
    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: 'audioonly',
    });

    // Get the high-quality thumbnail URL
    const thumbnailUrl =
      info.player_response.videoDetails.thumbnail.thumbnails.pop().url;

    // Return the audio stream URL and the thumbnail URL
    res.json({
      videoId,
      audioUrl: audioFormat.url,
      thumbnailUrl,
      videoTitle,
      authorName,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
  // -------------------------------------------commenting old logic which uses ytdl package --------------------*/





  /*
  const extractYouTubeVideoId = (url) => {
    // Regular expression to match and capture the video ID
    const videoIdRegex = /(?:\?v=|\/embed\/|\/v\/|\/watch\?v=|youtu\.be\/|\/embed\/videoseries\?list=)([\w-]{11})/;
  
    // Use the regex to extract the video ID
    const match = url.match(videoIdRegex);
  
    // If a match is found, return the captured video ID, otherwise return null
    return match ? match[1] : null;
  };


app.get('/getAudioAndThumbnail', async (req, res) => {
  const videoUrl = req.query.videoUrl;
  const videoId = extractYouTubeVideoId(videoUrl);


  const browser = await puppeteer.launch({  headless: 'new'});
  const page = await browser.newPage();

  try {
    await page.goto(videoUrl);
    await page.waitForSelector('h1.title');

    // Extract video details
    const videoTitle = await page.$eval('meta[name="title"]', (element) => element.getAttribute('content'));
    // console.log('Title:', videoTitle);
   

    // Get video info
    const info = await ytdl.getInfo(videoUrl);
    // Find the audio format with the highest audio quality
    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: 'audioonly',
    });
    
    // console.log(audioFormat.url);
     
      // console.log('thumbnail url ',`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
       // Return the audio stream URL and the thumbnail URL
      res.json({
        videoId,
        audioUrl: audioFormat.url,
        thumbnailUrl,
        videoTitle,
       });
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
  } finally {
    await browser.close();
  }



 
});
  
  */
  

//---------------------------------------------------for playlists------------------------------------------------

const TIMEOUT_DURATION = 5000; // 5 seconds

app.get('/getPlaylistVideos', async (req, res) => {
  const playlistUrl = req.query.playlistUrl;

  // console.log(playlistUrl)
  try {
    // Validate if the provided URL is a valid YouTube playlist URL
    if (!playlistUrl || typeof playlistUrl !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid or missing YouTube playlist URL' });
    }

    // Set up a timeout promise
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Time out. Please try again.'));
      }, TIMEOUT_DURATION);
    });

    // Fetch playlist metadata with a timeout
    const playlist = await Promise.race([ytpl(playlistUrl), timeoutPromise]);

    // Extract video details
    const videos = playlist.items.map((video) => ({
      id: video.id,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      author: {
        name: video.author.name,
        channelUrl: video.author.ref,
      },
      length: video.duration || null,
     }));

    // Return the list of videos

    // const formattedVideoUrls = videos.map((video) =>({
    //   vide
    // }));
    const arrayOfPlaylistVideoUrls = videos.map((video) =>`https://www.youtube.com/watch?v=${video.id}`);

    res.json({'arrayOfPlaylistVideoUrls':arrayOfPlaylistVideoUrls });
  } catch (error) {
    console.error('Error:', error.message);
    res.json({ error: error.message,isError: true , 'arrayOfPlaylistVideoUrls':[]});
  }
});

// check if url is for single video or for playlist
function isPlaylistUrl(url) {
  // Match the YouTube playlist URL pattern
  const playlistRegex = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  return playlistRegex.test(url);
}

app.get('/checkVideoType', (req, res) => {
  const videoUrl = req.query.videoUrl;

  if (isPlaylistUrl(videoUrl)) {
    res.json({ type: 'playlist' });
  } else {
    res.json({ type: 'single video' });
  }
});

// --------------------------------------------------for top 20 searches---------------

// Set up YouTube Data API client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCVred84qZKRIVAZhuZmZLVm9fUbYIUuyY', // Replace with your YouTube Data API key
});

// -------------------------------------------commenting search feature -------------------
/*-
app.get('/searchVideos', async (req, res) => {
  const query = req.query.query;
  const maxResults = 20;

  try {
    // Set up a timeout promise
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Time out. Please try again.'));
      }, TIMEOUT_DURATION);
    });

    // Make API request to search for videos with a timeout
    const response = await Promise.race([
      youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults,
      }),
      timeoutPromise,
    ]);

    // Extract video details from search results
    const videos = response.data.items.map((item) => item);

    // Fetch video details to get length
    const videoIds = videos.map((video) => video.id);
    const videoDetailsResponse = await youtube.videos.list({
      part: 'contentDetails',
      id: videoIds.join(','),
    });

    // Update video details with length
    videoDetailsResponse.data.items.forEach((item, index) => {
      const duration = item.contentDetails.duration;
      const length = parseISO8601Duration(duration);
      videos[index].length = length;
    });

    // Return the list of videos
    res.json({ 'myvideos':videos ,'isQuotaExceeded':false });
  } catch (error) {
    // console.error('Error:', error);
    res.json({'isQuotaExceeded':true });

    // res.status(500).json({ error: error.message ,isQuotaExceeded: true });
  }
});
*/// -------------------------------------------commenting search feature --------------------

// Helper function to parse ISO 8601 duration
function parseISO8601Duration(duration) {
  const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = regex.exec(duration);
  const days = matches[1] ? parseInt(matches[1]) : 0;
  const hours = matches[2] ? parseInt(matches[2]) : 0;
  const minutes = matches[3] ? parseInt(matches[3]) : 0;
  const seconds = matches[4] ? parseInt(matches[4]) : 0;
  const length = seconds + minutes * 60 + hours * 3600 + days * 86400;
  return length;
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
