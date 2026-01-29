import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './content-list1.css'

const ContentList1 = (props) => {
  return (
    <div className="content-list1-container thq-section-padding">
      <div className="content-list1-max-width thq-section-max-width">
        <div className="content-list1-content thq-flex-column">
          <ul className="content-list1-ul thq-flex-column">
            <li className="list-item thq-flex-column">
              <h2 className="content-list1-heading1 thq-heading-2">
                {props.heading1 ?? (
                  <Fragment>
                    <span className="content-list1-text15">
                      Custom Web Development Solutions
                    </span>
                  </Fragment>
                )}
              </h2>
              <p className="thq-body-small">
                {props.content1 ?? (
                  <Fragment>
                    <span className="content-list1-text17">
                      I offer tailored web development solutions to meet your
                      specific business needs. Whether you need a simple website
                      or a complex web application, I can bring your vision to
                      life.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
            <li className="list-item">
              <h3 className="thq-heading-3">
                {props.heading2 ?? (
                  <Fragment>
                    <span className="content-list1-text11">
                      Responsive Design
                    </span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-small">
                {props.content2 ?? (
                  <Fragment>
                    <span className="content-list1-text12">
                      I specialize in creating responsive designs that ensure
                      your website looks great and functions seamlessly on all
                      devices, including desktops, tablets, and smartphones.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
            <li className="list-item">
              <h3 className="thq-heading-3">
                {props.heading3 ?? (
                  <Fragment>
                    <span className="content-list1-text14">
                      SEO Optimization
                    </span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-small">
                {props.content3 ?? (
                  <Fragment>
                    <span className="content-list1-text16">
                      I provide SEO optimization services to help improve your
                      website&apos;s visibility on search engines. By optimizing
                      your site&apos;s content and structure, I can help drive
                      more organic traffic to your site.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
            <li className="list-item">
              <h3 className="thq-heading-3">
                {props.heading4 ?? (
                  <Fragment>
                    <span className="content-list1-text13">Portfolio</span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-small">
                {props.content4 ?? (
                  <Fragment>
                    <span className="content-list1-text20">
                      Take a look at some of my past projects to see the quality
                      of work I deliver. From e-commerce sites to portfolio
                      websites, I have experience in a variety of industries.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
            <li className="list-item">
              <h3 className="thq-heading-3">
                {props.heading5 ?? (
                  <Fragment>
                    <span className="content-list1-text10">Pricing Plans</span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-small">
                {props.content5 ?? (
                  <Fragment>
                    <span className="content-list1-text21">
                      I offer competitive pricing plans based on the scope of
                      your project. Whether you&apos;re a small business or a
                      large corporation, I have options to fit your budget.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
            <li className="list-item">
              <h3 className="thq-heading-3">
                {props.heading6 ?? (
                  <Fragment>
                    <span className="content-list1-text19">Testimonials</span>
                  </Fragment>
                )}
              </h3>
              <p className="thq-body-small">
                {props.content6 ?? (
                  <Fragment>
                    <span className="content-list1-text18">
                      Don&apos;t just take my word for it. Read what my
                      satisfied clients have to say about working with me. Their
                      feedback speaks to the level of professionalism and
                      expertise I bring to every project.
                    </span>
                  </Fragment>
                )}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

ContentList1.defaultProps = {
  heading5: undefined,
  heading2: undefined,
  content2: undefined,
  heading4: undefined,
  heading3: undefined,
  heading1: undefined,
  content3: undefined,
  content1: undefined,
  content6: undefined,
  heading6: undefined,
  content4: undefined,
  content5: undefined,
}

ContentList1.propTypes = {
  heading5: PropTypes.element,
  heading2: PropTypes.element,
  content2: PropTypes.element,
  heading4: PropTypes.element,
  heading3: PropTypes.element,
  heading1: PropTypes.element,
  content3: PropTypes.element,
  content1: PropTypes.element,
  content6: PropTypes.element,
  heading6: PropTypes.element,
  content4: PropTypes.element,
  content5: PropTypes.element,
}

export default ContentList1
