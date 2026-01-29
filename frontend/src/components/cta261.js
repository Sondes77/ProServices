import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './cta261.css'

const CTA261 = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta261-accent2-bg">
          <div className="cta261-accent1-bg">
            <div className="cta261-container2">
              <div className="cta261-content">
                <span className="thq-heading-2">
                  {props.heading1 ?? (
                    <Fragment>
                      <span className="cta261-text4">
                        Ready to take your website to the next level?
                      </span>
                    </Fragment>
                  )}
                </span>
                <p className="thq-body-large">
                  {props.content1 ?? (
                    <Fragment>
                      <span className="cta261-text5">
                        Let&apos;s work together to create a stunning and
                        functional website that meets your needs.
                      </span>
                    </Fragment>
                  )}
                </p>
              </div>
              <div className="cta261-actions">
                <button
                  type="button"
                  className="thq-button-filled cta261-button"
                >
                  <span>
                    {props.action1 ?? (
                      <Fragment>
                        <span className="cta261-text6">
                          Get in touch for a free consultation
                        </span>
                      </Fragment>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA261.defaultProps = {
  heading1: undefined,
  content1: undefined,
  action1: undefined,
}

CTA261.propTypes = {
  heading1: PropTypes.element,
  content1: PropTypes.element,
  action1: PropTypes.element,
}

export default CTA261
