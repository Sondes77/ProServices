import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero8 from '../components/hero8'
import Stats2 from '../components/stats2'
import Logos1 from '../components/logos1'
import Features1 from '../components/features1'
import Team1 from '../components/team1'
import Footer4 from '../components/footer4'
import './about.css'

const About = (props) => {
  return (
    <div className="about-container">
      <Helmet>
        <title>About - Healthy Blushing Mouse</title>
        <meta property="og:title" content="About - Healthy Blushing Mouse" />
      </Helmet>
  
      <Hero8
        content1={
          <Fragment>
            <span className="about-text24">
              Custom web development solutions, responsive design, and SEO
              optimization
            </span>
          </Fragment>
        }
        action2={
          <Fragment>
            <span className="about-text25">View Portfolio</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="about-text26">Freelance Web Developer</span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="about-text27">Get a Quote</span>
          </Fragment>
        }
      ></Hero8>
      <Stats2
        stat1={
          <Fragment>
            <span className="about-text28">Custom Web Development</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="about-text29">
              Over 50 custom websites developed
            </span>
          </Fragment>
        }
        content2={
          <Fragment>
            <span className="about-text30">
              Client satisfaction rate of 95%
            </span>
          </Fragment>
        }
        stat3={
          <Fragment>
            <span className="about-text31">Responsive Design</span>
          </Fragment>
        }
        stat4={
          <Fragment>
            <span className="about-text32">Portfolio</span>
          </Fragment>
        }
        stat2Description={
          <Fragment>
            <span className="about-text33">
              Enhance your website&apos;s visibility and ranking on search
              engines
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="about-text34">Our Stats</span>
          </Fragment>
        }
        stat4Description={
          <Fragment>
            <span className="about-text35">
              Check out our latest projects and see our work in action
            </span>
          </Fragment>
        }
        stat2={
          <Fragment>
            <span className="about-text36">SEO Optimization</span>
          </Fragment>
        }
        stat3Description={
          <Fragment>
            <span className="about-text37">
              Create websites that adapt seamlessly to different devices and
              screen sizes
            </span>
          </Fragment>
        }
        stat1Description={
          <Fragment>
            <span className="about-text38">
              Tailored web development solutions to meet your specific needs
            </span>
          </Fragment>
        }
      ></Stats2>
      <Logos1
        heading1={
          <Fragment>
            <span className="about-text39">
              Trusted by the world&apos;s best companies social proof to build
              credibility
            </span>
          </Fragment>
        }
      ></Logos1>
      <Features1
        mainAction={
          <Fragment>
            <span className="about-text40">
              Custom Web Development Solutions
            </span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="about-text41">Responsive Design</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="about-text42">Custom Web Development</span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="about-text43">
              We specialize in creating custom websites that align with your
              brand and business goals.
            </span>
          </Fragment>
        }
        slogan={
          <Fragment>
            <span className="about-text44">
              Crafting unique websites tailored to your needs.
            </span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="about-text45">SEO Optimization</span>
          </Fragment>
        }
        feature3Description={
          <Fragment>
            <span className="about-text46">
              Implementing SEO best practices to improve your website&apos;s
              visibility and ranking.
            </span>
          </Fragment>
        }
        sectionDescription={
          <Fragment>
            <span className="about-text47">
              Explore the key features that set us apart from the rest.
            </span>
          </Fragment>
        }
        secondaryAction={
          <Fragment>
            <span className="about-text48">Responsive Design</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="about-text49">
              Ensuring your website looks great and functions seamlessly on all
              devices.
            </span>
          </Fragment>
        }
        sectionTitle={
          <Fragment>
            <span className="about-text50">Our Features</span>
          </Fragment>
        }
      ></Features1>
      <Team1
        member5Content={
          <Fragment>
            <span className="about-text51">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
          </Fragment>
        }
        member2Content={
          <Fragment>
            <span className="about-text52">
              Jane is a talented designer who specializes in creating visually
              appealing and intuitive user interfaces.
            </span>
          </Fragment>
        }
        member8Content={
          <Fragment>
            <span className="about-text53">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="about-text54">Meet Our Team</span>
          </Fragment>
        }
        member3Job={
          <Fragment>
            <span className="about-text55">SEO Specialist</span>
          </Fragment>
        }
        member4Content={
          <Fragment>
            <span className="about-text56">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
          </Fragment>
        }
        member2Job={
          <Fragment>
            <span className="about-text57">UI/UX Designer</span>
          </Fragment>
        }
        content2={
          <Fragment>
            <span className="about-text58">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </Fragment>
        }
        member8={
          <Fragment>
            <span className="about-text59">Full name</span>
          </Fragment>
        }
        member7={
          <Fragment>
            <span className="about-text60">Full name</span>
          </Fragment>
        }
        member7Content={
          <Fragment>
            <span className="about-text61">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
          </Fragment>
        }
        member8Job={
          <Fragment>
            <span className="about-text62">Job title</span>
          </Fragment>
        }
        heading2={
          <Fragment>
            <span className="about-text63">We’re hiring!</span>
          </Fragment>
        }
        member2={
          <Fragment>
            <span className="about-text64">Jane Smith</span>
          </Fragment>
        }
        member6Job={
          <Fragment>
            <span className="about-text65">Job title</span>
          </Fragment>
        }
        member3Content={
          <Fragment>
            <span className="about-text66">
              Alex is an SEO expert dedicated to optimizing websites for better
              search engine rankings.
            </span>
          </Fragment>
        }
        actionContent={
          <Fragment>
            <span className="about-text67">Open positions</span>
          </Fragment>
        }
        member6={
          <Fragment>
            <span className="about-text68">Full name</span>
          </Fragment>
        }
        member5={
          <Fragment>
            <span className="about-text69">Full name</span>
          </Fragment>
        }
        content3={
          <Fragment>
            <span className="about-text70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </Fragment>
        }
        member4Job={
          <Fragment>
            <span className="about-text71">Job title</span>
          </Fragment>
        }
        member1Job={
          <Fragment>
            <span className="about-text72">Lead Web Developer</span>
          </Fragment>
        }
        member1={
          <Fragment>
            <span className="about-text73">John Doe</span>
          </Fragment>
        }
        member4={
          <Fragment>
            <span className="about-text74">Full name</span>
          </Fragment>
        }
        member7Job={
          <Fragment>
            <span className="about-text75">Job title</span>
          </Fragment>
        }
        member3={
          <Fragment>
            <span className="about-text76">Alex Johnson</span>
          </Fragment>
        }
        member1Content={
          <Fragment>
            <span className="about-text77">
              John is an experienced web developer with a passion for creating
              innovative and user-friendly websites.
            </span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="about-text78">Join Our Team Today!</span>
          </Fragment>
        }
        member6Content={
          <Fragment>
            <span className="about-text79">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
          </Fragment>
        }
        member5Job={
          <Fragment>
            <span className="about-text80">Job title</span>
          </Fragment>
        }
      ></Team1>
      <Footer4
        link5={
          <Fragment>
            <span className="about-text81">Testimonials</span>
          </Fragment>
        }
        link3={
          <Fragment>
            <span className="about-text82">Services</span>
          </Fragment>
        }
        link1={
          <Fragment>
            <span className="about-text83">Home</span>
          </Fragment>
        }
        termsLink={
          <Fragment>
            <span className="about-text84">Terms of Service</span>
          </Fragment>
        }
        link2={
          <Fragment>
            <span className="about-text85">About</span>
          </Fragment>
        }
        link4={
          <Fragment>
            <span className="about-text86">Portfolio</span>
          </Fragment>
        }
        cookiesLink={
          <Fragment>
            <span className="about-text87">Cookies Policy</span>
          </Fragment>
        }
        privacyLink={
          <Fragment>
            <span className="about-text88">Privacy Policy</span>
          </Fragment>
        }
      ></Footer4>
    </div>
  )
}

export default About
