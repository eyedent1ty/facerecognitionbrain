import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
        <div>
          <p className="f3">
            This Magic Brain will detect faces in your pictures.
            Git it a try.
          </p>
        </div>
        <div className="center">
          <div className="form pa4 br3 shadow-5 center">
            <input className="f4 pa2 w-70" type="text" onInput={onInputChange}/>
            <button 
              className="pa2 w-30 grow f4 link ph3 dib white bg-light-purple" 
              onClick={onButtonClick}>
              Detect
            </button>
          </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;