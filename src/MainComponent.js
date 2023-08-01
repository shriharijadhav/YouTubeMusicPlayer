 import './App.css';
import React, { useEffect, useState } from 'react';
import infoImage from './images/info.svg';
import BackgroundCard from './components/BackgroundCard';
import ImageCard from './components/ImageCard';


import Footer from './components/Footer';
 import HeaderBar from './components/HeaderBar';
import ThemeChanger from './ThemeChanger';
 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader';
import StatusAndHelpPanel from './StatusAndHelpPanel';
import Modal from './Modal';
import ModalForPlaylist from './ModalForPlaylist';
import ModalForHelp from './ModalForHelp';
import ModalForSearch from './ModalForSearch';
import { API_FOR_FIRST_URL_DATA, API_FOR_searchVideos, GET_PLAYLIST_VIDEOS } from './services/apis';
import { apiConnector } from './services/apiConnector';
const MainComponent = () => {
  

    let urlIsInvalid = false;
    let playlistFlag = false;
    const[receivedPlaylistURL,setReceivedPlaylistURL] = useState(false );
   
  //
  function checkYouTubeURL(url) {
    if (isVideoURL(url)) {
      //  console.log('Valid YouTube video URL');
      // Perform actions for YouTube video URL
    } else if (isPlaylistURL(url)) {
      // console.log('Valid YouTube playlist URL');
       // Perform actions for YouTube playlist URL
       playlistFlag = true;
  
    } else {
    urlIsInvalid = true;
      // console.log('Invalid YouTube URL');
      // Handle the case of an invalid YouTube URL
    }
  }
  
  function isVideoURL(url) {
    const videoURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    return videoURLPattern.test(url);
  }
  
  function isPlaylistURL(url) {
    const playlistURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)$/;
    return playlistURLPattern.test(url);
  }
  
// 
const [openModal, setOpenModal] =useState(false);
const [openModalForPlaylist, setOpenModalForPlaylist] =useState(false);

const handleModalOpen = () => {
     setOpenModal(true);
}

const handleModalOpenForPlaylist = () => {
     setOpenModalForPlaylist(true);
}

  // checkYouTubeURL('https://www.youtube.com/watch?v=NdosadK8t78');
  // checkYouTubeURL('https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK');
  const [isLoading, setIsLoading] = useState(false);
  
  const [dataFetchedForFirstURL ,setDataFetchedForFirstURL] = useState(false);
  
  const [previousUrlIndex, setPreviousUrlIndex] = useState(1);
     // for shuffling the list
     
    const getRandomUrlIndex = max => {
    if(max <=2){
      return null;
    }else{
        const randomNum = Math.floor(Math.random() * max);
      if (previousUrlIndex === randomNum) {
        let newRandomNum = randomNum === 0 ? randomNum + 1 : randomNum - 1;
        setPreviousUrlIndex(newRandomNum);
         // console.log(newRandomNum);
        // return newRandomNum;
       } else {
        // prevNum = randomNum;
        setPreviousUrlIndex(randomNum);
 
        // console.log(randomNum);
        // return randomNum;
       }
      }
    }
    // console.log('previousUrlIndex',previousUrlIndex);
    //  code for shuffling the list ends here
  
  const getShuffledUrlData = async () => {
    if(urlArray.length <= 2) {
      warningToast(`Can't shuffle the list with less than 3 items`);
   return null;
   }
   getRandomUrlIndex(urlArray.length);
  
   try {
    // console.log(urlArray[previousUrlIndex]);
    setIsLoading(true);  
     
    const params ={
      videoUrl:`${urlArray[currentIndex]}`,
     };
    const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
    const data = response.data;
     
     setIsLoading(false);
    // console.log(data);
    setVideoDetails(data);
    setCurrentIndex(previousUrlIndex);
   //  setIsLoading(false);
  //  console.log('Video details',videoDetails);
   } catch (error) {
     console.error('Error:', error);
   }
  };
  
  const getNextUrlData = async () => {
     if(urlArray.length === 0) {
    return null;
    }
    
    // console.log('URL =',urlArray[currentIndex+1]);
  
    try {
      setIsLoading(true);  
  
      const params ={
        videoUrl:`${urlArray[currentIndex+1]}`,
       };
      const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
      const data = response.data;
      setIsLoading(false);  
  
    //  console.log(data);
     setVideoDetails(data);
    //  setIsLoading(false);
    // console.log('Video details',videoDetails);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const getPreviousUrlData = async () => {
    if(urlArray.length === 0) {
   return null;
   }
   
  //  console.log('URL =',urlArray[currentIndex-1]);
  
   try {
    setIsLoading(true);  
    const params ={
      videoUrl:`${urlArray[currentIndex-1]}`,
     };
    const response = await apiConnector('get', API_FOR_FIRST_URL_DATA.formattedUrl, null,null, params);
    const data = response.data;
     setIsLoading(false);
    // console.log(data);
    setVideoDetails(data);
   //  setIsLoading(false);
  //  console.log('Video details',videoDetails);
   } catch (error) {
     console.error('Error:', error);
   }
  };
  
  // for toast code ends
    const [urlArray,setUrlArray] = useState([]);
  
    // {/*Code for array list */}
    const [videoDetails, setVideoDetails] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleChange = (event) => {
      setInputUrl(event.target.value);
    };
  
    
    const enqueue = (event) => {
      event.preventDefault();
      checkYouTubeURL(inputUrl);
      if(urlIsInvalid){
        errorToast('Invalid YouTube URL');
      }
      else{
        // check if url is for playlist or single video 
        if(playlistFlag) {
          // console.log('After check');
          setReceivedPlaylistURL(true);
  
          // setInputUrl('');
   
        }else{
          if (inputUrl.trim() !== '') {
            setUrlArray((prevUrl) => [...prevUrl, inputUrl]);
            setInputUrl('');
          }
          successToast('Item has been added to the playlist 🤩');
        }
       
      }
      
    };
  
  //   const dequeue = () => {
  //     if (isEmpty()) {
  //       return null;
  //     }
  //     setVideoDetails((prevvideoDetails) => prevvideoDetails.slice(1));
  //     setCurrentIndex((prevIndex) => prevIndex - 1);
  //     return videoDetails[0];
  //   };
  
  //   const front = () => {
  //     if (isEmpty()) {
  //       return null;
  //     }
  //     return videoDetails[0];
  //   };
    
  
  
    const getNextItem = () => {
       if (isEmpty() || currentIndex === urlArray.length - 1) {
          // console.log('one');
          warningToast('You have reached the end of the playlist 😐');
  
        return null;
      }
      else{
          setCurrentIndex((prevIndex) => prevIndex + 1);
          // console.log(urlArray[currentIndex + 1]);
          getNextUrlData();
          
          return urlArray[currentIndex + 1];
      }
    };
  
    const getPreviousItem = () => {
      if (isEmpty() || currentIndex === 0) {
          // console.log('No previous item. ');
        warningToast('No previous item in the playlist')
        return null;
      }
      else{
          setCurrentIndex((prevIndex) => prevIndex - 1);
          getPreviousUrlData();
          // console.log(urlArray[currentIndex - 1]);
          // getUrlData();
  
          return urlArray[currentIndex - 1];
      }
    };
  
  
  
    // const getCurrentItem = () => {
    //   if (isEmpty()) {
    //     console.log('Sorry ! List is empty');
    //     return null;
    //   }
    //   return videoDetails[currentIndex];
    // };
  
    const isEmpty = () => {
      return urlArray.length === 0;
    };
  
    // const size = () => {
    //   return videoDetails.length;
    // };
  
    const clearList = () => {
        if (urlArray.length===0) {
            warningToast('Playlist is empty already 😐');
        }else{
            // un-comment this part when fetching videoDetails dynamically
      setVideoDetails([]);
      setUrlArray([]);
      setCurrentIndex(0);
      setDataFetchedForFirstURL(false);
      // console.log('Cleared queue. List is empty now');
      errorToast('Current playlist has been cleared 😴');
        }

      
    };
    
    // {/*Code for array list ends here*/}
    let arrayUrlFromLocal = null;
  
    const [theme,setTheme]= useState('dark');
    const toggleTheme =() => {
      setTheme((preTheme) => preTheme ==='dark' ? 'light' : 'dark');
    }
  
     const[isPlaylistLoadedForFirstTime,setIsPlaylistLoadedForFirstTime] = useState(false);
  
    // temp fetch local starts here
    function splitStringByComma(bigString) {
      const formattedArray = bigString.split(',');
      return formattedArray;
    }
  
    
  
   
    // save current list to local code starts here
    const saveToLocal = () => {
      try {
        if (urlArray.length <=9 ){
          warningToast(`Current playlist : ${urlArray.length} items`)
           warningToast('Playlist should have at least 10 items in order to be saved locally 😝');
        }else{
          localStorage.setItem('YT_MusicPlayList', urlArray);
          successToast(`Playlist saved locally with ${urlArray.length} items 🤩`)
        }
      } catch (error) {
        
      }
     
  
    };
    // save to local code ends here
  
  
    // fetch data from local starts here
    const [localFetchOne,setLocalFetchOne]= useState(false);
    const [localFetchTwo,setLocalFetchTwo]= useState(false);
    const [playlistFromLocal,setPlaylistFromLocal] = useState([]);
    const handleLocalStorageFetch = () => {
  
      try {
        // check if localStorage variable is available or not
      if(localStorage.getItem('YT_MusicPlayList') === null || localStorage.getItem('YT_MusicPlayList').length === 0) {
        warningToast(`You don't have any locally saved playlist`)
        return;
      }
      else{
        // console.log('else part')
        // console.log('From local ',localStorage.getItem('YT_MusicPlayList'));
        arrayUrlFromLocal = splitStringByComma(localStorage.getItem('YT_MusicPlayList'));
        setPlaylistFromLocal(arrayUrlFromLocal);
        setLocalFetchOne(true);
      }
      } catch (error) {
        
      }
  
      
    };
  
  const [flagForFirstSingleVideoFetch,SetFlagForFirstSingleVideoFetch]= useState(0);
  const [tempPlaylistLength,setTempPlaylistLength]= useState(0);
  // console.log(urlArray);

    // for suggested playlist
    const[suggestedPlaylistFlag,setSuggestedPlaylistFlag] = useState(false);
    const[suggestedPlaylistLength,setSuggestedPlaylistLength] = useState(0);

    // for help 
    const [openModalForHelp,setOpenModalForHelp] = useState(false);
    const [openModalForSearch,setOpenModalForSearch] = useState(false);

    // for youtube search
    const [displayDefaultImgForSearch,setDisplayDefaultImgForSearch] = useState(true);

    const [isLoadingForSearch,setIsLoadingForSearch] = useState(false);
    const [youtubeSearchFlag, setYoutubeSearchFlag] = useState(false);
    const [youtubeSearchQuery,setYoutubeSearchQuery] = useState('');
    const [dataFetchedSuccess,setDataFetchedSuccess] = useState(false);
    const [searchDataAfterFetch,setSearchDataAfterFetch] = useState([ ]);
    const [serviceIsDownTodayFlag,setServiceIsDownTodayFlag] = useState(false);

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
    SetFlagForFirstSingleVideoFetch(prev=>prev+1);
  
         
        }
        }catch (error) {
        console.error('Error:', error);
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
         console.error('Error:', error);
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
      console.error('Error:', error);
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
     console.error('Error:', error);
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
      console.error('Error:', error);
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

  //  let apiUrl = 'http://localhost:4000/searchVideos';
  //  let queryParams = `?query=${youtubeSearchQuery}`;
  
  //  console.log('String',apiUrl + queryParams)
  //  const response = await fetch(apiUrl + queryParams);
  //  const data = await response.json();
  //  console.log(data.myvideos);
  //  console.log('search done for youtube')
console.log(isQuotaExceeded);
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
  
  // console.log('List of url ',urlArray);
  // code for toast
  const successToast =(message,theme)=>{
    toast.success(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
      theme: `${theme}`,
  
    });
  }
  
  const warningToast =(message,theme)=>{
    toast.warn(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
      theme: `${theme}`,
    });
  }
  
  const errorToast =(message,theme)=>{
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
      theme: `${theme}`,
    });
  }
  
  // code for toast ends
  // console.log('query',youtubeSearchQuery);
  // console.log('video details main =',videoDetails)
  
  // console.log(searchDataAfterFetch);
  
    return (
      <div>
      {isLoading ? (
        <Loader/>
        
        ) : (
        <div className='w-full bg-gray-300 dark:bg-gray-700 max-w-maxContent  pb-10 -z-30'>
       <div className='flex flex-col gap-5 justify-center items-center    pt-24 h-auto relative z-10 ' >
        
       
  
      <div className='relative max-w-sm w-full'>
        <HeaderBar setOpenModalForSearch={setOpenModalForSearch} isLoading={isLoading} setIsLoading={setIsLoading} inputUrl={inputUrl}  setVideoDetails={setVideoDetails} setInputUrl={setInputUrl} videoDetails={videoDetails} enqueue={enqueue}  handleChange={handleChange} />
       </div>
  
       <div className='relative max-w-sm w-full'>
       <div className='flex flex-row justify-evenly items-center'>
       <div >
       <button className='toggle-wrapper dark:bg-gray-800  bg-indigo-300 hover:bg-indigo-400 rounded-full px-5 py-1 shadow-sm  shadow-slate-400 text-gray-100 dark:text-gray-400 ' onClick={handleModalOpenForPlaylist}>
       Playlist Suggestion
       </button>
       </div>
       <ThemeChanger  toggleTheme={toggleTheme}/>
  
       
       </div>
       </div>
           
        
  
      <div className='relative max-w-sm w-full mt-5 '>
          <BackgroundCard  handleModalOpen={handleModalOpen} getShuffledUrlData={getShuffledUrlData} warningToast={warningToast} getNextItem={getNextItem} getPreviousItem={getPreviousItem} clearList={clearList} urlArray={urlArray} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} videoDetails={videoDetails} getNextUrlData={getNextUrlData}/>
          <ImageCard videoDetails={videoDetails}/> 
          <StatusAndHelpPanel urlArray={urlArray} currentIndex={currentIndex} />
          
          
  
      </div>
  
      <Footer/>

      <div className='fixed top-4 right-4'>
        <button className='bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 gap-1 rounded-full shadow-md flex flex-row justify-center items-center' title='Help'
        onClick={()=>setOpenModalForHelp(true)}>
          <div>Help</div>
          <img src={infoImage} alt='Help' className=''/>
        </button>
       
      </div>
  
     </div>
    <ToastContainer newestOnTop closeOnClick={true}  limit={3} toastClassName={'dark:bg-indigo-500 bg-gray-500'} />
  

    {
    openModal?
    (<Modal openModal={openModal} setOpenModal={setOpenModal} handleLocalStorageFetch={handleLocalStorageFetch} saveToLocal={saveToLocal}/>)
    :(<div></div>)
     }

      {/*Modal for the playlist suggestions */}
      {
    openModalForPlaylist?
    (<ModalForPlaylist openModalForPlaylist={openModalForPlaylist} setOpenModalForPlaylist={setOpenModalForPlaylist} setUrlArray={setUrlArray} urlArray={urlArray} setSuggestedPlaylistFlag={setSuggestedPlaylistFlag} setSuggestedPlaylistLength={setSuggestedPlaylistLength} successToast={successToast}/>)
    :(<div></div>)
     }

     {
      openModalForHelp?
      (<ModalForHelp setOpenModalForHelp={setOpenModalForHelp} />)
      :(<div></div>)
     }

     {
      openModalForSearch?
      (<ModalForSearch displayDefaultImgForSearch={displayDefaultImgForSearch} setDisplayDefaultImgForSearch={setDisplayDefaultImgForSearch} isLoadingForSearch={isLoadingForSearch} setIsLoadingForSearch={setIsLoadingForSearch} setOpenModalForSearch={setOpenModalForSearch} youtubeSearchQuery={youtubeSearchQuery}  setYoutubeSearchFlag={setYoutubeSearchFlag} setYoutubeSearchQuery={setYoutubeSearchQuery} dataFetchedSuccess={dataFetchedSuccess} searchDataAfterFetch={searchDataAfterFetch} successToast={successToast} urlArray={urlArray} setUrlArray={setUrlArray}/>)
      :(<div></div>)
     }




      </div>
         // Display the app component once the data is loaded
      )}
    </div>
      
      
       
    );
  }
  
export default MainComponent
