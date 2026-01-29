import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './sign-up8.css'

const SignUp8 = (props) => {
  return (
    <div className="sign-up8-container1">
      <div className="sign-up8-max-width thq-section-max-width">
        <div className="sign-up8-form-root">
          <div className="sign-up8-form1">
            <div className="sign-up8-title-root">
              <h2 className="sign-up8-text10 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="sign-up8-text22">Sign up</span>
                  </Fragment>
                )}
              </h2>
              <div className="sign-up8-have-an-account-login1"></div>
            </div>
            <form className="sign-up8-form2">
              <div className="sign-up8-email">
                <label htmlFor="thq-sign-up-8-email" className="thq-body-large">
                  Email
                </label>
                <input
                  type="email"
                  id="thq-sign-up-8-email"
                  required="true"
                  placeholder="Email address"
                  className="sign-up8-textinput thq-input thq-body-large"
                />
              </div>
            </form>
            <div className="sign-up8-container2">
              <p className="sign-up8-text12 thq-body-large">
                By creating an account, you agree to the Terms of use and
                Privacy Policy.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <button type="submit" className="sign-up8-button thq-button-filled">
              <span className="sign-up8-text13 thq-body-small">
                {props.action1 ?? (
                  <Fragment>
                    <span className="sign-up8-text25">Sign up</span>
                  </Fragment>
                )}
              </span>
            </button>
            <div className="sign-up8-have-an-account-login2">
              <p className="thq-body-large">Already have an account? Sign in</p>
            </div>
          </div>
        </div>
        <div className="sign-up8-container3 thq-section-padding">
          <div className="sign-up8-list">
            <h2 className="sign-up8-text15 thq-heading-2">
              {props.heading2 ?? (
                <Fragment>
                  <span className="sign-up8-text26">Your plan includes</span>
                </Fragment>
              )}
            </h2>
            <div className="sign-up8-list-item1">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
              <p className="sign-up8-text16 thq-body-large">
                {props.content1 ?? (
                  <Fragment>
                    <span className="sign-up8-text20">
                      Feature text goes here
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="sign-up8-list-item2">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
              <p className="sign-up8-text17 thq-body-large">
                {props.content2 ?? (
                  <Fragment>
                    <span className="sign-up8-text23">
                      Feature text goes here
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="sign-up8-list-item3">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
              <p className="sign-up8-text18 thq-body-large">
                {props.content3 ?? (
                  <Fragment>
                    <span className="sign-up8-text21">
                      Feature text goes here
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
            <div className="sign-up8-list-item4">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
              <p className="sign-up8-text19 thq-body-large">
                {props.content4 ?? (
                  <Fragment>
                    <span className="sign-up8-text24">
                      Feature text goes here
                    </span>
                  </Fragment>
                )}
              </p>
            </div>
          </div>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1527769929977-c341ee9f2033?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDM0NHx8YWJzdHJhY3R8ZW58MHx8fHwxNzEyOTM3OTkzfDA&amp;ixlib=rb-4.0.3&amp;w=1400"
            className="sign-up8-image thq-img-ratio-1-1"
          />
          <div className="sign-up8-container4"></div>
        </div>
      </div>
    </div>
  )
}

SignUp8.defaultProps = {
  content1: undefined,
  content3: undefined,
  heading1: undefined,
  content2: undefined,
  content4: undefined,
  action1: undefined,
  heading2: undefined,
}

SignUp8.propTypes = {
  content1: PropTypes.element,
  content3: PropTypes.element,
  heading1: PropTypes.element,
  content2: PropTypes.element,
  content4: PropTypes.element,
  action1: PropTypes.element,
  heading2: PropTypes.element,
}

export default SignUp8
