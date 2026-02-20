// utils/searchEngine.ts

const SYNONYMS: Record<string, string[]> = {
  electricite: [
    "electricien",
    "électricien",
    "electricite",
    "électricité",
    "electrique",
    "كهرباء",
    "كهربائي",
    "فني كهرباء",
    "مهندس كهرباء"
  ],

  plomberie: [
    "plombier",
    "plomberie",
    "سباك"
  ],

  climatisation: [
    "clim",
    "climatiseur",
    "climatization",
    "مكيف",
    "تبريد"
  ],

  peinture: [
    "peintre",
    "peinture",
    "دهان"
  ],

  "reparation tv":[
    "parabole",
    "paraboliste",
    "tv",
    "television",
    "télévision",
    "depannage tv",
    "depannage",
    "tlevzi",
    "taslih parabol",
    "taslih parabolet",
    "tasli7 parabole",
    "tasli7 parabolet",
    "بارابول",
    "تصليح البارابول",
    "تصليح بارابول"
  ]
};

export function normalize(text: string = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function expandQuery(q: string) {
  const nq = normalize(q);

  for (const words of Object.values(SYNONYMS)) {
    const normalizedWords = words.map(normalize);
    if (normalizedWords.includes(nq)) {
      return normalizedWords;
    }
  }

  return [nq];
}

export function matchesQuery(pro: any, words: string[]) {
  const text = normalize(`
    ${pro.name}
    ${pro.profession}
    ${pro.metier}
    ${pro.description}
  `);

  return words.some(w => text.includes(w));
}

