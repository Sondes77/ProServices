import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import ProgressSteps from '../profile/ProgressSteps';

const PhoneConfirmation = () => {
  const [phone, setPhone] = useState(''); // In a real app, this would come from auth context
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userId = JSON.parse(localStorage.getItem("currentUser") || '{}');
  userId = userId?.id;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    
    fetch("http://localhost:5000/api/send-phone-code", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userId
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setPhone(data.phone);
        // ouvre WhatsApp automatiquement
        window.open(data.whatsappLink, "_blank");
        }
    })
    .catch(err => console.error(err));
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.match(/[0-9]/) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError('');

      // Move to next input if value is entered
      if (value !== '' && index < 5) {
        setActiveInput(index + 1);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      setActiveInput(index - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Veuillez entrer le code complet');
      return;
    }

    const res = await fetch("http://localhost:5000/api/verify-phone-code", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: fullCode })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setIsVerified(true);
      setTimeout(() => navigate('/personal-info'), 1500);
    } else {
      setError(data.message || "Code incorrect");
    }
  };

  const handleResendCode = async () => {
     setTimer(30);

    //const phoneNumber = localStorage.getItem("userPhone");

    await fetch("http://localhost:5000/api/send-phone-code", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify({
        id: userId
      }),
    });

    //alert("Un nouveau code vous a été envoyé via WhatsApp");
  };

  const [step, setStep] = useState(1);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Met à jour step à 1 si isVerified devient true
  useEffect(() => {
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
            <h2 className="text-xl font-semibold text-white">Confirmation de numéro de téléphone</h2>
            <p className="text-white text-opacity-80 text-sm">Confirmez votre numéro de téléphone</p>
          </div>
        </div>
        <div className="pb-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Numéro vérifié !</h2>
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
            <h2 className="text-xl font-semibold text-white">Confirmation de numéro de téléphone</h2>
            <p className="text-white text-opacity-80 text-sm">Confirmez votre numéro de téléphone</p>
            </div>
        </div>
      <div className="p-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-12 h-12 bg-[#e0692d] rounded-full flex items-center justify-center">
          <Phone className="h-6 w-6 text-white" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vérifiez votre numéro
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Nous avons envoyé un code par SMS au{' '}
          <span className="font-medium text-[#e0692d]">{phone}</span>
        </p>
      </div>

      <div className="pb-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Code de vérification
              </label>
              <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => setActiveInput(index)}
                    ref={(input) => {
                      if (input && index === activeInput) {
                        input.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e0692d] focus:border-[#e0692d]"
                  />
                ))}
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

          <div className="mt-6 text-center">
            <button
              onClick={handleResendCode}
              disabled={timer > 0}
              className={`text-sm ${
                timer > 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-[#e0692d]'
              }`}
            >
              {timer > 0 
                ? `Renvoyer le code dans ${timer}s` 
                : "Vous n'avez pas reçu le code ? Renvoyer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneConfirmation;