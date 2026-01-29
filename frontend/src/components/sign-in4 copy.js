import React, { Fragment, useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { mapUserDataToUserModel } from '../utils/mapper';
import './sign-in4.css'

const SignIn4 = (props) => {
  useEffect(() => {
      // Nettoyer les données à chaque fois qu'on arrive sur la page de login
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('email');
      sessionStorage.clear(); // facultatif
    }, []);
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.user.email);
        const user = mapUserDataToUserModel(data.user);
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        
        console.log('Utilisateur connecté :', data.user);
        console.log('Token :', data.token);
        alert('Bienvenue ' + data.user.nom);
        
        // Redirection possible ici :
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert("Échec de la connexion. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="sign-in4-container1 thq-section-padding">
      <div className="sign-in4-max-width thq-section-padding thq-section-max-width">
        <div className="sign-in4-form-root">
          <div className="sign-in4-form1">
            <div className="sign-in4-container2">
              <h2 className="sign-in4-text10 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="sign-in4-text20">
                      Welcome back! Sign in to access your account.
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="sign-in4-text11 thq-body-large">
                Vous n'avez pas un compte? <a href="/inscription" className="thq-body thq-link-a">S'inscrire</a>
              </p>
              <p className="sign-in4-text11 thq-body-large">
                <a href="/business" className="thq-body thq-link-a-pro">S'inscrire en tant que professionnel</a>
              </p>
            </div>
            <div className="sign-in4-container3">
              <button className="sign-in4-button1 thq-button-outline">
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  className="sign-in4-icon1"
                >
                  <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
                </svg>
                <span className="thq-body-small">Continue with Facebook</span>
              </button>
              <button className="sign-in4-button2 thq-button-outline" id="google-sign-in-button">
                <svg
                  viewBox="0 0 860.0137142857142 1024"
                  className="sign-in4-icon3"
                >
                  <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
                </svg>
                <span className="thq-body-small">Continue with Google</span>
              </button>
            </div>
            <div className="sign-in4-divider1">
              <div className="sign-in4-divider2"></div>
              <p className="thq-body-large">OR</p>
              <div className="sign-in4-divider3"></div>
            </div>
            <form className="sign-in4-form2" onSubmit={handleLogin}>
              <div className="sign-in4-email">
                <label htmlFor="thq-sign-in-4-email" className="thq-body-large">
                  Email
                </label>
                <input
                  type="email"
                  id="thq-sign-in-4-email"
                  required={true}
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état email
                  className="sign-in4-textinput1 thq-input thq-body-large"
                />
              </div>
              <div className="sign-in4-password">
                <div className="sign-in4-container4">
                  <label
                    htmlFor="thq-sign-in-4-password"
                    className="thq-body-large"
                  >
                    Password
                  </label>
                  <div className="sign-in4-hide-password">
                    <svg viewBox="0 0 1024 1024" className="sign-in4-icon5">
                      <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"></path>
                    </svg>
                  </div>
                </div>
                <input
                  type="password"
                  id="thq-sign-in-4-password"
                  required={true}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état password
                  className="sign-in4-textinput2 thq-input thq-body-large"
                />
                <div className="sign-in4-container5">
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer noopener"
                    className="sign-in4-link thq-body-small thq-link-a-pro"
                  >
                    Mot de passe oublié
                  </a>
                </div>
              </div>
              <div className="sign-in4-container6">
              <button
                type="submit"
                className="sign-in4-button3 thq-button-filled"
              >
                <span className="sign-in4-text18 thq-body-small">
                  {props.action1 ?? (
                    <Fragment>
                      <span className="sign-in4-text19">Sign In</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            </form>
            
          </div>
        </div>
      </div>
      <img
        alt={props.image1Alt}
        src={props.image1Src}
        className="sign-in4-sign-up-image thq-img-ratio-16-9"
      />
      <div className="sign-in4-container7"></div>
    </div>
  )
}

SignIn4.defaultProps = {
  image1Src:
    'https://images.unsplash.com/flagged/photo-1574791396404-25cdf41cffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMzAzOXw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Sign In Image',
  action1: undefined,
  heading1: undefined,
}

SignIn4.propTypes = {
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  action1: PropTypes.element,
  heading1: PropTypes.element,
}

export default SignIn4

