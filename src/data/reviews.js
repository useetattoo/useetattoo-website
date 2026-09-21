// Real 5-star Google reviews from the Usee Tattoo Google Business profile (verbatim excerpts).
// `photo` is a self-hosted avatar (public/images/reviews/) for reviewers who had a public
// profile picture; the rest fall back to initials. `lang` is the language the review was
// written in. The homepage groups these into slides of 6 (a carousel). Aggregate rating/count
// come from site.reviews. To refresh: pull the latest from the Google listing and update below.
//
// ND-134 (niloo, 2026-09-21): this list is deliberately curated down to 12 reviews, one per
// service or pre-booking concern: consultation into a large custom piece, custom work from
// the guest own idea, cover-up, first tattoo late in life, pain, design changes until happy,
// walk-in, piercing, fine line precision, hygiene and process, comparison with other studios,
// and a traveller on a short trip. The order below is the display order.
// Do NOT pad this list back up: a longer run of everything-was-great reviews answers no
// question a guest actually has before booking. Two reviews were removed on purpose and must
// not come back: one that mentions a flash sale sign (discount language, ND-29/value framing)
// and one that praises an artist who is no longer in the roster.
// ND-131: no Review and no aggregateRating JSON-LD is generated from this data. Do not add any.
export const googleReviews = {
    // Google place: USEE Tattoo - Studio (placeid ChIJ0bPRK6RRqEcRPq78788wb2U)
    url: 'https://search.google.com/local/reviews?placeid=ChIJ0bPRK6RRqEcRPq78788wb2U',
    writeUrl: 'https://search.google.com/local/writereview?placeid=ChIJ0bPRK6RRqEcRPq78788wb2U',
    perSlide: 6,
    items: [
          // Slide 1
      // 1 — consultation leading into a large custom piece (the full funnel in one review)
      { author: 'Bianca Eichner', lang: 'de', photo: null, text: 'Ich habe einen Beratungstermin bei Cali gebucht, einen Tag später standen wir bereits über WhatsApp im Austausch. Es wurde ein Porträt meines Seelenhundes. Cali ist eine Seele von Mensch, aber egal bei wem man einen Termin ausmacht, hier sind alle super lieb und so talentiert.' },
          // 2 — large piece from the guests own idea; names Josef in the guests own words
      { author: 'Deatharra', lang: 'en', photo: null, text: 'My husband and I are visiting Berlin from Australia and spontaneously decided to get some tattoos for our kids. We were impressed with the time that Josef and Cali took to put our ideas into tattoos. The studio is very hygienic.' },
          // 3 — cover-up / working an existing tattoo into a new design
      { author: 'Christiane', lang: 'en', photo: null, text: 'Absolutely wonderful experience. I had booked a walk-in tattoo with Javad, and it also had to incorporate a tattoo I already had. He very quickly had an idea of what I wanted, changed a few things around and made sure everything was done beautifully.' },
          // 4 — first tattoo, age as a barrier
      { author: 'diealtedame1892', lang: 'de', photo: null, text: 'Ich habe mich mit 53 Jahren dazu entschieden, mir mein erstes Tattoo stechen zu lassen, und bin sowas von begeistert. Ich bin der glücklichste Mensch mit meinem ersten Tattoo. Vielen lieben Dank für alles.' },
          // 5 — pain, plus placement and thickness advice on the guests own anatomy
      { author: 'Teresa Ludwig', lang: 'de', photo: 'teresa-ludwig.webp', text: 'Habe mir spontan eines der C2C-Motive während des Festivals als Walk-In stechen lassen. Kaum Schmerzen, genug Zeit um Größe und Position richtig auszuwählen, und auch eine körperbezogene Beratung zu Dicke und Position. Das Fineline von JVD ist toll.' },
          // 6 — what if I do not like the design, and the online consultation route
      { author: 'Isabel Richter', lang: 'de', photo: 'isabel-richter.webp', text: 'Online-Vorgespräch lief schnell und unkompliziert, der Termin ging ebenfalls fix. Es wird im Vorfeld alles besprochen, und es wird so lange angepasst, bis man zufrieden ist. Auch währenddessen konnten noch kleine Änderungen vorgenommen werden.' },
          // Slide 2
          // 7 — walk-in without an appointment, guest brought their own design
      { author: 'Sqax', lang: 'de', photo: 'sqax.webp', text: 'Ich bin einfach reinspaziert, ohne Termin, und trotzdem konnte es direkt losgehen. Ich hatte mein eigenes Design mitgebracht, Jvd hat dann ein paar Änderungen vorgenommen und mir hat es noch mehr gefallen.' },
          // 8 — piercing. The only piercing review in the set: if it goes, piercing has no proof here
      { author: 'ImmerDerDeutsche', lang: 'de', photo: null, text: 'Usee Tattoo ist meine absolute Nummer 1 für Piercings und Tattoos. Ich liebe das Team dort total, und es hilft einem wirklich, egal wobei, und ist dabei super freundlich.' },
          // 9 — fine line precision, returning guest, and waiting time for an appointment
      { author: 'Kim-laureen Kämmer', lang: 'de', photo: null, text: 'Egal was für Ideen und Wünsche ich habe, Usee Tattoo setzt es immer perfekt um. Gerade Fineline-Arbeiten machen sie in so einer krassen Genauigkeit, dass es bis ins kleinste Detail perfekt ist. Das Team ist mega sympathisch und auf Termine muss man auch nicht ewig warten.' },
          // 10 — hygiene and the process from sketch to finished work
      { author: 'Paul Prime', lang: 'en', photo: null, text: 'Had a very spontaneous walk in. My tattoo artist was simply amazing. From the sketch to the tattooing itself, everything smooth, friendly, welcoming, hygienic. I am more than happy with the results. Will come back for sure.' },
          // 11 — comparative credibility for someone weighing up studios
      { author: 'Barrett Eidson', lang: 'en', photo: null, text: 'Worked with JVD! He was super nice, helpful, and gave me an awesome fine line tattoo that I love! Very efficient and will definitely be going back. As this is my 5th tattoo in my 5th studio, this is the best tattoo experience I have had so far. Thank you Javad!' },
          // 12 — traveller with little time in Berlin
      { author: 'Aisha Evans', lang: 'en', photo: null, text: 'My husband and I took a weekend trip to Berlin for a concert. I was diligently looking for a tattoo artist who could get us both in and bring our ideas to life. Josef and the team made it happen.' },
        ],
};
