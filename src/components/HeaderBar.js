import React, {   } from 'react';
import search from '../images/Search.svg'
 import SearchIcon from '../SearchIcon';

const HeaderBar = ({inputUrl,handleChange, enqueue,setOpenModalForSearch}) => {

 
 

  return (
    <div className='pt-2 flex justify-center items-center'>
    <button className='p-1 bg-indigo-500  text-indigo-50 rounded-full mx-2 hover:bg-indigo-600 transform transition-all ease-in-out' >
     <SearchIcon imagePath={search} title={'Search Videos'} setOpenModalForSearch={setOpenModalForSearch} />
    </button>
        <form onSubmit={enqueue}  className='flex'>
            <input type='text' name='' id='searchbar' required className='relative shadow-md h-12 bg-grey-50 w-72 z-10 rounded-l-xl pl-5 pr-2 bg-gray-100 dark:dark:bg-gray-900   outline-none  text-gray-900 dark:text-gray-300' placeholder='Enter Youtube Video/Playlist URL'
            value={inputUrl} onChange={handleChange} />
            <button type='submit'  className='inline-block px-4 h-12 -ml-1 mr-2 shadow-md text-center text-white uppercase transition duration-200 ease-in-out bg-indigo-500 rounded-r-xl cursor-pointer outline-none hover:bg-indigo-600  font-semibold' title='Add Song/Playlist'>+
            </button>
    </form>
</div>
  );
};

export default HeaderBar;
