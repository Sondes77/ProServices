import React, { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { mapUserDataToUserModel } from '../utils/mapper';
import SignIn4 from '../components/sign-in4'
import Navbar from '../landing/Navabr';
import './sign-in.css'

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
 
  {/*async function handleCredentialResponse(response) {
    const currentPath = location.pathname;
    const role = currentPath === "/business" ? "professional" : "user";
    console.log("role = ", role);
  
    // Envoi de la requête à l'API Google pour obtenir le token
    const res = await fetch("http://localhost:5000/api/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential, role: role }), // Ajout du rôle ici
    });
  
    const data = await res.json();
    const token = data.token;
  
    if (res.ok) {
      console.log(data.user);
      console.log(token);
      alert("Bienvenue " + data.user.nom);
  
      // Faire une requête pour obtenir l'utilisateur à partir de l'email
      const userRes = await fetch(`http://localhost:5000/api/utilisateur?email=${encodeURIComponent(data.user.email)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await userRes.json();
  
      if (userRes.ok) {
        console.log("Données utilisateur récupérées : ", userData);
        // Utilisation de ipify pour obtenir l'IP publique de l'utilisateur
        async function getUserIp() {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          return data.ip;  // Retourne l'adresse IP publique de l'utilisateur
        }

        // Exemple d'appel pour obtenir l'IP côté client
        const userIp = await getUserIp();
        console.log('IP de l\'utilisateur côté client :', userIp);

        // Récupérer la localisation de l'utilisateur
        const locationRes = await fetch('http://localhost:5000/api/user-location', {
          method: 'GET',
          headers: {
            //'Authorization': `Bearer ${token}`,
            'x-forwarded-for': userIp // Envoie l'IP de l'utilisateur dans l'en-tête
          }
        });
        const locationData = await locationRes.json();
        
        if (locationRes.ok) {
          console.log('Localisation de l\'utilisateur : ', locationData);
          // Enregistrer la localisation dans le localStorage si nécessaire
          localStorage.setItem('userLocation', JSON.stringify(locationData));
        } else {
          console.error('Erreur lors de la récupération de la localisation');
        }
  
        // Sauvegarder le token et les données utilisateur
        localStorage.setItem('token', token);
        const user = mapUserDataToUserModel(userData);
        localStorage.setItem('currentUser', JSON.stringify(user));
  
        // Redirection vers le dashboard
        //window.location.href = `/dashboard`;
      } else {
        alert("Erreur lors de la récupération des données utilisateur");
      }
    } else {
      alert("Erreur : " + data.error);
    }
  }*/}
  
  async function handleCredentialResponse(response) {
    const currentPath = location.pathname;
    const role = currentPath === "/business" ? "professional" : "user";
    console.log("role = ", role);
  
    const res = await fetch("http://localhost:5000/api/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential, role }),
    });
  
    const data = await res.json();
    const token = data.token;
  
    if (!res.ok) {
      alert("Erreur : " + data.error);
      return;
    }
  
    //alert("Bienvenue " + data.user.nom);
  
    const userRes = await fetch(
      `http://localhost:5000/api/utilisateur?email=${encodeURIComponent(data.user.email)}`,
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
  
        const locRes = await fetch("http://localhost:5000/api/user-location", {
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
        <title>Sign-In - Adored Grumpy Reindeer</title>
        <meta property="og:title" content="Sign-In - Adored Grumpy Reindeer" />
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
