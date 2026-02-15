import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../landing/Navabr';
import Footer from '../landing/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
      try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("Message envoyé ✅");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        alert("Erreur envoi");
      }

    } catch (err) {
      alert("Erreur serveur");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Contactez-nous
            </h1>
            <p className="mt-4 pb-4 text-xl text-gray-500">
              Notre équipe est là pour vous aider
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-lg font-medium text-gray-900">
                  Informations de contact
                </h3>
                <dl className="mt-8 space-y-6">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <Mail className="flex-shrink-0 h-6 w-6 text-[#e0692d]" />
                    <span className="ml-3 text-gray-600">contact@servicepro.tn</span>
                  </dd>
                  <dt className="sr-only">Téléphone</dt>
                  <dd className="flex">
                    <Phone className="flex-shrink-0 h-6 w-6 text-[#e0692d]" />
                    <span className="ml-3 text-gray-600">(+216) 55 289 528</span>
                  </dd>
                  <dt className="sr-only">Adresse</dt>
                  <dd className="flex">
                    <MapPin className="flex-shrink-0 h-6 w-6 text-[#e0692d]" />
                    <span className="ml-3 text-gray-600">
                      Tunis, Tunisie
                    </span>
                  </dd>
                </dl>
              </div>
              <div className="bg-gray-50 px-6 py-8">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    Assistance continue
                  </h3>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Lundi - Samedi : 24H</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg">
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-[#e0692d] focus:border-[#e0692d] border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-[#e0692d] focus:border-[#e0692d] border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Sujet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-[#e0692d] focus:border-[#e0692d] border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full shadow-sm focus:ring-[#e0692d] focus:border-[#e0692d] border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#e0692d] hover:bg-[#f07e40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e0692d]"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;