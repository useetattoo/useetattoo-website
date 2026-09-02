// built:true → page is generated this round. Others appear in listings only.
export const artists = [
  {
    slug: 'josef', name: 'Josef', built: true,
    portrait: '/images/artists/Josef-Profile.webp',
    folder: 'Josef',
    book: 'https://book.useetattoo.com/josef',
    specialties: { de: 'Realistic · Black & Grey · Portraits · Maori · Japanese', en: 'Realistic · Black & Grey · Portraits · Maori · Japanese' },
    meta: {
      de: 'Josef hat Usee Tattoo mitaufgebaut und prägt bis heute die künstlerische Linie des Studios, spezialisiert auf Realismus in Schwarz-Grau, Porträts und Maori-Kunst.',
      en: 'Josef helped build Usee Tattoo and still shapes the studio\'s artistic direction today, specializing in black & grey realism, portraits, and Maori art.',
    },
    bio: {
      de: 'Josef hat Usee Tattoo mitaufgebaut und prägt bis heute die künstlerische Linie des Studios. Sein Schwerpunkt liegt auf Realismus in Schwarz-Grau, von Tierporträts über Gesichter bis zu großflächigen Sleeves, umgesetzt mit exakter Kontrolle über Licht, Schatten und Tiefe, damit ein Motiv wie eine Fotografie auf der Haut wirkt statt wie eine Zeichnung. Daneben bringt er seine Erfahrung in Maori-Kunst und seine wachsende Leidenschaft für japanische Tattoos in jede Beratung ein. Wie schon von Anfang an wählt Josef seine Projekte bewusst aus und nimmt sich für jedes ein ausführliches Beratungsgespräch, bevor der erste Entwurf entsteht. Wer ein Motiv sucht, das fotografische Tiefe und Präzision zeigt, ist bei Josef richtig.',
      en: 'Josef helped build Usee Tattoo and still shapes the studio\'s artistic direction today. His focus is realism in black & grey, from animal portraits to faces to large-scale sleeves, executed with exact control over light, shadow and depth so a piece reads like a photograph on skin rather than a drawing. He also brings his experience in Maori art and his growing passion for Japanese tattoos into every consultation. As he has from the start, Josef chooses his projects deliberately and takes time for an in-depth conversation before any design begins. If you\'re looking for a piece with photographic depth and precision, Josef is the artist for that.',
    },
  },
  {
    slug: 'cali', name: 'Cali', built: true,
    portrait: '/images/artists/Cali.webp',
    folder: 'Cali',
    book: 'https://book.useetattoo.com/cali',
    specialties: { de: 'Micro Realism · Fine Line · Conceptual', en: 'Micro Realism · Fine Line · Conceptual' },
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
    specialties: { de: 'Micro Realism · Fine Line · Schriftzug · Dotwork', en: 'Micro Realism · Fine Line · Lettering · Dotwork' },
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
    specialties: { de: 'Piercing · Studio', en: 'Piercing · Studio' },
    meta: {
      de: 'Nana ist unsere Piercing-Spezialistin bei Usee Tattoo Berlin: kuratierte Piercings mit Sorgfalt und Stil.',
      en: 'Nana is our piercing specialist, curated, high-quality piercings placed with care and style.',
    },
    bio: {
      de: 'Nana ist unsere Piercing-Spezialistin und verbindet ihre herzliche Art mit fachkundigem Können. Von Ohr-Piercings (Helix, Tragus, Conch, Lobe) über Nasen- und Septum- bis zu Lippen- und Bauchnabel-Piercings sorgt sie für ein sicheres, stilvolles und angenehmes Erlebnis, kuratiert und nach Termin.',
      en: 'Nana is our piercing specialist, combining a warm approach with expert skill. From ear piercings (helix, tragus, conch, lobe) to nose, septum, lip and navel, she ensures a safe, stylish and comfortable experience, curated and by appointment, with a considered selection of fine jewellery.',
    },
  },
];

export const artistsBySlug = Object.fromEntries(artists.map((a) => [a.slug, a]));
