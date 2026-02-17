import React, { useEffect, useState } from 'react';
import { 
  Plus, Trash2, Image as ImageIcon, CheckCircle, XCircle, 
  Tag, MapPin, Save, X, Info, 
  AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Service } from '../utils/types';
import Select from 'react-select';
import CustomSelect from './CustomSelect';
import {  Categorie, Metier } from '../components/categoryMetier';

interface ServiceFormProps {
  onCancel: () => void;
  service?: Service;
  onSubmit: (serviceData: Partial<Service>) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmit, onCancel}) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    metier: service?.metier || '',
    price: service?.price || '',
    status: service?.status || 'active',
    duration: service?.duration || 'Immédiat',
    //gallery: service?.gallery || [''],
    included: service?.included || [''],
    notIncluded: service?.notIncluded || [''],
  });
  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'paused', label: 'En pause' },
    { value: 'archived', label: 'Archivé' }
  ];
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(service?.gallery || []);
  const [existingImages, setExistingImages] = useState<string[]>(service?.gallery || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const metierDisponibles =
    formData.category && Metier[formData.category as Categorie]
      ? Metier[formData.category as Categorie]
      : [];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

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

    onSubmit(payload);

    Swal.fire({
      title: "Service enregistré",
      icon: "success",
      confirmButtonColor: "#e0692d"
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const total = existingImages.length + newFiles.length + files.length;
    if (total > 5) {
      Swal.fire({
        toast: true, // active le mode toast
        position: "top-end", // en haut à droite
        showConfirmButton: false, // pas de bouton OK
        timer: 1500, // durée d'affichage
        timerProgressBar: true, // barre de progression
        icon: "error",
        //title: selectedService ? "Service mis à jour" : "Service créé",
        text: "Max 5 images",
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
 
      return;
    }

    setNewFiles(prev => [...prev, ...files]);

    const newPreviewUrls = files.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...newPreviewUrls]);
  };

  useEffect(() => {
    if (service?.gallery) {
      setExistingImages(service.gallery);
      setPreviews(service.gallery);
    }
  }, [service]);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay avec flou */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onCancel}
      ></div>
      
      {/* Contenu du Popup */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">

        {/* Header */}
        <div className="bg-[#e0692d] sticky top-0 z-20 px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {service ? 'Modifier le service' : 'Créer un nouveau service'}
            </h1>
            <p className="text-white/80 text-sm">
              Remplissez les détails pour votre page de service
            </p>
          </div>

          <button
            onClick={onCancel}
            className="bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/30 transition"
          >
            <XCircle size={22} className="text-white" />
          </button>
        </div>

        {/* SCROLL ZONE INTERNE */}
        <div className="overflow-y-auto max-h-[calc(90vh-96px)]">
          
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
                    required = {true}
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
                    required = {true}
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
            <div className="flex items-center justify-between pt-6 border-t">
               <div className="flex items-center gap-2 text-blue-600 text-sm bg-blue-50 px-4 py-2 rounded-full">
                {/*<Info size={16} />
                <span>Pensez à utiliser des mots-clés pour le SEO</span>*/}
              </div> 
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="px-8 py-4 font-bold text-gray-500 hover:text-black transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="bg-[#e0692d] text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-[#f07e40] hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  <Save size={20} /> 
                  <span>{service ? 'Mettre à jour' : 'Publier le service'}</span>
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;