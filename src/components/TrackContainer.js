import React from 'react';
import './Container.css';

const TrackContainer = ( { title, children } ) => {
  return (
    <div className="track-container">
      {/* <div className="container-title">{title}</div> */}
      <i className="fas fa-chevron-circle-left track-container-left"></i>
      {children}
      <i className="fas fa-chevron-circle-right track-container-right"></i>
    </div>
  );
}

export default TrackContainer;
