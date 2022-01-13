import React from 'react';

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signUpName: '',
      signUpEmail: '',
      signUpPassword: ''    
    }
  }

  onNameChange = event => {
    this.setState({ signUpName: event.target.value });
  }

  onEmailChange = event => {
    this.setState({ signUpEmail: event.target.value });
  }

  onPasswordChange = event => {
    this.setState({ signUpPassword: event.target.value });
  }

  onClickSubmit = () => {
    const { signUpName, signUpEmail, signUpPassword } = this.state;
    const { loadUser, onRouteChange } = this.props;
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        loadUser(data);
        if(data.email != undefined){
          onRouteChange('home');
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return(
      <article className="shadow-3 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name"  
                  id="name" 
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onClickSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
              />
            </div>
        </div>
      </main>
      </article>
    );
  }

};

export default Register;