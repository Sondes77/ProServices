import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './hero9.css'

const Hero9 = (props) => {
  return (
    <div className="hero9-header30 thq-section-padding">
      <img
        alt={props.image1Alt}
        src={props.image1Src}
        className="hero9-image"
      />
      <div className="hero9-container"></div>
      <div className="hero9-max-width thq-section-max-width">
        <div className="hero9-content">
          <h1 className="hero9-text1 thq-heading-1">
            {props.heading1 ?? (
              <Fragment>
                <span className="hero9-text5">
                  Custom Web Development Solutions
                </span>
              </Fragment>
            )}
          </h1>
          <p className="hero9-text2 thq-body-large">
            {props.content1 ?? (
              <Fragment>
                <span className="hero9-text6">
                  Get tailored web development services to meet your unique
                  business needs.
                </span>
              </Fragment>
            )}
          </p>
          <div className="hero9-actions">
            <button className="thq-button-filled hero9-button1">
              <span className="hero9-text3 thq-body-small">
                {props.action1 ?? (
                  <Fragment>
                    <span className="hero9-text8">Contact Me</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline hero9-button2">
              <span className="hero9-text4 thq-body-small">
                {props.action2 ?? (
                  <Fragment>
                    <span className="hero9-text7">View Portfolio</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Hero9.defaultProps = {
  heading1: undefined,
  content1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMDc4Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  action2: undefined,
  image1Alt: 'Web Development',
  action1: undefined,
}

Hero9.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  image1Src: PropTypes.string,
  action2: PropTypes.element,
  image1Alt: PropTypes.string,
  action1: PropTypes.element,
}

export default Hero9
