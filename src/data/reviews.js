// Real 5-star Google reviews from the Usee Tattoo Google Business profile (verbatim excerpts).
// `photo` is a self-hosted avatar (public/images/reviews/) for reviewers who had a public
// profile picture; the rest fall back to initials. `lang` is the language the review was
// written in. The homepage groups these into slides of 6 (a carousel). Aggregate rating/count
// come from site.reviews. To refresh: pull the latest from the Google listing and update below.
export const googleReviews = {
  // Google place: USEE Tattoo - Studio (placeid ChIJ0bPRK6RRqEcRPq78788wb2U)
  url: 'https://search.google.com/local/reviews?placeid=ChIJ0bPRK6RRqEcRPq78788wb2U',
  writeUrl: 'https://search.google.com/local/writereview?placeid=ChIJ0bPRK6RRqEcRPq78788wb2U',
  perSlide: 6,
  items: [
    // Slide 1
    { author: 'Rimsha Ali', lang: 'en', photo: null, text: 'I had Jvd (Javad) do my tattoo and had a great experience. He was very communicative and turned my vision to reality exactly how I had imagined it. I am definitely going to Jvd for all my future tattoos.' },
    { author: 'Lilly Hecker', lang: 'de', photo: 'lilly-hecker.webp', text: 'Ganz spontan bin ich auf dieses Studio gestoßen, reingegangen, Idee geschildert, Motiv ausgesucht und noch am selben Abend tätowiert. Ich habe mich von Anfang an total wohlgefühlt, vor allem bei Josef. Super entspannt und professionell, und das Tattoo ist genauso geworden, wie ich es mir vorgestellt habe.' },
    { author: 'Denni Weber', lang: 'en', photo: null, text: 'This tattoo studio is without a doubt home to the best tattoo artists in Berlin. From the moment I walked in, I knew I was in good hands. The atmosphere is welcoming and professional, and the artists take the time to truly understand your vision.' },
    { author: 'Jessica Kümmele', lang: 'de', photo: 'jessica-kuemmele.webp', text: 'Gestern online den Termin gemacht, heute das erste Mal bei Jvd gewesen. Super sympathisch und nimmt sich Zeit. Ich war ein bisschen unschlüssig über den Ort des Tattoos, war über seine Meinung sehr dankbar und bin begeistert aus dem Studio rausgegangen.' },
    { author: 'Kim-laureen Kämmer', lang: 'de', photo: null, text: 'Egal was für Ideen und Wünsche ich habe, Usee Tattoo setzt es immer perfekt um. Gerade Fineline-Arbeiten machen sie in so einer krassen Genauigkeit, dass es bis ins kleinste Detail perfekt ist. Das Team ist mega sympathisch und auf Termine muss man auch nicht ewig warten.' },
    { author: 'Trevor Thomas', lang: 'en', photo: null, text: 'Was in Berlin for C2C Festival and my wife and I decided to pop into USEE for an event related tattoo for the memories. Cannot say enough about the hospitality and professionalism of all the artists in the shop! Would recommend.' },
    // Slide 2
    { author: 'Andrea Rivadossi', lang: 'en', photo: null, text: 'It was my first tattoo. The tattoo artist is really nice and a caring person. He was worried if I was suffering and if the situation was ok. I would come again.' },
    { author: 'Teresa Ludwig', lang: 'de', photo: 'teresa-ludwig.webp', text: 'Habe mir spontan eines der C2C-Motive während des Festivals als Walk-In stechen lassen. Kaum Schmerzen, genug Zeit um Größe und Position richtig auszuwählen, und auch eine körperbezogene Beratung zu Dicke und Position. Das Fineline von JVD ist toll.' },
    { author: 'Barrett Eidson', lang: 'en', photo: null, text: 'Worked with JVD! He was super nice, helpful, and gave me an awesome fine line tattoo that I love! Very efficient and will definitely be going back. As this is my 5th tattoo in my 5th studio, this is the best tattoo experience I have had so far. Thank you Javad!' },
    { author: 'Alejandro', lang: 'de', photo: 'alejandro.webp', text: 'Ich war gerade bei Usee Tattoo Studio und bin wirklich rundum glücklich rausgegangen. Josef ist einfach super lieb und nimmt sich richtig Zeit, hat mir die kleinen Gesichtstattoos genau so gestochen, wie ich sie wollte.' },
    { author: 'Bianca Eichner', lang: 'de', photo: null, text: 'Ich habe einen Beratungstermin bei Cali gebucht, einen Tag später standen wir bereits über WhatsApp im Austausch. Es wurde ein Porträt meines Seelenhundes. Cali ist eine Seele von Mensch, aber egal bei wem man einen Termin ausmacht, hier sind alle super lieb und so talentiert.' },
    { author: 'Christiane', lang: 'en', photo: null, text: 'Absolutely wonderful experience. I had booked a walk-in tattoo with Javad, and it also had to incorporate a tattoo I already had. He very quickly had an idea of what I wanted, changed a few things around and made sure everything was done beautifully.' },
    // Slide 3
    { author: 'Serena Condemi', lang: 'en', photo: null, text: 'My experience here was amazing! I was there for a summer vacation and I immediately noticed them from their studio, with a style very much in line with mine. They immediately welcomed me and satisfied me in every possible way.' },
    { author: 'Isabel Richter', lang: 'de', photo: 'isabel-richter.webp', text: 'Online-Vorgespräch lief schnell und unkompliziert, der Termin ging ebenfalls fix. Es wird im Vorfeld alles besprochen, und es wird so lange angepasst, bis man zufrieden ist. Auch währenddessen konnten noch kleine Änderungen vorgenommen werden.' },
    { author: 'Daniel', lang: 'en', photo: null, text: 'I was welcomed warmly right away, and the consultation on the different designs was great. I got two new little tattoos. I felt very comfortable and I am super happy with each piece. I can only recommend him.' },
    { author: 'Sari', lang: 'de', photo: 'sari.webp', text: 'Ich war heute das erste Mal bei Javad. Ich bin super zufrieden und habe mich sehr wohlgefühlt. Es wurde sich viel Zeit genommen, um auf meine Wünsche einzugehen. Die Arbeit ist sehr präzise und genau.' },
    { author: 'diealtedame1892', lang: 'de', photo: null, text: 'Ich habe mich mit 53 Jahren dazu entschieden, mir mein erstes Tattoo stechen zu lassen, und bin sowas von begeistert. Ich bin der glücklichste Mensch mit meinem ersten Tattoo. Vielen lieben Dank für alles.' },
    { author: 'Paul Prime', lang: 'en', photo: null, text: 'Had a very spontaneous walk in. My tattoo artist was simply amazing. From the sketch to the tattooing itself, everything smooth, friendly, welcoming, hygienic. I am more than happy with the results. Will come back for sure.' },
    // Slide 4
    { author: 'TK Munyon', lang: 'en', photo: null, text: 'Javad was our artist and was awesome. Everything went smooth and he created some sick clouds. Super easy to talk to, listened to what we wanted and made suggestions. All around great experience and I recommend.' },
    { author: 'Emily Cipolla', lang: 'de', photo: 'emily-cipolla.webp', text: 'Ich ging dort mein erstes Tattoo machen und bin sehr zufrieden mit dem Resultat. Der Tätowierer war sehr freundlich und professionell. Der perfekte Ort für dein erstes Tattoo.' },
    { author: 'Aisha Evans', lang: 'en', photo: null, text: 'My husband and I took a weekend trip to Berlin for a concert. I was diligently looking for a tattoo artist who could get us both in and bring our ideas to life. Josef and the team made it happen.' },
    { author: 'Justine Stritzke', lang: 'de', photo: null, text: 'Das Studio hat direkt eine entspannte und professionelle Atmosphäre vermittelt. Man merkt sofort, dass hier mit Leidenschaft gearbeitet wird. Mein Tätowierer hat sich Zeit genommen, alles perfekt umzusetzen.' },
    { author: 'Haley Kindschuh', lang: 'en', photo: null, text: 'I came in after just walking past and saw a flash sale sign, and am so glad I did! I absolutely love the two I got and would definitely recommend.' },
    { author: 'Michael Vischer', lang: 'de', photo: null, text: 'Super professionell, super Tattoo-Artist (Javad). Habe mir mehrere Tattoos stechen lassen und fühle mich sehr wohl und klasse betreut. Werde nie mehr woanders hingehen.' },
    // Slide 5
    { author: 'Deatharra', lang: 'en', photo: null, text: 'My husband and I are visiting Berlin from Australia and spontaneously decided to get some tattoos for our kids. We were impressed with the time that Josef and Cali took to put our ideas into tattoos. The studio is very hygienic.' },
    { author: 'Sqax', lang: 'de', photo: 'sqax.webp', text: 'Ich bin einfach reinspaziert, ohne Termin, und trotzdem konnte es direkt losgehen. Ich hatte mein eigenes Design mitgebracht, Jvd hat dann ein paar Änderungen vorgenommen und mir hat es noch mehr gefallen.' },
    { author: 'Rene Eicher', lang: 'de', photo: null, text: 'Ich war mit meiner Partnerin spontan in Berlin und wir haben auf dem Weg das Tattoo-Studio entdeckt. Wir fragten, ob sie spontan uns beide ein Tattoo stechen könnten, und alles hat wunderbar geklappt.' },
    { author: 'Lisa V', lang: 'de', photo: null, text: 'Super tolles und sauberes Tattoostudio. Sehr nette und liebe Tätowierer. Ich bin zum zweiten Mal hier bei Zsofi und einfach überzeugt. Alle Wünsche werden erfüllt, man ist sehr gut aufgehoben.' },
    { author: 'Caren Wienkenhöver', lang: 'de', photo: null, text: 'Beim C2C einmal schnell rein für ein kleines Andenken. Es wurde super auf einen individuellen Wunsch eingegangen. Immer gerne wieder hier die Tattoos stechen lassen.' },
    { author: 'ImmerDerDeutsche', lang: 'de', photo: null, text: 'Usee Tattoo ist meine absolute Nummer 1 für Piercings und Tattoos. Ich liebe das Team dort total, und es hilft einem wirklich, egal wobei, und ist dabei super freundlich.' },
  ],
};
