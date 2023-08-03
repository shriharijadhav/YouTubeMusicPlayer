import React, { useContext } from 'react'
import QueueStatus from './QueueStatus'
import { topLevelContext } from '../Context'
 
const StatusAndHelpPanel = () => {
  const {urlArray} = useContext(topLevelContext);
  return (
    <div className='flex flex-row w-full justify-end items-center  '>
    <div className='w-auto'>
    {
      urlArray.length !== 0 && <QueueStatus/>
    }
    </div>
    
    </div>
  )
}

export default StatusAndHelpPanel
