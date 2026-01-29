import React, { Fragment } from 'react'
import { useState } from 'react';
import { villesEtRegions } from '../components/villesRegions';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, Star, MessageSquare, ChevronDown, ChevronUp, ChevronRight, BadgeCheck } from 'lucide-react';
//import Navbar8 from '../components/navbar8'
import Banner2 from '../components/banner2'
import Banner3 from '../components/banner3'
import Hero17 from '../components/hero17'
import Features24 from '../components/features24'
import CTA26 from '../components/cta26'
import Features25 from '../components/features25'
import Pricing14 from '../components/pricing14'
import Steps2 from '../components/steps2'
import Testimonial17 from '../components/testimonial17'
import Contact10 from '../components/contact10'
import './test2.css'
import './sign-in.css'

const Home = (props) => {
  const navigate = useNavigate();
    const [ville, setVille] = useState('');
    const [region, setRegion] = useState('');
    const [pro, setMotCle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
      minRating: 0,
      maxPrice: '',
      categories: [],
      availability: 'all'
    });

    // Mock data - In a real app, this would come from an API
    const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse'];
    const regions = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine', 'Hauts-de-France', 'Occitanie'];
    const categories = ['Plomberie', 'Électricité', 'Menuiserie', 'Peinture', 'Jardinage', 'Maçonnerie'];
      const handleVilleChange = (e) => {
        setVille(e.target.value);
        setRegion('');
      };

  const handleRecherche = (e) => {
    e.preventDefault();
    console.log('Recherche:', { ville, region, pro });
    // Navigation vers la page de résultats avec les paramètres ?
    navigate(`/recherche?ville=${ville}&region=${region}&motcle=${pro}`);
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Healthy Blushing Mouse</title>
        <meta property="og:title" content="Healthy Blushing Mouse" />
      </Helmet>
      
      <Hero17
        heading1={
          <Fragment>
            <span className="home-text116 thq-link-h1-home">Trouvez un professionnel près de chez vous</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="hero17-text6">
                Des milliers de professionnels qualifiés à votre service!
            </span>
            <div className="banner3-container1 thq-section-padding">
              <form className="hero17-actions" onSubmit={handleRecherche}>
                
                <input
                  type="text"
                  placeholder="Ex: plombier, menuisier..."
                  onChange={(e) => setMotCle(e.target.value)}
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                />
                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={ville}
                  onChange={handleVilleChange}
                  required
                >
                  <option value="">-- Choisir une ville --</option>
                  {Object.keys(villesEtRegions).map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
    
                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  disabled={!ville}
                  required
                >
                  <option value="">-- Choisir une région --</option>
                  {ville && villesEtRegions[ville].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
    
                <button type="submit" className="thq-button-filled hero17-button1">
                  Rechercher
                </button>
              </form>
            </div>
          </Fragment>
        }
      ></Hero17>
      <Banner2
        heading1={
          <Fragment>
            <span className="home-text114">
              Trouvez des professionnels locaux pour vos besoins
            </span>
          </Fragment>
        }
        content1={
          <Fragment>
          
            <div className="banner2-container1">
              
              <form className="hero17-actions" onSubmit={handleRecherche}>
                <input
                  type="text"
                  placeholder="Ex: plombier, menuisier..."
                  onChange={(e) => setMotCle(e.target.value)}
                  className="thq-input hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  id="keywords"
                />
                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={ville}
                  onChange={handleVilleChange}
                  required
                >
                  <option value="">-- Choisir une ville --</option>
                  {Object.keys(villesEtRegions).map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
    
                <select
                  className="thq-button-outline hero17-button2 sign-in1-textinput thq-input thq-body-large"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  disabled={!ville}
                  required
                >
                  <option value="">-- Choisir une région --</option>
                  {ville && villesEtRegions[ville].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
    
                <button type="submit" className="thq-button-filled hero17-button1" id="contact-submit">
                  Rechercher
                </button>
              </form>
            </div>
          </Fragment>
        }
      ></Banner2>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <form onSubmit={handleRecherche} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher un professionnel..."
                      className="pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                     
                      onChange={(e) => setMotCle(e.target.value)}
                      id="keywords2"
                    />
                  </div>
      
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                      value={ville}
                      onChange={handleVilleChange}
                      required
                    >
                      <option value="">Sélectionner une ville</option>
                      {Object.keys(villesEtRegions).map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
      
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-[#e0692d] focus:border-[#e0692d]"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      disabled={!ville}
                      required
                    >
                      <option value="">Sélectionner une région</option>
                      {ville && villesEtRegions[ville].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
      
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center text-[#e0692d] hover:text-[#f07e40] transition-colors duration-200"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres avancés
                    {showAdvancedFilters ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </button>
      
                  {showAdvancedFilters && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Note minimum
                        </label>
                        <select
                          className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]"
                          value={filters.minRating}
                          onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                        >
                          <option value="0">Toutes les notes</option>
                          <option value="4">4+ étoiles</option>
                          <option value="4.5">4.5+ étoiles</option>
                        </select>
                      </div>
      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Catégorie
                        </label>
                        <select
                          className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]"
                          value={filters.categories[0] || ''}
                          onChange={(e) => setFilters({ ...filters, categories: [e.target.value] })}
                        >
                          <option value="">Toutes les catégories</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Disponibilité
                        </label>
                        <select
                          className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]"
                          value={filters.availability}
                          onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                        >
                          <option value="all">Tous</option>
                          <option value="available">Disponible maintenant</option>
                          <option value="this-week">Disponible cette semaine</option>
                        </select>
                      </div>
                    </div>
                  )}

                </div>
      
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="thq-button-filled"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </button>
                </div>
              </form>
            </div>
      <div class="container my-5">
        <div class="row g-4">

          <div class="col-md-4">
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">Plombier</h5>
                  <p class="card-text">Réparation de fuites et installations sanitaires.</p>
                </div>
                <i class="bi bi-arrow-right-circle-fill fs-2 text-primary"></i>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">Électricien</h5>
                  <p class="card-text">Installation et maintenance électrique.</p>
                </div>
                <i class="bi bi-arrow-right-circle-fill fs-2 text-warning"></i>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">Développeur</h5>
                  <p class="card-text">Création de sites et d’applications web.</p>
                </div>
                <i class="bi bi-arrow-right-circle-fill fs-2 text-success"></i>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Features24
        feature3Description={
          <Fragment>
            <span className="home-text118">Responsive Design</span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text119">Mobile Optimization</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text120">Custom Solutions</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text121">Creative Designs</span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text122">Unique and Modern Designs</span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text123">Quality Coding</span>
          </Fragment>
        }
      ></Features24>
      <CTA26
        heading1={
          <Fragment>
            <span className="home-text124">
              Ready to take your website to the next level?
            </span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text125">
              Let&apos;s work together to create a stunning and functional
              website that will elevate your online presence.
            </span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text126">Get in touch</span>
          </Fragment>
        }
      ></CTA26>
      <Features25
        feature3Description={
          <Fragment>
            <span className="home-text127">
              Implementing SEO best practices to improve your website&apos;s
              visibility.
            </span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text128">
              Tailored web development solutions to meet your specific needs.
            </span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text129">Responsive Design</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text130">Custom Web Development</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text131">
              Ensuring your website looks great on all devices and screen sizes.
            </span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text132">SEO Optimization</span>
          </Fragment>
        }
      ></Features25>
      <Pricing14
        plan3Price={
          <Fragment>
            <span className="home-text133">$299</span>
          </Fragment>
        }
        plan3Action={
          <Fragment>
            <span className="home-text134">Get Started</span>
          </Fragment>
        }
        plan11={
          <Fragment>
            <span className="home-text135">Basic plan</span>
          </Fragment>
        }
        plan1Action={
          <Fragment>
            <span className="home-text136">Get Started</span>
          </Fragment>
        }
        plan31={
          <Fragment>
            <span className="home-text137">Enterprise plan</span>
          </Fragment>
        }
        plan3Feature41={
          <Fragment>
            <span className="home-text138">Feature text goes here</span>
          </Fragment>
        }
        plan1Feature2={
          <Fragment>
            <span className="home-text139">SEO Optimization</span>
          </Fragment>
        }
        plan2Feature11={
          <Fragment>
            <span className="home-text140">Priority Email Support</span>
          </Fragment>
        }
        plan3Feature51={
          <Fragment>
            <span className="home-text141">Feature text goes here</span>
          </Fragment>
        }
        plan2Feature41={
          <Fragment>
            <span className="home-text142">Feature text goes here</span>
          </Fragment>
        }
        plan2Feature2={
          <Fragment>
            <span className="home-text143">Advanced SEO Strategies</span>
          </Fragment>
        }
        plan3Feature21={
          <Fragment>
            <span className="home-text144">
              + CRM Integration and Automation
            </span>
          </Fragment>
        }
        plan2Feature4={
          <Fragment>
            <span className="home-text145">Mobile App Integration</span>
          </Fragment>
        }
        plan2Yearly={
          <Fragment>
            <span className="home-text146">Monthly</span>
          </Fragment>
        }
        plan1Action1={
          <Fragment>
            <span className="home-text147">Sign Up Now</span>
          </Fragment>
        }
        plan2Action={
          <Fragment>
            <span className="home-text148">Get Started</span>
          </Fragment>
        }
        plan3Feature1={
          <Fragment>
            <span className="home-text149">+ Custom Features Development</span>
          </Fragment>
        }
        plan2Feature3={
          <Fragment>
            <span className="home-text150">Content Management System</span>
          </Fragment>
        }
        plan1Price1={
          <Fragment>
            <span className="home-text151">$199</span>
          </Fragment>
        }
        plan2={
          <Fragment>
            <span className="home-text152">Standard Plan</span>
          </Fragment>
        }
        plan2Feature21={
          <Fragment>
            <span className="home-text153">Payment Gateway Integration</span>
          </Fragment>
        }
        plan2Action1={
          <Fragment>
            <span className="home-text154">Sign Up Now</span>
          </Fragment>
        }
        plan3Feature2={
          <Fragment>
            <span className="home-text155">+ Advanced SEO and Marketing</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text156">
              Choose the perfect plan for you
            </span>
          </Fragment>
        }
        plan2Feature1={
          <Fragment>
            <span className="home-text157">Custom Website Development</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text158">Our Pricing Plans</span>
          </Fragment>
        }
        plan3Feature31={
          <Fragment>
            <span className="home-text159">
              + Security and Backup Solutions
            </span>
          </Fragment>
        }
        plan1={
          <Fragment>
            <span className="home-text160">Basic Plan</span>
          </Fragment>
        }
        plan21={
          <Fragment>
            <span className="home-text161">Business plan</span>
          </Fragment>
        }
        plan1Feature11={
          <Fragment>
            <span className="home-text162">24/7 Customer Support</span>
          </Fragment>
        }
        plan1Feature21={
          <Fragment>
            <span className="home-text163">Custom Domain Name</span>
          </Fragment>
        }
        plan3Feature5={
          <Fragment>
            <span className="home-text164">+ Priority Phone Support</span>
          </Fragment>
        }
        plan2Yearly1={
          <Fragment>
            <span className="home-text165">Yearly</span>
          </Fragment>
        }
        plan2Price={
          <Fragment>
            <span className="home-text166">$199</span>
          </Fragment>
        }
        plan3Yearly1={
          <Fragment>
            <span className="home-text167">Yearly</span>
          </Fragment>
        }
        plan2Feature31={
          <Fragment>
            <span className="home-text168">Analytics and Reporting</span>
          </Fragment>
        }
        plan3Feature11={
          <Fragment>
            <span className="home-text169">
              + E-commerce Solutions Integration
            </span>
          </Fragment>
        }
        plan1Yearly1={
          <Fragment>
            <span className="home-text170">Yearly</span>
          </Fragment>
        }
        plan2Price1={
          <Fragment>
            <span className="home-text171">$399</span>
          </Fragment>
        }
        plan3Yearly={
          <Fragment>
            <span className="home-text172">Monthly</span>
          </Fragment>
        }
        plan3Feature4={
          <Fragment>
            <span className="home-text173">+ Dedicated Account Manager</span>
          </Fragment>
        }
        plan3Price1={
          <Fragment>
            <span className="home-text174">$599</span>
          </Fragment>
        }
        plan1Feature31={
          <Fragment>
            <span className="home-text175">E-commerce Integration</span>
          </Fragment>
        }
        plan1Feature3={
          <Fragment>
            <span className="home-text176">Social Media Integration</span>
          </Fragment>
        }
        plan1Yearly={
          <Fragment>
            <span className="home-text177">Monthly</span>
          </Fragment>
        }
        plan1Feature1={
          <Fragment>
            <span className="home-text178">Responsive Website Design</span>
          </Fragment>
        }
        plan3Feature3={
          <Fragment>
            <span className="home-text179">+ Unlimited Revisions</span>
          </Fragment>
        }
        content2={
          <Fragment>
            <span className="home-text180">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </Fragment>
        }
        plan3Action1={
          <Fragment>
            <span className="home-text181">Sign Up Now</span>
          </Fragment>
        }
        plan1Price={
          <Fragment>
            <span className="home-text182">$99</span>
          </Fragment>
        }
        plan3={
          <Fragment>
            <span className="home-text183">Premium Plan</span>
          </Fragment>
        }
      ></Pricing14>
      <Steps2
        step1Description={
          <Fragment>
            <span className="home-text184">
              We will start by discussing your project requirements, goals, and
              timeline to ensure we are on the same page.
            </span>
          </Fragment>
        }
        step3Description={
          <Fragment>
            <span className="home-text185">
              After the development phase, rigorous testing and quality
              assurance checks will be conducted to guarantee a flawless end
              product.
            </span>
          </Fragment>
        }
        step2Title={
          <Fragment>
            <span className="home-text186">Development Process</span>
          </Fragment>
        }
        step2Description={
          <Fragment>
            <span className="home-text187">
              I will then proceed with the development process, keeping you
              updated every step of the way to ensure your satisfaction.
            </span>
          </Fragment>
        }
        step1Title={
          <Fragment>
            <span className="home-text188">Discuss Your Project</span>
          </Fragment>
        }
        step3Title={
          <Fragment>
            <span className="home-text189">Quality Assurance</span>
          </Fragment>
        }
        step4Description={
          <Fragment>
            <span className="home-text190">
              Once everything is finalized and approved, I will deliver the
              project to you and provide ongoing support for any further
              assistance needed.
            </span>
          </Fragment>
        }
        step4Title={
          <Fragment>
            <span className="home-text191">Delivery and Support</span>
          </Fragment>
        }
      ></Steps2>
      <Testimonial17
        author2Position={
          <Fragment>
            <span className="home-text192">Marketing Manager, Company XYZ</span>
          </Fragment>
        }
        author1Position={
          <Fragment>
            <span className="home-text193">CEO, Company ABC</span>
          </Fragment>
        }
        author1Name={
          <Fragment>
            <span className="home-text194">John Doe</span>
          </Fragment>
        }
        author3Name={
          <Fragment>
            <span className="home-text195">Sarah Johnson</span>
          </Fragment>
        }
        review2={
          <Fragment>
            <span className="home-text196">
              I hired the freelance web developer to revamp our company website,
              and I couldn&apos;t be happier with the results. They have a keen
              eye for design and a deep understanding of web development. I will
              definitely work with them again in the future.
            </span>
          </Fragment>
        }
        author2Name={
          <Fragment>
            <span className="home-text197">Jane Smith</span>
          </Fragment>
        }
        author4Position={
          <Fragment>
            <span className="home-text198">Creative Director, Design Co.</span>
          </Fragment>
        }
        author4Name={
          <Fragment>
            <span className="home-text199">Michael Brown</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text200">
              Read what my clients have to say about working with me.
            </span>
          </Fragment>
        }
        author3Position={
          <Fragment>
            <span className="home-text201">Founder, Startup123</span>
          </Fragment>
        }
        review1={
          <Fragment>
            <span className="home-text202">
              Working with the freelance web developer was a fantastic
              experience. They were professional, responsive, and delivered
              high-quality work on time. I highly recommend their services.
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text203">Testimonials</span>
          </Fragment>
        }
        review3={
          <Fragment>
            <span className="home-text204">
              I was impressed by the level of professionalism and expertise
              demonstrated by the freelance web developer. They took the time to
              understand my requirements and delivered a website that exceeded
              my expectations. I am thrilled with the outcome.
            </span>
          </Fragment>
        }
        review4={
          <Fragment>
            <span className="home-text205">
              I had a great collaboration with the freelance web developer on a
              recent project. Their attention to detail and dedication to
              delivering a top-notch website were truly commendable. I look
              forward to working with them again.
            </span>
          </Fragment>
        }
      ></Testimonial17>
      <Contact10
        content1={
          <Fragment>
            <span className="home-text206">
              Feel free to reach out for any inquiries or project
              collaborations.
            </span>
          </Fragment>
        }
        location1Description={
          <Fragment>
            <span className="home-text207">
              Visit us at our main office location.
            </span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text208">Get in Touch</span>
          </Fragment>
        }
        location2Description={
          <Fragment>
            <span className="home-text209">
              Give us a call during office hours.
            </span>
          </Fragment>
        }
        location1={
          <Fragment>
            <span className="home-text210">
              123 Web Developer Street, City, Country
            </span>
          </Fragment>
        }
        location2={
          <Fragment>
            <span className="home-text211">+1-234-567-890</span>
          </Fragment>
        }
      ></Contact10>
    </div>
  )
}

export default Home
