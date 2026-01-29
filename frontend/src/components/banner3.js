import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import image from '../img/photo.png';
import './banner3.css'

const Banner3 = (props) => {
  return (
    <div className="banner3-container1 thq-section-padding">
      <img
        alt={props.image1Alt}
        src={image}
        className="banner3-image thq-img-ratio-16-9"
      />
      <div className="banner3-max-width thq-section-max-width">
        <div className="banner3-container2">
          <h2 className="banner3-title thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="banner3-text3">
                  Find Local Professionals for Your Needs
                </span>
              </Fragment>
            )}
          </h2>
          <h3 className="banner3-text1 thq-heading-3">
            {props.content1 ?? (
              <Fragment>
                <span className="banner3-text4">
                  Connect with trusted professionals in your area for various
                  services.
                </span>
              </Fragment>
            )}
          </h3>
        </div>
        <button type="button" className="thq-button-filled">
          <span>
            {props.action1 ?? (
              <Fragment>
                <span className="banner3-text5">Get Started</span>
              </Fragment>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

Banner3.defaultProps = {
  heading1: undefined,
  content1: undefined,
  action1: undefined,
  image1Src:
    'https://images.unsplash.com/photo-1550603101-e483a6b47e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NjM1NjU3OXw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Local Professionals',
}

Banner3.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action1: PropTypes.element,
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
}

export default Banner3
