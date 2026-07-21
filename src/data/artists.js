// built:true → page is generated this round. Others appear in listings only.
export const artists = [
  {
    slug: 'josef', name: 'Josef', built: true,
    portrait: '/images/artists/Josef-Profile.webp',
    folder: 'Josef',
    book: 'https://book.useetattoo.com/josef',
    specialties: { de: 'Realistic · Black & Grey · Neo Traditional', en: 'Realistic · Black & Grey · Neo Traditional' },
    meta: {
      de: 'Josef ist der kreative Kopf hinter Usee Tattoo, spezialisiert auf Realismus, Mikro-Realismus, Porträts, Mandalas und Maori.',
      en: 'Josef is the creative genius behind UseeTattoo. He specializes in realism, micro-realism, portraits, mandalas, and Maori art and has a deep passion for Japanese tattoos.',
    },
    bio: {
      de: 'Josef ist der kreative Kopf hinter Usee Tattoo. Spezialisiert auf Realismus, Mikro-Realismus, Porträts, Mandalas und Maori-Kunst, verbindet ihn zudem eine tiefe Leidenschaft für japanische Tattoos. Josef wählt seine Kund:innen bewusst aus, damit jedes seiner einzigartigen Designs mit höchster Präzision und Handwerkskunst zum Leben erwacht. Wer ein außergewöhnliches, persönliches Tattoo sucht, das heraussticht, ist bei Josef genau richtig.',
      en: 'Josef is the creative genius behind Usee Tattoo. Specializing in realism, micro-realism, portraits, mandalas, and Maori art, he also has a deep passion for Japanese tattoos. Josef carefully selects his clients to ensure that his unique, one-of-a-kind designs are brought to life with the utmost precision and artistry. If you are searching for an exceptional, personalized tattoo that stands out, Josef is undoubtedly the artist to choose.',
    },
  },
  {
    slug: 'nilou', name: 'Nilou', built: true,
    portrait: '/images/artists/Nilou.webp',
    folder: 'Nilou',
    book: 'https://book.useetattoo.com/nilou',
    specialties: { de: 'Fine Line · Ornamental · Maori', en: 'Fine Line · Ornamental · Maori' },
    meta: {
      de: 'Nilou ist bekannt für ihre Präzision und ihr natürliches Talent, spezialisiert auf Ornamental, Fine Line und Tribal.',
      en: 'Nilou is known for her incredible precision and natural talent. Specializing in ornamental, fine line, and tribal styles.',
    },
    // Real bio to be supplied by Hossein, placeholder kept out of production.
    bio: { de: '', en: '' },
  },
  {
    slug: 'cali', name: 'Cali', built: true,
    portrait: '/images/artists/Cali.webp',
    folder: 'Cali',
    book: 'https://book.useetattoo.com/cali',
    specialties: { de: 'Micro Realism · Fine Line', en: 'Micro Realism · Fine Line' },
    meta: {
      de: 'Cali ist seit der Eröffnung Teil von Usee Tattoo, bekannt für präzise Arbeit und feinste Details.',
      en: 'Cali began his journey at UseeTattoo when the studio first opened and has since become a standout artist. Known for his precise work and intricate details.',
    },
    bio: {
      de: 'Cali ist seit der Eröffnung Teil von Usee Tattoo und hat sich seither zu einem herausragenden Artist entwickelt. Bekannt für seine präzise Arbeit und feinsten Details, hat Cali ein Talent für moderne Tattoos mit zeitloser Note. Seine Designs greifen oft Statuen, historische Motive und zeitgenössische Interpretationen auf. Calis Fähigkeit, Tradition mit moderner Kunst zu verbinden, macht jedes Stück bedeutungsvoll und visuell fesselnd.',
      en: 'Cali began his journey at Usee Tattoo when the studio first opened and has since become a standout artist. Known for his precise work and intricate details, Cali has a talent for modern tattoos with a timeless touch. His designs often feature elements inspired by statues, historical motifs, and contemporary interpretations. Cali’s ability to blend tradition with modern artistry ensures that every piece he creates is both meaningful and visually captivating.',
    },
  },
  {
    slug: 'jvd', name: 'Jvd', built: true,
    portrait: '/images/artists/Javad.webp',
    folder: 'Jvd',
    book: 'https://book.useetattoo.com/jvd',
    specialties: { de: 'Micro Realism · Fine Line', en: 'Micro Realism · Fine Line' },
    meta: {
      de: 'JVD ist ein erfahrener Artist für Mikro-Realismus und Fine Line, präzise und geduldig.',
      en: 'JVD is an experienced artist specializing in micro-realism and fine line tattoos. His precise and patient approach ensures every piece is meticulously crafted.',
    },
    bio: {
      de: 'JVD ist ein erfahrener Artist, spezialisiert auf Mikro-Realismus und Fine-Line-Tattoos. Sein präziser und geduldiger Ansatz sorgt dafür, dass jedes Stück ebenso eindrucksvoll wie sorgfältig gearbeitet ist. JVD nimmt sich Zeit für jeden Schritt des Prozesses und liefert für seine Kund:innen bestmögliche Ergebnisse.',
      en: 'JVD is an experienced artist specializing in micro-realism and fine line tattoos. His precise and patient approach ensures that every piece he creates is both impressive and meticulously crafted. JVD takes the time to focus on each step of the tattooing process, delivering the best possible results for his clients.',
    },
  },
  {
    slug: 'nana', name: 'Nana', built: true,
    portrait: '/images/artists/Nazanin.webp',
    folder: 'Nana',
    book: 'https://book.useetattoo.com/piercing',
    piercing: true,
    specialties: { de: 'Piercing · Atelier', en: 'Piercing · Atelier' },
    meta: {
      de: 'Nana ist unsere Piercing-Spezialistin, kuratierte, hochwertige Piercings mit Sorgfalt und Stil.',
      en: 'Nana is our piercing specialist, curated, high-quality piercings placed with care and style.',
    },
    bio: {
      de: 'Nana ist unsere Piercing-Spezialistin und verbindet ihre herzliche Art mit fachkundigem Können. Von Ohr-Piercings (Helix, Tragus, Conch, Lobe) über Nasen- und Septum- bis zu Lippen- und Bauchnabel-Piercings sorgt sie für ein sicheres, stilvolles und angenehmes Erlebnis, kuratiert und nach Termin.',
      en: 'Nana is our piercing specialist, combining a warm approach with expert skill. From ear piercings (helix, tragus, conch, lobe) to nose, septum, lip and navel, she ensures a safe, stylish and comfortable experience, curated and by appointment, with a considered selection of fine jewellery.',
    },
  },
];

export const artistsBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));
