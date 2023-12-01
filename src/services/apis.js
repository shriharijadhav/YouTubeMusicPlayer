const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API_FOR_FIRST_URL_DATA = {
    formattedUrl: BASE_URL + '/getAudioAndThumbnail',
  };

  
export const API_FOR_searchVideos = {
  formattedUrl: BASE_URL + '/searchVideos',
};

export const GET_PLAYLIST_VIDEOS = {
  formattedUrl: BASE_URL + '/getPlaylistVideos',
};

export const GET_TOTAL_SONGS_PLAYED = {
  formattedUrl: BASE_URL + '/getSongsPlayed',
};


export const GET_TOTAL_LIKES_COUNT = {
  formattedUrl: BASE_URL + '/getTotalLikesCount',
};


export const API_TO_INCREASE_LIKE_COUNT = {
  formattedUrl: BASE_URL + '/increaseLikeCount',
};