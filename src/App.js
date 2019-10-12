import React, { useState, useEffect } from 'react';
import { SpotifyProvider } from './SpotifyContext'
import Modal from './components/Modal'
import Header from './components/Header'
import Container from './components/Container'
import TrackContainer from './components/TrackContainer'
import Track from './components/Track'
import './App.css'
import './Align.css'
// import './backgrounds/Mist.css'


const App = () =>  {
  const [ tracks, setTracks ] = useState( [] )
  const [ url, setUrl ] = useState( null )
  const [ hideModal, setHideModal ] = useState( true )

  useEffect( () => {
    const getTracks = async () => {
      const albums = await fetch( '/alltracks' ).then( res => res.json() )
      console.log( albums )
      setTracks( albums )
    }

    getTracks()
  }, [] )

  const trackClick = ( url ) => {
    setUrl( url )
    setHideModal( false )
  }

  return (
    <SpotifyProvider value={ url } >
      <div className="App">
        <Header/>
        <Modal hidden={hideModal} setHidden={setHideModal} />
        <Container title='Music Collection'>
          <TrackContainer>
          { tracks.map( track => { return <Track {...track} onClick={trackClick} key={track.id} /> } )}
          </TrackContainer>
        </Container>
        {/* <Container title='Soundcloud'></Container> */}
      </div>
    </SpotifyProvider>
  );

}

export default App;
