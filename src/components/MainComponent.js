import '../App.css';
import React, { useContext, useEffect } from 'react';
import infoImage from '../images/info.svg';
import heartIcon from '../images/logo/heart.svg';
import BackgroundCard from './BackgroundCard';
import ImageCard from './ImageCard';
 

import Footer from './Footer';
 import HeaderBar from './HeaderBar';
import ThemeChanger from './ThemeChanger';
 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader';
import StatusAndHelpPanel from './StatusAndHelpPanel';
import Modal from './Modal';
import ModalForPlaylist from './ModalForPlaylist';
import ModalForHelp from './ModalForHelp';
import ModalForSearch from './ModalForSearch';
import { API_FOR_FIRST_URL_DATA, API_FOR_searchVideos, GET_PLAYLIST_VIDEOS,  GET_TOTAL_LIKES_COUNT, GET_TOTAL_SONGS_PLAYED } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { topLevelContext } from '../Context';

import Likes from './Likes';
const MainComponent = () => {

  const {theme} = useContext(topLevelContext);
  const {urlArray,setUrlArray} = useContext(topLevelContext);
  const {currentIndex,setCurrentIndex} = useContext(topLevelContext);
  const {receivedPlaylistURL,setReceivedPlaylistURL} = useContext(topLevelContext);
  const {isLoading,setIsLoading} = useContext(topLevelContext);
  const {openModal} = useContext(topLevelContext);
  const {openModalForPlaylist,setOpenModalForPlaylist} = useContext(topLevelContext);
  const {openModalForHelp,setOpenModalForHelp} = useContext(topLevelContext);
  const {openModalForSearch,setOpenModalForSearch} = useContext(topLevelContext);
  const {suggestedPlaylistFlag,setSuggestedPlaylistFlag} = useContext(topLevelContext);
  const {suggestedPlaylistLength} = useContext(topLevelContext);
  const {inputUrl,setInputUrl} = useContext(topLevelContext);
  const {setVideoDetails} = useContext(topLevelContext);
  const {dataFetchedForFirstURL} = useContext(topLevelContext);
   const {isPlaylistLoadedForFirstTime,setIsPlaylistLoadedForFirstTime} = useContext(topLevelContext);
  const {localFetchOne,setLocalFetchOne} = useContext(topLevelContext);
  const {localFetchTwo,setLocalFetchTwo} = useContext(topLevelContext);
  const {playlistFromLocal} = useContext(topLevelContext);
  const {flagForFirstSingleVideoFetch,SetFlagForFirstSingleVideoFetch} = useContext(topLevelContext);
  const {tempPlaylistLength,setTempPlaylistLength} = useContext(topLevelContext);
  const {setDisplayDefaultImgForSearch} = useContext(topLevelContext);
  const {isLoadingForSearch,setIsLoadingForSearch} = useContext(topLevelContext);
  const {youtubeSearchFlag,setYoutubeSearchFlag} = useContext(topLevelContext);
  const {youtubeSearchQuery,setYoutubeSearchQuery} = useContext(topLevelContext);
  const {setDataFetchedSuccess} = useContext(topLevelContext);
  const {setSearchDataAfterFetch} = useContext(topLevelContext);
  const {serviceIsDownTodayFlag,setServiceIsDownTodayFlag} = useContext(topLevelContext);
  const {successToast,warningToast,errorToast} = useContext(topLevelContext);
   
  const {openModalForLikes,setOpenModalForLikes} = useContext(topLevelContext);
  const {stats,setStats} = useContext(topLevelContext);
  const {isLoadingForStats,setIsLoadingForStats} = useContext(topLevelContext);
  const {isLikeBtnClicked,setIsLikeBtnClicked} = useContext(topLevelContext);
  const {setTotalLikesCount} = useContext(topLevelContext);
  const {totalSongsPlayed,setTotalSongsPlayed} = useContext(topLevelContext);
  const {totalLikesCount} = useContext(topLevelContext);
  const {subsequentTotalSongsPlayedCount,setSubsequentTotalSongsPlayedCount} = useContext(topLevelContext);

const handleModalOpenForPlaylist = () => {
     setOpenModalForPlaylist(true);
}

    
    // {/*Code for array list ends here*/}
    
 
  // console.log(urlArray);

    

    // for help 
    

   

  useEffect(()=>{
   
    if(theme==='dark'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
  
    }

   

  
    const getFirstUrlData = async () => {
      
      // console.log('first')
      // to avoid re-render for toggling theme while playing first song
      
      try {
        // Check if arrayState has exactly one value
        if (urlArray.length === 1) {
          // console.log('URL =',urlArray[currentIndex]);
    // console.log('Current index =',currentIndex);
    
     setIsLoading(true);  
    
    
     const params ={
      videoUrl:`${urlArray[currentIndex]}`,
     };

     const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
    
      const data = response.data;
 
     setIsLoading(false);  
    
    // console.log(data);
    setVideoDetails(data);
    setStats(data.stats);
    // console.log(data);
    SetFlagForFirstSingleVideoFetch(prev=>prev+1);
     
         
        }
        }catch (error) {
        // console.error('Error:', error);
      }
    
    };
  
  
    if(urlArray.length===1){
      if(!receivedPlaylistURL){
        if(flagForFirstSingleVideoFetch === 0){
          // console.log('executed ',flagForFirstSingleVideoFetch)
          getFirstUrlData();
        }
      }
    }
    
    
  
    
  // for local storage
  
  
   const getVideoDetailsForLocalStorage = async ()=>{
     
     // to avoid re-render for toggling theme while playing first song
       try {
          if (urlArray.length !== 0) {
          setIsLoading(true);  
        
          const params ={
            videoUrl:`${urlArray[currentIndex]}`,
           };
          const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
          const data = response.data;
          
          setIsLoading(false);  
        
          setVideoDetails(data);
          setLocalFetchTwo(false);
          successToast(`Playlist loaded with ${urlArray.length} items 🤩`);
          }
        }catch (error) {
        //  console.error('Error:', error);
       }
    };
  
    // for first render setting LocalFetchOne true & then LocalFetchTwo true
      if(localFetchOne){
  
        setUrlArray(playlistFromLocal);
        setCurrentIndex(0);
        setLocalFetchOne(false);
        setLocalFetchTwo(true);
      }
  
      if(localFetchTwo){
        getVideoDetailsForLocalStorage();
      }
  
    // code for first url data ends here
  
  
  // playlist code starts
  
  const getFirstUrlDataForPlaylist = async () => {
   
    try {
      
      // Check if arrayState has exactly one value
      if (urlArray.length === 0) {
  
      }else{
        setIsLoading(true);
        // console.log('Current index =',currentIndex);
  
  //  setIsLoading(true);  
  
  const params ={
    videoUrl:`${urlArray[currentIndex]}`,
   };
  const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
  const data = response.data;
  //  setIsLoading(false);  
  
  // console.log(data);
  setVideoDetails(data);
  
  // setDataFetchedForFirstURL(true);
  // console.log('Video details',videoDetails);
  setIsLoading(false);
  successToast(`Playlist added with ${tempPlaylistLength} items 🤩`);
  
      }
  
  
       
      
      }catch (error) {
      // console.error('Error:', error);
    }
  
    setIsPlaylistLoadedForFirstTime(false);
  
  };
  
  
  const fetchUrlsForPlaylist = async (inputUrl) =>{
   // to avoid re-render for toggling theme while playing first song
   
    try {
  
      setIsLoading(true);  
    
      // let apiUrl = 'http://localhost:4000/getPlaylistVideos';
      // let queryParams = `?playlistUrl=${inputUrl}`;

      const params ={
        playlistUrl:`${inputUrl}`,
       };
      const response = await apiConnector('get', GET_PLAYLIST_VIDEOS.formattedUrl, null,null, params);
      const data = response.data;
    
      // const response = await fetch(apiUrl + queryParams);
      // const data = await response.json();
      const tempLength = data.arrayOfPlaylistVideoUrls.length;
      setTempPlaylistLength(tempLength);
      if(data.arrayOfPlaylistVideoUrls.length ===0 ){
        errorToast('Invalid playlist URL');
      }else{
        // console.log('From ',data.arrayOfPlaylistVideoUrls);
  
        
        if(urlArray.length === 0){
          setUrlArray(data.arrayOfPlaylistVideoUrls);
          setIsPlaylistLoadedForFirstTime(true);
          // getFirstUrlData();
        }else{
          setUrlArray((prevList)=>[...prevList,...data.arrayOfPlaylistVideoUrls]);
          // successToast(`Playlist added with ${dummyLength} items`);
  
        }
        
        setIsLoading(false);
      successToast(`Playlist added successfully 🤩`);
      }
      
  
  
  
      // setDataFetchedForFirstURL(true);
    }catch (error) {
    //  console.error('Error:', error);
   }
  
  }
  
  
  if(receivedPlaylistURL){
    // console.log('Playlist URL received-useEffect',inputUrl);
  
    fetchUrlsForPlaylist(inputUrl);
  
    setInputUrl('');
  
    setReceivedPlaylistURL(false);
    
  }
  
  if (isPlaylistLoadedForFirstTime) {
    getFirstUrlDataForPlaylist() ;
    
    
  }
  // playlists code ends here
  
  // code to fetch the first video details for suggested playlists
  
  const getFirstUrlDataForSuggestedPlaylist = async () => {
   
    try {
      
      // Check if arrayState has exactly one value
      if (urlArray.length === 0) {
  
      }else{
        setIsLoading(true);
        // console.log('Current index =',currentIndex);
  
  //  setIsLoading(true);  
  
  const params ={
    videoUrl:`${urlArray[currentIndex]}`,
   };
  const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
  const data = response.data;
  //  setIsLoading(false);  
  
  // console.log(data);
  setVideoDetails(data);
  
  // setDataFetchedForFirstURL(true);
  // console.log('Video details',videoDetails);
  setIsLoading(false);
  successToast(`Playlist added with ${suggestedPlaylistLength} items 🤩`)
  }
  
  
       
      
      }catch (error) {
      // console.error('Error:', error);
    }
  
    setSuggestedPlaylistFlag(false);
  
  };
  if(suggestedPlaylistFlag){
    getFirstUrlDataForSuggestedPlaylist();
  }
  
  // Youtube search  code starts
  const getYoutubeSearchData = async () => {
  //  console.log('inside getYoutubeSearchData')
    try {
      // setSearchDataAfterFetch([]);
  setIsLoadingForSearch(true);
  // API_FOR_searchVideos
  const params ={
    query:`${youtubeSearchQuery}`,
   };
  const response = await apiConnector('get', API_FOR_searchVideos.formattedUrl, null,null, params);
  const data = response.data.myvideos;
  const isQuotaExceeded = response.data.isQuotaExceeded;

    if(!isQuotaExceeded) {
      setSearchDataAfterFetch(data);
   setDataFetchedSuccess(true);
    setYoutubeSearchFlag(false);
    setIsLoadingForSearch(false);
    }else{
      setDisplayDefaultImgForSearch(true);
      


      // setIsLoadingForSearch(false);
      setYoutubeSearchQuery('');
      setOpenModalForSearch(false);
            setServiceIsDownTodayFlag(true);
      // warningToast('Service is down for today');
      // console.log('Quota exceeded');
    }
    }
  catch (error) {
    // warningToast('Service unavailable');

      // console.error('Error:', error.message);
    }
    

  };
  if(youtubeSearchFlag){
    getYoutubeSearchData();
  }


  if(serviceIsDownTodayFlag){
    warningToast('Service unavailable');
  }
  //  youtube search code ends  here

  },[theme,urlArray,currentIndex,dataFetchedForFirstURL,urlArray.length,localFetchOne,localFetchTwo,playlistFromLocal,receivedPlaylistURL,isPlaylistLoadedForFirstTime,flagForFirstSingleVideoFetch,inputUrl,tempPlaylistLength,suggestedPlaylistFlag,suggestedPlaylistLength,youtubeSearchFlag,youtubeSearchQuery,isLoadingForSearch,serviceIsDownTodayFlag]);
  
  
    return (
      <div>
      {isLoading ? (
        <Loader/>
        
        ) : (
        <div className='w-full bg-gray-300 dark:bg-gray-700 max-w-maxContent pt-5 pb-16  min-h-screen   -z-30'>
        
       <div className='flex flex-col gap-5 justify-center items-center    pt-24 h-auto relative z-10 ' >
       
       <div className='relative max-w-sm w-full'>
        <HeaderBar />
       </div>
  
       <div className='relative max-w-sm w-full'>
       <div className='flex flex-row justify-evenly items-center'>
       <div >
       <button className='toggle-wrapper dark:bg-gray-800  bg-indigo-300 hover:bg-indigo-400 rounded-full px-5 py-1 shadow-sm  shadow-slate-400 text-gray-100 dark:text-gray-400 ' onClick={handleModalOpenForPlaylist}>
       Playlist Suggestion
       </button>
       </div>
       <ThemeChanger/>
       </div>
       </div>
      
      <div className='relative max-w-sm w-full mt-5 '>
          <BackgroundCard />
          <ImageCard /> 
          <StatusAndHelpPanel />
      </div>
  
      <Footer/>
        
       <div className='fixed top-4 right-4'>
        <button className='bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 gap-1 rounded-full shadow-md flex flex-row justify-center items-center' title='Help'
        onClick={()=>setOpenModalForHelp(true)}>
          <div>Help</div>
          <img src={infoImage} alt='Help' />
        </button>
       
      </div>

      <div className='fixed top-20 right-4'>
        <button className='bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 gap-1 rounded-full shadow-md flex flex-row justify-center items-center' title='Help'
        onClick={()=>setOpenModalForLikes(true)}>
          <div>Admire</div>
          <img src={heartIcon} alt='Help' width={20} height={20} />
        </button>
       
      </div>
  
     </div>
    <ToastContainer newestOnTop closeOnClick={true}  limit={3} toastClassName={'dark:bg-indigo-500 bg-gray-500'} />
  

    {
    openModal?
    (<Modal/>)
    :(<div></div>)
     }

      {/*Modal for the playlist suggestions */}
      {
    openModalForPlaylist?
    (<ModalForPlaylist />)
    :(<div></div>)
     }

     {
      openModalForHelp?
      (<ModalForHelp />)
      :(<div></div>)
     }

     {
      openModalForSearch?
      (<ModalForSearch />)
      :(<div></div>)
     }

     {
      openModalForLikes?
      (<Likes />)
      :(<div></div>)
     }
   </div>
         // Display the app component once the data is loaded
      )}
    </div>
      
      
       
    );
  }
  
export default MainComponent;
