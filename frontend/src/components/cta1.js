import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './cta1.css'

const CTA1 = (props) => {
  return (
    <div className="cta1-container thq-section-padding">
      <div className="cta1-max-width thq-section-max-width">
        <div className="cta1-content">
          <h2 className="cta1-heading1 thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="cta1-text1">
                  Ready to take your website to the next level?
                </span>
              </Fragment>
            )}
          </h2>
          <p className="cta1-content1 thq-body-large">
            {props.content1 ?? (
              <Fragment>
                <span className="cta1-text3">
                  Contact me today for a free quote on your custom web
                  development project.
                </span>
              </Fragment>
            )}
          </p>
          <div className="cta1-actions">
            <button className="thq-button-filled cta1-button1">
              <span className="cta1-action1 thq-body-small">
                {props.action1 ?? (
                  <Fragment>
                    <span className="cta1-text2">Get a Free Quote</span>
                  </Fragment>
                )}
              </span>
            </button>
            <button className="thq-button-outline cta1-button2">
              <span className="cta1-action2 thq-body-small">
                {props.action2 ?? (
                  <Fragment>
                    <span className="cta1-text4">View Portfolio</span>
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

CTA1.defaultProps = {
  heading1: undefined,
  action1: undefined,
  content1: undefined,
  action2: undefined,
}

CTA1.propTypes = {
  heading1: PropTypes.element,
  action1: PropTypes.element,
  content1: PropTypes.element,
  action2: PropTypes.element,
}

export default CTA1
