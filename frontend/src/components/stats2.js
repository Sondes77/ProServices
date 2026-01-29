import React, { Fragment } from 'react'
import image from '../img/photo.png';
import PropTypes from 'prop-types'

import './stats2.css'

const Stats2 = (props) => {
  return (
    <div className="stats2-container1 thq-section-padding">
      <div className="stats2-max-width thq-section-max-width">
        <div className="stats2-container2 thq-flex-column">
          <img
            alt={props.image1Alt}
            src={image}
            className="thq-img-ratio-1-1 stats2-image"
          />
        </div>
        <div className="stats2-container3 thq-flex-column">
          <span className="thq-body-small">
            {props.content1 ?? (
              <Fragment>
                <span className="stats2-text27">
                  Over 50 custom websites developed
                </span>
              </Fragment>
            )}
          </span>
          <h2 className="thq-heading-2">
            {props.heading1 ?? (
              <Fragment>
                <span className="stats2-text24">Our Stats</span>
              </Fragment>
            )}
          </h2>
          <p className="thq-body-large">
            {props.content2 ?? (
              <Fragment>
                <span className="stats2-text28">
                  Client satisfaction rate of 95%
                </span>
              </Fragment>
            )}
          </p>
          <div className="stats2-container4 thq-grid-2">
            <div className="stats2-container5">
              <h2 className="thq-heading-2">
                {props.stat1 ?? (
                  <Fragment>
                    <span className="stats2-text29">
                      Custom Web Development
                    </span>
                  </Fragment>
                )}
              </h2>
              <span className="thq-body-small">
                {props.stat1Description ?? (
                  <Fragment>
                    <span className="stats2-text22">
                      Tailored web development solutions to meet your specific
                      needs
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="stats2-container6">
              <h2 className="thq-heading-2">
                {props.stat2 ?? (
                  <Fragment>
                    <span className="stats2-text26">SEO Optimization</span>
                  </Fragment>
                )}
              </h2>
              <span className="thq-body-small">
                {props.stat2Description ?? (
                  <Fragment>
                    <span className="stats2-text25">
                      Enhance your website&apos;s visibility and ranking on
                      search engines
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="stats2-container7 thq-grid-2">
            <div className="stats2-container8">
              <h2 className="thq-heading-2">
                {props.stat3 ?? (
                  <Fragment>
                    <span className="stats2-text30">Responsive Design</span>
                  </Fragment>
                )}
              </h2>
              <span className="thq-body-small">
                {props.stat3Description ?? (
                  <Fragment>
                    <span className="stats2-text31">
                      Create websites that adapt seamlessly to different devices
                      and screen sizes
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="stats2-container9">
              <h2 className="thq-heading-2">
                {props.stat4 ?? (
                  <Fragment>
                    <span className="stats2-text21">Portfolio</span>
                  </Fragment>
                )}
              </h2>
              <span className="thq-body-small">
                {props.stat4Description ?? (
                  <Fragment>
                    <span className="stats2-text23">
                      Check out our latest projects and see our work in action
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Stats2.defaultProps = {
  image1Src:
    'https://images.unsplash.com/photo-1654723011674-13e99382511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUyMTkzNnw&ixlib=rb-4.0.3&q=80&w=1080',
  stat4: undefined,
  stat1Description: undefined,
  stat4Description: undefined,
  heading1: undefined,
  image1Alt: 'Custom Web Development Image',
  stat2Description: undefined,
  stat2: undefined,
  content1: undefined,
  content2: undefined,
  stat1: undefined,
  stat3: undefined,
  stat3Description: undefined,
}

Stats2.propTypes = {
  image1Src: PropTypes.string,
  stat4: PropTypes.element,
  stat1Description: PropTypes.element,
  stat4Description: PropTypes.element,
  heading1: PropTypes.element,
  image1Alt: PropTypes.string,
  stat2Description: PropTypes.element,
  stat2: PropTypes.element,
  content1: PropTypes.element,
  content2: PropTypes.element,
  stat1: PropTypes.element,
  stat3: PropTypes.element,
  stat3Description: PropTypes.element,
}

export default Stats2
