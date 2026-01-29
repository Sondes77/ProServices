import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Service } from '../utils/types';

interface ServiceFormProps {
  service?: Service;
  onSubmit: (serviceData: Partial<Service>) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    price: service?.price || '',
    status: service?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="bg-[#e0692d] p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {service ? 'Modifier le service' : 'Ajouter un service'}
          </h2>
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du service
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                placeholder="Ex: Plomberie générale"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                rows={4}
                placeholder="Décrivez votre service en détail..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Plomberie">Plomberie</option>
                  <option value="Électricité">Électricité</option>
                  <option value="Menuiserie">Menuiserie</option>
                  <option value="Peinture">Peinture</option>
                  <option value="Jardinage">Jardinage</option>
                  <option value="Maçonnerie">Maçonnerie</option>
                  <option value="Chauffage">Chauffage</option>
                  <option value="Climatisation">Climatisation</option>
                  <option value="Serrurerie">Serrurerie</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  placeholder="Ex: À partir de 50€/h"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'paused' | 'archived' }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                required
              >
                <option value="active">Actif</option>
                <option value="paused">En pause</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Annuler
            </button>
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
    </div>
  );
};

export default ServiceForm;