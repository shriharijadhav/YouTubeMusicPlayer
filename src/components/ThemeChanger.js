import React, { useContext } from 'react'
import { topLevelContext } from '../Context';

const ToggleTheme = () => {
  const {toggleTheme} = useContext(topLevelContext);
  return (
    <div>
    <label htmlFor='toggle' >
    <input className='input ' id='toggle' type='checkbox'  onClick={toggleTheme} />
    <div className='toggle-wrapper dark:bg-gray-800 bg-indigo-300 hover:bg-indigo-400 shadow-sm  shadow-slate-400' title='Your eyes will thank you for staying on dark mode 💛'> <span className='selector'></span></div>
    </label>
    </div>
  )
}

export default ToggleTheme;
