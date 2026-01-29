import { Advertisement, AdvertisementRequest } from '../utils/types';

export const isAdvertisementActive = (ad: Advertisement): boolean => {
  const now = new Date();
  const startDate = new Date(ad.startDate);
  const endDate = new Date(ad.endDate);
  
  return ad.isActive && now >= startDate && now <= endDate;
};

export const getAdvertisementDimensions = (placement: 'top' | 'sidebar' | 'bottom') => {
  switch (placement) {
    case 'top':
      return { width: 1200, height: 90 };
    case 'sidebar':
      return { width: 300, height: 250 };
    case 'bottom':
      return { width: 1200, height: 120 };
    default:
      return { width: 300, height: 250 };
  }
};

export const calculateAdvertisementPrice = (
  placement: 'top' | 'sidebar' | 'bottom',
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const weeks = Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
  
  const weeklyPrices = {
    top: 50,
    sidebar: 30,
    bottom: 40
  };
  
  const basePrice = weeklyPrices[placement] * weeks;
  
  // Remise pour les campagnes longues
  if (weeks >= 4) {
    return basePrice * 0.9; // 10% de remise
  } else if (weeks >= 8) {
    return basePrice * 0.8; // 20% de remise
  }
  
  return basePrice;
};

export const generateAdvertisementReport = (advertisements: Advertisement[]) => {
  const totalImpressions = advertisements.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = advertisements.reduce((sum, ad) => sum + ad.clicks, 0);
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  
  return {
    totalImpressions,
    totalClicks,
    clickThroughRate: ctr,
    activeAds: advertisements.filter(ad => isAdvertisementActive(ad)).length,
    topPerformers: advertisements
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
  };
};