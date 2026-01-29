import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './testimonial18.css'

const Testimonial18 = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="testimonial18-max-width thq-section-max-width">
        <div className="testimonial18-container1 thq-grid-2">
          <div className="testimonial18-section-title">
            <h2 className="thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="testimonial18-text34">Testimonials</span>
                </Fragment>
              )}
            </h2>
            <p className="thq-body-large">
              {props.content1 ?? (
                <Fragment>
                  <span className="testimonial18-text25">
                    Working with the freelance web developer was a game-changer
                    for our business. The custom web development solutions
                    provided were top-notch and helped us stand out in a
                    competitive market.
                  </span>
                </Fragment>
              )}
            </p>
            <div className="testimonial18-container2">
              <button
                type="button"
                className="thq-button-filled testimonial18-button1"
              >
                <span>
                  {props.action1 ?? (
                    <Fragment>
                      <span className="testimonial18-text22">
                        Primary action
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
              <button
                type="button"
                className="thq-button-outline testimonial18-button2"
              >
                <span>
                  {props.action2 ?? (
                    <Fragment>
                      <span className="testimonial18-text26">
                        Secondary action
                      </span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="testimonial18-content">
            <div className="testimonial18-column1 thq-card">
              <div className="testimonial18-stars1">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
              </div>
              <span className="testimonial18-text12 thq-body-small">
                {props.review1 ?? (
                  <Fragment>
                    <span className="testimonial18-text30">
                      &quot;Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Suspendisse varius enim in eros elementum tristique.
                      Duis cursus, mi quis viverra ornare.&quot;
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="testimonial18-avatar1">
                <img
                  alt={props.author1Alt}
                  src={props.author1Src}
                  className="testimonial18-avatar-image1 thq-img-round thq-img-ratio-1-1"
                />
                <div className="testimonial18-avatar-content1">
                  <span className="testimonial18-text13 thq-body-small">
                    {props.author1Name ?? (
                      <Fragment>
                        <span className="testimonial18-text23">John Doe</span>
                      </Fragment>
                    )}
                  </span>
                  <span className="testimonial18-text14 thq-body-small">
                    {props.author1Position ?? (
                      <Fragment>
                        <span className="testimonial18-text32">
                          CEO, Company ABC
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonial18-column2 thq-card">
              <div className="testimonial18-stars2">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
              </div>
              <span className="testimonial18-text15 thq-body-small">
                {props.review2 ?? (
                  <Fragment>
                    <span className="testimonial18-text27">
                      The responsive design implemented by the developer
                      significantly improved our user experience. Our website
                      now looks great on all devices, leading to increased
                      engagement.
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="testimonial18-avatar2">
                <img
                  alt={props.author2Alt}
                  src={props.author2Src}
                  className="testimonial18-avatar-image2 thq-img-round thq-img-ratio-1-1"
                />
                <div className="testimonial18-avatar-content2">
                  <span className="testimonial18-text16 thq-body-small">
                    {props.author2 ?? (
                      <Fragment>
                        <span className="testimonial18-text31">
                          Author Name
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <span className="testimonial18-text17 thq-body-small">
                    {props.author2Position ?? (
                      <Fragment>
                        <span className="testimonial18-text24">
                          Marketing Manager, Company XYZ
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonial18-column3 thq-card">
              <div className="testimonial18-stars3">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
              </div>
              <span className="testimonial18-text18 thq-body-small">
                {props.review3 ?? (
                  <Fragment>
                    <span className="testimonial18-text33">
                      I was impressed by the SEO optimization services offered.
                      Our website&apos;s visibility has greatly improved,
                      leading to a noticeable increase in organic traffic and
                      conversions.
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="testimonial18-avatar3">
                <img
                  alt={props.author3Alt}
                  src={props.author3Src}
                  className="testimonial18-avatar-image3 thq-img-round thq-img-ratio-1-1"
                />
                <div className="testimonial18-avatar-content3">
                  <span className="testimonial18-text19 thq-body-small">
                    {props.author3 ?? (
                      <Fragment>
                        <span className="testimonial18-text36">
                          Author Name
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <span className="testimonial18-text20 thq-body-small">
                    {props.author3Position ?? (
                      <Fragment>
                        <span className="testimonial18-text28">
                          Founder, Startup123
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonial18-column4 thq-card">
              <div className="testimonial18-stars4">
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
                <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"></path>
                </svg>
              </div>
              <span className="testimonial18-review4 thq-body-small">
                {props.review4 ?? (
                  <Fragment>
                    <span className="testimonial18-text37">
                      The developer&apos;s attention to detail and dedication to
                      delivering high-quality work is commendable. I highly
                      recommend their services for anyone looking to elevate
                      their online presence.
                    </span>
                  </Fragment>
                )}
              </span>
              <div className="testimonial18-avatar4">
                <img
                  alt={props.author4Alt}
                  src={props.author4Src}
                  className="testimonial18-author41 thq-img-round thq-img-ratio-1-1"
                />
                <div className="testimonial18-avatar-content4">
                  <span className="testimonial18-author42 thq-body-small">
                    {props.author4 ?? (
                      <Fragment>
                        <span className="testimonial18-text29">
                          Author Name
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <span className="testimonial18-text21 thq-body-small">
                    {props.author4Position ?? (
                      <Fragment>
                        <span className="testimonial18-text35">
                          E-commerce Owner, OnlineShop.com
                        </span>
                      </Fragment>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Testimonial18.defaultProps = {
  action1: undefined,
  author1Name: undefined,
  author2Src:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMDc5MHw&ixlib=rb-4.0.3&q=80&w=1080',
  author2Position: undefined,
  content1: undefined,
  action2: undefined,
  review2: undefined,
  author3Alt: 'Author Avatar',
  author3Position: undefined,
  author4: undefined,
  author1Src:
    'https://images.unsplash.com/photo-1528271537-64e11fc31bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMDc5MHw&ixlib=rb-4.0.3&q=80&w=1080',
  review1: undefined,
  author4Src:
    'https://images.unsplash.com/photo-1578489758854-f134a358f08b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMDc5MXw&ixlib=rb-4.0.3&q=80&w=1080',
  author2: undefined,
  author4Alt: 'Author Avatar',
  author1Alt: 'Author Avatar',
  author1Position: undefined,
  review3: undefined,
  heading1: undefined,
  author4Position: undefined,
  author3: undefined,
  review4: undefined,
  author2Alt: 'Author Avatar',
  author3Src:
    'https://images.unsplash.com/photo-1605005196264-a86c94f48c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUzMDc5Mnw&ixlib=rb-4.0.3&q=80&w=1080',
}

Testimonial18.propTypes = {
  action1: PropTypes.element,
  author1Name: PropTypes.element,
  author2Src: PropTypes.string,
  author2Position: PropTypes.element,
  content1: PropTypes.element,
  action2: PropTypes.element,
  review2: PropTypes.element,
  author3Alt: PropTypes.string,
  author3Position: PropTypes.element,
  author4: PropTypes.element,
  author1Src: PropTypes.string,
  review1: PropTypes.element,
  author4Src: PropTypes.string,
  author2: PropTypes.element,
  author4Alt: PropTypes.string,
  author1Alt: PropTypes.string,
  author1Position: PropTypes.element,
  review3: PropTypes.element,
  heading1: PropTypes.element,
  author4Position: PropTypes.element,
  author3: PropTypes.element,
  review4: PropTypes.element,
  author2Alt: PropTypes.string,
  author3Src: PropTypes.string,
}

export default Testimonial18
