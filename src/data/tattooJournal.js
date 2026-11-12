// Tattoo Journal (ND-346c / ND-347b / ND-377 / ND-380).
// Text source: Inbox file "Usee-Tattoo_Journal-Nachsorge_3-Artikel_DE-EN_v2.3_2026-11-11"
// (SEO Content, based on v2.2 approved by niloo 28.10.2026 + her answers 9.11.2026).
// DO NOT edit the wording here; send changes back to SEO Content.
//
// Slugs differ per language (ND-377, niloo 11.11.2026), so every article carries
// slug.de and slug.en and the pages pass explicit alternates to Base.
//
// Body format: array of sections { h?, c: [ 'paragraph' | { ul: [] } | { ol: [] } ] }.
// Inline links inside a paragraph: [[a1|anchor text]] / [[a2|…]] / [[a3|…]] point at
// the other article in the same language.
//
// Links to /de/verheilte-tattoos/ and /en/healed-tattoos/ stay INACTIVE until that
// page is live (v2.3 "Technische Punkte"): flip HEALED_PAGE_LIVE then.
export const HEALED_PAGE_LIVE = false;

export const tattooJournal = [
  {
    id: 'a1',
    slug: { de: 'tattoo-nachsorge', en: 'tattoo-aftercare' },
    metaTitle: {
      de: 'Tattoo-Nachsorge Berlin: die ersten vier Wochen | Usee Tattoo',
      en: 'Tattoo Aftercare Berlin: The First Four Weeks | Usee Tattoo',
    },
    metaDesc: {
      de: 'In Woche zwei entstehen viele vermeidbare Schäden: Kratzen, Duschgel, zu viel Creme. Was in vier Wochen passiert, was normal ist und wann du dich meldest.',
      en: 'Much avoidable damage happens in week two: scratching, shower gel, too much cream. What happens over four weeks, what is normal and when to get in touch.',
    },
    label: { de: 'Nachsorge', en: 'Aftercare' },
    h1: {
      de: 'Tattoo-Nachsorge: was in den ersten vier Wochen wirklich passiert',
      en: 'Tattoo aftercare: what really happens in the first four weeks',
    },
    readTime: { de: '6 Min.', en: '6 min' },
    extraLinks: [
      { href: { de: '/de/styles/fine-line/', en: '/en/styles/fine-line/' }, text: { de: 'Fine Line Tattoo Berlin', en: 'Fine Line Tattoo Berlin' } },
    ],
    body: {
      de: [
        { c: [
          'Ein Tattoo ist am Tag des Termins nicht fertig. Es ist eine Wunde mit Farbe darin. Was in den nächsten vier Wochen mit dieser Wunde passiert, entscheidet mit darüber, wie die Linien in zehn Jahren aussehen.',
          'Schäden an frischen Tattoos entstehen oft in Woche zwei: durch Kratzen, durch Duschgel, durch zu viel Creme. Hier steht, was in jeder Phase passiert und was du in dieser Phase tust.',
        ] },
        { h: 'Tag 0 bis Tag 5: die Second-Skin bleibt drauf', c: [
          'Die Second-Skin bleibt bei uns drei bis fünf Tage drauf. Das ist unser Protokoll für den normalen Verlauf, keine Zahl von der Verpackung. Am Tresen sagen wir Pflaster dazu.',
          'Der Film ist atmungsaktiv und von außen wasserdicht. Unter ihm entsteht ein feuchtes Milieu. Das macht Schorfbildung unwahrscheinlicher, und was keinen Schorf bildet, kann auch nicht aufreißen.',
          'In diesen Tagen tust du nichts. Duschen ist erlaubt, langes Duschen nicht — bei langem Duschen kann sich der Rand lösen. Duschgel und Shampoo laufen nicht über den Film.',
          'Flüssigkeit unter dem Film ist normal. Das ist Wundwasser mit etwas Farbe darin.',
          'Früher runter muss die Second-Skin, wenn die Haut darunter rot wird oder juckt oder wenn der Film an einer Kante undicht wird. Dann sofort, nicht am nächsten Tag. Die Einzelheiten stehen in [[a2|Second-Skin auf dem frischen Tattoo]].',
        ] },
        { h: 'Das Abnehmen', c: [
          'Unter der Dusche, mit lauwarmem Wasser. Erst durchweichen lassen, dann langsam und parallel zur Haut abziehen. Nicht senkrecht nach oben, nicht in einem Ruck: Schnelles Abziehen kann die Haut in der Heilung verletzen. Wer sich das nicht zutraut, kommt damit ins Studio. Das dauert fünf Minuten.',
        ] },
        { h: 'Woche 1 bis Woche 2: nur Wasser, sehr wenig Creme', c: [
          'Ab dem Tag, an dem der Film runter ist, für zwei Wochen:',
          { ul: [
            'Nur Wasser auf dem Tattoo, kein Duschgel, kein Shampoo.',
            'Einmal täglich eine sehr dünne Schicht Tattoo-Pflegecreme aus der Apotheke oder einem Fachgeschäft. Dünn heißt: Die Haut glänzt danach nicht.',
            'Nicht kratzen. Es wird jucken, und das ist die Phase, in der viele Tattoos Schaden nehmen.',
          ] },
          'Was du in dieser Zeit siehst, ist nicht das Ergebnis. Warum, steht in [[a3|Wann du dein Tattoo beurteilen darfst]].',
        ] },
        { h: 'Woche 3 bis Woche 4: die Haut arbeitet weiter', c: [
          'Die Oberfläche ist geschlossen, darunter ist die Heilung nicht fertig. Jetzt gilt noch: kein Schwimmbad, kein See, keine Sauna, keine direkte Sonne auf dem Tattoo, und enge Kleidung reibt an Rippen, Fuß und Innenarm mehr als anderswo.',
          'Sonne gehört zu den größten Belastungen für ein verheiltes Tattoo, und ihre Wirkung summiert sich über die Jahre. Nach der Heilung gehört Lichtschutz auf das Tattoo, jeden Sommer.',
        ] },
        { h: 'Wenn du auf Pflaster reagierst, sag es vorher', c: [
          'Manche Haut reagiert auf den Klebstoff des Films. Wer schon weiß, dass er auf Pflaster oder Wundauflagen reagiert, sagt das vor dem Termin. Dann arbeiten wir von Anfang an anders.',
          'Ohne Film gilt in den ersten zwei bis drei Tagen nach dem Termin: nicht duschen, nur mit einem feuchten Tuch tupfen, danach eine dünne Schicht Tattoo-Pflegecreme. Einzelheiten in [[a2|Second-Skin auf dem frischen Tattoo]].',
        ] },
        { h: 'Nachkontrolle und Nachstechen: gehören dazu, ohne Zeitlimit', c: [
          'Haut hält Pigment unterschiedlich. Zwei Menschen, dieselbe Nadel, dieselbe Tiefe: Nach vier Wochen sieht es nicht gleich aus. Das ist Biologie, kein Fehler.',
          'Deshalb ist ein Tattoo erst nach der Abheilung fertig, nicht auf dem Stuhl. Nachkontrolle und, wenn eine Stelle es braucht, Nachstechen gehören bei jedem Tattoo aus unserem Studio dazu, ohne Aufpreis und ohne Zeitlimit. Nicht als Aktion, sondern als Standard, weil die Arbeit sonst nicht abgeschlossen ist.',
        ] },
        { h: 'Wann du dich meldest', c: [
          'Bei zunehmenden Schmerzen, sich ausbreitender Rötung, eitrigem Ausfluss oder Fieber solltest du die Beschwerden zeitnah ärztlich abklären lassen. Das ist keine Frage der Optik und keine Aufgabe, die ein Studio übernimmt.',
          'Bei Unsicherheit über die normale Heilung kannst du uns zusätzlich ein Foto schicken. Das kostet dich zwei Minuten, wir schauen es uns an.',
        ] },
      ],
      en: [
        { c: [
          'A tattoo is not finished on the day of the appointment. It is a wound with ink in it. What happens to that wound over the next four weeks helps decide how the lines look in ten years.',
          'Damage to fresh tattoos often happens in week two: scratching, shower gel, too much cream. This is what happens in each phase, and what you do in it.',
        ] },
        { h: 'Day 0 to day 5: the second skin stays on', c: [
          'With us, the second skin stays on for three to five days. That is our protocol for a normal healing, not a number from the packaging. At the counter we just call it the plaster.',
          'The film is breathable and waterproof from the outside. Underneath it, the skin stays moist. That makes scabbing less likely, and what does not scab cannot crack open.',
          'During these days you do nothing. Showering is fine, long showers are not — a long shower can loosen the edge. Shower gel and shampoo run off the film.',
          'Fluid under the film is normal. It is wound fluid with a little ink in it.',
          'The second skin comes off early if the skin underneath turns red or itches, or if the film starts leaking at an edge. Then straight away, not the next day. The details are in [[a2|Second skin on a fresh tattoo]].',
        ] },
        { h: 'Taking it off', c: [
          'In the shower, with lukewarm water. Let it soak through first, then peel slowly and parallel to the skin. Not straight up, not in one pull: peeling fast can injure healing skin. If you would rather not do it yourself, come to the studio. It takes five minutes.',
        ] },
        { h: 'Week 1 to week 2: water only, very little cream', c: [
          'From the day the film comes off, for two weeks:',
          { ul: [
            'Only water on the tattoo. No shower gel, no shampoo.',
            'Once a day, a very thin layer of tattoo aftercare cream from a pharmacy or a specialist shop. Thin means the skin does not shine afterwards.',
            'Do not scratch. It will itch, and this is the phase in which many tattoos get damaged.',
          ] },
          'What you see during this time is not the result. Why is explained in [[a3|When you can judge your tattoo]].',
        ] },
        { h: 'Week 3 to week 4: the skin is still working', c: [
          'The surface has closed. Underneath, healing is not finished. Still no pool, no lake, no sauna, no direct sun on the tattoo — and tight clothing rubs harder on ribs, feet and inner arms than anywhere else.',
          'Sun is one of the biggest strains on a healed tattoo, and its effect adds up over the years. Once healed, the tattoo gets sun protection, every summer.',
        ] },
        { h: 'If you react to plasters, tell us before', c: [
          'Some skin reacts to the adhesive of the film. If you already know you react to plasters or wound dressings, tell us before the appointment. Then we work differently from the start.',
          'Without the film, for the first two to three days after the appointment: no showering, only dab the tattoo with a damp cloth, then a thin layer of tattoo aftercare cream. Details in [[a2|Second skin on a fresh tattoo]].',
        ] },
        { h: 'Follow-up check and touch-up: part of the work, no time limit', c: [
          'Skin holds ink differently. Two people, the same needle, the same depth: after four weeks it does not look the same. That is biology, not a mistake.',
          'That is why a tattoo is finished after it has healed, not in the chair. A follow-up check and, if a spot needs it, a touch-up are part of every tattoo from our studio, at no extra cost and with no time limit. Not as a promotion, but as the standard, because otherwise the work is not complete.',
        ] },
        { h: 'When to get in touch', c: [
          'If pain increases, redness spreads, there is pus or you develop a fever, have it checked by a doctor promptly. That is not a question of looks, and not something a studio should handle.',
          'If you are unsure whether healing is normal, you can also send us a photo. It takes you two minutes, and we will look at it.',
        ] },
      ],
    },
    faq: {
      de: [
        ['Wie lange bleibt die Second-Skin auf dem Tattoo?', 'Bei uns drei bis fünf Tage im normalen Verlauf. Früher nur dann, wenn die Haut darunter rot wird oder juckt oder wenn der Film an einer Kante undicht wird.'],
        ['Darf ich mit der Second-Skin duschen?', 'Ja. Der Film ist von außen wasserdicht. Lange Duschen können den Rand lösen. Duschgel und Shampoo laufen nicht über den Film.'],
        ['Ist Flüssigkeit unter dem Film ein schlechtes Zeichen?', 'Nein. Das ist Wundwasser mit etwas Farbe darin und gehört zur Heilung.'],
        ['Wie oft creme ich mein Tattoo ein?', 'Einmal täglich, sehr dünn, ab dem Tag, an dem der Film runter ist, für zwei Wochen. Eine Tattoo-Pflegecreme aus der Apotheke oder einem Fachgeschäft reicht. Die Haut soll danach nicht glänzen.'],
        ['Ist Nachstechen bei Usee Tattoo inklusive?', 'Ja, bei jedem Tattoo, ohne Aufpreis und ohne Zeitlimit. Haut hält Pigment unterschiedlich, deshalb ist ein Tattoo erst nach der Abheilung fertig.'],
        ['Wann darf ich wieder ins Schwimmbad oder in die Sauna?', 'Frühestens nach vier Wochen. Die Oberfläche schließt sich früher, die Heilung darunter nicht.'],
      ],
      en: [
        ['How long does the second skin stay on a tattoo?', 'With us, three to five days in a normal healing. Earlier only if the skin underneath turns red or itches, or if the film starts leaking at an edge.'],
        ['Can I shower with the second skin on?', 'Yes. The film is waterproof from the outside. Long showers can loosen the edge. Shower gel and shampoo run off the film.'],
        ['Is fluid under the film a bad sign?', 'No. It is wound fluid with a little ink in it, and part of healing.'],
        ['How often do I put cream on my tattoo?', 'Once a day, very thin, from the day the film comes off, for two weeks. A tattoo aftercare cream from a pharmacy or specialist shop is enough. The skin should not shine afterwards.'],
        ['Is a touch-up included at Usee Tattoo?', 'Yes, for every tattoo, at no extra cost and with no time limit. Skin holds ink differently, so a tattoo is finished once it has healed.'],
        ['When can I go swimming or to the sauna again?', 'After four weeks at the earliest. The surface closes sooner; the healing underneath does not.'],
      ],
    },
  },
  {
    id: 'a2',
    slug: { de: 'second-skin-tattoo', en: 'second-skin-tattoo' },
    metaTitle: {
      de: 'Second-Skin nach dem Tattoo: was sie macht | Usee Tattoo Berlin',
      en: 'Second Skin After a Tattoo: What It Does | Usee Tattoo Berlin',
    },
    metaDesc: {
      de: 'Wundwasser unter der Folie ist normal. Rötung an den Rändern nicht. Was die Second-Skin leistet, wie sie abgeht und wann sie früher runter muss.',
      en: 'Fluid under the film is normal. Redness at the edges is not. What the second skin does, how it comes off and when it has to come off early.',
    },
    label: { de: 'Second-Skin', en: 'Second skin' },
    h1: {
      de: 'Second-Skin auf dem frischen Tattoo: was sie macht und was nicht',
      en: "Second skin on a fresh tattoo: what it does and what it doesn't",
    },
    readTime: { de: '5 Min.', en: '5 min' },
    extraLinks: [],
    body: {
      de: [
        { c: [
          'Wenn du das Studio verlässt, klebt ein durchsichtiger Film auf deinem Tattoo. Am Tresen nennen wir ihn Pflaster, im Handel heißt er Second-Skin. Er kommt bei uns auf jedes Tattoo — außer deine Haut reagiert auf den Klebstoff.',
          'Die meisten Fragen der ersten Woche drehen sich um diesen Film: Darf ich damit duschen? Warum ist da Flüssigkeit drunter? Wann kommt er ab? Hier stehen die Antworten, in der Reihenfolge, in der sie auftauchen.',
        ] },
        { h: 'Was die Second-Skin ist', c: [
          'Ein dünner, elastischer Wundfilm aus der Wundversorgung, später in die Tattoo-Arbeit übernommen. Was er in der Regel leistet:',
          { ul: [
            'Er ist atmungsaktiv: Sauerstoff kommt an die Haut, überschüssige Feuchtigkeit geht nach außen.',
            'Er ist von außen wasserdicht: Duschwasser kommt nicht rein.',
            'Er schützt vor Reibung: Kleidung scheuert nicht direkt auf dem frischen Tattoo.',
            'Er hält ein feuchtes Milieu: Das macht Schorfbildung unwahrscheinlicher.',
          ] },
          'Der wichtigste Punkt ist der letzte. Ein Schorf ist eine Kruste, die reißen kann, und jeder Riss kann Farbe mitnehmen. Unter der Second-Skin bildet sich seltener einer. Einzelheiten hängen vom verwendeten Produkt ab.',
        ] },
        { h: 'Was die Second-Skin nicht tut', c: [
          'Sie heilt nicht schneller, als deine Haut heilen kann. Sie ersetzt keine Nachsorge. Und sie funktioniert nur, solange sie dicht ist: Ein Film mit gelöster Kante schützt nicht mehr, er hält nur noch Feuchtigkeit fest, wo sie nicht hingehört.',
        ] },
        { h: 'Drei bis fünf Tage, und warum wir das so machen', c: [
          'Bei uns bleibt die Second-Skin im normalen Verlauf drei bis fünf Tage drauf. Das ist unser Protokoll. Die Spanne hat einen Grund: Stelle und Größe entscheiden. Ein Unterarm liegt ruhig, ein Fuß nicht. Große, schattierte Flächen — besonders mit viel Schwarz — geben mehr Wundwasser ab als eine feine Linie und kommen früher an die Grenze des Films.',
        ] },
        { h: 'Flüssigkeit darunter ist normal', c: [
          'Unter dem Film sammelt sich eine trübe Flüssigkeit, oft in der Farbe des Tattoos. Das ist Wundwasser mit Pigmentresten. Es sieht nach einem Problem aus und ist keines. Ein Problem ist es erst, wenn der Film die Menge nicht mehr hält und an einer Kante austritt. Dann kommt er ab. Nicht nachkleben und nicht mit einem zweiten Pflaster abdichten.',
        ] },
        { h: 'Wann die Second-Skin früher runter muss', c: [
          'Drei Situationen, in allen dreien nimmst du sie sofort ab, nicht am nächsten Tag:',
          { ol: [
            'Rötung oder Juckreiz unter dem Film, meist zuerst an den Rändern. Das kann eine Reaktion auf den Klebstoff sein.',
            'Der Film löst sich an einer Kante oder wird undicht.',
            'Der Schmerz nimmt zu statt ab, die Haut rötet sich stärker oder es kommt Fieber dazu. Dann lass es zeitnah ärztlich abklären.',
          ] },
          'Punkt 1 betrifft nicht viele Menschen. Wer aber schon weiß, dass er auf Pflaster oder Wundauflagen reagiert, hat ein höheres Risiko. Diese Information gehört vor den Termin. Sag es am Tresen, dann arbeiten wir von Anfang an anders.',
        ] },
        { h: 'Ohne Second-Skin: so pflegst du in den ersten Tagen', c: [
          'Wenn du auf den Klebstoff reagierst — Juckreiz, Rötung — nimmst du den Film ab. Dann gilt: In den ersten zwei bis drei Tagen nach dem Termin nicht duschen. Das Tattoo nur mit einem feuchten Tuch reinigen, nicht wischen, sondern tupfen. Danach eine dünne Schicht Tattoo-Pflegecreme.',
        ] },
        { h: 'So nimmst du sie ab', c: [
          'Hier entsteht der meiste vermeidbare Schaden der ganzen Heilung, und er entsteht in zehn Sekunden.',
          { ol: [
            'Unter der Dusche, lauwarmes Wasser.',
            'Den Film erst durchweichen lassen. Nicht am trockenen Film ziehen.',
            'Langsam und parallel zur Hautoberfläche abziehen, nicht senkrecht nach oben.',
            'Danach die Haut nur mit Wasser abspülen, nicht rubbeln.',
          ] },
          'Ein Ruck kann die Haut in der Heilung verletzen. Bei Schmerz, zunehmender Rötung oder Juckreiz beim Abnehmen: aufhören, einweichen lassen und melden. Wer unsicher ist, kommt damit ins Studio.',
        ] },
        { h: 'Und danach', c: [
          'Die weitere Pflege steht in [[a1|Tattoo-Nachsorge: die ersten vier Wochen]]. Kurz: zwei Wochen nur Wasser auf dem Tattoo und einmal täglich eine sehr dünne Schicht Pflegecreme.',
        ] },
      ],
      en: [
        { c: [
          'When you leave the studio, a clear film is stuck over your tattoo. At the counter we call it the plaster; in the shops it is sold as second skin. It goes on every tattoo we do — unless your skin reacts to the adhesive.',
          'Most questions in the first week are about this film: Can I shower with it? Why is there fluid under it? When does it come off? Here are the answers, in the order they come up.',
        ] },
        { h: 'What the second skin is', c: [
          'A thin, elastic wound film from medical wound care, later adopted for tattoo work. What it usually does:',
          { ul: [
            'It is breathable: oxygen reaches the skin, excess moisture escapes.',
            'It is waterproof from the outside: shower water stays out.',
            'It protects against friction: clothing does not rub directly on the fresh tattoo.',
            'It keeps the skin moist: that makes scabbing less likely.',
          ] },
          'The last point matters most. A scab is a crust that can crack, and every crack can take ink with it. Under the second skin, scabs form less often. Details depend on the product used.',
        ] },
        { h: "What the second skin doesn't do", c: [
          'It does not heal faster than your skin can heal. It does not replace aftercare. And it only works while it is sealed: a film with a loose edge no longer protects, it just traps moisture where it does not belong.',
        ] },
        { h: 'Three to five days, and why we do it this way', c: [
          'With us, the second skin stays on for three to five days in a normal healing. That is our protocol. The range has a reason: placement and size decide. A forearm stays still, a foot does not. Large, shaded areas — especially with a lot of black — release more wound fluid than a fine line and reach the limit of the film sooner.',
        ] },
        { h: 'Fluid underneath is normal', c: [
          'A cloudy fluid collects under the film, often in the colour of the tattoo. It is wound fluid with traces of ink. It looks like a problem and is not one. It becomes a problem only when the film can no longer hold it and it leaks at an edge. Then the film comes off. Do not re-stick it and do not seal it with a second plaster.',
        ] },
        { h: 'When the second skin has to come off early', c: [
          'Three situations. In all three, you take it off straight away, not the next day:',
          { ol: [
            'Redness or itching under the film, usually first at the edges. This can be a reaction to the adhesive.',
            'The film lifts at an edge or starts leaking.',
            'Pain increases instead of easing, redness gets stronger, or you develop a fever. Then have it checked by a doctor promptly.',
          ] },
          'Point 1 does not affect many people. But if you already know you react to plasters or wound dressings, your risk is higher. That information belongs before the appointment. Tell us at the counter, and we work differently from the start.',
        ] },
        { h: 'Without the second skin: how to care for the first days', c: [
          'If you react to the adhesive — itching, redness — take the film off. Then: no showering for the first two to three days after the appointment. Clean the tattoo only with a damp cloth — dab, do not wipe. Then a thin layer of tattoo aftercare cream.',
        ] },
        { h: 'How to take it off', c: [
          'This is where most of the avoidable damage of the entire healing happens, and it happens in ten seconds.',
          { ol: [
            'In the shower, lukewarm water.',
            'Let the film soak through first. Never pull at a dry film.',
            'Peel slowly and parallel to the skin, not straight up.',
            'Afterwards rinse the skin with water only. Do not rub.',
          ] },
          'One sharp pull can injure healing skin. If there is pain, increasing redness or itching while you peel: stop, let it soak and get in touch. If you are unsure, come to the studio.',
        ] },
        { h: 'And after that', c: [
          'Further care is in [[a1|Tattoo aftercare: the first four weeks]]. In short: two weeks of only water on the tattoo, and once a day a very thin layer of aftercare cream.',
        ] },
      ],
    },
    faq: {
      de: [
        ['Was ist eine Second-Skin beim Tattoo?', 'Ein dünner, elastischer Wundfilm aus der Wundversorgung. Er ist atmungsaktiv, von außen wasserdicht und hält ein feuchtes Milieu, das Schorfbildung unwahrscheinlicher macht. Bei uns kommt er auf jedes Tattoo, es sei denn, die Haut reagiert auf den Klebstoff.'],
        ['Warum ist Flüssigkeit unter der Second-Skin?', 'Das ist Wundwasser mit Pigmentresten. Es gehört zur Heilung. Erst wenn der Film die Menge nicht mehr hält und an einer Kante austritt, kommt er ab.'],
        ['Kann ich die Second-Skin nachkleben, wenn sie sich löst?', 'Nein. Ein undichter Film schützt nicht mehr. Dann wird er abgenommen und die normale Pflege beginnt früher.'],
        ['Wie nehme ich die Second-Skin ab, ohne die Haut zu verletzen?', 'Unter der Dusche mit lauwarmem Wasser, erst durchweichen lassen, dann langsam und parallel zur Haut abziehen. Nicht senkrecht und nicht in einem Ruck.'],
        ['Was mache ich bei Juckreiz oder Rötung unter dem Film?', 'Abnehmen, sofort. Das kann eine Reaktion auf den Klebstoff sein. Wer schon weiß, dass er auf Pflaster reagiert, sagt das vor dem Termin.'],
        ['Was mache ich, wenn ich auf die Second-Skin reagiere?', 'Den Film abnehmen. In den ersten zwei bis drei Tagen nach dem Termin nicht duschen. Das Tattoo nur mit einem feuchten Tuch reinigen, nicht wischen, sondern tupfen. Danach eine dünne Schicht Tattoo-Pflegecreme.'],
      ],
      en: [
        ['What is a second skin on a tattoo?', 'A thin, elastic wound film from medical wound care. It is breathable, waterproof from the outside and keeps the skin moist, which makes scabbing less likely. It goes on every tattoo we do, unless the skin reacts to the adhesive.'],
        ['Why is there fluid under the second skin?', 'It is wound fluid with traces of ink, and part of healing. Only when the film can no longer hold it and it leaks at an edge does the film come off.'],
        ['Can I re-stick the second skin if it lifts?', 'No. A leaking film no longer protects. It comes off, and normal aftercare starts earlier.'],
        ['How do I take off the second skin without hurting the skin?', 'In the shower with lukewarm water. Let it soak through, then peel slowly and parallel to the skin. Not straight up and not in one pull.'],
        ['What do I do about itching or redness under the film?', 'Take it off, straight away. This can be a reaction to the adhesive. If you already know you react to plasters, tell us before the appointment.'],
        ['What do I do if I react to the second skin?', 'Take the film off. No showering for the first two to three days after the appointment. Clean the tattoo only with a damp cloth — dab, do not wipe. Then a thin layer of tattoo aftercare cream.'],
      ],
    },
  },
  {
    id: 'a3',
    slug: { de: 'tattoo-beurteilen', en: 'judging-your-tattoo' },
    metaTitle: {
      de: 'Wann du dein Tattoo beurteilen darfst | Usee Tattoo Berlin',
      en: 'When You Can Judge Your Tattoo | Usee Tattoo Berlin',
    },
    metaDesc: {
      de: 'In Woche zwei sieht ein Tattoo häufig schlechter aus als am Tag danach. Der verlässliche Zeitpunkt für ein Urteil ist Woche vier bis sechs. Warum das so ist.',
      en: 'In week two a tattoo often looks worse than the day after. The reliable moment to judge it is week four to six. Here is why.',
    },
    label: { de: 'Heilung', en: 'Healing' },
    h1: {
      de: 'Wann du dein Tattoo beurteilen darfst — und wann nicht',
      en: "When you can judge your tattoo — and when you can't",
    },
    readTime: { de: '5 Min.', en: '5 min' },
    extraLinks: [
      { href: { de: '/de/erstes-tattoo/', en: '/en/erstes-tattoo/' }, text: { de: 'Erstes Tattoo', en: 'First tattoo' } },
    ],
    healedLink: { de: 'Verheilte Tattoos ansehen', en: 'See healed tattoos' },
    healedHref: { de: '/de/verheilte-tattoos/', en: '/en/healed-tattoos/' },
    body: {
      de: [
        { c: [
          'Am Tag nach dem Termin sieht ein Tattoo oft am besten aus. In Woche zwei sieht es häufig am schlechtesten aus. Beides ist nicht das Ergebnis.',
          'Viele Nachrichten, die uns mit „ist da etwas schiefgelaufen“ erreichen, kommen zwischen Tag acht und Tag vierzehn. Meist ist die Antwort dieselbe: Es ist Woche zwei. Deshalb steht hier, was in welcher Woche typisch zu sehen ist, damit du weißt, ob du gerade ein Problem siehst oder eine Phase.',
        ] },
        { h: 'Tag 1 bis Tag 5: das gute Bild', c: [
          'Unter der Second-Skin wirken die Linien meist scharf, das Schwarz tief, die Kontraste hoch. Die Haut ist noch angeschwollen und feucht, und beides lässt Farbe satter erscheinen, als sie abgeheilt sein wird. Das ist Optik, kein Maßstab.',
        ] },
        { h: 'Tag 6 bis Tag 14: die Phase, in der es oft am schlechtesten aussieht', c: [
          'Die Haut über dem Tattoo erneuert sich. Sie schuppt, sie ist trocken, sie wirkt stumpf. Über den Linien liegt häufig eine milchige Schicht, die alles unscharf macht. Im Englischen heißt sie „milk skin“.',
          'Typisch in dieser Woche:',
          { ul: [
            'Farben wirken blass und leicht grau',
            'Konturen wirken weich statt scharf',
            'einzelne Stellen sehen aus, als fehlte Pigment',
            'es juckt',
          ] },
          'Nichts davon ist ein Urteil. Die milchige Schicht ist neue Haut, und sie ist noch nicht durchsichtig.',
          'Gerade jetzt entscheiden kleine Fehler über das Ergebnis: Kratzen, Hautschuppen abziehen oder zu viel Creme können die Heilung beeinträchtigen.',
        ] },
        { h: 'Woche 3 bis Woche 4: es kommt zurück', c: [
          'Die Schuppung endet, die milchige Schicht wird klar, die Kontraste kommen zurück. Nicht auf das Niveau von Tag eins, sondern auf das Niveau, das bleibt. Jetzt siehst du zum ersten Mal etwas, das dem Endergebnis ähnelt.',
        ] },
        { h: 'Woche 4 bis Woche 6: der verlässliche Zeitpunkt', c: [
          'Hier wird beurteilt, nicht früher. Was jetzt zu sehen ist, ist das Tattoo: die Sättigung des Schwarz, die Sauberkeit der Linien, die Übergänge im Grau. Hat eine Stelle Pigment verloren, ist das an dieser Stelle sichtbar und nicht mehr über die ganze Fläche verteilt. Dafür gibt es die Nachkontrolle.',
        ] },
        { h: 'Warum die Nachkontrolle zur Arbeit gehört', c: [
          'Haut hält Pigment unterschiedlich. Zwei Menschen, dieselbe Nadel, dieselbe Tiefe, dieselbe Farbe: Nach fünf Wochen sieht es nicht gleich aus. Der Ellenbogen hält anders als der Unterarm, die Rippe anders als die Schulter.',
          'Deshalb ist ein Tattoo erst nach der Abheilung fertig, nicht auf dem Stuhl. Nachkontrolle und, wenn eine Stelle es braucht, Nachstechen gehören bei jedem Tattoo aus unserem Studio dazu, ohne Aufpreis und ohne Zeitlimit. Nicht als Aktion, sondern als Standard.',
        ] },
        { h: 'Was du uns schicken kannst, und wann', c: [
          'Wenn du unsicher bist, schick uns ein Foto. Damit wir etwas erkennen: Tageslicht, kein Blitz, keine Deckenlampe direkt darüber, ein Bild von der ganzen Fläche und eins von der Stelle, die dich stört.',
          'Und wenn der Schmerz nach Tag drei zunimmt, die Schwellung wächst, Ausfluss mit Geruch auftritt oder Fieber dazukommt, ist das keine Frage der Optik. Dann lass es zeitnah ärztlich abklären.',
        ] },
      ],
      en: [
        { c: [
          'The day after the appointment, a tattoo often looks its best. In week two, it often looks its worst. Neither is the result.',
          'Many messages that reach us asking "did something go wrong?" arrive between day eight and day fourteen. The answer is usually the same: it is week two. So here is what is typical in each week, so you know whether you are looking at a problem or a phase.',
        ] },
        { h: 'Day 1 to day 5: the good picture', c: [
          'Under the second skin, lines usually look sharp, black looks deep, contrast looks high. The skin is still swollen and moist, and both make the ink look richer than it will be once healed. That is optics, not a standard.',
        ] },
        { h: 'Day 6 to day 14: the phase when it often looks worst', c: [
          'The skin over the tattoo is renewing itself. It flakes, it is dry, it looks dull. A milky layer often sits over the lines and blurs everything. It is called "milk skin".',
          'Typical this week:',
          { ul: [
            'colours look pale and slightly grey',
            'outlines look soft instead of sharp',
            'some spots look as if ink is missing',
            'it itches',
          ] },
          'None of this is a verdict. The milky layer is new skin, and it is not transparent yet.',
          'This is exactly when small mistakes decide the result: scratching, peeling off flakes or too much cream can disturb the healing.',
        ] },
        { h: 'Week 3 to week 4: it comes back', c: [
          'The flaking ends, the milky layer clears, the contrast returns. Not to the level of day one, but to the level that stays. For the first time you see something close to the final result.',
        ] },
        { h: 'Week 4 to week 6: the reliable moment', c: [
          'This is when you judge it, not earlier. What you see now is the tattoo: the saturation of the black, the cleanness of the lines, the transitions in the grey. If a spot has lost ink, it shows in that spot and is no longer spread across the whole area. That is what the follow-up check is for.',
        ] },
        { h: 'Why the follow-up check is part of the work', c: [
          'Skin holds ink differently. Two people, the same needle, the same depth, the same ink: after five weeks it does not look the same. The elbow holds differently from the forearm, the ribs differently from the shoulder.',
          'That is why a tattoo is finished after it has healed, not in the chair. A follow-up check and, if a spot needs it, a touch-up are part of every tattoo from our studio, at no extra cost and with no time limit. Not as a promotion, but as the standard.',
        ] },
        { h: 'What you can send us, and when', c: [
          'If you are unsure, send us a photo. So we can actually see something: daylight, no flash, no ceiling light directly above, one picture of the whole area and one of the spot that bothers you.',
          'And if the pain increases after day three, the swelling grows, there is discharge with a smell or you develop a fever, it is not a question of looks. Then have it checked by a doctor promptly.',
        ] },
      ],
    },
    faq: {
      de: [
        ['Wann ist ein Tattoo vollständig abgeheilt?', 'Die Oberfläche schließt sich nach etwa zwei Wochen, die Heilung darunter braucht vier bis sechs. Beurteilt wird ab Woche vier.'],
        ['Warum sieht mein Tattoo in Woche zwei blass aus?', 'Über den Linien liegt häufig eine Schicht neuer, noch nicht durchsichtiger Haut. Sie macht Farben blass und Konturen weich und klärt sich meist in Woche drei bis vier.'],
        ['Mein Tattoo schuppt. Ist das normal?', 'Ja. Die Haut über dem Tattoo erneuert sich. Schuppen werden nicht abgezogen, sie fallen von selbst ab.'],
        ['Es sieht aus, als fehlt an einer Stelle Farbe. Was jetzt?', 'Vor Woche vier ist das kein verlässliches Urteil. Ab Woche vier schaust du dir die Stelle an und meldest dich für die Nachkontrolle.'],
        ['Kostet das Nachstechen extra?', 'Nein. Nachkontrolle und Nachstechen gehören bei jedem Tattoo zur Arbeit, ohne Aufpreis und ohne Zeitlimit, weil ein Tattoo erst nach der Abheilung fertig ist.'],
      ],
      en: [
        ['When is a tattoo fully healed?', 'The surface closes after about two weeks; the healing underneath takes four to six. Judge it from week four.'],
        ['Why does my tattoo look pale in week two?', 'A layer of new, not yet transparent skin often sits over the lines. It makes colours pale and outlines soft, and usually clears in week three to four.'],
        ['My tattoo is flaking. Is that normal?', 'Yes. The skin over the tattoo is renewing itself. Do not peel the flakes; they fall off on their own.'],
        ['It looks like ink is missing in one spot. What now?', 'Before week four, that is not a reliable judgement. From week four, look at the spot and get in touch for the follow-up check.'],
        ['Does a touch-up cost extra?', 'No. A follow-up check and a touch-up are part of every tattoo, at no extra cost and with no time limit, because a tattoo is finished once it has healed.'],
      ],
    },
  },
];

export const tattooJournalById = Object.fromEntries(tattooJournal.map((a) => [a.id, a]));
export const tattooArticlePath = (a, lang) => `/${lang}/journal/${a.slug[lang]}/`;
