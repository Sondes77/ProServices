import React, { Fragment } from 'react'
import { useState } from 'react';
import { villesEtRegions } from '../components/villesRegions';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import Navbar8 from '../components/navbar8'
import Hero17 from '../components/hero17'
import Features24 from '../components/features24'
import CTA26 from '../components/cta26'
import Features25 from '../components/features25'
import Pricing14 from '../components/pricing14'
import Steps2 from '../components/steps2'
import Testimonial17 from '../components/testimonial17'
import Contact10 from '../components/contact10'
import Footer4 from '../components/footer4'
import './test2.css'
import './sign-in.css'

const Home = (props) => {
  const navigate = useNavigate();
    const [ville, setVille] = useState('');
    const [region, setRegion] = useState('');
    const [pro, setMotCle] = useState('');

    const handleVilleChange = (e) => {
      setVille(e.target.value);
      setRegion('');
    };

    const handleRecherche = (e) => {
      e.preventDefault();
      console.log('Recherche:', { ville, region, pro });
      // Navigation vers la page de résultats avec les paramètres ?
      navigate(`/resultats?ville=${ville}&region=${region}&motcle=${pro}`);
    };

  return (
    <div className="home-container">
      <Helmet>
        <title>Healthy Blushing Mouse</title>
        <meta property="og:title" content="Healthy Blushing Mouse" />
      </Helmet>
      
      <Hero17
        action2={
          <Fragment>
            <span className="home-text114">Contact Me</span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text115">View Portfolio</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text116">Trouvez un professionnel près de chez vous</span>
          </Fragment>
        }
        content1={
          <Fragment>
            
            <div className="hero17-content1">
              
              <span className="home-text117">
                Des milliers de professionnels qualifiés à votre service!
              </span>
              <form className="hero17-actions" onSubmit={handleRecherche}>
                
                <input
                  type="text"
                  placeholder="Ex: plombier, menuisier..."
                  onChange={(e) => setMotCle(e.target.value)}
                  className="sign-in1-textinput thq-input thq-body-large"
                />
                <select
                  className="sign-in1-textinput thq-input thq-body-large"
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
                  className="sign-in1-textinput thq-input thq-body-large"
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
      <div class="container">
              <div class="row">
                <div class="mb-60 col-lg-12 mx-auto">
                    <div class="career-search mb-60">
                     
                        <div class="filter-result">
                            <p class="mb-30 ff-montserrat">Total Job Openings : 89</p>
      
                            <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        FD
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">Front End Developer</h5>
                                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-pin mr-2"></i> Los Angeles
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-money mr-2"></i> 2500-3500/pm
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-time mr-2"></i> Full Time
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0">
                                    <a href="#" class="btn d-block w-100 d-sm-inline-block btn-light">Apply now</a>
                                </div>
                            </div>
      
                            <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        UX
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">Ui/Ux Developer</h5>
                                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-pin mr-2"></i> Los Angeles
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-money mr-2"></i> 2500-3500/pm
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-time mr-2"></i> Full Time
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0">
                                    <a href="#" class="btn d-block w-100 d-sm-inline-block btn-light">Apply now</a>
                                </div>
                            </div>
      
                            <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        GD
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">Graphic Designer</h5>
                                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-pin mr-2"></i> Los Angeles
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-money mr-2"></i> 2500-3500/pm
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-time mr-2"></i> Full Time
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0">
                                    <a href="#" class="btn d-block w-100 d-sm-inline-block btn-light">Apply now</a>
                                </div>
                            </div>
      
                            <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        JS
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">Javascript Developer</h5>
                                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-pin mr-2"></i> Los Angeles
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-money mr-2"></i> 2500-3500/pm
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="zmdi zmdi-time mr-2"></i> Full Time
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0">
                                    <a href="#" class="btn d-block w-100 d-sm-inline-block btn-light">Apply now</a>
                                </div>
                            </div>
      
                        </div>
                    </div>
      
                    {/*START Pagination*/}
                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-reset justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    <i class="zmdi zmdi-long-arrow-left"></i>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">2</a></li>
                            <li class="page-item d-none d-md-inline-block"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">...</a></li>
                            <li class="page-item"><a class="page-link" href="#">8</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">
                                    <i class="zmdi zmdi-long-arrow-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/*END Pagination*/}
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
      <Footer4
        link5={
          <Fragment>
            <span className="home-text212">Testimonials</span>
          </Fragment>
        }
        link3={
          <Fragment>
            <span className="home-text213">Services</span>
          </Fragment>
        }
        link1={
          <Fragment>
            <span className="home-text214">Home</span>
          </Fragment>
        }
        termsLink={
          <Fragment>
            <span className="home-text215">Terms of Service</span>
          </Fragment>
        }
        link2={
          <Fragment>
            <span className="home-text216">About</span>
          </Fragment>
        }
        link4={
          <Fragment>
            <span className="home-text217">Portfolio</span>
          </Fragment>
        }
        cookiesLink={
          <Fragment>
            <span className="home-text218">Cookies Policy</span>
          </Fragment>
        }
        privacyLink={
          <Fragment>
            <span className="home-text219">Privacy Policy</span>
          </Fragment>
        }
      ></Footer4>
    </div>
  )
}

export default Home
