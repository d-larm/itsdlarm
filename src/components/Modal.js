import React, { useContext } from 'react';
import SpotifyContext from '../SpotifyContext'
import './Modal.css';

const Modal = ( { hidden, setHidden, setUrl } ) => {
  const url = useContext( SpotifyContext )
  const style = ( hidden ) =>  hidden ?  { display: 'none' } : { display: 'block' }
  const embedUrl = url && url.slice( 0, url.indexOf( '.com' ) + 4 ) + '/embed' + url.slice( url.indexOf( '.com' ) + 4 )
  //console.log( embedUrl )

  const closeModal = () => {
    setHidden( true )
    // setUrl ( '' )
  }
  
  return (
    <div className="track-modal" style={style( hidden )} onClick={() => closeModal()}>
      <iframe title={url} frameBorder={0} width="300" height="300" className="track-modal-frame" src={embedUrl} allow="encrypted-media" allowFullScreen />
    </div>
  );
}

export default Modal;
