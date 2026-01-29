import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './sign-up10.css'

const SignUp10 = (props) => {
  return (
    <div className="sign-up10-container1">
      <img
        alt={props.image1Alt}
        src={props.image1Src}
        className="sign-up10-sign-up-image thq-img-ratio-16-9"
      />
      <div className="sign-up10-container2"></div>
      <div className="sign-up10-form-root thq-section-padding">
        <div className="sign-up10-form1 thq-section-padding">
          <div className="sign-up10-title-root">
            <h2 className="sign-up10-text1 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="sign-up10-text8">
                    Join Our Platform Today
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="thq-body-large sign-up10-text2">
              Already have an account? Sign in
            </p>
          </div>
          <form className="sign-up10-form2">
            <div className="sign-up10-email">
              <label htmlFor="thq-sign-up-10-email" className="thq-body-large">
                Email
              </label>
              <input
                type="email"
                id="thq-sign-up-10-email"
                required="true"
                placeholder="Email address"
                className="sign-up10-textinput1 thq-input thq-body-large"
              />
            </div>
            <div className="sign-up10-password">
              <div className="sign-up10-textfield">
                <div className="sign-up10-container3">
                  <label
                    htmlFor="thq-sign-up-10-password"
                    className="thq-body-large"
                  >
                    Password
                  </label>
                  <div className="sign-up10-hide-password">
                    <svg viewBox="0 0 1024 1024" className="sign-up10-icon1">
                      <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"></path>
                    </svg>
                    <span className="thq-body-small">Hide</span>
                  </div>
                </div>
                <input
                  type="password"
                  id="thq-sign-up-10-password"
                  required="true"
                  placeholder="Password"
                  className="sign-up10-textinput2 thq-input thq-body-large"
                />
              </div>
            </div>
          </form>
          <button type="submit" className="sign-up10-button1 thq-button-filled">
            <span className="sign-up10-text6 thq-body-small">
              {props.action1 ?? (
                <Fragment>
                  <span className="sign-up10-text9">Create Your Account</span>
                </Fragment>
              )}
            </span>
          </button>
          <div className="sign-up10-divider1">
            <div className="sign-up10-divider2"></div>
            <p className="thq-body-large">Or continue with</p>
            <div className="sign-up10-divider3"></div>
          </div>
          <div className="sign-up10-container4">
            <button
              aria-label="Sign up with Facebook"
              className="sign-up10-button2 thq-button-outline"
            >
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="sign-up10-icon3"
              >
                <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
              </svg>
            </button>
            <button
              aria-label="Sign up with Google"
              className="sign-up10-button3 thq-button-outline"
            >
              <svg viewBox="0 0 1024 1024" className="sign-up10-icon5">
                <path d="M522.2 438.8v175.6h290.4c-11.8 75.4-87.8 220.8-290.4 220.8-174.8 0-317.4-144.8-317.4-323.2s142.6-323.2 317.4-323.2c99.4 0 166 42.4 204 79l139-133.8c-89.2-83.6-204.8-134-343-134-283 0-512 229-512 512s229 512 512 512c295.4 0 491.6-207.8 491.6-500.2 0-33.6-3.6-59.2-8-84.8l-483.6-0.2z"></path>
              </svg>
            </button>
            <button
              aria-label="Sign up with Apple"
              className="sign-up10-button4 thq-button-outline"
            >
              <svg
                viewBox="0 0 796.0137142857142 1024"
                className="sign-up10-icon7"
              >
                <path d="M796 694.286c-14.286 45.143-37.143 93.143-70.286 142.857-49.143 74.857-98.286 112-146.857 112-19.429 0-45.714-6.286-80-18.286-33.714-12.571-62.857-18.286-86.286-18.286-22.857 0-50.286 6.286-81.143 18.857-31.429 13.143-56.571 19.429-75.429 19.429-58.857 0-115.429-49.714-172-148-55.429-98.286-84-193.714-84-287.429 0-87.429 21.714-158.286 64.571-213.714 42.857-54.857 96.571-82.286 162.286-82.286 28 0 61.143 5.714 101.143 17.143 39.429 11.429 65.714 17.143 78.857 17.143 16.571 0 44-6.286 81.714-19.429 37.714-12.571 70.857-19.429 98.857-19.429 45.714 0 86.286 12.571 121.714 37.143 20 13.714 40 33.143 59.429 57.143-29.714 25.143-51.429 47.429-65.143 67.429-24.571 35.429-37.143 74.857-37.143 118.286 0 46.857 13.143 89.714 39.429 127.429s56.571 61.714 90.286 72zM581.143 24c0 23.429-5.714 49.714-16.571 77.714-11.429 28.571-29.143 54.857-53.143 78.857-20.571 20.571-41.143 34.286-61.714 41.143-13.143 4-32.571 7.429-59.429 9.714 1.143-56.571 16-105.714 44.571-146.857s76.571-69.143 142.857-84.571c1.143 5.143 2.286 9.143 2.857 12.571 0 4 0.571 7.429 0.571 11.429z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

SignUp10.defaultProps = {
  heading1: undefined,
  image1Alt: 'Sign Up Image',
  action1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMjkzOHw&ixlib=rb-4.0.3&q=80&w=1080',
}

SignUp10.propTypes = {
  heading1: PropTypes.element,
  image1Alt: PropTypes.string,
  action1: PropTypes.element,
  image1Src: PropTypes.string,
}

export default SignUp10
