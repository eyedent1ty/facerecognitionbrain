import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return imageUrl === '' ?
    <div></div> :
    <div className="mt2">
      <img 
        src={imageUrl}
        alt="predicted-pic"
        width="500px"
        height="auto"
      />
    </div>
};

export default FaceRecognition;