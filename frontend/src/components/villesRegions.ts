export type Ville =
  | 'Tunis' | 'Ariana' | 'Ben Arous' | 'Manouba' | 'Nabeul' | 'Zaghouan'
  | 'Bizerte' | 'Béja' | 'Jendouba' | 'Kef' | 'Siliana'
  | 'Sousse' | 'Monastir' | 'Mahdia' | 'Kairouan' | 'Kasserine' | 'Sidi Bouzid'
  | 'Sfax' | 'Gabès' | 'Medenine' | 'Tataouine' | 'Gafsa' | 'Tozeur' | 'Kebili';

export const villesEtRegions: Record<Ville, string[]> = {
  Tunis: ['Bab El Bhar', 'Lafayette', 'Cité El Khadra', 'El Menzah', 'El Omrane'],
  Ariana: ['Ariana Ville', 'Ennasr', 'La Soukra', 'Raoued'],
  "Ben Arous": ['Mourouj', 'Ezzahra', 'Hammam Lif', 'Rades'],
  Manouba: ['Manouba Ville', 'Douar Hicher', 'Oued Ellil'],
  Nabeul: ['Nabeul Ville', 'Hammamet', 'Dar Chaabane', 'Korba'],
  Zaghouan: ['Zaghouan Ville', 'El Fahs'],
  Bizerte: ['Bizerte Nord', 'Menzel Bourguiba', 'Ras Jebel', 'Mateur'],
  "Béja": ['Béja Ville', 'Testour', 'Nefza'],
  Jendouba: ['Jendouba Ville', 'Tabarka', 'Ghardimaou'],
  Kef: ['Le Kef Ville', 'Dahmani'],
  Siliana: ['Siliana Ville', 'Gaâfour'],
  Sousse: ['Sousse Ville', 'Kalaa Kebira', 'Akouda', 'Hammam Sousse'],
  Monastir: ['Monastir Ville', 'Sahline', 'Ksibet El Mediouni'],
  Mahdia: ['Mahdia Ville', 'Chebba', 'Ksour Essef'],
  Kairouan: ['Kairouan Ville', 'Hajeb El Ayoun', 'Nasrallah'],
  Kasserine: ['Kasserine Ville', 'Sbeitla', 'Feriana'],
  "Sidi Bouzid": ['Sidi Bouzid Ville', 'Menzel Bouzaiene', 'Regueb'],
  Sfax: ['Sfax Ville', 'Sakiet Ezzit', 'Sakiet Eddaier', 'El Ain'],
  Gabès: ['Gabès Ville', 'Mareth', 'El Hamma'],
  Medenine: ['Medenine Ville', 'Djerba', 'Ben Guerdane'],
  Tataouine: ['Tataouine Ville', 'Ghomrassen'],
  Gafsa: ['Gafsa Ville', 'Métlaoui', 'Redeyef'],
  Tozeur: ['Tozeur Ville', 'Nefta'],
  Kebili: ['Kebili Ville', 'Douz', 'Souk Lahad']
};

