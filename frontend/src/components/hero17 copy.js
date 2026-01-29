import React, { Fragment } from 'react'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'
import image from '../img/photo.png';
import './hero17.css'

const Hero17 = (props) => {
  return (
    <div className="hero17-header78 ">
      <img
        alt={props.image1Alt}
        src={image}
        className="banner3-image thq-img-ratio-16-9"
      />
      <div className="hero17-column thq-section-max-width thq-section-padding">
        <div className="hero17-content1">
          <h1 className="hero17-text1 thq-heading-1">
            {props.heading1 ?? (
              <Fragment>
                <span className="hero17-text8">Welcome to My Portfolio</span>
              </Fragment>
            )}
          </h1>
          <p className="hero17-text2 thq-body-large">
            {props.content1 ?? (
              <Fragment>
                <span className="hero17-text6">
                  I am a freelance web developer dedicated to creating modern
                  and responsive websites. Let&apos;s bring your ideas to life!
                </span>
              </Fragment>
            )}
          </p>
        </div>
        <div className="hero17-actions">
          <button className="thq-button-filled hero17-button1">
            <span className="thq-body-small">
              {props.action1 ?? (
                <Fragment>
                  <span className="hero17-text5">View Portfolio</span>
                </Fragment>
              )}
            </span>
          </button>
          <button className="thq-button-outline hero17-button2">
            <span className="thq-body-small">
              {props.action2 ?? (
                <Fragment>
                  <span className="hero17-text7">Contact Me</span>
                </Fragment>
              )}
            </span>
          </button>
        </div>
      </div>
      <div className="hero17-content2">
        <div className="hero17-row-container1 thq-animated-group-container-horizontal thq-mask-image-horizontal">
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero17-placeholder-image10 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero17-placeholder-image11 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero17-placeholder-image12 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero17-placeholder-image13 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero17-placeholder-image14 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image6Alt}
              src={props.image6Src}
              className="hero17-placeholder-image15 thq-img-scale thq-img-ratio-1-1"
            />
          </div>
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero17-placeholder-image16 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero17-placeholder-image17 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero17-placeholder-image18 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero17-placeholder-image19 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero17-placeholder-image20 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero17-placeholder-image21 thq-img-scale thq-img-ratio-1-1"
            />
          </div>
        </div>
        <div className="hero17-row-container2 thq-animated-group-container-horizontal thq-mask-image-horizontal">
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero17-placeholder-image22 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero17-placeholder-image23 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero17-placeholder-image24 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero17-placeholder-image25 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero17-placeholder-image26 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image12Alt}
              src={props.image12Src}
              className="hero17-placeholder-image27 thq-img-scale thq-img-ratio-1-1"
            />
          </div>
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero17-placeholder-image28 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero17-placeholder-image29 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero17-placeholder-image30 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero17-placeholder-image31 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero17-placeholder-image32 thq-img-scale thq-img-ratio-1-1"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero17-placeholder-image33 thq-img-scale thq-img-ratio-1-1"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="hero17-container2">
          <Script
            html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

Hero17.defaultProps = {
  action1: undefined,
  image2Src:
    'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NHw&ixlib=rb-4.0.3&q=80&w=1080',
  image11Alt: 'Hero Image',
  image10Src:
    'https://images.unsplash.com/photo-1498049860654-af1a5c566876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1N3w&ixlib=rb-4.0.3&q=80&w=1080',
  image8Src:
    'https://images.unsplash.com/photo-1638734254932-657721b67e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  image9Src:
    'https://images.unsplash.com/photo-1573496130103-a442a3754d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  image11Src:
    'https://images.unsplash.com/photo-1446508431468-060dbf1f9633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Web Developer Image',
  image12Src:
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  image2Alt: 'Hero Image',
  content1: undefined,
  image7Alt: 'Hero Image',
  image8Alt: 'Hero Image',
  image6Alt: 'Hero Image',
  image3Alt: 'Hero Image',
  image3Src:
    'https://images.unsplash.com/photo-1745148404305-9315e50140f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NHw&ixlib=rb-4.0.3&q=80&w=1080',
  action2: undefined,
  image4Alt: 'Hero Image',
  image5Alt: 'Hero Image',
  image4Src:
    'https://images.unsplash.com/photo-1584259432764-863c1d73f22d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  heading1: undefined,
  image7Src:
    'https://images.unsplash.com/photo-1503581082249-caa7a3866437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  image9Alt: 'Hero Image',
  image10Alt: 'Hero Image',
  image6Src:
    'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Src:
    'https://images.unsplash.com/photo-1528459105426-b9548367069b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1N3w&ixlib=rb-4.0.3&q=80&w=1080',
  image5Src:
    'https://images.unsplash.com/photo-1729413058428-466d1477d781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NTUxMzQ1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  image12Alt: 'Hero Image',
}

Hero17.propTypes = {
  action1: PropTypes.element,
  image2Src: PropTypes.string,
  image11Alt: PropTypes.string,
  image10Src: PropTypes.string,
  image8Src: PropTypes.string,
  image9Src: PropTypes.string,
  image11Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image12Src: PropTypes.string,
  image2Alt: PropTypes.string,
  content1: PropTypes.element,
  image7Alt: PropTypes.string,
  image8Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image3Src: PropTypes.string,
  action2: PropTypes.element,
  image4Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image4Src: PropTypes.string,
  heading1: PropTypes.element,
  image7Src: PropTypes.string,
  image9Alt: PropTypes.string,
  image10Alt: PropTypes.string,
  image6Src: PropTypes.string,
  image1Src: PropTypes.string,
  image5Src: PropTypes.string,
  image12Alt: PropTypes.string,
}

export default Hero17
