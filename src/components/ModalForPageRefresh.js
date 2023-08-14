import React, { useContext } from 'react';
 import { topLevelContext } from '../Context';
  
function ModalForPageRefresh() {
  const { setModalForPageRefresh} = useContext(topLevelContext);
  const { saveToLocal } = useContext(topLevelContext);

  return (
    <div className='modalBackground '>
      <div className='modalContainer  dark:bg-gray-400 bg-indigo-300 dark:text-indigo-900 text-indigo-900 w-10/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 mx-auto flex flex-col gap-5 z-50 p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    
      <div className='flex flex-row  w-full justify-end items-center border-b-2 p-3 '>
          <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900 md:px-0'>
          <div className='text-xl font-bold'>Page Refresh Manager</div>
          <div className='text-xl cursor-pointer'onClick={()=>setModalForPageRefresh(false)} title='close'>X</div>
        </div>
        </div>
       <div>Dear user, it seems you're attempting to refresh the page.</div>
       <div>Kindly be aware that any items currently added to your playlist will be lost if you proceed without saving the current playlist locally. </div>
       <div > We recommend <span className='underline decoration-wavy underline-offset-8'>saving your playlist </span> to avoid losing any changes.</div>
       <div className='flex flex-col md:flex-row lg:flex-row w-full justify-center gap-10 items-center text-xl '>
        <button className='dark:bg-indigo-500 bg-gray-300 p-3 rounded-2xl dark:text-gray-300 hover:dark:bg-indigo-600 hover:bg-gray-200' onClick={()=>{
          saveToLocal();
          setModalForPageRefresh(false);
        }}>Save current playlist</button>
       
      </div>

      </div>
    </div>
  );
}

export default ModalForPageRefresh;