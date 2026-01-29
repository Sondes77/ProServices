import React, { useState, Fragment } from 'react'

import PropTypes from 'prop-types'

import './pricing8.css'

const Pricing8 = (props) => {
  const [isMonthly, setIsMonthly] = useState(true)
  return (
    <div className="pricing8-pricing23 thq-section-padding">
      <div className="pricing8-max-width thq-section-max-width">
        <div className="pricing8-section-title">
          <span className="pricing8-text100 thq-body-small">
            {props.content1 ?? (
              <Fragment>
                <span className="pricing8-text197">Pricing plans</span>
              </Fragment>
            )}
          </span>
          <div className="pricing8-content">
            <h2 className="pricing8-text101 thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="pricing8-text198">
                    Remind everyone why to pick you
                  </span>
                </Fragment>
              )}
            </h2>
            <p className="pricing8-text102 thq-body-large">
              {props.content2 ?? (
                <Fragment>
                  <span className="pricing8-text178">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </Fragment>
              )}
            </p>
          </div>
        </div>
        <div className="pricing8-tabs">
          {isMonthly && (
            <button
              onClick={() => setIsMonthly(true)}
              className="pricing8-button10 thq-button-animated thq-button-filled"
            >
              <span className="thq-body-small">Monthly</span>
            </button>
          )}
          {!isMonthly && (
            <button
              onClick={() => setIsMonthly(true)}
              className="pricing8-button11 thq-button-outline thq-button-animated"
            >
              <span className="thq-body-small">Monthly</span>
            </button>
          )}
          {!isMonthly && (
            <button
              onClick={() => setIsMonthly(false)}
              className="pricing8-button12 thq-button-animated thq-button-filled"
            >
              <span className="thq-body-small">Yearly</span>
            </button>
          )}
          {isMonthly && (
            <button
              onClick={() => setIsMonthly(false)}
              className="pricing8-button13 thq-button-outline thq-button-animated"
            >
              <span className="thq-body-small">Yearly</span>
            </button>
          )}
        </div>
        {isMonthly && (
          <div className="pricing8-container1">
            <div className="pricing8-column1 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon10">
                <path d="M853.333 853.333h-682.667c-70.571 0-128-57.429-128-128v-426.667c0-70.571 57.429-128 128-128h682.667c70.571 0 128 57.429 128 128v426.667c0 70.571-57.429 128-128 128zM170.667 256c-23.509 0-42.667 19.157-42.667 42.667v426.667c0 23.509 19.157 42.667 42.667 42.667h682.667c23.509 0 42.667-19.157 42.667-42.667v-426.667c0-23.509-19.157-42.667-42.667-42.667h-682.667z"></path>
                <path d="M426.667 640h-170.667c-23.595 0-42.667-19.115-42.667-42.667s19.072-42.667 42.667-42.667h170.667c23.595 0 42.667 19.115 42.667 42.667s-19.072 42.667-42.667 42.667z"></path>
                <path d="M426.667 469.333h-170.667c-23.595 0-42.667-19.115-42.667-42.667s19.072-42.667 42.667-42.667h170.667c23.595 0 42.667 19.115 42.667 42.667s-19.072 42.667-42.667 42.667z"></path>
                <path d="M768 448c0 47.128-38.205 85.333-85.333 85.333s-85.333-38.205-85.333-85.333c0-47.128 38.205-85.333 85.333-85.333 47.128 0 85.333 38.205 85.333 85.333z"></path>
                <path d="M682.667 569.856c-66.645 0-106.667 30.507-106.667 60.971 0 15.232 40.021 30.507 106.667 30.507 62.549 0 106.667-15.232 106.667-30.507 0-30.464-41.813-60.971-106.667-60.971z"></path>
              </svg>
              <div className="pricing8-price10">
                <div className="pricing8-price11">
                  <p className="pricing8-text107 thq-body-large">
                    {props.plan1 ?? (
                      <Fragment>
                        <span className="pricing8-text181">Basic Plan</span>
                      </Fragment>
                    )}
                  </p>
                  <h3 className="pricing8-text108 thq-heading-3">
                    {props.plan1Price ?? (
                      <Fragment>
                        <span className="pricing8-text164">$500</span>
                      </Fragment>
                    )}
                  </h3>
                  <p className="thq-body-large">
                    {props.plan1Yearly ?? (
                      <Fragment>
                        <span className="pricing8-text204">$5000</span>
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="pricing8-list1">
                  <div className="pricing8-list-item10">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature1 ?? (
                        <Fragment>
                          <span className="pricing8-text162">
                            Custom Web Development
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item11">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature2 ?? (
                        <Fragment>
                          <span className="pricing8-text200">
                            Responsive Design
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item12">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature3 ?? (
                        <Fragment>
                          <span className="pricing8-text189">
                            SEO Optimization
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button14 thq-button-outline thq-button-animated">
                <span className="thq-body-small">
                  {props.plan1Action ?? (
                    <Fragment>
                      <span className="pricing8-text205">Get Started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="pricing8-column2 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon22">
                <path d="M598 298v-84h-172v84h172zM854 298q34 0 59 26t25 60v128q0 34-25 60t-59 26h-256v-86h-172v86h-256q-36 0-60-25t-24-61v-128q0-34 25-60t59-26h170v-84l86-86h170l86 86v84h172zM426 682h172v-42h298v170q0 36-25 61t-61 25h-596q-36 0-61-25t-25-61v-170h298v42z"></path>
              </svg>
              <div className="pricing8-price12">
                <div className="pricing8-price13">
                  <p className="pricing8-text114 thq-body-large">
                    {props.plan2 ?? (
                      <Fragment>
                        <span className="pricing8-text170">Standard Plan</span>
                      </Fragment>
                    )}
                  </p>
                  <h3 className="pricing8-text115 thq-heading-3">
                    {props.plan2Price ?? (
                      <Fragment>
                        <span className="pricing8-text193">$800</span>
                      </Fragment>
                    )}
                  </h3>
                  <p className="thq-body-large">
                    {props.plan2Yearly ?? (
                      <Fragment>
                        <span className="pricing8-text166">$8000</span>
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="pricing8-list2">
                  <div className="pricing8-list-item13">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature1 ?? (
                        <Fragment>
                          <span className="pricing8-text202">
                            Everything in Basic Plan
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item14">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature2 ?? (
                        <Fragment>
                          <span className="pricing8-text191">
                            E-commerce Integration
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item15">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature3 ?? (
                        <Fragment>
                          <span className="pricing8-text177">
                            Social Media Integration
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item16">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature4 ?? (
                        <Fragment>
                          <span className="pricing8-text195">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button15 thq-button-animated thq-button-filled">
                <span className="thq-body-small">
                  {props.plan2Action ?? (
                    <Fragment>
                      <span className="pricing8-text185">Get Started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="pricing8-column3 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon32">
                <path d="M768 640v86h-86v-86h86zM768 470v84h-86v-84h86zM854 810v-426h-342v86h86v84h-86v86h86v86h-86v84h342zM426 298v-84h-84v84h84zM426 470v-86h-84v86h84zM426 640v-86h-84v86h84zM426 810v-84h-84v84h84zM256 298v-84h-86v84h86zM256 470v-86h-86v86h86zM256 640v-86h-86v86h86zM256 810v-84h-86v84h86zM512 298h426v598h-852v-768h426v170z"></path>
              </svg>
              <div className="pricing8-price14">
                <div className="pricing8-price15">
                  <p className="pricing8-text122 thq-body-large">
                    {props.plan3 ?? (
                      <Fragment>
                        <span className="pricing8-text190">Premium Plan</span>
                      </Fragment>
                    )}
                  </p>
                  <h3 className="pricing8-text123 thq-heading-3">
                    {props.plan3Price ?? (
                      <Fragment>
                        <span className="pricing8-text175">$1200</span>
                      </Fragment>
                    )}
                  </h3>
                  <p className="thq-body-large">
                    {props.plan3Yearly ?? (
                      <Fragment>
                        <span className="pricing8-text167">$12000</span>
                      </Fragment>
                    )}
                  </p>
                </div>
                <div className="pricing8-list3">
                  <div className="pricing8-list-item17">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature1 ?? (
                        <Fragment>
                          <span className="pricing8-text157">
                            Everything in Standard Plan
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item18">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature2 ?? (
                        <Fragment>
                          <span className="pricing8-text156">
                            Advanced Analytics
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item19">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature3 ?? (
                        <Fragment>
                          <span className="pricing8-text168">
                            Priority Support
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item20">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature4 ?? (
                        <Fragment>
                          <span className="pricing8-text180">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item21">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature5 ?? (
                        <Fragment>
                          <span className="pricing8-text174">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button16 thq-button-animated thq-button-filled">
                <span className="thq-body-small">
                  {props.plan3Action ?? (
                    <Fragment>
                      <span className="pricing8-text179">Get Started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
        {!isMonthly && (
          <div className="pricing8-container2">
            <div className="pricing8-column4 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon44">
                <path d="M853.333 853.333h-682.667c-70.571 0-128-57.429-128-128v-426.667c0-70.571 57.429-128 128-128h682.667c70.571 0 128 57.429 128 128v426.667c0 70.571-57.429 128-128 128zM170.667 256c-23.509 0-42.667 19.157-42.667 42.667v426.667c0 23.509 19.157 42.667 42.667 42.667h682.667c23.509 0 42.667-19.157 42.667-42.667v-426.667c0-23.509-19.157-42.667-42.667-42.667h-682.667z"></path>
                <path d="M426.667 640h-170.667c-23.595 0-42.667-19.115-42.667-42.667s19.072-42.667 42.667-42.667h170.667c23.595 0 42.667 19.115 42.667 42.667s-19.072 42.667-42.667 42.667z"></path>
                <path d="M426.667 469.333h-170.667c-23.595 0-42.667-19.115-42.667-42.667s19.072-42.667 42.667-42.667h170.667c23.595 0 42.667 19.115 42.667 42.667s-19.072 42.667-42.667 42.667z"></path>
                <path d="M768 448c0 47.128-38.205 85.333-85.333 85.333s-85.333-38.205-85.333-85.333c0-47.128 38.205-85.333 85.333-85.333 47.128 0 85.333 38.205 85.333 85.333z"></path>
                <path d="M682.667 569.856c-66.645 0-106.667 30.507-106.667 60.971 0 15.232 40.021 30.507 106.667 30.507 62.549 0 106.667-15.232 106.667-30.507 0-30.464-41.813-60.971-106.667-60.971z"></path>
              </svg>
              <div className="pricing8-price16">
                <div className="pricing8-price17">
                  <span className="pricing8-text131 thq-body-large">
                    {props.plan11 ?? (
                      <Fragment>
                        <span className="pricing8-text158">Basic plan</span>
                      </Fragment>
                    )}
                  </span>
                  <h3 className="pricing8-text132 thq-heading-3">
                    {props.plan1Price1 ?? (
                      <Fragment>
                        <span className="pricing8-text169">$200/year</span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-large">
                    {props.plan1Yearly1 ?? (
                      <Fragment>
                        <span className="pricing8-text196">or $20 monthly</span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing8-list4">
                  <div className="pricing8-list-item22">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature11 ?? (
                        <Fragment>
                          <span className="pricing8-text160">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item23">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature21 ?? (
                        <Fragment>
                          <span className="pricing8-text161">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item24">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan1Feature31 ?? (
                        <Fragment>
                          <span className="pricing8-text163">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button17 thq-button-outline thq-button-animated">
                <span className="thq-body-small">
                  {props.plan1Action1 ?? (
                    <Fragment>
                      <span className="pricing8-text176">Get started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="pricing8-column5 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon56">
                <path d="M598 298v-84h-172v84h172zM854 298q34 0 59 26t25 60v128q0 34-25 60t-59 26h-256v-86h-172v86h-256q-36 0-60-25t-24-61v-128q0-34 25-60t59-26h170v-84l86-86h170l86 86v84h172zM426 682h172v-42h298v170q0 36-25 61t-61 25h-596q-36 0-61-25t-25-61v-170h298v42z"></path>
              </svg>
              <div className="pricing8-price18">
                <div className="pricing8-price19">
                  <span className="pricing8-text138 thq-body-large">
                    {props.plan21 ?? (
                      <Fragment>
                        <span className="pricing8-text192">Business plan</span>
                      </Fragment>
                    )}
                  </span>
                  <h3 className="pricing8-text139 thq-heading-3">
                    {props.plan2Price1 ?? (
                      <Fragment>
                        <span className="pricing8-text203">$299/year</span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-large">
                    {props.plan2Yearly1 ?? (
                      <Fragment>
                        <span className="pricing8-text184">or $29 monthly</span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing8-list5">
                  <div className="pricing8-list-item25">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature11 ?? (
                        <Fragment>
                          <span className="pricing8-text182">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item26">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature21 ?? (
                        <Fragment>
                          <span className="pricing8-text155">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item27">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature31 ?? (
                        <Fragment>
                          <span className="pricing8-text186">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item28">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan2Feature41 ?? (
                        <Fragment>
                          <span className="pricing8-text199">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button18 thq-button-animated thq-button-filled">
                <span className="thq-body-small">
                  {props.plan2Action1 ?? (
                    <Fragment>
                      <span className="pricing8-text201">Get started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
            <div className="pricing8-column6 thq-card">
              <svg viewBox="0 0 1024 1024" className="pricing8-icon66">
                <path d="M768 640v86h-86v-86h86zM768 470v84h-86v-84h86zM854 810v-426h-342v86h86v84h-86v86h86v86h-86v84h342zM426 298v-84h-84v84h84zM426 470v-86h-84v86h84zM426 640v-86h-84v86h84zM426 810v-84h-84v84h84zM256 298v-84h-86v84h86zM256 470v-86h-86v86h86zM256 640v-86h-86v86h86zM256 810v-84h-86v84h86zM512 298h426v598h-852v-768h426v170z"></path>
              </svg>
              <div className="pricing8-price20">
                <div className="pricing8-price21">
                  <span className="pricing8-text146 thq-body-large">
                    {props.plan31 ?? (
                      <Fragment>
                        <span className="pricing8-text188">
                          Enterprise plan
                        </span>
                      </Fragment>
                    )}
                  </span>
                  <h3 className="pricing8-text147 thq-heading-3">
                    {props.plan3Price1 ?? (
                      <Fragment>
                        <span className="pricing8-text183">$499/year</span>
                      </Fragment>
                    )}
                  </h3>
                  <span className="thq-body-large">
                    {props.plan3Yearly1 ?? (
                      <Fragment>
                        <span className="pricing8-text187">or $49 monthly</span>
                      </Fragment>
                    )}
                  </span>
                </div>
                <div className="pricing8-list6">
                  <div className="pricing8-list-item29">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature11 ?? (
                        <Fragment>
                          <span className="pricing8-text171">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item30">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature21 ?? (
                        <Fragment>
                          <span className="pricing8-text172">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item31">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature31 ?? (
                        <Fragment>
                          <span className="pricing8-text194">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item32">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature41 ?? (
                        <Fragment>
                          <span className="pricing8-text173">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                  <div className="pricing8-list-item33">
                    <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                      <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                    </svg>
                    <span className="thq-body-small">
                      {props.plan3Feature51 ?? (
                        <Fragment>
                          <span className="pricing8-text165">
                            Feature text goes here
                          </span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="pricing8-button19 thq-button-animated thq-button-filled">
                <span className="thq-body-small">
                  {props.plan3Action1 ?? (
                    <Fragment>
                      <span className="pricing8-text159">Get started</span>
                    </Fragment>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Pricing8.defaultProps = {
  plan2Feature21: undefined,
  plan3Feature2: undefined,
  plan3Feature1: undefined,
  plan11: undefined,
  plan3Action1: undefined,
  plan1Feature11: undefined,
  plan1Feature21: undefined,
  plan1Feature1: undefined,
  plan1Feature31: undefined,
  plan1Price: undefined,
  plan3Feature51: undefined,
  plan2Yearly: undefined,
  plan3Yearly: undefined,
  plan3Feature3: undefined,
  plan1Price1: undefined,
  plan2: undefined,
  plan3Feature11: undefined,
  plan3Feature21: undefined,
  plan3Feature41: undefined,
  plan3Feature5: undefined,
  plan3Price: undefined,
  plan1Action1: undefined,
  plan2Feature3: undefined,
  content2: undefined,
  plan3Action: undefined,
  plan3Feature4: undefined,
  plan1: undefined,
  plan2Feature11: undefined,
  plan3Price1: undefined,
  plan2Yearly1: undefined,
  plan2Action: undefined,
  plan2Feature31: undefined,
  plan3Yearly1: undefined,
  plan31: undefined,
  plan1Feature3: undefined,
  plan3: undefined,
  plan2Feature2: undefined,
  plan21: undefined,
  plan2Price: undefined,
  plan3Feature31: undefined,
  plan2Feature4: undefined,
  plan1Yearly1: undefined,
  content1: undefined,
  heading1: undefined,
  plan2Feature41: undefined,
  plan1Feature2: undefined,
  plan2Action1: undefined,
  plan2Feature1: undefined,
  plan2Price1: undefined,
  plan1Yearly: undefined,
  plan1Action: undefined,
}

Pricing8.propTypes = {
  plan2Feature21: PropTypes.element,
  plan3Feature2: PropTypes.element,
  plan3Feature1: PropTypes.element,
  plan11: PropTypes.element,
  plan3Action1: PropTypes.element,
  plan1Feature11: PropTypes.element,
  plan1Feature21: PropTypes.element,
  plan1Feature1: PropTypes.element,
  plan1Feature31: PropTypes.element,
  plan1Price: PropTypes.element,
  plan3Feature51: PropTypes.element,
  plan2Yearly: PropTypes.element,
  plan3Yearly: PropTypes.element,
  plan3Feature3: PropTypes.element,
  plan1Price1: PropTypes.element,
  plan2: PropTypes.element,
  plan3Feature11: PropTypes.element,
  plan3Feature21: PropTypes.element,
  plan3Feature41: PropTypes.element,
  plan3Feature5: PropTypes.element,
  plan3Price: PropTypes.element,
  plan1Action1: PropTypes.element,
  plan2Feature3: PropTypes.element,
  content2: PropTypes.element,
  plan3Action: PropTypes.element,
  plan3Feature4: PropTypes.element,
  plan1: PropTypes.element,
  plan2Feature11: PropTypes.element,
  plan3Price1: PropTypes.element,
  plan2Yearly1: PropTypes.element,
  plan2Action: PropTypes.element,
  plan2Feature31: PropTypes.element,
  plan3Yearly1: PropTypes.element,
  plan31: PropTypes.element,
  plan1Feature3: PropTypes.element,
  plan3: PropTypes.element,
  plan2Feature2: PropTypes.element,
  plan21: PropTypes.element,
  plan2Price: PropTypes.element,
  plan3Feature31: PropTypes.element,
  plan2Feature4: PropTypes.element,
  plan1Yearly1: PropTypes.element,
  content1: PropTypes.element,
  heading1: PropTypes.element,
  plan2Feature41: PropTypes.element,
  plan1Feature2: PropTypes.element,
  plan2Action1: PropTypes.element,
  plan2Feature1: PropTypes.element,
  plan2Price1: PropTypes.element,
  plan1Yearly: PropTypes.element,
  plan1Action: PropTypes.element,
}

export default Pricing8
