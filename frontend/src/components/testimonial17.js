import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './testimonial17.css'

const Testimonial17 = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="testimonial17-max-width thq-section-max-width">
        <div className="testimonial17-container10">
          <h2 className="thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="testimonial17-text34">Testimonials</span>
              </Fragment>
            )}
          </h2>
          <span className="testimonial17-text11 thq-body-small">
            {props.content1 ?? (
              <Fragment>
                <span className="testimonial17-text25">
                  Read what my clients have to say about working with me.
                </span>
              </Fragment>
            )}
          </span>
        </div>
        <div className="thq-grid-2">
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div
                data-animated="true"
                className="thq-card testimonial17-card1"
              >
                <div className="testimonial17-container12">
                  <img
                    alt={props.author1Alt}
                    src={props.author1Src}
                    className="testimonial17-image1"
                  />
                  <div className="testimonial17-container13">
                    <strong className="thq-body-large">
                      {props.author1Name ?? (
                        <Fragment>
                          <span className="testimonial17-text35">John Doe</span>
                        </Fragment>
                      )}
                    </strong>
                    <span className="thq-body-small">
                      {props.author1Position ?? (
                        <Fragment>
                          <span className="testimonial17-text32">
                            CEO, Company ABC
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
                <span className="testimonial17-text14 thq-body-small">
                  {props.review1 ?? (
                    <Fragment>
                      <span className="testimonial17-text28">
                        Working with the freelance web developer was a fantastic
                        experience. They were professional, responsive, and
                        delivered high-quality work on time. I highly recommend
                        their services.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div
                data-animated="true"
                className="thq-card testimonial17-card2"
              >
                <div className="testimonial17-container14">
                  <img
                    alt={props.author2Alt}
                    src={props.author2Src}
                    className="testimonial17-image2"
                  />
                  <div className="testimonial17-container15">
                    <strong className="thq-body-large">
                      {props.author2Name ?? (
                        <Fragment>
                          <span className="testimonial17-text37">
                            Jane Smith
                          </span>
                        </Fragment>
                      )}
                    </strong>
                    <span className="thq-body-small">
                      {props.author2Position ?? (
                        <Fragment>
                          <span className="testimonial17-text24">
                            Marketing Manager, Company XYZ
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
                <span className="testimonial17-text17 thq-body-small">
                  {props.review2 ?? (
                    <Fragment>
                      <span className="testimonial17-text30">
                        I hired the freelance web developer to revamp our
                        company website, and I couldn&apos;t be happier with the
                        results. They have a keen eye for design and a deep
                        understanding of web development. I will definitely work
                        with them again in the future.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div
                data-animated="true"
                className="thq-card testimonial17-card3"
              >
                <div className="testimonial17-container16">
                  <img
                    alt={props.author3Alt}
                    src={props.author3Src}
                    className="testimonial17-image3"
                  />
                  <div className="testimonial17-container17">
                    <strong className="thq-body-large">
                      {props.author3Name ?? (
                        <Fragment>
                          <span className="testimonial17-text27">
                            Sarah Johnson
                          </span>
                        </Fragment>
                      )}
                    </strong>
                    <span className="thq-body-small">
                      {props.author3Position ?? (
                        <Fragment>
                          <span className="testimonial17-text31">
                            Founder, Startup123
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
                <span className="testimonial17-text20 thq-body-small">
                  {props.review3 ?? (
                    <Fragment>
                      <span className="testimonial17-text29">
                        I was impressed by the level of professionalism and
                        expertise demonstrated by the freelance web developer.
                        They took the time to understand my requirements and
                        delivered a website that exceeded my expectations. I am
                        thrilled with the outcome.
                      </span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div
                data-animated="true"
                className="thq-card testimonial17-card4"
              >
                <div className="testimonial17-container18">
                  <img
                    alt={props.author4Alt}
                    src={props.author4Src}
                    className="testimonial17-image4"
                  />
                  <div className="testimonial17-container19">
                    <strong className="thq-body-large">
                      {props.author4Name ?? (
                        <Fragment>
                          <span className="testimonial17-text36">
                            Michael Brown
                          </span>
                        </Fragment>
                      )}
                    </strong>
                    <span className="thq-body-small">
                      {props.author4Position ?? (
                        <Fragment>
                          <span className="testimonial17-text26">
                            Creative Director, Design Co.
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
                <span className="testimonial17-text23 thq-body-small">
                  {props.review4 ?? (
                    <Fragment>
                      <span className="testimonial17-text33">
                        I had a great collaboration with the freelance web
                        developer on a recent project. Their attention to detail
                        and dedication to delivering a top-notch website were
                        truly commendable. I look forward to working with them
                        again.
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
  )
}

Testimonial17.defaultProps = {
  author2Position: undefined,
  content1: undefined,
  author1Src:
    'https://images.unsplash.com/photo-1600481453173-55f6a844a4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NHw&ixlib=rb-4.0.3&q=80&w=1080',
  author4Position: undefined,
  author3Name: undefined,
  author3Alt: 'Sarah Johnson - Founder, Startup123',
  review1: undefined,
  review3: undefined,
  author4Src:
    'https://images.unsplash.com/photo-1521715256953-afc5aa00679e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NHw&ixlib=rb-4.0.3&q=80&w=1080',
  author1Alt: 'John Doe - CEO, Company ABC',
  author2Src:
    'https://images.unsplash.com/photo-1531214159280-079b95d26139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NHw&ixlib=rb-4.0.3&q=80&w=1080',
  review2: undefined,
  author4Alt: 'Michael Brown - Creative Director, Design Co.',
  author3Src:
    'https://images.unsplash.com/photo-1636041241164-3d20e98d43a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  author3Position: undefined,
  author1Position: undefined,
  review4: undefined,
  heading1: undefined,
  author1Name: undefined,
  author4Name: undefined,
  author2Name: undefined,
  author2Alt: 'Jane Smith - Marketing Manager, Company XYZ',
}

Testimonial17.propTypes = {
  author2Position: PropTypes.element,
  content1: PropTypes.element,
  author1Src: PropTypes.string,
  author4Position: PropTypes.element,
  author3Name: PropTypes.element,
  author3Alt: PropTypes.string,
  review1: PropTypes.element,
  review3: PropTypes.element,
  author4Src: PropTypes.string,
  author1Alt: PropTypes.string,
  author2Src: PropTypes.string,
  review2: PropTypes.element,
  author4Alt: PropTypes.string,
  author3Src: PropTypes.string,
  author3Position: PropTypes.element,
  author1Position: PropTypes.element,
  review4: PropTypes.element,
  heading1: PropTypes.element,
  author1Name: PropTypes.element,
  author4Name: PropTypes.element,
  author2Name: PropTypes.element,
  author2Alt: PropTypes.string,
}

export default Testimonial17
