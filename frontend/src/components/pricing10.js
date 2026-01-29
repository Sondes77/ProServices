import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './pricing10.css'

const Pricing10 = (props) => {
  return (
    <div className="pricing10-pricing23 thq-section-padding">
      <div className="pricing10-max-width thq-section-max-width">
        <div className="pricing10-section-title">
          <div className="pricing10-content1">
            <h2 className="pricing10-text10 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="pricing10-text67">Pricing Plans</span>
                </Fragment>
              )}
            </h2>
            <p className="pricing10-text11 thq-body-large">
              {props.subtitle1 ?? (
                <Fragment>
                  <span className="pricing10-text51">
                    Choose the plan that suits your needs
                  </span>
                </Fragment>
              )}
            </p>
          </div>
        </div>
        <div className="pricing10-content3">
          <div className="pricing10-container10"></div>
          <div className="pricing10-column1">
            <div className="pricing10-price1">
              <div className="pricing10-price2">
                <p className="pricing10-text12 thq-body-large">
                  {props.plan1 ?? (
                    <Fragment>
                      <span className="pricing10-text68">Basic Plan</span>
                    </Fragment>
                  )}
                </p>
                <h3 className="pricing10-text13 thq-heading-3">
                  {props.plan1Price ?? (
                    <Fragment>
                      <span className="pricing10-text57">$500</span>
                    </Fragment>
                  )}
                </h3>
                <p className="pricing10-text14 thq-body-large">
                  {props.plan1Yearly ?? (
                    <Fragment>
                      <span className="pricing10-text53">$5000</span>
                    </Fragment>
                  )}
                </p>
              </div>
            </div>
            <button className="pricing10-button1 thq-button-outline thq-button-animated">
              <span className="thq-body-small">
                {props.plan1Action ?? (
                  <Fragment>
                    <span className="pricing10-text65">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
          <div className="pricing10-column2">
            <div className="pricing10-price3">
              <div className="pricing10-price4">
                <p className="pricing10-text16 thq-body-large">
                  {props.plan2 ?? (
                    <Fragment>
                      <span className="pricing10-text73">Advanced Plan</span>
                    </Fragment>
                  )}
                </p>
                <h3 className="pricing10-text17 thq-heading-3">
                  {props.plan2Price ?? (
                    <Fragment>
                      <span className="pricing10-text60">$800</span>
                    </Fragment>
                  )}
                </h3>
                <p className="pricing10-text18 thq-body-large">
                  {props.plan2Yearly ?? (
                    <Fragment>
                      <span className="pricing10-text42">$8000</span>
                    </Fragment>
                  )}
                </p>
              </div>
            </div>
            <button className="pricing10-button2 thq-button-animated thq-button-filled">
              <span className="thq-body-small">
                {props.plan2Action ?? (
                  <Fragment>
                    <span className="pricing10-text63">Get Started</span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
          <div className="pricing10-column3">
            <div className="pricing10-price5">
              <div className="pricing10-price6">
                <p className="pricing10-text20 thq-body-large">
                  {props.plan3 ?? (
                    <Fragment>
                      <span className="pricing10-text58">Pro Plan</span>
                    </Fragment>
                  )}
                </p>
                <h3 className="pricing10-text21 thq-heading-3">
                  {props.plan3Price ?? (
                    <Fragment>
                      <span className="pricing10-text59">$1200</span>
                    </Fragment>
                  )}
                </h3>
                <p className="pricing10-text22 thq-body-large">
                  {props.plan3Yearly ?? (
                    <Fragment>
                      <span className="pricing10-text56">$12000</span>
                    </Fragment>
                  )}
                </p>
              </div>
            </div>
            <button className="pricing10-button3 thq-button-animated thq-button-filled">
              <span className="thq-body-small">
                {props.plan1Action11 ?? (
                  <Fragment>
                    <span className="pricing10-text48">
                      Customize Your Plan
                    </span>
                  </Fragment>
                )}
              </span>
            </button>
          </div>
        </div>
        <div className="pricing10-container11">
          <div className="pricing10-content21">
            <h3 className="thq-heading-3">
              {props.featureCategory1 ?? (
                <Fragment>
                  <span className="pricing10-text72">Standard Features</span>
                </Fragment>
              )}
            </h3>
          </div>
          <div className="pricing10-container12">
            <div className="pricing10-container13">
              <span className="thq-body-small">
                {props.feature1 ?? (
                  <Fragment>
                    <span className="pricing10-text66">Responsive Design</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container14">
              <span className="pricing10-text26 thq-body-small">
                {props.count1 ?? (
                  <Fragment>
                    <span className="pricing10-text71">3</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container15">
              <span className="thq-body-small">
                {props.count2 ?? (
                  <Fragment>
                    <span className="pricing10-text47">5</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container16">
              <span className="pricing10-text28 thq-body-small">
                {props.count3 ?? (
                  <Fragment>
                    <span className="pricing10-text52">7</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="pricing10-container17">
            <div className="pricing10-container18">
              <span className="thq-body-small">
                {props.feature2 ?? (
                  <Fragment>
                    <span className="pricing10-text54">SEO Optimization</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container19">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container20">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container21">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container22">
            <div className="pricing10-container23">
              <span className="thq-body-small">
                {props.feature3 ?? (
                  <Fragment>
                    <span className="pricing10-text69">Quality Coding</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container24">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container25">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container26">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container27">
            <div className="pricing10-container28">
              <span className="thq-body-small">
                {props.feature4 ?? (
                  <Fragment>
                    <span className="pricing10-text44">
                      Custom Web Development Solutions
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container29">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container30">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container31">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container32">
            <div className="pricing10-container33">
              <span className="thq-body-small">
                {props.feature5 ?? (
                  <Fragment>
                    <span className="pricing10-text70">
                      E-commerce Integration
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container34">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container35">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container36">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="pricing10-container37">
          <div className="pricing10-content22">
            <h3 className="thq-heading-3">
              {props.featureCategory2 ?? (
                <Fragment>
                  <span className="pricing10-text49">Premium Features</span>
                </Fragment>
              )}
            </h3>
          </div>
          <div className="pricing10-container38">
            <div className="pricing10-container39">
              <span className="thq-body-small">
                {props.feature6 ?? (
                  <Fragment>
                    <span className="pricing10-text55">Priority Support</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container40">
              <span className="pricing10-text35 thq-body-small">
                {props.count4 ?? (
                  <Fragment>
                    <span className="pricing10-text64">20</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container41">
              <span className="thq-body-small">
                {props.count5 ?? (
                  <Fragment>
                    <span className="pricing10-text61">100</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container42">
              <span className="pricing10-text37 thq-body-small">
                {props.count6 ?? (
                  <Fragment>
                    <span className="pricing10-text62">Unlimited</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
          <div className="pricing10-container43">
            <div className="pricing10-container44">
              <span className="thq-body-small">
                {props.feature7 ?? (
                  <Fragment>
                    <span className="pricing10-text45">
                      Advanced SEO Strategies
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container45">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container46">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container47">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container48">
            <div className="pricing10-container49">
              <span className="thq-body-small">
                {props.feature8 ?? (
                  <Fragment>
                    <span className="pricing10-text50">24/7 Support</span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container50">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container51">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container52">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container53">
            <div className="pricing10-container54">
              <span className="thq-body-small">
                {props.feature9 ?? (
                  <Fragment>
                    <span className="pricing10-text43">
                      Unlimited Revisions
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container55">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container56">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
            <div className="pricing10-container57">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
          <div className="pricing10-container58">
            <div className="pricing10-container59">
              <span className="thq-body-small">
                {props.feature10 ?? (
                  <Fragment>
                    <span className="pricing10-text46">
                      Dedicated Account Manager
                    </span>
                  </Fragment>
                )}
              </span>
            </div>
            <div className="pricing10-container60">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container61">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div className="pricing10-container62">
              <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Pricing10.defaultProps = {
  plan2Yearly: undefined,
  feature9: undefined,
  feature4: undefined,
  feature7: undefined,
  feature10: undefined,
  count2: undefined,
  plan1Action11: undefined,
  featureCategory2: undefined,
  feature8: undefined,
  subtitle1: undefined,
  count3: undefined,
  plan1Yearly: undefined,
  feature2: undefined,
  feature6: undefined,
  plan3Yearly: undefined,
  plan1Price: undefined,
  plan3: undefined,
  plan3Price: undefined,
  plan2Price: undefined,
  count5: undefined,
  count6: undefined,
  plan2Action: undefined,
  count4: undefined,
  plan1Action: undefined,
  feature1: undefined,
  heading1: undefined,
  plan1: undefined,
  feature3: undefined,
  feature5: undefined,
  count1: undefined,
  featureCategory1: undefined,
  plan2: undefined,
}

Pricing10.propTypes = {
  plan2Yearly: PropTypes.element,
  feature9: PropTypes.element,
  feature4: PropTypes.element,
  feature7: PropTypes.element,
  feature10: PropTypes.element,
  count2: PropTypes.element,
  plan1Action11: PropTypes.element,
  featureCategory2: PropTypes.element,
  feature8: PropTypes.element,
  subtitle1: PropTypes.element,
  count3: PropTypes.element,
  plan1Yearly: PropTypes.element,
  feature2: PropTypes.element,
  feature6: PropTypes.element,
  plan3Yearly: PropTypes.element,
  plan1Price: PropTypes.element,
  plan3: PropTypes.element,
  plan3Price: PropTypes.element,
  plan2Price: PropTypes.element,
  count5: PropTypes.element,
  count6: PropTypes.element,
  plan2Action: PropTypes.element,
  count4: PropTypes.element,
  plan1Action: PropTypes.element,
  feature1: PropTypes.element,
  heading1: PropTypes.element,
  plan1: PropTypes.element,
  feature3: PropTypes.element,
  feature5: PropTypes.element,
  count1: PropTypes.element,
  featureCategory1: PropTypes.element,
  plan2: PropTypes.element,
}

export default Pricing10
