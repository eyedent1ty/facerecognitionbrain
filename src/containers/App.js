import React, { Component }from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    };
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  };

  onButtonClick = () => {
    // After the this function, the setState will take effects
    this.setState({ imageUrl: this.state.input });
  
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "v0dw3n646hy0",
        "app_id": "fa7832ae6ff04de08201f737d7a546b4"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": `${this.state.input}`
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key e61ae0cf2fa446dfadd12f1899387553'
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/45fb9a671625463fa646c3523a3087d5/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  };

  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
};

export default App;
