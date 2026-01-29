import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SignUp6 from '../components/sign-up6';
import { mapUserDataToUserModel } from '../utils/mapper';
import './sign-up.css';

const SignUp = (props) => {
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
    console.log("role = ", role);

    const res = await fetch("http://localhost:5000/api/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential, role: role}), // Ajout du rôle ici
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
        localStorage.setItem('token', token);
        const user = mapUserDataToUserModel(userData);
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Mettre à jour l'interface ou effectuer la redirection
        // Par exemple, rediriger vers le dashboard
        window.location.href = `/dashboard`;
      } else {
        alert("Erreur lors de la récupération des données utilisateur");
      }
    } else {
      alert("Erreur : " + data.error);
    }
  }
  return (
    <div className="bg-orange-50">
      <Helmet>
        <title>Sign-Up - Adored Grumpy Reindeer</title>
        <meta property="og:title" content="Sign-Up - Adored Grumpy Reindeer" />
      </Helmet>

      <SignUp6 
        role={
          location.pathname === "/business" ? "professional" : "user"
        }
        action3={
          <Fragment>
            <span  className="sign-up-text41">Continue with Google</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="sign-up-text42">Créer un compte{location.pathname === '/business' && ( ' professionnel')}</span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="sign-up-text43">Créer un compte</span>
          </Fragment>
        }
        action2={
          <Fragment>
            <span className="sign-up-text44">Continue with Facebook</span>
          </Fragment>
        }
      />

      {/*<div id="google-sign-in-button"></div> Div pour afficher le bouton de connexion Google */}
      
    </div>
  );
};

export default SignUp;
