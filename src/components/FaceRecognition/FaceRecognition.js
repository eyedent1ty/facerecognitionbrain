import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const { topRow, rightCol, bottomRow, leftCol } = box;
  return imageUrl === '' ?
    <div></div> :
    <div className="center ma">
      <div className="absolute mt2">
        <img id="input-image" src={imageUrl} alt="" width="500px" height="auto" />
        <div className="bounding-box" style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
      </div>
    </div>
};

export default FaceRecognition;