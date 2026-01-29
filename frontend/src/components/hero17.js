import React, { Fragment , useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, LogIn } from 'lucide-react';
import image from '../img/photo.png';
import './hero17.css'

const Hero17 = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [motCle, setMotCle] = useState(query.get('motcle') || '');
  return (
    <div className="hero17-header78 py-20 thq-section-padding">
      <img
        alt={props.image1Alt}
        src={image}
        className="banner3-image thq-img-ratio-16-9"
      />
       <div className="hero17-column thq-section-max-width thq-section-padding">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold mb-10">
            Trouvez le bon professionnel
            <span className="text-[#e0692d] thq-link-h1-home"> près de chez vous</span>
          </h1>
          <p className="text-xl text-white mb-8">
            Des milliers de professionnels qualifiés à votre service pour tous vos projets
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                value={motCle}
                onChange={(e) => setMotCle(e.target.value)}
                placeholder="Quel service recherchez-vous ?"
                className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e0692d]"
              />
              <Link
                to={`/search?motcle=${encodeURIComponent((motCle || '').toLowerCase())}`}
                className="w-full sm:w-auto px-8 py-3 text-white bg-[#e0692d] hover:bg-[#f07e40] rounded-full font-medium flex items-center justify-center whitespace-nowrap"
              >
                <Search size={20} className="mr-2" />
                Rechercher
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="hero17-column thq-section-max-width thq-section-padding">
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
      </div>*/}
    </div>
  )
}

export default Hero17
