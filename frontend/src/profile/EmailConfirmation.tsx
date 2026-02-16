import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import ProgressSteps from '../profile/ProgressSteps';
import Navbar from '../layout/ProfessionalNavbar';
import Footer from '../landing/Footer';
import Swal from "sweetalert2";

const EmailConfirmation = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  //const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isVerified = localStorage.getItem("isVerified");
  let user = JSON.parse(localStorage.getItem("currentUser") || '{}');
  //userId = userId?.id;

  useEffect(() => {
    if(!isVerified)
    {
      const userEmail = localStorage.getItem("email");

      if (!userEmail || !token) {
        localStorage.removeItem("currentUser");
        // Popup moderne + timer 3 sec
        Swal.fire({
          title: "Session expirée",
          text: "Vous allez être redirigé vers la page de connexion.",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          customClass: {
            popup: "rounded-2xl shadow-lg", // style chic
          }
        });

        // Attendre 3 secondes puis rediriger
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);

        return;
      }

      setEmail(userEmail);
    }
  }, [navigate]);

  useEffect(() => {
    if (!email || !token) return;

    fetch("http://localhost:5000/api/send-verification-code", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ email }),
    });
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }
  
    const res = await fetch("http://localhost:5000/api/verify-email-code", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    //setIsVerified(true);
    // 1️⃣ Récupérer l'objet currentUser depuis le localStorage
    const currentUserString = localStorage.getItem("currentUser");
    if (!currentUserString) {
      console.error("Aucun utilisateur connecté trouvé !");
    } else {
      // 2️⃣ Convertir la chaîne JSON en objet
      const currentUser = JSON.parse(currentUserString);

      // 3️⃣ Modifier la valeur du champ
      currentUser.email_verified = true; // ou currentUser.phone_verified = true

      // 4️⃣ Ré-enregistrer l'objet modifié dans le localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.removeItem("email");
      console.log("Mise à jour effectuée :", currentUser);
    }
    //setTimeout(() => navigate("/confirm-phone"), 2000);
    setTimeout(() => navigate("/personal-info"), 2000);
        
  };

  const handleResendCode = () => {
    // In a real app, this would trigger a new email
    fetch("http://localhost:5000/api/send-verification-code", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
       },
      body: JSON.stringify({ email }),
    });

    Swal.fire({
      toast: true, // active le mode toast
      position: "top-end", // en haut à droite
      showConfirmButton: false, // pas de bouton OK
      timer: 1500, // durée d'affichage
      timerProgressBar: true, // barre de progression
      icon: "success",
      //title: selectedService ? "Service mis à jour" : "Service créé",
      text: "Un nouveau code a été envoyé à votre adresse email",
      showClass: {
        popup: "animate__animated animate__slideInRight", // entrée animée
      },
      hideClass: {
        popup: "animate__animated animate__slideOutRight", // sortie animée
      },
      customClass: {
        popup: "rounded-2xl shadow-lg p-4", // style chic
      },
    });
  };

  const [step, setStep] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Met à jour step à 1 si isVerified devient true
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem("currentUser");
      navigate('/connexion', { replace: true });
    } else {
      setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
    }
    if (isVerified) {
      setStep(1);
    }
  },  [navigate, isVerified]);
  
  
  if (isCheckingAuth) return null;

  if (isVerified) {
    return (
     
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-white shadow-md overflow-hidden">
          <div className="max-w-2xl mx-auto p-4">
            <ProgressSteps currentStep={step} />
            {/* Affichage conditionnel des étapes ici */}
          </div>
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Confirmation d'adresse mail</h2>
            <p className="text-white text-opacity-80 text-sm">Confirmez votre adresse mail</p>
          </div>
        </div>
        <div className="pb-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Email vérifié !</h2>
            <p className="mt-2 text-gray-600">
              Vous allez être redirigé vers votre tableau de bord...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-white shadow-md overflow-hidden">
          <div className="max-w-2xl mx-auto p-4">
            <ProgressSteps currentStep={step} />
            {/* Affichage conditionnel des étapes ici */}
          </div>
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Confirmation d'adresse mail</h2>
            <p className="text-white text-opacity-80 text-sm">Confirmez votre adresse mail</p>
          </div>
        </div>
      <div className="p-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-12 h-12 bg-[#e0692d] rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vérifiez votre email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Nous avons envoyé un code à{' '}
          <span className="font-medium text-[#e0692d]">{email}</span>
        </p>
      </div>

      <div className="pb-10 mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Code de vérification
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/[^0-9]/g, ''));
                    setError('');
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#e0692d] focus:border-[#e0692d] sm:text-sm"
                  placeholder="Entrez le code à 6 chiffres"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e0692d] hover:bg-[#f07e40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e0692d]"
              >
                Vérifier
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handleResendCode}
              className="w-full text-center text-sm text-gray-600 hover:text-[#e0692d]"
            >
              Vous n'avez pas reçu le code ? Renvoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;