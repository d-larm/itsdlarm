import React from 'react';
import './Container.css';

const Container = ( { title, children } ) => {
  return (
    <div className="container">
      <div className="container-title">{title}</div>
      {children}
    </div>
  );
}

export default Container;
