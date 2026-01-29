import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './features1.css'

const Features1 = (props) => {
  return (
    <div className="features1-layout251 thq-section-padding">
      <div className="features1-max-width thq-section-max-width">
        <div className="thq-flex-row features1-section-title">
          <div className="features1-column thq-flex-column">
            <span className="thq-body-small">
              {props.slogan ?? (
                <Fragment>
                  <span className="features1-text22">
                    Crafting unique websites tailored to your needs.
                  </span>
                </Fragment>
              )}
            </span>
            <h2 className="thq-heading-2 features1-text11">
              {props.sectionTitle ?? (
                <Fragment>
                  <span className="features1-text13">Our Features</span>
                </Fragment>
              )}
            </h2>
          </div>
          <span className="thq-body-small">
            {props.sectionDescription ?? (
              <Fragment>
                <span className="features1-text17">
                  Explore the key features that set us apart from the rest.
                </span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="features1-content1">
          <div className="features1-row thq-flex-row">
            <div className="features1-feature1 thq-flex-column">
              <img
                alt={props.feature1ImageAlt}
                src={props.feature1ImageSrc}
                className="thq-img-ratio-4-3 features1-feature1-image"
              />
              <div className="features1-content2 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature1Title ?? (
                    <Fragment>
                      <span className="features1-text20">
                        Custom Web Development
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature1Description ?? (
                    <Fragment>
                      <span className="features1-text19">
                        We specialize in creating custom websites that align
                        with your brand and business goals.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="features1-feature2 thq-flex-column">
              <img
                alt={props.feature2ImageAlt}
                src={props.feature2ImageSrc}
                className="thq-img-ratio-4-3 features1-feature2-image"
              />
              <div className="features1-content3 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature2Title ?? (
                    <Fragment>
                      <span className="features1-text16">
                        Responsive Design
                      </span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature2Description ?? (
                    <Fragment>
                      <span className="features1-text15">
                        Ensuring your website looks great and functions
                        seamlessly on all devices.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className="features1-feature3 thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3 features1-feature3-image"
              />
              <div className="features1-content4 thq-flex-column">
                <h3 className="thq-heading-3">
                  {props.feature3Title ?? (
                    <Fragment>
                      <span className="features1-text23">SEO Optimization</span>
                    </Fragment>
                  )}
                </h3>
                <span className="thq-body-small">
                  {props.feature3Description ?? (
                    <Fragment>
                      <span className="features1-text14">
                        Implementing SEO best practices to improve your
                        website&apos;s visibility and ranking.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="features1-actions">
          <button className="thq-button-filled features1-button1">
            <span className="thq-body-small">
              {props.mainAction ?? (
                <Fragment>
                  <span className="features1-text18">
                    Custom Web Development Solutions
                  </span>
                </Fragment>
              )}
            </span>
          </button>
          <button className="thq-button-outline features1-button2">
            <span className="thq-body-small">
              {props.secondaryAction ?? (
                <Fragment>
                  <span className="features1-text21">Responsive Design</span>
                </Fragment>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

Features1.defaultProps = {
  sectionTitle: undefined,
  feature3Description: undefined,
  feature2Description: undefined,
  feature3ImageAlt: 'SEO Optimization Image',
  feature2Title: undefined,
  sectionDescription: undefined,
  mainAction: undefined,
  feature1Description: undefined,
  feature2ImageSrc:
    'https://images.unsplash.com/photo-1647933292292-cb4e4a298664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUyMTkzNnw&ixlib=rb-4.0.3&q=80&w=1080',
  feature1Title: undefined,
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1658190640364-9ac9fc627038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUyMTkzN3w&ixlib=rb-4.0.3&q=80&w=1080',
  feature2ImageAlt: 'Responsive Design Image',
  feature3ImageSrc:
    'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUyMTkzN3w&ixlib=rb-4.0.3&q=80&w=1080',
  secondaryAction: undefined,
  slogan: undefined,
  feature1ImageAlt: 'Custom Web Development Image',
  feature3Title: undefined,
}

Features1.propTypes = {
  sectionTitle: PropTypes.element,
  feature3Description: PropTypes.element,
  feature2Description: PropTypes.element,
  feature3ImageAlt: PropTypes.string,
  feature2Title: PropTypes.element,
  sectionDescription: PropTypes.element,
  mainAction: PropTypes.element,
  feature1Description: PropTypes.element,
  feature2ImageSrc: PropTypes.string,
  feature1Title: PropTypes.element,
  feature1ImageSrc: PropTypes.string,
  feature2ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  secondaryAction: PropTypes.element,
  slogan: PropTypes.element,
  feature1ImageAlt: PropTypes.string,
  feature3Title: PropTypes.element,
}

export default Features1
