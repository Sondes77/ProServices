import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './sign-up5.css'

const SignUp5 = (props) => {
  return (
    <div className="sign-up5-container1">
      <div className="sign-up5-max-width thq-section-max-width">
        <div className="sign-up5-container2">
          <img
            alt={props.image1Alt}
            src={props.image1Src}
            className="sign-up5-sign-up-image thq-img-ratio-4-6"
          />
        </div>
        <div className="sign-up5-form-root thq-section-padding">
          <div className="sign-up5-form">
            <div className="sign-up5-title-root">
              <h2 className="sign-up5-text10 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="sign-up5-text21">Create an account</span>
                  </Fragment>
                )}
              </h2>
              <div className="sign-up5-have-an-account-login1">
                <p className="sign-up5-text11 thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="sign-up5-text20">
                        Sign up for free and create your first project
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
            </div>
            <div className="sign-up5-container3">
              <button className="sign-up5-button1 thq-button-outline">
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  className="sign-up5-icon1"
                >
                  <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
                </svg>
                <span className="thq-body-small">
                  {props.action2 ?? (
                    <Fragment>
                      <span className="sign-up5-text18">
                        Continue with Facebook
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button className="sign-up5-button2 thq-button-outline">
                <svg
                  viewBox="0 0 860.0137142857142 1024"
                  className="sign-up5-icon3"
                >
                  <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
                </svg>
                <span className="thq-body-small">
                  {props.action3 ?? (
                    <Fragment>
                      <span className="sign-up5-text17">
                        Continue with Google
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="sign-up5-divider1">
              <div className="sign-up5-divider2"></div>
              <p className="thq-body-large">OR</p>
              <div className="sign-up5-divider3"></div>
            </div>
            <button className="sign-up5-button3 thq-button-filled">
              <span className="sign-up5-text15 thq-body-small">
                {props.action1 ?? (
                  <Fragment>
                    <span className="sign-up5-text19">Sign up with email</span>
                  </Fragment>
                )}
              </span>
            </button>
            <div className="sign-up5-have-an-account-login2">
              <p className="thq-body-large">Already have an account? Sign in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SignUp5.defaultProps = {
  action3: undefined,
  action2: undefined,
  image1Alt: 'SignUp Image',
  action1: undefined,
  content1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1638734254932-657721b67e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMjg0N3w&ixlib=rb-4.0.3&q=80&w=1080',
  heading1: undefined,
}

SignUp5.propTypes = {
  action3: PropTypes.element,
  action2: PropTypes.element,
  image1Alt: PropTypes.string,
  action1: PropTypes.element,
  content1: PropTypes.element,
  image1Src: PropTypes.string,
  heading1: PropTypes.element,
}

export default SignUp5
