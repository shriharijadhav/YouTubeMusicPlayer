import React, { useContext } from 'react'
import ListOfSearchedVideos from './ListOfSearchedVideos'
import imgForSearchIcon from '../images/Search.svg'
import { topLevelContext } from '../Context'
 
const ModalForSearch = () => {

  const {setOpenModalForSearch,youtubeSearchQuery,setYoutubeSearchFlag,setYoutubeSearchQuery,setDisplayDefaultImgForSearch} = useContext(topLevelContext);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setDisplayDefaultImgForSearch(false);
        setYoutubeSearchFlag(true);
    };
    const handleSearchInput = (event) => {
        setYoutubeSearchQuery((prev)=>event.target.value)
     };
  return (
    <div>
    <div className='modalBackground '>
    <div className='modalContainer  dark:bg-gray-400 bg-indigo-300 dark:text-indigo-900 text-indigo-900 w-10/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 mx-auto flex flex-col gap-5 z-50 p-5 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
  
       <div className='flex flex-row  w-full justify-end items-center border-b-2 p-3 '>
          <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900 md:px-2 '>
          <div className='text-xl font-bold'>Search directly from Youtube </div>
          <div className='text-xl cursor-pointer'onClick={()=>setOpenModalForSearch(false)} title='close'>X</div>
          </div>
      </div>
 
      <div className='flex flex-row w-full mt-5'>
         <form onSubmit={handleSearchSubmit}  className='flex flex-row justify-center items-center w-full'>
            <input value={youtubeSearchQuery} type='text' name='' id='searchbar' required className='relative shadow-md h-12 bg-grey-50 w-full md:w-2/3 rounded-l-xl pl-5 pr-2 bg-gray-100 dark:dark:bg-gray-800   outline-none  text-gray-900 dark:text-gray-300' placeholder='Please enter here...'
              onChange={handleSearchInput} />
            <button type='submit'  className='inline-block px-4 h-12 -ml-1 mr-2 shadow-lg   text-center text-white uppercase transition duration-200 ease-in-out bg-indigo-500 rounded-r-xl cursor-pointer outline-none hover:bg-indigo-600  font-semibold' title='Click to Search'>
           <div className='flex'>
            <img src={imgForSearchIcon} alt='Search Icon' className='h-10 w-10'  />
            </div>
            </button>
        </form>
    </div>

 
    <ListOfSearchedVideos />
 
    </div>
  </div>
);
    </div>
  )
}

export default ModalForSearch
