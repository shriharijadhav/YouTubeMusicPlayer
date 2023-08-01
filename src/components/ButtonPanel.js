import React, {   } from 'react'
import left from '../images/leftArrowCopy.svg'
import right from '../images/rightArrowCopy.svg'
import shuffle from '../images/shuffle.svg'
import clearQueue from '../images/clearQueue.svg'
import saveToLocal from '../images/saveToLocalFinal.svg'
// for tooltip



const ButtonPanel = ({getPreviousItem,getNextItem,clearList,getShuffledUrlData,urlArray,handleModalOpen}) => {
      
  return (
    <div className='flex flex-row  pt-2  items-center justify-evenly'>
 
        <div>
            <button title='Previous Song' className='hover:scale-105 transition-all duration-100' onClick={getPreviousItem}>

                <img src={left} alt='Previous Song btn' className='w-full h-full object-cover controlButton'  draggable={false}/>
            </button>
        </div>
        
        <div>
            <button title='Next Song'className='hover:scale-105 transition-all duration-100' onClick={getNextItem}>
                <img src={right} alt='Next Song btn' className='w-full h-full object-cover controlButton' draggable={false} />
            </button>
        </div>
         
        <div >
            <button title='Shuffle'className='hover:scale-105 transition-all duration-100' onClick={getShuffledUrlData}>
                <img src={shuffle} alt='Shuffle btn' className='ring-4 ring-[#6366F1] ring-inset rounded-full p-2 controlButton  ' draggable={false} />
            </button>
        </div>
        
        <div>
            <button title='Clear Queue'className='hover:scale-105 transition-all duration-100' onClick={clearList}>
                <img src={clearQueue} alt='Clear Queue btn' className='w-full h-full object-cover controlButton' draggable={false} />
            </button>
        </div>

        <div >
        <button title='Save to Local' className='hover:scale-105 transition-all duration-100' onClick={handleModalOpen}>
            <img src={saveToLocal} alt='Clear Queue btn' className=' ring-4 ring-[#6366F1] ring-inset rounded-full object-cover p-2 controlButton'  draggable={false}/>
        </button>
    </div>
        
        
    </div>
  )
}

export default ButtonPanel
