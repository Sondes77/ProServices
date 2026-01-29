import React, { useState } from 'react';
import { Upload, Calendar, MapPin, Mail, User, Building, Link as LinkIcon, MessageSquare, Send } from 'lucide-react';

const AdvertisementRequest = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    contactName: '',
    websiteUrl: '',
    message: '',
    placement: 'top' as 'top' | 'sidebar' | 'bottom',
    startDate: '',
    endDate: '',
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlacementInfo = (placement: string) => {
    switch (placement) {
      case 'top':
        return { name: 'Bannière haute', dimensions: '1200x90px', description: 'Affichée en haut de toutes les pages' };
      case 'sidebar':
        return { name: 'Sidebar', dimensions: '300x250px', description: 'Affichée dans la colonne de droite' };
      case 'bottom':
        return { name: 'Bannière basse', dimensions: '1200x120px', description: 'Affichée en bas des pages' };
      default:
        return { name: '', dimensions: '', description: '' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'upload de l'image et l'envoi des données
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      if (bannerFile) {
        formDataToSend.append('bannerImage', bannerFile);
      }

      // Remplacer par votre vraie API
      const response = await fetch('/api/advertisement-requests', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demande envoyée avec succès !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande de publicité a été transmise à notre équipe. Nous l'examinerons dans les plus brefs délais 
              et vous contacterons par email pour vous informer de notre décision.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Délai de traitement habituel : 2-3 jours ouvrés
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-[#e0692d] text-white px-6 py-3 rounded-full hover:bg-[#f07e40] transition-colors duration-200"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Demande de publicité</h1>
          <p className="text-lg text-gray-600">
            Faites promovoir votre entreprise auprès de nos milliers d'utilisateurs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#e0692d] p-6">
            <h2 className="text-xl font-semibold text-white">Informations sur votre publicité</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informations entreprise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="h-4 w-4 inline mr-2" />
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Nom du contact *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email de contact *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="h-4 w-4 inline mr-2" />
                  Site web (optionnel)
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                />
              </div>
            </div>

            {/* Emplacement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Emplacement souhaité *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['top', 'sidebar', 'bottom'].map((placement) => {
                  const info = getPlacementInfo(placement);
                  return (
                    <div
                      key={placement}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                        formData.placement === placement
                          ? 'border-[#e0692d] bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, placement: placement as any }))}
                    >
                      <input
                        type="radio"
                        name="placement"
                        value={placement}
                        checked={formData.placement === placement}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <h3 className="font-medium text-gray-900">{info.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{info.dimensions}</p>
                      <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date de début *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date de fin *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Upload bannière */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="h-4 w-4 inline mr-2" />
                Bannière publicitaire *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="banner-upload"
                  required
                />
                <label
                  htmlFor="banner-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {bannerPreview ? (
                    <div className="w-full">
                      <img
                        src={bannerPreview}
                        alt="Aperçu de la bannière"
                        className="max-w-full h-auto rounded-lg mb-4"
                        style={{ maxHeight: '200px' }}
                      />
                      <p className="text-sm text-gray-600 text-center">
                        Cliquez pour changer l'image
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 text-center">
                        Cliquez pour uploader votre bannière
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Formats acceptés : JPG, PNG, GIF (max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
              {formData.placement && (
                <p className="text-sm text-gray-500 mt-2">
                  Dimensions recommandées : {getPlacementInfo(formData.placement).dimensions}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Message (optionnel)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Décrivez votre entreprise, vos objectifs publicitaires..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
              />
            </div>

            {/* Informations tarifaires */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations tarifaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-[#e0692d]">Bannière haute</div>
                  <div className="text-gray-600">50€/semaine</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-[#e0692d]">Sidebar</div>
                  <div className="text-gray-600">30€/semaine</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-[#e0692d]">Bannière basse</div>
                  <div className="text-gray-600">40€/semaine</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Tarifs dégressifs pour les campagnes longues. Devis personnalisé sur demande.
              </p>
            </div>

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#e0692d] text-white px-8 py-3 rounded-full hover:bg-[#f07e40] transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementRequest;