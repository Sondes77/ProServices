import { use } from 'react';
import { User, Professional, Service, Devis } from './types';

export function mapUserDataToUserModel(userData: any): User {

  console.log('Données brutes reçues depuis l’API :', userData);

  const id = String(userData.id);
  const firstName = userData.prenom || '';
  const lastName = userData.nom || '';
  const fullName = `${firstName} ${lastName}`;
  const role = userData.role || '';
  const email = userData.email;
  const email_verified = userData.email_verified || false;
  const phone_verified = userData.phone_verified || false;
  const phone = userData.phone || '';
  const city = userData.ville || '';
  const region = userData.region || '';
  const address = userData.adresse || '';
  const apropos = userData.apropos || '';
  const avatar = userData.photo || 'http://localhost:5000/uploads/ServicePro_avatar.png';
  const memberSince = userData.date_creation?.split('T')[0] || '2024-01-01';
  const stats = {
    messagesSent: userData.nb_conversations  || 0,
    reviewsPosted: userData.nb_reviews || 0,
    servicesPublished: userData.nb_services || 0
  };
   const show_phone = userData.show_phone || true;
  const show_address = userData.show_address || false;
  const allow_share = userData.allow_share || true;
  const statut_profil = userData.statut_profil || 'public';
  const email_notif = userData.email_notification || true;

  return {
   
      id,
      fullName,
      firstName,
      lastName,
      role,
      email,
      email_verified,
      phone,
      phone_verified,
      city,
      region,
      address,
      apropos,
      avatar,
      memberSince,
      stats,
      show_phone,
      show_address,
      allow_share,
      statut_profil,
      email_notif
  };
}

export function mapProfessionalsDataToUserModel(prosData: any): Professional {

  //console.log('Données brutes reçues depuis l’API :', prosData);

  const id = String(prosData.service_id);
  const professional_id = String(prosData.professional_id)
  const firstName = prosData.prenom || '';
  const lastName = prosData.nom || '';
  const name = `${firstName} ${lastName}`;
  const profession = prosData.categorie || '';
  const metier = prosData.metier || '';
  const email = prosData.email;
  const phone = prosData.phone || '';
  const city = prosData.ville || '';
  const region = prosData.region || '';
  const address = prosData.adresse || '';
  const rating = prosData.rating || 0;
  const reviews = prosData.rating || 0;
  const avatar = prosData.photo || 'http://localhost:5000/uploads/ServicePro_avatar.png';
  const description = prosData.description || '';
  const prix = prosData.prix || '';
  const availability = prosData.availability || 'Immédiat';
  const verified = prosData.verified || false;
  const sponsored = prosData.sponsored || false;
 

  return {
   
      id,
      professional_id,
      name,
      profession,
      metier,
      //email,
      //phone,
      city,
      region,
      address,
      rating,
      reviews,
      avatar,
      description,
      prix,
      availability,
      verified,
      sponsored
      
  };
}

export function mapServicesDataToUserModel(prosData: any): Service {

  //console.log('Données brutes reçues depuis l’API :', prosData);

  const id = String(prosData.id);
  const pro_id = String(prosData.professionnel_id) || '';
  const title = prosData.titre || '';
  const description = prosData.description || '';
  const status = prosData.statut || '';
  const category = prosData.categorie || '';
  const metier = prosData.metier || '';
  const price = prosData.prix || '';
  const duration = prosData.availability || ''
  const verified =  prosData.verified || false;
  const sponsored =  prosData.sponsored || false;
  const createdAt = prosData.date_creation?.split('T')[0] || '2024-01-01';
  const updatedAt = prosData.date_modification?.split('T')[0] || '2024-01-01';
  const gallery: string[] = Array.isArray(prosData.gallery)
  ? prosData.gallery.map((img: any) => img || '')
  : [];
  const included: string[] = Array.isArray(prosData.included)
  ? prosData.included.map((item: any) => item || '')
  : [];
  const notIncluded: string[] = Array.isArray(prosData.notIncluded)
  ? prosData.notIncluded.map((item: any) => item || '')
  : [];
  /*const provider = {
    name: prosData.nom_prestataire || 'Prestataire inconnu',
    avatar: prosData.avatar || '/default-avatar.png',
    rating: parseFloat(prosData.note) || 0,
    reviews: parseInt(prosData.avis) || 0,
  };*/

  return {
   
      id,
      pro_id,
      title,
      description,
      status,
      category,
      metier,
      price,
      duration,
      verified,
      sponsored,
      createdAt,
      updatedAt,
      gallery,
      included,
      notIncluded
  };
}

export function mapDevisDataToUserModel(data: any): Devis[] {

  const array = Array.isArray(data) ? data : [data];

  return array.map(prosData => {

    //console.log('Mapping devis :', prosData);

    const id = String(prosData.id);
    const client_id = String(prosData.client_id);
    const pro_id = String(prosData.pro_id);
    const objet = prosData.objet || '';
    const description = prosData.description || '';
    const date_souhaitee = prosData.date_souhaitee?.split('T')[0] || '';
    const date_intervention = prosData.date_souhaitee?.split('T')[0] || '';
    const prix = prosData.prix ?? null;
    const message_pro = prosData.message_pro || '';
    const statut = prosData.statut || '';
    const nom = prosData.pro_nom || '';
    const prenom = prosData.pro_prenom || '';
    const pro_nom = `${prenom} ${nom}`.trim();
    const pro_role = prosData.role;
    const pro_photo = prosData.photo;
    const created_at = prosData.created_at?.split('T')[0] || '';

    return {
      id,
      client_id,
      pro_id,
      objet,
      description,
      date_souhaitee,
      date_intervention,
      prix,
      message_pro,
      statut,
      pro_nom,
      pro_role,
      pro_photo,
      created_at
    };

  });
}

/*export function mapReviewsDataToUserModel(prosData: any): Review {

    const id = String(prosData.id);
    const author = {
      id = String(prosData.author_id);
      name = prosData.author_name;
      avatar = prosData.author_photo;
    };
    const recipient: {
      id = String(prosData.recipient_id);
      name = prosData.recipient_name;
      role = prosData.recipient_role;
    };
    const rating = prosData.rating;
    const comment = prosData.comment;
    const timestamp = prosData.created_at?.split('T')[0] || '2024-01-01';

  return {
   
      id,
      author,
      recipient,
      rating,
      comment,
      timestamp
  };
}*/