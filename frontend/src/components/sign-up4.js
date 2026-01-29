import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './sign-up4.css'

const SignUp4 = (props) => {
  return (
    <div className="sign-up4-container1">
      <img
        alt={props.image1Alt}
        src={props.image1Src}
        className="sign-up4-sign-up-image thq-img-ratio-16-9"
      />
      <div className="sign-up4-container2"></div>
      <div className="sign-up4-max-width thq-section-max-width">
        <div className="sign-up4-form1 thq-section-padding">
          <div className="sign-up4-title-root">
            <h2 className="sign-up4-text10 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="sign-up4-text24">Create an account</span>
                </Fragment>
              )}
            </h2>
            <p className="thq-body-large sign-up4-text11">
              Already have an account? Sign in
            </p>
          </div>
          <div className="sign-up4-container3">
            <button className="sign-up4-button1 thq-button-outline">
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="sign-up4-icon1"
              >
                <path d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
              </svg>
              <span className="thq-body-small">
                {props.action2 ?? (
                  <Fragment>
                    <span className="sign-up4-text20">
                      Continue with Facebook
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="sign-up4-button2 thq-button-outline">
              <svg
                viewBox="0 0 860.0137142857142 1024"
                className="sign-up4-icon3"
              >
                <path d="M438.857 449.143h414.286c4 22.286 6.857 44 6.857 73.143 0 250.286-168 428.571-421.143 428.571-242.857 0-438.857-196-438.857-438.857s196-438.857 438.857-438.857c118.286 0 217.714 43.429 294.286 114.857l-119.429 114.857c-32.571-31.429-89.714-68-174.857-68-149.714 0-272 124-272 277.143s122.286 277.143 272 277.143c173.714 0 238.857-124.571 249.143-189.143h-249.143v-150.857z"></path>
              </svg>
              <span className="thq-body-small">
                {props.action3 ?? (
                  <Fragment>
                    <span className="sign-up4-text22">
                      Continue with Google
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
          <div className="sign-up4-divider1">
            <div className="sign-up4-divider2"></div>
            <p className="thq-body-large">OR</p>
            <div className="sign-up4-divider3"></div>
          </div>
          <span className="sign-up4-text15 thq-body-small">
            {props.content1 ?? (
              <Fragment>
                <span className="sign-up4-text23">
                  Enter your email address to create an account
                </span>
              </Fragment>
            )}
          </span>
          <form className="sign-up4-form2">
            <div className="sign-up4-email">
              <label htmlFor="thq-sign-up-4-email" className="thq-body-large">
                Email
              </label>
              <input
                type="email"
                id="thq-sign-up-4-email"
                required="true"
                placeholder="Email address"
                className="sign-up4-textinput thq-input thq-body-large"
              />
            </div>
          </form>
          <div className="sign-up4-container4">
            <div className="sign-up4-terms-agree">
              <input
                type="checkbox"
                id="thq-sign-up-4-terms"
                checked="true"
                className="thq-checkbox"
              />
              <label htmlFor="thq-sign-up-4-terms" className="thq-body-large">
                Agree to our Terms of use and Privacy Policy.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </label>
            </div>
            <div className="sign-up4-newsletter">
              <input
                type="checkbox"
                id="thq-sign-up-4-newsletter"
                checked="true"
                className="thq-checkbox"
              />
              <label
                htmlFor="thq-sign-up-4-newsletter"
                className="thq-body-large"
              >
                Subscribe to our newsletter
              </label>
            </div>
          </div>
          <button type="submit" className="sign-up4-button3 thq-button-filled">
            <span className="sign-up4-text19 thq-body-small">
              {props.action1 ?? (
                <Fragment>
                  <span className="sign-up4-text21">Create an account</span>
                </Fragment>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

SignUp4.defaultProps = {
  action2: undefined,
  action1: undefined,
  action3: undefined,
  content1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1585511582545-e2973bc3587a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMjgyNHw&ixlib=rb-4.0.3&q=80&w=1080',
  heading1: undefined,
  image1Alt: 'SignUp Image',
}

SignUp4.propTypes = {
  action2: PropTypes.element,
  action1: PropTypes.element,
  action3: PropTypes.element,
  content1: PropTypes.element,
  image1Src: PropTypes.string,
  heading1: PropTypes.element,
  image1Alt: PropTypes.string,
}

export default SignUp4
