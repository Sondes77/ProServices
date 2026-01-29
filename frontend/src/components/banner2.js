import React, { Fragment } from 'react'
import './banner2.css'

const Banner2 = (props) => {
  return (
    <div className="banner2-container1">
      <div className="banner2-max-width thq-section-max-width thq-section-padding">
        <div className="banner2-container2 shadow-lg thq-flex-column thq-section-padding">
          <h2 className="banner2-title thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="banner2-text3">
                  Custom Web Development Solutions
                </span>
              </Fragment>
            )}
          </h2>
          <h3 className="banner2-text1 thq-heading-3">
            {props.content1 ?? (
              <Fragment>
                <span className="banner2-text4">
                  Get tailored web development services to meet your unique
                  business needs.
                </span>
              </Fragment>
            )}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Banner2
