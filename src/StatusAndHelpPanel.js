import React from 'react'
import QueueStatus from './QueueStatus'
 
const StatusAndHelpPanel = ({urlArray,currentIndex}) => {
  return (
    <div className='flex flex-row w-full justify-end items-center  '>
    <div className='w-auto'>
    {
      urlArray.length !== 0 && <QueueStatus urlArray={urlArray} currentIndex={currentIndex}/>
    }
    </div>
    
    </div>
  )
}

export default StatusAndHelpPanel
