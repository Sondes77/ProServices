import React, { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import { mapUserDataToUserModel } from '../utils/mapper';
import SignIn4 from '../components/sign-in4'
import Navbar from '../landing/Navabr';
import './sign-in.css'
import { urlBase } from "../config.js";

const SignIn = (props) => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  const location = useLocation();
  useEffect(() => {
    /* Chargement de la bibliothèque Google Identity Services */
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '499733428288-8ccdcs9hj2f3sga7v1g674mamb6kbsoo.apps.googleusercontent.com', // Remplace par ton propre client ID Google
        callback: handleCredentialResponse,
      });
      const bouton = document.getElementById('google-sign-in-button');
      if (bouton) {
        bouton.addEventListener('click', () => {
          window.google.accounts.id.prompt();
        });
      }
      window.google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' } // personnalise le bouton selon tes besoins
      );
    };
    document.head.appendChild(script);
  }, []); 
 
  async function handleCredentialResponse(response) {
    const currentPath = location.pathname;
    const role = currentPath === "/business" ? "professional" : "user";
    //console.log("role = ", role);
  
    const res = await fetch(`${urlBase}/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential, role }),
    });
  
    const data = await res.json();
    alert("data = ", data);
    const token = data.token;
  
    if (!res.ok) {
      alert("Erreur : " + data.error);
      return;
    }
  
    //alert("Bienvenue " + data.user.nom);
  
    const userRes = await fetch(
      `${urlBase}/utilisateur?email=${encodeURIComponent(data.user.email)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    const userData = await userRes.json();
    if (!userRes.ok) {
      alert("Erreur lors de la récupération des données utilisateur");
      return;
    }
  
    const user = mapUserDataToUserModel(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
  
    // 📍 Étape GPS
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Position GPS :", latitude, longitude);
  
        const locRes = await fetch(`${urlBase}/user-location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ latitude, longitude }),
        });
  
        if (locRes.ok) {
          const locationData = await locRes.json();
          console.log("Localisation utilisateur :", locationData);
          localStorage.setItem("userLocation", JSON.stringify(locationData));
        } else {
          console.error("Erreur localisation via GPS");
        }
  
        // Redirection finale
        window.location.href = "/dashboard";
      },
      (error) => {
        console.error("Erreur géolocalisation :", error.message);
  
        // Redirection même sans localisation
        //window.location.href = "/dashboard";
      },
      { enableHighAccuracy: true }
    );
  }

  return (
    <div className="">
      <Helmet>
        {/* Title SEO */}
        <title>SERVICEPRO | Plateforme n°1 de services professionnels en Tunisie</title>

        {/* Meta description */}
        <meta
          name="description"
          content="Accédez à votre compte ServicePro.tn pour gérer vos services, contacter des professionnels en Tunisie et développer votre activité."
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://www.servicepro.tn/connexion"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Connexion | ServicePro.tn" />
        <meta
          property="og:description"
          content="Connectez-vous à ServicePro.tn et accédez à la plateforme n°1 de services professionnels en Tunisie."
        />
        <meta property="og:url" content="https://www.servicepro.tn/connexion" />
        <meta property="og:site_name" content="ServicePro.tn" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Connexion | ServicePro.tn" />
        <meta
          name="twitter:description"
          content="Gérez vos services et trouvez des professionnels qualifiés partout en Tunisie avec ServicePro.tn."
        />
      </Helmet>
      <SignIn4
        action1={
          <Fragment>
            <span className="sign-in-text36">Sign In</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="sign-in-text37">
              Accèder à votre compte
            </span>
          </Fragment>
        }
      ></SignIn4>
      
    </div>
  )
}

export default SignIn
