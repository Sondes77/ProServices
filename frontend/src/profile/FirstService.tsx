import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, ImageIcon, Info, MapPin, Plus, Save, Tag, Trash2, X, XCircle } from 'lucide-react';
import { Service } from '../utils/types';
import ProgressSteps from '../profile/ProgressSteps';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { mapUserDataToUserModel } from '../utils/mapper';
import { User as UserType } from '../utils/types';
import Navbar from '../layout/ProfessionalNavbar';
import Footer from '../landing/Footer';
import Swal from "sweetalert2";
import CustomSelect from './CustomSelect';
import { Categorie, Metier } from '../components/categoryMetier';

interface FirstServiceProps {
  user: UserType;
  service?: Service;
  onSubmit: (serviceData: Partial<Service>) => void;
  onCancel: () => void;
}

const FirstService: React.FC<FirstServiceProps> = ({  user, service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    metier: service?.metier || '',
    price: service?.price || '',
    status: service?.status || 'active',
    duration: service?.duration || 'Immédiat',
    included: service?.included || [''],
    notIncluded: service?.notIncluded || ['']
  });

  {/*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };*/}
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [previews, setPreviews] = useState<string[]>(service?.gallery || []);
  const [existingImages, setExistingImages] = useState<string[]>(service?.gallery || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const metierDisponibles =
    formData.category && Metier[formData.category as Categorie]
      ? Metier[formData.category as Categorie]
      : [];
  const [images, setImages] = useState<File[]>([]);
  
  const handleListChange = (index: number, value: string, type: 'included' | 'notIncluded') => {
    const newList = [...formData[type]];
    newList[index] = value;
    setFormData({ ...formData, [type]: newList });
  };
  
  const addListItem = (type: 'included' | 'notIncluded') => {
    setFormData({ ...formData, [type]: [...formData[type], ''] });
  };

  const removeListItem = (index: number, type: 'included' | 'notIncluded') => {
    if (formData[type].length > 1) {
      const newList = formData[type].filter((_, i) => i !== index);
      setFormData({ ...formData, [type]: newList });
    }
  };
  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'paused', label: 'En pause' },
    { value: 'archived', label: 'Archivé' }
  ];  
  // --- Charger toutes les conversations ---
  useEffect(() => {
    if (!token){
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");

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
    };
    }, [token, navigate]);
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const total = existingImages.length + newFiles.length + files.length;
    if (total > 5) {
      alert("Max 5 images");
      return;
    }

    setNewFiles(prev => [...prev, ...files]);

    const newPreviewUrls = files.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...newPreviewUrls]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Aucun token trouvé dans le localStorage");
      return;
    }

    let uploadedUrls: string[] = [];

    // upload seulement nouvelles images
    if (newFiles.length > 0) {
      const fd = new FormData();
      newFiles.forEach(f => fd.append("images", f));

      const uploadRes = await fetch(
        "http://localhost:5000/api/upload-gallery",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        }
      );

      const data = await uploadRes.json();
      uploadedUrls = data.urls || [];
    }

    // ✅ merge final
    const finalGallery = [...existingImages, ...uploadedUrls];

    const payload = {
      ...formData,
      gallery: finalGallery
    };

    const newService = {
      title: formData.title,
      description: formData.description,
      duration: formData?.duration || 'Immédiat',
      category: formData.category,
      price: formData.price,
      status: formData.status,
    };
  
    onSubmit(payload);

    console.log('Données du formulaire:', formData);
  
    
  
    try {

      

      const response = await fetch('http://localhost:5000/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      console.log('Réponse du backend:', data);
      console.log('Statut HTTP:', response.status);
  
      if (response.status === 201 || response.status === 200) {
        alert('Utilisateur mis à jour avec succès');
        console.log('Utilisateur mis à jour avec succès');
  
      // Requête pour obtenir les infos complètes de l'utilisateur
      const userRes = await fetch(`http://localhost:5000/api/utilisateurId?id=${encodeURIComponent(data.userId)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        const userData = await userRes.json();
  
        if (userRes.ok) {
          console.log('Données utilisateur récupérées :', userData);
          localStorage.setItem('token', token);
          const user = mapUserDataToUserModel(userData);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setStep(4); // Mise à jour de l'étape

          // Redirection après un court délai pour laisser React appliquer le nouvel état
          setTimeout(() => {
            window.location.href = `/dashboard`;
          }, 300); // 300ms par exemple
        } else {
          alert("Erreur lors de la récupération des données utilisateur");
        }
      }else if(response.status === 403){
        alert("Votre session a été épuisée ! Veuillez vous vous connectez");
        navigate("/connexion");
      }else {
        console.error("Erreur lors de la création de l'utilisateur :", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };

  const removeImage = (index: number) => {
    const url = previews[index];

    // blob = new file
    if (url.startsWith("blob:")) {
      const blobIndex = previews
        .filter(p => p.startsWith("blob:"))
        .indexOf(url);

      setNewFiles(prev => prev.filter((_, i) => i !== blobIndex));
      URL.revokeObjectURL(url);
    } else {
      // existing image
      setExistingImages(prev => prev.filter(i => i !== url));
    }

    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const [step, setStep] = useState(3);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Met à jour step à 1 si isVerified devient true
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (user && user.stats?.servicesPublished > 0) {
      navigate('/dashboard', { replace: true });
      return; // On arrête ici pour ne pas faire le reste
    }
    if (!token) {
      localStorage.removeItem("currentUser");
      navigate('/connexion', { replace: true });
    } else {
      setIsCheckingAuth(false); // ✅ Auth OK, on peut afficher
    }
    
  },  [ navigate ]);
  
  if (isCheckingAuth) return null;
  return (
    
    <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-md overflow-hidden">
    <>
      {location.pathname === '/service' && (
        <div className="bg-white shadow-md overflow-hidden">
          <div className="max-w-2xl mx-auto p-4">
            <ProgressSteps currentStep={step} />
            {/* Affichage conditionnel des étapes ici */}
          </div>
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Service</h2>
            <p className="text-white text-opacity-80 text-sm">Publiez votre premier service</p>
          </div>
        </div>
      )}
    </>
    <>
      {location.pathname === '/dashboard' && (
          <div className="bg-[#e0692d] p-4">
            <h2 className="text-xl font-semibold text-white">Informations personnelles</h2>
            <p className="text-white text-opacity-80 text-sm">Gérez vos informations de profil</p>
          </div>
      )}
    </>

      <form onSubmit={handleSubmit} className="p-8 space-y-10">
        {/* Section 1 : Infos de base */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#e0692d] font-bold">
              <Tag size={20} /> <span>Informations essentielles</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Titre du service (ex: Plomberie Générale)</label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} 
                  className="w-full p-3 bg-gray-50 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all"
                  placeholder="Installation & Maintenance Climatisation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Prix (DT)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-3 bg-gray-50 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all"
                  placeholder="80"
                  required
                />
              </div>
              
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/*<div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Catégorie
              </label>
              <CustomSelect
                value={formData.category}
                onChange={(value: string) =>
                  setFormData(prev => ({ ...prev, category: value }))
                }
                placeholder="Catégorie"
                options={[
                  { value: "Plomberie", label: "Plomberie" },
                  { value: "Électricité", label: "Électricité" },
                  { value: "Menuiserie", label: "Menuiserie" },
                  { value: "Peinture", label: "Peinture" },
                  { value: "Jardinage", label: "Jardinage" },
                  { value: "Maçonnerie", label: "Maçonnerie" },
                  { value: "Chauffage", label: "Chauffage" },
                  { value: "Climatisation", label: "Climatisation" },
                  { value: "Serrurerie", label: "Serrurerie" },
                  { value: "Autre", label: "Autre" },
                ]}
              />
            </div>*/}

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <MapPin size={18} />
                </div>
                <CustomSelect
                  value={formData.category}
                  onChange={(value: string) => {
                    setFormData(prev => ({
                      ...prev,
                      category: value,
                      metier: '' // reset métier quand catégorie change
                    }));
                  }}
                  //disabled={!isEditing}
                  required
                  name="category"
                  placeholder='-- Sélectionner une catégorie --'
                  options={[
                    ...Object.keys(Metier).map((c) => ({
                      value: c,
                      label: c
                    }))
                  ]}
                />
                
              </div>
            </div>
            
            {/* Métier */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Métier</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <MapPin size={18} />
                </div>
                <CustomSelect
                  value={formData.metier}
                  onChange={(value: string) => {
                    setFormData(prev => ({
                      ...prev,
                      metier: value
                    }));
                  }}
                  //disabled={!isEditing}
                  required
                  name="metier"
                  placeholder='-- Sélectionner un métier --'
                  options={[
                    ...metierDisponibles.map((m) => ({
                      value: m,
                      label: m
                    }))
                  ]}
                />
              </div>
            </div>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Statut
              </label>
              <CustomSelect
                options={statusOptions}
                value={formData.status}
                placeholder="Choisir statut"
                onChange={(val) =>
                  setFormData(prev => ({ ...prev, status: val as "active" | "paused" | "archived" }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Délai estimé</label>
              <CustomSelect 
                value={formData.duration}
                onChange={(value: string) => setFormData({...formData, duration: value})}
                options={[
                  { value: "Immédiat", label: "Immédiat" },
                  { value: "24h à 48h", label: "24h à 48h" },
                  { value: "Sous 1 semaine", label: "Sous 1 semaine" },
                  { value: "Plus d'une semaine", label: "Plus d'une semaine" },
                  { value: "Disponible", label: "Disponible (flexible)" },
                  { value: "Sur devis", label: "Sur devis" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-4 bg-gray-50 border border-transparent focus:ring-2 focus:ring-orange-200 focus:bg-white rounded-2xl outline-none transition-all"
              rows={4}
              placeholder="Décrivez votre service en détail..."
              required
            />
          </div>
          {/* Section 2 : Description riche */}
          <section className="grid md:grid-cols-2 gap-10">
            {/* Colonne Inclus */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <CheckCircle size={20} /> <span>Ce qui est inclus</span>
              </div>
              <div className="space-y-3">
                {formData.included.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item}
                      onChange={(e) => handleListChange(index, e.target.value, 'included')}
                      className="flex-1 p-3 bg-green-50/30 border border-green-100 rounded-xl outline-none focus:ring-2 focus:ring-green-200"
                      placeholder="ex: Déplacement"
                    />
                    <button type="button" onClick={() => removeListItem(index, 'included')} className="text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addListItem('included')}
                  className="text-green-600 text-sm font-bold flex items-center hover:underline"
                >
                  <Plus size={16} className="mr-1" /> Ajouter un élément
                </button>
              </div>
            </div>

            {/* Colonne Non Inclus */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <XCircle size={20} /> <span>Non inclus / Options</span>
              </div>
              <div className="space-y-3">
                {formData.notIncluded.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item}
                      onChange={(e) => handleListChange(index, e.target.value, 'notIncluded')}
                      className="flex-1 p-3 bg-red-50/30 border border-red-100 rounded-xl outline-none focus:ring-2 focus:ring-red-200"
                      placeholder="ex: Pièces de rechange"
                    />
                    <button type="button" onClick={() => removeListItem(index, 'notIncluded')} className="text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addListItem('notIncluded')}
                  className="text-red-600 text-sm font-bold flex items-center hover:underline"
                >
                  <Plus size={16} className="mr-1" /> Ajouter une exclusion
                </button>
              </div>
            </div>
          </section>

          {/* Section 3 : Galerie photo (Zone de dépôt) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <ImageIcon size={20} /> <span>Galerie & Réalisations</span>
              </div>
              <span className={`text-xs font-bold ${images.length >= 5 ? 'text-red-500' : 'text-gray-400'}`}>
                {images.length} / 5 photos
              </span>
            </div>

            {/* Zone de dépôt / Input caché */}
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={images.length >= 5}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                id="gallery-upload"
              />
              
              <div className={`border-2 border-dashed rounded-[24px] p-8 flex flex-col items-center justify-center transition-all ${
                images.length >= 5 
                ? 'bg-gray-100 border-gray-200 opacity-60' 
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50/50 hover:border-blue-200 group'
              }`}>
                <div className={`p-4 bg-white rounded-full shadow-sm transition-transform ${images.length < 5 && 'group-hover:scale-110'}`}>
                  <Plus size={32} className={images.length >= 5 ? 'text-gray-300' : 'text-blue-500'} />
                </div>
                <p className="font-bold text-gray-700 mt-2">
                  {images.length >= 5 ? "Limite atteinte" : "Ajouter des photos (Avant/Après)"}
                </p>
                <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour parcourir</p>
              </div>
            </div>

            {/* Grille de prévisualisation */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4 animate-in fade-in slide-in-from-bottom-2">
                {previews.map((src, index) => (
                  <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Note d'information */}
            {images.length === 5 && (
              <div className="flex items-center gap-2 text-orange-500 bg-orange-50 p-3 rounded-xl text-xs font-medium">
                <AlertCircle size={14} />
                <span>Vous avez atteint la limite de 5 photos pour ce service.</span>
              </div>
            )}
          </section>

          {/* Footer d'action */}
          <div className="mt-6 flex justify-end space-x-3 flex pt-6 border-t">
            <button
              type="submit"
              className="thq-button-filled flex items-center"
            >
              <Save size={16} />
              <span>{service ? 'Mettre à jour' : 'Créer'}</span>
            </button>
          </div>
          
      </form>
    </div>
  );
};

export default FirstService;