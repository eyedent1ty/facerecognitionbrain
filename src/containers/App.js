import React, { Component }from 'react';
import Particles from 'react-tsparticles';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';


const tsParticlesOption = {
  fpsLimit: 140,
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 150,
    },
    opacity: {
      value: 0.2,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {}
};

class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  };

  calculateFaceLocation = (data) => {
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightCol: width - (faceLocation.right_col * width),
      bottomRow: height - (faceLocation.bottom_row * height)
    }
  };

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({ isSignedIn: true })
    } else {
      console.log(this.state)
      console.log(initialState);
      console.log(this.state === initialState);
      this.setState(initialState)
    }
    this.setState({ route: route })
  };

  displayFaceBox = (box) => {
    this.setState({ box : box })
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  loadUser = data => {
    const { id, name, email, entries, joined } = data;
    this.setState({ user: {
      id,
      name,
      email,
      entries,
      joined
    }});
  }

  onButtonClick = () => {
    // After the this function, the setState will take effects
    this.setState({ imageUrl: this.state.input });
  
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    if(this.state.input !== '') {
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
        .then(result => {
          if(result){
            fetch('http://localhost:3000/image', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id: this.state.user.id})
            })
              .then(response => response.json())
              .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
              .catch(err => console.log(err))
          }
          this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)))
        })
        .catch(error => console.log('error', error));
    }
  };

  render(){

    const { route, box, imageUrl, isSignedIn } = this.state;
    const { name, entries } = this.state.user;

    return (
      <div className="App">
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={isSignedIn}
        />
        <Particles options={tsParticlesOption}/>
        { route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : route === 'register' ?
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          :<div>
            <Logo />
            <Rank name={name} entries={entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        }
      </div>
    );
  }
};

export default App;
