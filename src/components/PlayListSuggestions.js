import React from 'react';
import PlaylistItemFinal from './PlaylistItemFinal';
import '../App.css';
import { Bollywood_latest_25,handPickedByHarry,lofi_playlist,travel_playlist, trending_instagram_songs, punjabi_songs, rock_pop_songs, workout_songs} from './ArraysOfPlaylist';

function PlayListSuggestions({successToast,setOpenModalForPlaylist,setUrlArray,urlArray,setSuggestedPlaylistFlag,setSuggestedPlaylistLength}) {
  let dummyVariable= null;
  const typeSOfMusic = [
    {
      id:1,
      heading: 'Hand-Picked ',
      headingTwo : 'Melodies for You',
      topSinger:'with 💛 by Shrihari',
      gradientClass:'red-gradient',
      playlistSongUrls:[handPickedByHarry],
    },
    {
    id:2,
    heading: 'Bollywood Latest',
    topSinger:'Top 25',
    gradientClass:'pink-gradient',
    playlistSongUrls:[Bollywood_latest_25],
    },
    {
      id:3,
      heading: 'Travel Time',
      topSinger:'Joyful & Vibrant',
      gradientClass:'yellow-gradient',
      playlistSongUrls:[travel_playlist],

    },
    {
    id:4,
    heading: 'Lofi Beats',
     topSinger:'Chillax bedtime',
    gradientClass:'green-gradient',
    playlistSongUrls:[lofi_playlist],
    },
    {
      id:5,
      heading: 'Trending & Viral',
      topSinger:'Instagram Reels',
      gradientClass:'purple-gradient',
      playlistSongUrls:[trending_instagram_songs],      
    },
    {
    id:6,
    heading: 'Punjabi Songs',
    topSinger:'Diljit Dosanjh',
    gradientClass:'red-gradient',
    playlistSongUrls:[punjabi_songs],
    },
    {
      id:7,
      heading: 'Workout Music',
    topSinger:'The Weekend',
    gradientClass:'yellow-gradient',
    playlistSongUrls:[workout_songs]
    },
    {
    id:8,
    heading: 'Rock-Pop music',
    topSinger:'Imagine Dragons',
    gradientClass:'blue-gradient',
    playlistSongUrls:[rock_pop_songs]
    },
    {
    id:9,
    heading: 'Indian Classical',
    topSinger:'80\'s & 90\'s era',
    gradientClass:'pink-gradient',
    playlistSongUrls:[old_80s_90s_songs]
    }
  ];

  const handlePlaylistSuggestionCLick = (id) =>{
    dummyVariable = [...typeSOfMusic[id-1].playlistSongUrls];
    // console.log('h',dummyVariable[0].length);
    setSuggestedPlaylistLength(dummyVariable[0].length)
    if (urlArray.length === 0) {
      setUrlArray(...typeSOfMusic[id-1].playlistSongUrls);
      setSuggestedPlaylistFlag(true);
    }else{
      setUrlArray((prevList)=>prevList.concat(...typeSOfMusic[id-1].playlistSongUrls));
      successToast('Playlist added successfully');
    }
    setOpenModalForPlaylist(false);
  }
  return (
    <div className='w-full max-w-md py-5 mx-auto' >
     <div className='h-96 overflow-x-hidden overflow-y-scroll noScrollBarForPlaylist '>
     {
      typeSOfMusic.map((musicType) =>{
        return(
          <PlaylistItemFinal heading={musicType.heading} headingTwo={musicType.headingTwo} topSinger={musicType.topSinger} gradientClass={musicType.gradientClass} key={musicType.id} index={musicType.id} handlePlaylistSuggestionCLick={handlePlaylistSuggestionCLick}/>
        )
      })
     }
    {/* <PlaylistItem heading={'Pop Songs'} subHeading={'Taylor Swift'} gradientClass={'yellow-gradient'}/>
     <PlaylistItem heading={'Punjabi Songs'} subHeading={'Crazy mood'} gradientClass={'purple-gradient'}/>
     <PlaylistItem heading={'Lofi Beats'} subHeading={'Chillax'} gradientClass={'green-gradient'}/>
     <PlaylistItem heading={'Rock-Pop music'} subHeading={'Imagine Dragons '} gradientClass={'blue-gradient'}/>
     <PlaylistItem heading={'Workout Music'} subHeading={'The Weeknd'} gradientClass={'yellow-gradient'}/>
     <PlaylistItem heading={'Indian Classical'} subHeading={'Pandit Bhimsen Joshi'} gradientClass={'pink-gradient'}/>
    <PlaylistItem heading={'Ghazal Music'} subHeading={'Jagjit Singh'} gradientClass={'green-gradient'}/>*/}

     </div>
    </div>
  );
}

export default PlayListSuggestions;