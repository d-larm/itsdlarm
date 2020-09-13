import React, { useContext } from 'react';
import DefaultArt from '../assets/logo-trans-black.png'
import './Track.css';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyContext from '../SpotifyContext';

const Track = ( { id, image = DefaultArt, name, url, onClick } ) => {
  const activeUrl = useContext( SpotifyContext )

  return (
    <div id={id} className="track" onClick={() => onClick( url )}>
      <img className="track-image" src={image} alt="track" />
      <div className="track-name">{name}</div>
      {activeUrl === url && <div className='track-overlay'><FontAwesomeIcon icon={faPlay} /></div>}
    </div>
  );
}

export default Track;
