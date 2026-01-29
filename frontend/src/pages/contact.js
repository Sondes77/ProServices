import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'

import ContactForm3 from '../components/contact-form3'
import Contact14 from '../components/contact14'
import Contact7 from '../components/contact7'
import './contact.css'

const Contact = (props) => {
  return (
    <div className="contact-container">
      <Helmet>
        <title>Contact - Healthy Blushing Mouse</title>
        <meta property="og:title" content="Contact - Healthy Blushing Mouse" />
      </Helmet>
      <ContactForm3
        content2={
          <Fragment>
            <span className="contact-text24">Get in touch with us</span>
          </Fragment>
        }
        action={
          <Fragment>
            <span className="contact-text25">Submit</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="contact-text26">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="contact-text27">Contact us</span>
          </Fragment>
        }
      ></ContactForm3>
      <Contact14
        link1={
          <Fragment>
            <span className="contact-text28">Start new chat</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="contact-text29">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="contact-text30">Contact Us</span>
          </Fragment>
        }
        content2={
          <Fragment>
            <span className="contact-text31">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        heading4={
          <Fragment>
            <span className="contact-text32">Office</span>
          </Fragment>
        }
        address1={
          <Fragment>
            <span className="contact-text33">
              123 Web Development Street, Cityville, State, 12345
            </span>
          </Fragment>
        }
        content4={
          <Fragment>
            <span className="contact-text34">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        heading3={
          <Fragment>
            <span className="contact-text35">Phone</span>
          </Fragment>
        }
        phone1={
          <Fragment>
            <span className="contact-text36">+1 (555) 123-4567</span>
          </Fragment>
        }
        content3={
          <Fragment>
            <span className="contact-text37">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        heading2={
          <Fragment>
            <span className="contact-text38">Live Chat</span>
          </Fragment>
        }
        email1={
          <Fragment>
            <span className="contact-text39">info@webdeveloper.com</span>
          </Fragment>
        }
      ></Contact14>
      <Contact7
        location2={
          <Fragment>
            <span className="contact-text40">Phone</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="contact-text41">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
          </Fragment>
        }
        location2Description={
          <Fragment>
            <span className="contact-text42">
              You can also reach me by phone at +1234567890 during business
              hours.
            </span>
          </Fragment>
        }
        location1Description={
          <Fragment>
            <span className="contact-text43">
              Feel free to drop me an email at example@example.com for any
              inquiries or project requests.
            </span>
          </Fragment>
        }
        location1={
          <Fragment>
            <span className="contact-text44">Email</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="contact-text45">Contact Me</span>
          </Fragment>
        }
      ></Contact7>
    </div>
  )
}

export default Contact
