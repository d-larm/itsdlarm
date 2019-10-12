import React from 'react';
import DefaultArt from '../assets/logo-trans-black.png'
import './Track.css';

const Track = ( { id, image = DefaultArt, name, url, onClick } ) => {
  return (
    <div className="track" onClick={()=> onClick( url )}>
      <img className="track-image" src={image} alt="track" />
      <div className="track-name">{name}</div>
    </div>
  );
}

export default Track;
