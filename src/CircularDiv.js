import React from 'react';

const CircularDiv = ({ backgroundColor, imagePath,title,socialProfileUrl }) => {
  const divStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    cursor:'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleDivClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
    <div className="flex items-center justify-center" style={divStyle} title={`${title}`} onClick={() => handleDivClick(`${socialProfileUrl}`)} >
    <img src={imagePath} className='scale-125' alt='SearchIcon' />
    </div>
    </div>
  )
 
  
};

export default CircularDiv;
