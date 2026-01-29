import { useState, useEffect } from 'react';
import { Advertisement } from '../utils/types';

export const useAdvertisements = (placement: 'top' | 'sidebar' | 'bottom') => {
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

  const trackClick = async (advertisementId: string) => {
    try {
      await fetch(`/api/advertisements/${advertisementId}/click`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du clic:', error);
    }
  };

  const trackImpression = async (advertisementId: string) => {
    try {
      await fetch(`/api/advertisements/${advertisementId}/impression`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'impression:', error);
    }
  };

  return {
    advertisement,
    loading,
    trackClick,
    trackImpression,
    refetch: fetchActiveAdvertisement
  };
};