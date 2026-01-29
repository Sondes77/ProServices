import React, { useState, useEffect } from 'react';
import { Advertisement } from '../utils/types'; // Assurez-vous que le type Advertisement est défini dans ce fichier

interface AdvertisementBannerProps {
  placement: 'top' | 'sidebar' | 'bottom';
  className?: string;
}

const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({ placement, className = '' }) => {
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveAdvertisement();
  }, [placement]);

  const fetchActiveAdvertisement = async () => {
    try {
      // Simuler un appel API - remplacer par votre vraie API
      const response = await fetch(`/api/advertisements/active?placement=${placement}`);
      if (response.ok) {
        const data = await response.json();
        setAdvertisement(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la publicité:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (advertisement) {
      // Enregistrer le clic
      try {
        await fetch(`/api/advertisements/${advertisement.id}/click`, {
          method: 'POST'
        });
        
        // Ouvrir le lien dans un nouvel onglet
        if (advertisement.websiteUrl) {
          window.open(advertisement.websiteUrl, '_blank');
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du clic:', error);
      }
    }
  };

  const handleImpression = async () => {
    if (advertisement) {
      try {
        await fetch(`/api/advertisements/${advertisement.id}/impression`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
      }
    }
  };

  // Enregistrer l'impression quand la pub est affichée
  useEffect(() => {
    if (advertisement) {
      handleImpression();
    }
  }, [advertisement]);

  if (loading) {
    return (
      <div className={`bg-gray-100 p-4 rounded-lg text-center ${className}`}>
        <div className="animate-pulse">
          <div className="bg-gray-300 h-20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!advertisement) {
    // Affichage par défaut quand il n'y a pas de pub
    const getDefaultHeight = () => {
      switch (placement) {
        case 'top': return 'h-[90px]';
        case 'sidebar': return 'h-[250px]';
        case 'bottom': return 'h-[120px]';
        default: return 'h-[90px]';
      }
    };

    return (
      <div className={`bg-gray-100 p-4 rounded-lg text-center ${className}`}>
        <div className="bg-white p-4 rounded shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Publicité</p>
          <div className={`${getDefaultHeight()} flex items-center justify-center border border-dashed border-gray-300`}>
            <span className="text-gray-400">Espace publicitaire disponible</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-100 p-4 rounded-lg text-center ${className}`}>
      <div className="bg-white p-4 rounded shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Publicité</p>
        <div 
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={handleClick}
        >
          <img
            src={advertisement.bannerImage}
            alt={`Publicité ${advertisement.companyName}`}
            className="w-full h-auto rounded object-cover"
            style={{
              maxHeight: placement === 'top' ? '90px' : placement === 'sidebar' ? '250px' : '120px'
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{advertisement.companyName}</p>
      </div>
    </div>
  );
};

export default AdvertisementBanner;