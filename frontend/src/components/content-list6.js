import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'

import './content-list6.css'

const ContentList6 = (props) => {
  const [isTermsVisible, setIsTermsVisible] = useState(true)
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false)
  const [isRefundVisible, setIsRefundVisible] = useState(false)
  return (
    <div className="content-list6-container1 thq-section-padding">
      <div className="content-list6-max-width thq-section-max-width">
        <div className="content-list6-container2 thq-flex-column">
          {isTermsVisible && (
            <button
              onClick={() => {
                setIsRefundVisible(false)
                setIsPrivacyVisible(false)
                setIsTermsVisible(true)
              }}
              className="thq-button-filled"
            >
              <span>
                {props.button ?? (
                  <Fragment>
                    <span className="content-list6-text32">
                      Terms of service
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
          {!isTermsVisible && (
            <button
              onClick={() => {
                setIsRefundVisible(false)
                setIsTermsVisible(true)
                setIsPrivacyVisible(false)
              }}
              className="thq-button-outline"
            >
              <span>
                {props.button ?? (
                  <Fragment>
                    <span className="content-list6-text32">
                      Terms of service
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
          {!isPrivacyVisible && (
            <button
              onClick={() => {
                setIsTermsVisible(false)
                setIsRefundVisible(false)
                setIsPrivacyVisible(true)
              }}
              className="thq-button-outline"
            >
              <span>
                {props.button1 ?? (
                  <Fragment>
                    <span className="content-list6-text26">View Portfolio</span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
          {isPrivacyVisible && (
            <button
              onClick={() => {
                setIsTermsVisible(false)
                setIsPrivacyVisible(true)
                setIsRefundVisible(false)
              }}
              className="thq-button-filled"
            >
              <span>
                {props.button1 ?? (
                  <Fragment>
                    <span className="content-list6-text26">View Portfolio</span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
          {!isRefundVisible && (
            <button
              onClick={() => {
                setIsTermsVisible(false)
                setIsPrivacyVisible(false)
                setIsRefundVisible(true)
              }}
              className="thq-button-outline"
            >
              <span>
                {props.button2 ?? (
                  <Fragment>
                    <span className="content-list6-text25">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
          {isRefundVisible && (
            <button
              onClick={() => {
                setIsRefundVisible(true)
                setIsTermsVisible(false)
                setIsPrivacyVisible(false)
              }}
              className="thq-button-filled"
            >
              <span>
                {props.button2 ?? (
                  <Fragment>
                    <span className="content-list6-text25">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
          )}
        </div>
        <div className="content-list6-container3 thq-flex-column">
          {isTermsVisible && (
            <div className="content-list6-container4">
              <ul className="content-list6-ul1 thq-flex-column">
                <li className="content-list6-li10 list-item thq-flex-column">
                  <h2 className="content-list6-heading7 thq-heading-2">
                    {props.heading7 ?? (
                      <Fragment>
                        <span className="content-list6-text35">
                          Quality Assurance
                        </span>
                      </Fragment>
                    )}
                  </h2>
                  <p className="thq-body-small">
                    {props.content7 ?? (
                      <Fragment>
                        <span className="content-list6-text23">
                          Rest assured that your project will be handled with
                          the utmost care and attention to detail. We follow
                          industry best practices and quality standards to
                          deliver top-notch results.
                        </span>
                      </Fragment>
                    )}
                  </p>
                  <ul className="content-list6-ul2 thq-flex-column">
                    <li className="list-item">
                      <h3 className="thq-heading-3">
                        {props.heading8 ?? (
                          <Fragment>
                            <span className="content-list6-text29">
                              Customer Support
                            </span>
                          </Fragment>
                        )}
                      </h3>
                      <p className="thq-body-small">
                        {props.content2 ?? (
                          <Fragment>
                            <span className="content-list6-text37">
                              Improve your website&apos;s visibility and ranking
                              on search engines with our SEO optimization
                              services. Drive more organic traffic and reach
                              your target audience effectively.
                            </span>
                          </Fragment>
                        )}
                      </p>
                    </li>
                    <li className="list-item">
                      <h3 className="thq-heading-3">
                        {props.heading9 ?? (
                          <Fragment>
                            <span className="content-list6-text27">
                              Products and Services
                            </span>
                          </Fragment>
                        )}
                      </h3>
                      <p className="thq-body-small">
                        {props.content9 ?? (
                          <Fragment>
                            <span className="content-list6-text22">
                              Lorem ipsum dolor sit amet. Est vitae blanditiis
                              ab aliquam tempore aut ipsam iusto in sunt
                              repellat ex voluptatum inventore ab facilis
                              galisum ea consequatur consequuntur. Ab voluptas
                              voluptatem eum consequatur aspernatur non
                              laboriosam atque est labore asperiores a neque
                              quos. Ea nemo modi hic dicta saepe et veritatis
                              maiores At praesentium aliquid. Sed dolores
                              architecto non doloribus quia eos consectetur
                              commodi non tenetur vitae est neque omnis. Non
                              perspiciatis velit At aliquam rerum ut officiis
                              ipsa id minima eius ut sapiente nobis et nemo
                              neque. Aut maiores tempora in officiis sunt eum
                              voluptatem tenetur sit iste reprehenderit ea nisi
                              dolor. Ea impedit omnis ad internos autem ut esse
                              sunt ad saepe maiores vel perferendis veritatis.
                              Ex magni fugiat ut reprehenderit laudantium sit
                              galisum ipsam eos tempora doloribus sed
                              accusantium nobis eum praesentium quod.
                            </span>
                          </Fragment>
                        )}
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          {isPrivacyVisible && (
            <div className="content-list6-container5">
              <ul className="thq-flex-column">
                <li className="content-list6-li13 list-item thq-flex-column">
                  <h1 className="content-list6-heading1 thq-heading-2">
                    {props.heading1 ?? (
                      <Fragment>
                        <span className="content-list6-text31">
                          Custom Web Development Solutions
                        </span>
                      </Fragment>
                    )}
                  </h1>
                  <span className="thq-body-small">
                    {props.content1 ?? (
                      <Fragment>
                        <span className="content-list6-text42">
                          Get tailored web development services to meet your
                          specific business needs. From simple websites to
                          complex web applications, we&apos;ve got you covered.
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <ul className="content-list6-ul4 thq-flex-column">
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading2 ?? (
                          <Fragment>
                            <span className="content-list6-text33">
                              SEO Optimization
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <p className="thq-body-small">
                        {props.content2 ?? (
                          <Fragment>
                            <span className="content-list6-text37">
                              Improve your website&apos;s visibility and ranking
                              on search engines with our SEO optimization
                              services. Drive more organic traffic and reach
                              your target audience effectively.
                            </span>
                          </Fragment>
                        )}
                      </p>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading3 ?? (
                          <Fragment>
                            <span className="content-list6-text39">
                              Responsive Design
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content3 ?? (
                          <Fragment>
                            <span className="content-list6-text16">
                              Ensure your website looks great and functions
                              seamlessly on all devices with our responsive
                              design expertise. Provide a user-friendly
                              experience across desktop, mobile, and tablet.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading4 ?? (
                          <Fragment>
                            <span className="content-list6-text19">
                              Portfolio
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content4 ?? (
                          <Fragment>
                            <span className="content-list6-text34">
                              Check out our portfolio to see examples of our
                              work. We take pride in delivering high-quality,
                              visually appealing websites that are both
                              functional and aesthetically pleasing.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading5 ?? (
                          <Fragment>
                            <span className="content-list6-text20">
                              Pricing Plans
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content5 ?? (
                          <Fragment>
                            <span className="content-list6-text40">
                              Choose from our flexible monthly or yearly pricing
                              plans to suit your budget and project
                              requirements. Get value for your investment with
                              transparent pricing and no hidden costs.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading6 ?? (
                          <Fragment>
                            <span className="content-list6-text18">
                              Testimonials
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content6 ?? (
                          <Fragment>
                            <span className="content-list6-text28">
                              Read what our satisfied clients have to say about
                              our services. We strive for excellence in every
                              project we undertake and ensure customer
                              satisfaction is our top priority.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          {isRefundVisible && (
            <div className="content-list6-container6">
              <ul className="content-list6-ul5 thq-flex-column">
                <li className="content-list6-li19 list-item thq-flex-column">
                  <h1 className="content-list6-heading10 thq-heading-2">
                    {props.heading10 ?? (
                      <Fragment>
                        <span className="content-list6-text17">
                          Refund Policy
                        </span>
                      </Fragment>
                    )}
                  </h1>
                  <span className="thq-body-small">
                    {props.content10 ?? (
                      <Fragment>
                        <span className="content-list6-text38">
                          Lorem ipsum dolor sit amet. Vel dolores illum est
                          aperiam quis nam voluptatem quia et omnis autem qui
                          dolore ullam sed fugiat cumque! Qui accusamus
                          assumenda et molestias eius et error sunt. Id
                          recusandae nostrum ea officiis voluptatem in nisi
                          consequatur sed quia tenetur sit alias molestias qui
                          illum soluta. Est nesciunt perferendis eum sint rerum
                          33 cupiditate dolorem id corrupti laboriosam ut
                          debitis veniam ut ipsam fugit vel sunt consequatur. Et
                          nobis quasi et cumque adipisci aut molestiae eligendi
                          quo inventore dicta ea suscipit sequi sed veritatis
                          nemo.
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <ul className="content-list6-ul6 thq-flex-column">
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading11 ?? (
                          <Fragment>
                            <span className="content-list6-text24">
                              General
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content11 ?? (
                          <Fragment>
                            <span className="content-list6-text43">
                              Lorem ipsum dolor sit amet. Nam nihil facilis sit
                              consequuntur internos qui minima rerum ut
                              molestias laudantium aut iusto deserunt. Aut
                              voluptatibus excepturi qui officia laudantium est
                              repellendus tempore hic sunt debitis. Ut galisum
                              tempore in enim fugit eum pariatur possimus est
                              tenetur nemo et sint sint et dolores Quis. Aut
                              illum perspiciatis rem architecto culpa et fuga
                              aliquid. Est omnis praesentium ut nisi internos
                              rem quod totam et similique quis. Est tempore
                              cumque aut recusandae labore qui error molestiae
                              et possimus quia! Eum Quis asperiores non nihil
                              tempora qui quia voluptatem aut aspernatur
                              aspernatur aut asperiores labore et sapiente
                              quaerat qui suscipit quia. Ea nesciunt iste aut
                              temporibus culpa sit dignissimos quaerat eum
                              architecto voluptatum et nemo velit At harum
                              harum.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading12 ?? (
                          <Fragment>
                            <span className="content-list6-text21">
                              Damages and issues
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content12 ?? (
                          <Fragment>
                            <span className="content-list6-text36">
                              Lorem ipsum dolor sit amet. Est vitae blanditiis
                              ab aliquam tempore aut ipsam iusto in sunt
                              repellat ex voluptatum inventore ab facilis
                              galisum ea consequatur consequuntur. Ab voluptas
                              voluptatem eum consequatur aspernatur non
                              laboriosam atque est labore asperiores a neque
                              quos. Ea nemo modi hic dicta saepe et veritatis
                              maiores At praesentium aliquid. Sed dolores
                              architecto non doloribus quia eos consectetur
                              commodi non tenetur vitae est neque omnis. Non
                              perspiciatis velit At aliquam rerum ut officiis
                              ipsa id minima eius ut sapiente nobis et nemo
                              neque. Aut maiores tempora in officiis sunt eum
                              voluptatem tenetur sit iste reprehenderit ea nisi
                              dolor. Ea impedit omnis ad internos autem ut esse
                              sunt ad saepe maiores vel perferendis veritatis.
                              Ex magni fugiat ut reprehenderit laudantium sit
                              galisum ipsam eos tempora doloribus sed
                              accusantium nobis eum praesentium quod.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <h1 className="thq-heading-3">
                        {props.heading13 ?? (
                          <Fragment>
                            <span className="content-list6-text41">
                              Refunds
                            </span>
                          </Fragment>
                        )}
                      </h1>
                      <span className="thq-body-small">
                        {props.content13 ?? (
                          <Fragment>
                            <span className="content-list6-text30">
                              Lorem ipsum dolor sit amet. Est vitae blanditiis
                              ab aliquam tempore aut ipsam iusto in sunt
                              repellat ex voluptatum inventore ab facilis
                              galisum ea consequatur consequuntur. Ab voluptas
                              voluptatem eum consequatur aspernatur non
                              laboriosam atque est labore asperiores a neque
                              quos. Ea nemo modi hic dicta saepe et veritatis
                              maiores At praesentium aliquid. Sed dolores
                              architecto non doloribus quia eos consectetur
                              commodi non tenetur vitae est neque omnis. Non
                              perspiciatis velit At aliquam rerum ut officiis
                              ipsa id minima eius ut sapiente nobis et nemo
                              neque. Aut maiores tempora in officiis sunt eum
                              voluptatem tenetur sit iste reprehenderit ea nisi
                              dolor. Ea impedit omnis ad internos autem ut esse
                              sunt ad saepe maiores vel perferendis veritatis.
                              Ex magni fugiat ut reprehenderit laudantium sit
                              galisum ipsam eos tempora doloribus sed
                              accusantium nobis eum praesentium quod.
                            </span>
                          </Fragment>
                        )}
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ContentList6.defaultProps = {
  content3: undefined,
  heading10: undefined,
  heading6: undefined,
  heading4: undefined,
  heading5: undefined,
  heading12: undefined,
  content9: undefined,
  content7: undefined,
  heading11: undefined,
  button2: undefined,
  button1: undefined,
  heading9: undefined,
  content6: undefined,
  heading8: undefined,
  content13: undefined,
  heading1: undefined,
  button: undefined,
  heading2: undefined,
  content4: undefined,
  heading7: undefined,
  content12: undefined,
  content2: undefined,
  content10: undefined,
  heading3: undefined,
  content5: undefined,
  heading13: undefined,
  content1: undefined,
  content11: undefined,
}

ContentList6.propTypes = {
  content3: PropTypes.element,
  heading10: PropTypes.element,
  heading6: PropTypes.element,
  heading4: PropTypes.element,
  heading5: PropTypes.element,
  heading12: PropTypes.element,
  content9: PropTypes.element,
  content7: PropTypes.element,
  heading11: PropTypes.element,
  button2: PropTypes.element,
  button1: PropTypes.element,
  heading9: PropTypes.element,
  content6: PropTypes.element,
  heading8: PropTypes.element,
  content13: PropTypes.element,
  heading1: PropTypes.element,
  button: PropTypes.element,
  heading2: PropTypes.element,
  content4: PropTypes.element,
  heading7: PropTypes.element,
  content12: PropTypes.element,
  content2: PropTypes.element,
  content10: PropTypes.element,
  heading3: PropTypes.element,
  content5: PropTypes.element,
  heading13: PropTypes.element,
  content1: PropTypes.element,
  content11: PropTypes.element,
}

export default ContentList6
