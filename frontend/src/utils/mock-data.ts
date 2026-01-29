import { User, PrivacySettings, Message, Review, Service, Conversation } from './types';

export const user: User = {
  id: '1',
  fullName: 'Jean Dupont',
  firstName: 'Jean',
  lastName: 'Dupont',
  role: '',
  email: 'jean.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  email_verified: false,
  phone_verified: false,
  city: 'Paris',
  region: 'Île-de-France',
  address: '123 Rue de Paris',
  apropos:'',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  memberSince: '2022-06-15',
  stats: {
    messagesSent: 28,
    reviewsPosted: 9,
    servicesPublished: 5
  }
};

export const professionals = [
  {
    id: '1',
    name: 'Jean Dupont',
    profession: 'Plombier',
    city: 'Paris',
    region: 'Île-de-France',
    rating: 4.8,
    reviews: 127,
    sponsored: false,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    description: 'Plombier professionnel avec 15 ans d\'expérience',
    availability: 'Disponible',
    verified: false
  },
  {
    id: '2',
    name: 'Jean Dupont',
    profession: 'Plombier',
    city: 'Paris',
    region: 'Occitanie',
    rating: 4.8,
    reviews: 127,
    sponsored: false,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    description: 'Plombier professionnel avec 15 ans d\'expérience',
    availability: 'Disponible',
    verified: true
  },
  {
    id: '3',
    name: 'Jean Dupont',
    profession: 'Plombier',
    city: 'Paris',
    region: 'Occitanie',
    rating: 4.8,
    reviews: 127,
    sponsored: true,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    description: 'Plombier professionnel avec 15 ans d\'expérience',
    availability: 'Disponible',
    verified: true
  },
  {
    id: '4',
    name: 'Jean Dupont',
    profession: 'Plombier',
    city: 'Paris',
    region: 'Occitanie',
    rating: 4.8,
    reviews: 127,
    sponsored: true,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    description: 'Plombier professionnel avec 15 ans d\'expérience',
    availability: 'Disponible',
    verified: true
  },
  // Add more mock professionals...
];

export const privacySettings: PrivacySettings = {
  hideContactInfo: false,
  allowMessages: true,
  showServices: true,
  profileVisibility: 'public',
  emailNotifications: true,
  pushNotifications: false
};

export const conversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: '101',
      name: 'Marie Laurent',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'user'
    },
    lastMessage: {
      content: 'Bonjour, je souhaiterais avoir un devis pour la réparation de ma plomberie.',
      timestamp: '2023-09-25T14:30:00Z',
      sender: '101'
    },
    unreadCount: 1
  },
  {
    id: '2',
    participant: {
      id: '102',
      name: 'Pierre Blanc',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'user'
    },
    lastMessage: {
      content: 'Merci pour votre intervention rapide hier.',
      timestamp: '2023-09-23T09:15:00Z',
      sender: '102'
    },
    unreadCount: 0
  },
  {
    id: '3',
    participant: {
      id: '103',
      name: 'Sophie Martin',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'user'
    },
    lastMessage: {
      content: 'Je serai disponible demain à partir de 14h pour votre visite.',
      timestamp: '2023-09-21T18:45:00Z',
      sender: '1'
    },
    unreadCount: 0
  },
  {
    id: '4',
    participant: {
      id: '104',
      name: 'Robert Dubois',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'user'
    },
    lastMessage: {
      content: 'Pouvez-vous me donner un tarif approximatif pour une installation complète ?',
      timestamp: '2023-09-20T10:22:00Z',
      sender: '104'
    },
    unreadCount: 0
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    author: {
      id: '101',
      name: 'Marie Laurent',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    recipient: {
      id: '1',
      name: 'Jean Dupont',
      role: 'professional'
    },
    rating: 5,
    comment: 'Service excellent, travail soigné et professionnel. Jean a résolu notre problème de plomberie très rapidement.',
    timestamp: '2023-09-19T15:30:00Z'
  },
  {
    id: '2',
    author: {
      id: '102',
      name: 'Pierre Blanc',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    recipient: {
      id: '1',
      name: 'Jean Dupont',
      role: 'professional'
    },
    rating: 4,
    comment: 'Bon service, ponctuel et efficace. Tarif un peu élevé mais le travail vaut le coût.',
    timestamp: '2023-09-15T11:20:00Z'
  },
  {
    id: '3',
    author: {
      id: '103',
      name: 'Sophie Martin',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    recipient: {
      id: '1',
      name: 'Jean Dupont',
      role: 'professional'
    },
    rating: 5,
    comment: 'Très satisfaite de l\'intervention. Jean a été à l\'écoute et a su répondre à tous nos besoins.',
    timestamp: '2023-09-10T09:45:00Z'
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Plomberie générale',
    description: 'Installation et réparation de systèmes de plomberie, détection et réparation de fuites, débouchage de canalisations.',
    status: 'active',
    category: 'Plomberie',
    price: 'À partir de 60€/h',
    createdAt: '2023-07-10T08:00:00Z',
    updatedAt: '2023-08-25T14:30:00Z'
  },
  {
    id: '2',
    title: 'Installation de salle de bain',
    description: 'Installation complète de salle de bain, y compris baignoire, douche, lavabo et WC. Travail soigné et professionnel.',
    status: 'active',
    category: 'Plomberie',
    price: 'Sur devis',
    createdAt: '2023-06-15T09:30:00Z',
    updatedAt: '2023-08-20T11:15:00Z'
  },
  {
    id: '3',
    title: 'Chauffage et climatisation',
    description: 'Installation, entretien et réparation de systèmes de chauffage et de climatisation pour particuliers et professionnels.',
    status: 'paused',
    category: 'Chauffage',
    price: 'À partir de 80€/h',
    createdAt: '2023-05-20T10:45:00Z',
    updatedAt: '2023-09-01T16:20:00Z'
  },
  {
    id: '4',
    title: 'Dépannage d\'urgence',
    description: 'Service de dépannage disponible 24/7 pour toutes urgences de plomberie : fuite d\'eau, canalisation bouchée, etc.',
    status: 'active',
    category: 'Urgence',
    price: 'À partir de 90€/h',
    createdAt: '2023-08-05T07:30:00Z',
    updatedAt: '2023-09-15T13:10:00Z'
  },
  {
    id: '5',
    title: 'Conseil en économie d\'eau',
    description: 'Audit et conseil pour réduire votre consommation d\'eau. Installation de systèmes économes en eau.',
    status: 'archived',
    category: 'Conseil',
    price: 'Forfait 120€',
    createdAt: '2023-04-12T14:20:00Z',
    updatedAt: '2023-07-30T08:45:00Z'
  }
];