import React, { useState } from 'react';
import { createContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import { API_FOR_FIRST_URL_DATA} from './services/apis';
import { apiConnector } from './services/apiConnector';




export const topLevelContext = createContext();
 
function Context({children}) {

    let urlIsInvalid = false;
    let playlistFlag = false;
    let singleVideoUrlType = '';
    let videoIdForSingleVideo = '';
    
    const [urlArray,setUrlArray] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [receivedPlaylistURL,setReceivedPlaylistURL] = useState(false );
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] =useState(false);
    const [openModalForPlaylist, setOpenModalForPlaylist] =useState(false);
    const [openModalForHelp,setOpenModalForHelp] = useState(false);
    const [openModalForSearch,setOpenModalForSearch] = useState(false);
    const[suggestedPlaylistFlag,setSuggestedPlaylistFlag] = useState(false);
    const[suggestedPlaylistLength,setSuggestedPlaylistLength] = useState(0);
    const [videoDetails, setVideoDetails] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [dataFetchedForFirstURL ,setDataFetchedForFirstURL] = useState(false);
    const [previousUrlIndex, setPreviousUrlIndex] = useState(1);
    const [theme,setTheme]= useState('dark');
    const[isPlaylistLoadedForFirstTime,setIsPlaylistLoadedForFirstTime] = useState(false);
    const [localFetchOne,setLocalFetchOne]= useState(false);
    const [localFetchTwo,setLocalFetchTwo]= useState(false);
    const [playlistFromLocal,setPlaylistFromLocal] = useState([]);
    const [flagForFirstSingleVideoFetch,SetFlagForFirstSingleVideoFetch]= useState(0);
    const [tempPlaylistLength,setTempPlaylistLength]= useState(0);
     // for youtube search
     const [displayDefaultImgForSearch,setDisplayDefaultImgForSearch] = useState(true);
     const [isLoadingForSearch,setIsLoadingForSearch] = useState(false);
     const [youtubeSearchFlag, setYoutubeSearchFlag] = useState(false);
     const [youtubeSearchQuery,setYoutubeSearchQuery] = useState('');
     const [dataFetchedSuccess,setDataFetchedSuccess] = useState(false);
     const [searchDataAfterFetch,setSearchDataAfterFetch] = useState([ ]);
     const [serviceIsDownTodayFlag,setServiceIsDownTodayFlag] = useState(false);


    const toggleTheme =() => {
        setTheme((preTheme) => preTheme ==='dark' ? 'light' : 'dark');
      }
    
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

    const handleChange = (event) => {
        setInputUrl(event.target.value);
    };
    
    const checkYouTubeURL = (url) => {
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
    const isVideoURL = (url) => {
        // const videoURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;

        const shortURLPattern = /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)$/;
        const liveURLPattern = /^https:\/\/www\.youtube\.com\/live\/([a-zA-Z0-9_-]+)\?/;
        const regularURLPattern = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;
        const mobileURLPattern = /^https:\/\/m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&feature=youtu\.be$/;
        const mobileURLPatternTwo = /^https:\/\/m\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/;
        const addonURLPattern = /^https:\/\/youtu\.be\/[A-Za-z0-9_-]+(\?.*)?$/;
        const addonURLPatternTwo =/https:\/\/m\.youtube\.com\/watch\?si=[A-Za-z0-9_-]+&v=[A-Za-z0-9_-]+&feature=youtu\.be/;


        if (shortURLPattern.test(url)) {
          singleVideoUrlType = 'shortURLPattern';

          return shortURLPattern.test(url);
        } else if (liveURLPattern.test(url)) {
          singleVideoUrlType = 'liveURLPattern';

          return liveURLPattern.test(url);
        } else if (regularURLPattern.test(url)) {
          singleVideoUrlType = 'regularURLPattern'; 
          return regularURLPattern.test(url);
        }else if (mobileURLPattern.test(url)) {
          singleVideoUrlType = 'mobileURLPattern'; 
          return mobileURLPattern.test(url);
        }else if (mobileURLPatternTwo.test(url)) {
          singleVideoUrlType = 'mobileURLPatternTwo'; 
          return mobileURLPatternTwo.test(url);
        }else if (addonURLPattern.test(url)) {
          singleVideoUrlType = 'addonURLPattern'; 
          return addonURLPattern.test(url);
        }else if (addonURLPatternTwo.test(url)) {
          singleVideoUrlType = 'addonURLPatternTwo'; 
          return addonURLPatternTwo.test(url);
        } else {
           return false;
        }

        // return videoURLPattern.test(url);
      }
      
    const isPlaylistURL = (url) => {
        const playlistURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)$/;
        return playlistURLPattern.test(url);
      }

      // functions to get video from URL for single video URL
      const getVideoIdForShortUrl = (url) => url.split("/").pop();

      const getVideoIdForLiveUrl = (url) => {
        const videoId = url.split("/").pop();
        return videoId.split("?")[0];
      };
      
      const getVideoIdForRegularUrl = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get("v");
      };

      const getVideoIdForMobileUrl = (url) => {
        const pattern = /^https:\/\/m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&feature=youtu\.be$/;
        const match = url.match(pattern);
        return match ? match[1] : null;
      };

      const getVideoIdForMobileUrlTwo = url => {
        const parts = url.split('?v=');
        if (parts.length === 2) {
          return parts[1];
        }
        return null;
      };

      const getVideoIdForAddonUrl = (url) => {
        const match = url.match(/https:\/\/youtu\.be\/([A-Za-z0-9_-]+)/);
        return match ? match[1] : null;
      };

      const getVideoIdForAddonUrlTwo = (url) => {
        const match = url.match(/(?:\?|&)v=([^&]+)/);
        return match ? match[1] : null;
      };

    const enqueue = (event) => {
        event.preventDefault();
        checkYouTubeURL(inputUrl);
        if(urlIsInvalid){
            errorToast('Invalid YouTube URL');
        }else{
            // check if url is for playlist or single video 
            if(playlistFlag) {
            setReceivedPlaylistURL(true);    
        }else{
        if (inputUrl.trim() !== '') {

          // console.log('URL type ', singleVideoUrlType);

          switch (singleVideoUrlType) {
            case 'shortURLPattern':
              videoIdForSingleVideo = getVideoIdForShortUrl(inputUrl);
              break;
            case 'liveURLPattern':
              videoIdForSingleVideo = getVideoIdForLiveUrl(inputUrl);
              break;
            case 'regularURLPattern':
              videoIdForSingleVideo = getVideoIdForRegularUrl(inputUrl);
              break;
            case 'mobileURLPattern':
              videoIdForSingleVideo = getVideoIdForMobileUrl(inputUrl);
              break;
              case 'mobileURLPatternTwo':
                videoIdForSingleVideo = getVideoIdForMobileUrlTwo(inputUrl);
                break;
            case 'addonURLPattern':
                videoIdForSingleVideo = getVideoIdForAddonUrl(inputUrl);
                // console.log(videoIdForSingleVideo);
              break;
              case 'addonURLPatternTwo':
                videoIdForSingleVideo = getVideoIdForAddonUrlTwo(inputUrl);
                // console.log(videoIdForSingleVideo);
              break;
          
            default:
              break;
          }

          // console.log(videoIdForSingleVideo);
            const formattedUrlForSingleVideo = `https://www.youtube.com/watch?v=${videoIdForSingleVideo}`;
            // console.log(formattedUrlForSingleVideo);
            setUrlArray((prevUrl) => [...prevUrl, formattedUrlForSingleVideo]);
            setInputUrl('');
            }
            successToast('Item has been added to the playlist 🤩');
        }
        }
        
    };

    // for background card
    const handleModalOpen = () => {
        setOpenModal(true);
   }

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
      videoUrl:`${urlArray[previousUrlIndex]}`,
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

    const getRandomUrlIndex = max => {
        if(max <=2){
          return null;
        }else{
            const randomNum = Math.floor(Math.random() * max);
            // console.log(randomNum);
            // console.log('previousUrlIndex',previousUrlIndex);
          if (previousUrlIndex === randomNum) {
            // console.log('if block')
            let newRandomNum = randomNum === 0 ? randomNum + 1 : randomNum - 1;
            setPreviousUrlIndex(newRandomNum);
              // console.log(newRandomNum);
            // return newRandomNum;
           } else {
            // console.log('else block');
             setPreviousUrlIndex(randomNum);
     
     
            // console.log(randomNum);
            // return randomNum;
           }
          }
        }
    const isEmpty = () => {
        return urlArray.length === 0;
    };    
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
    
         const getPreviousItem = () => {
            if (isEmpty() || currentIndex === 0) {
                // console.log('No previous item. ');
              warningToast('No previous item in the playlist 😐')
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

        let arrayUrlFromLocal = null;
  
    
  
  
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
      
          
        }
      
      const [modalForPageRefresh,setModalForPageRefresh] = useState(false);
    const contextValue ={
        urlArray:urlArray,
        setUrlArray:setUrlArray,
        currentIndex:currentIndex,
        setCurrentIndex:setCurrentIndex,
        receivedPlaylistURL:receivedPlaylistURL,
        setReceivedPlaylistURL:setReceivedPlaylistURL,
        isLoading:isLoading,
        setIsLoading:setIsLoading,
        openModal:openModal,
        setOpenModal:setOpenModal,
        openModalForPlaylist:openModalForPlaylist,
        setOpenModalForPlaylist:setOpenModalForPlaylist,
        openModalForHelp:openModalForHelp,
        setOpenModalForHelp:setOpenModalForHelp,
        openModalForSearch:openModalForSearch,
        setOpenModalForSearch:setOpenModalForSearch,
        suggestedPlaylistFlag:suggestedPlaylistFlag,
        setSuggestedPlaylistFlag:setSuggestedPlaylistFlag,
        suggestedPlaylistLength:suggestedPlaylistLength,
        setSuggestedPlaylistLength:setSuggestedPlaylistLength,
        videoDetails:videoDetails,
        setVideoDetails:setVideoDetails,
        inputUrl:inputUrl,
        setInputUrl:setInputUrl,
        dataFetchedForFirstURL:dataFetchedForFirstURL,
        setDataFetchedForFirstURL:setDataFetchedForFirstURL,
        previousUrlIndex:previousUrlIndex,
        setPreviousUrlIndex:setPreviousUrlIndex,
        theme:theme,
        setTheme:setTheme,
        toggleTheme:toggleTheme,
        isPlaylistLoadedForFirstTime:isPlaylistLoadedForFirstTime,
        setIsPlaylistLoadedForFirstTime:setIsPlaylistLoadedForFirstTime,
        localFetchOne:localFetchOne,
        setLocalFetchOne:setLocalFetchOne,
        localFetchTwo:localFetchTwo,
        setLocalFetchTwo:setLocalFetchTwo,
        playlistFromLocal:playlistFromLocal,
        setPlaylistFromLocal:setPlaylistFromLocal,
        flagForFirstSingleVideoFetch:flagForFirstSingleVideoFetch,
        SetFlagForFirstSingleVideoFetch:SetFlagForFirstSingleVideoFetch,
        tempPlaylistLength:tempPlaylistLength,
        setTempPlaylistLength:setTempPlaylistLength,
        displayDefaultImgForSearch:displayDefaultImgForSearch,
        setDisplayDefaultImgForSearch:setDisplayDefaultImgForSearch,
        isLoadingForSearch:isLoadingForSearch,
        setIsLoadingForSearch:setIsLoadingForSearch,
        youtubeSearchFlag:youtubeSearchFlag,
        setYoutubeSearchFlag:setYoutubeSearchFlag,
        youtubeSearchQuery:youtubeSearchQuery,
        setYoutubeSearchQuery:setYoutubeSearchQuery,
        dataFetchedSuccess:dataFetchedSuccess,
        setDataFetchedSuccess:setDataFetchedSuccess,
        searchDataAfterFetch:searchDataAfterFetch,
        setSearchDataAfterFetch:setSearchDataAfterFetch,
        serviceIsDownTodayFlag:serviceIsDownTodayFlag,
        setServiceIsDownTodayFlag:setServiceIsDownTodayFlag,
        urlIsInvalid:urlIsInvalid,
        playlistFlag:playlistFlag,
        handleChange:handleChange,
        enqueue:enqueue,
        successToast:successToast,
        errorToast:errorToast,
        warningToast:warningToast,
        handleModalOpen:handleModalOpen,
        getShuffledUrlData:getShuffledUrlData,
        getNextItem:getNextItem,
        getPreviousItem:getPreviousItem,
        clearList:clearList,
        getNextUrlData:getNextUrlData,
        saveToLocal:saveToLocal,
        handleLocalStorageFetch:handleLocalStorageFetch,
        modalForPageRefresh:modalForPageRefresh,
        setModalForPageRefresh:setModalForPageRefresh,

    }

  return (
    <topLevelContext.Provider value={contextValue}>
      {children}
    </topLevelContext.Provider>
  )
}

export default Context
