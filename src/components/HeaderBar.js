import React, { useContext } from 'react';
// import search from '../images/Search.svg'
// import SearchIcon from './SearchIcon';
import { topLevelContext } from '../Context';

const HeaderBar = () => {

 
 const {inputUrl,handleChange, enqueue} = useContext(topLevelContext);

  return (
    <div className='pt-2 flex justify-center items-center -z-10'>
   
        <form onSubmit={enqueue}  className='flex w-full px-2 -z-50 '>
            <input type='text' name='' id='searchbar' required className='relative shadow-md h-12 bg-grey-50 w-full z-10 rounded-l-xl pl-3  bg-gray-100 dark:dark:bg-gray-900   outline-none  text-gray-900 dark:text-gray-300' placeholder='Enter Youtube Video/Playlist URL & click (+)'
            value={inputUrl} onChange={handleChange} />
            <button type='submit'  className='inline-block px-4 h-12 -ml-1 mr-0 shadow-md text-center text-white uppercase transition duration-200 ease-in-out bg-indigo-500 rounded-r-xl cursor-pointer outline-none hover:bg-indigo-600  font-semibold' title='Add Song/Playlist'>+
            </button>
    </form>
</div>
  );
};

export default HeaderBar;
