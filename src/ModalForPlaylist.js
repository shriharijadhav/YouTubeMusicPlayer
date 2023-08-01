import React from 'react';
import PlayListSuggestions from './PlayListSuggestions';
  
function ModalForPlaylist({ setOpenModalForPlaylist,setUrlArray,urlArray,setSuggestedPlaylistFlag,setSuggestedPlaylistLength,successToast}) {
  return (
    <div className='modalBackground '>
      <div className='modalContainer  dark:bg-gray-400 bg-indigo-300 dark:text-indigo-900 text-indigo-900 w-10/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 mx-auto flex flex-col gap-5 z-50 p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    
      <div className='flex flex-row  w-full justify-end items-center border-b-2 p-3 '>
          <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900 md:px-10 '>
          <div className='text-xl font-bold'>Playlist Suggestion</div>
          <div className='text-xl cursor-pointer'onClick={()=>setOpenModalForPlaylist(false)} title='close'>X</div>
        </div>
        </div>
       
          <div>
          <PlayListSuggestions setUrlArray={setUrlArray} urlArray={urlArray} setOpenModalForPlaylist={setOpenModalForPlaylist} setSuggestedPlaylistFlag={setSuggestedPlaylistFlag} setSuggestedPlaylistLength={setSuggestedPlaylistLength} successToast={successToast}/>

          </div>

      </div>
    </div>
  );
}

export default ModalForPlaylist;