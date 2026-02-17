export interface User {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'professional'|'';
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  phone: string;
  city: string;
  region: string;
  address: string;
  apropos: string;
  avatar: string;
  memberSince: string;
  stats: {
    messagesSent: number;
    reviewsPosted: number;
    servicesPublished?: number;
  };
  show_phone: boolean;
  show_address: boolean;
  allow_share: boolean;
  statut_profil: boolean;
  email_notif: boolean;
}

export interface Professional {
  id: string;
  professional_id:string,
  name: string;
  profession: string;
  metier: string;
  city: string;
  region: string;
  address: string;
  rating: number;
  reviews: number;
  sponsored: boolean;
  avatar: string;
  description: string;
  prix: string;
  availability: string;
  verified: boolean;
}

export interface PrivacySettings {
  hideContactInfo: boolean;
  allowMessages: boolean;
  showServices: boolean;
  profileVisibility: 'public' | 'private';
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'professional';
  };
  recipient: {
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'professional';
  };
  content: string | string[];
  type: string;
  timestamp: string;
  groupId?: string;
  read: boolean;
  notified: boolean;
}

export interface Review {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  recipient: {
    id: string;
    name: string;
    role: 'user' | 'professional';
  };
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Service {
  id: string;
  pro_id: string;
  title: string;
  description: string;
  status: 'active' | 'paused' | 'archived';
  category: string;
  metier: string;
  price?: string;
  duration: string;
  verified: boolean;
  sponsored: boolean;
  createdAt: string;
  updatedAt: string;
  gallery: string[];
  included: string[];
  notIncluded: string[];
  /*provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };*/
}

export interface Conversation {
  isRead: any;
  id: string;
  participant: {
    isOnline: any;
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'professional';
  };
  lastMessage: {
    content: string;
    timestamp: string;
    sender: string;
  };
  unreadCount: number;
}

export interface AdvertisementRequest {
  id: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  websiteUrl?: string;
  message?: string;
  bannerImage: string;
  placement: 'top' | 'sidebar' | 'bottom';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface Advertisement {
  id: string;
  requestId: string;
  companyName: string;
  bannerImage: string;
  websiteUrl?: string;
  placement: 'top' | 'sidebar' | 'bottom';
  startDate: string;
  endDate: string;
  isActive: boolean;
  clicks: number;
  impressions: number;
}

export interface Devis {
  id: string;
  client_id: string,
  pro_id: string,
  objet: string;
  description: string;
  date_souhaitee: string;
  date_intervention: string;
  prix: number;
  message_pro: string;
  statut: "accepted" | "pending_pro" | "pending_client" | "rejected" | "cancelled" | "proposed";
  pro_nom: string; // Jointure ,
  pro_role: string,
  pro_photo: string,
  created_at: string;
}