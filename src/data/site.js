export const site = {
  name: 'Usee Tattoo',
  gtm: 'GTM-TFXZ2D2F',
  domain: 'https://useetattoo.com',
  heroImage: '/images/AboutUsee/UseeTattoo.webp',
  booking: {
    consultation: 'https://book.useetattoo.com/Consultation',
    online: 'https://book.useetattoo.com/online-consultation',
    coverup: 'https://book.useetattoo.com/cover-up',
    walkin: 'https://book.useetattoo.com/walk-in-tattoo',
    piercing: 'https://book.useetattoo.com/piercing',
    // SINGLE Fresha entry point for the Booking Hub "Book via the app" button.
    // Exact URL is still being confirmed by the team, edit only this one value.
    fresha: 'https://book.useetattoo.com/',
  },
  // Live-review claim, kept in one place so it is easy to update.
  reviews: { count: '600+', de: '5★ Google Bewertungen', en: '5★ Google reviews' },
  // All bookable services (mirrors the old site's 6 booking buttons).
  bookingServices: [
    { de: 'Persönliche Beratung', en: 'Personal consultation', service: 'consultation', url: 'https://book.useetattoo.com/Consultation' },
    { de: 'Online-Beratung', en: 'Online consultation', service: 'online-consultation', url: 'https://book.useetattoo.com/online-consultation' },
    { de: 'Walk-In (selber Tag)', en: 'Same-day walk-in', service: 'walk-in', url: 'https://book.useetattoo.com/walk-in-tattoo' },
    { de: 'Piercing', en: 'Piercing', service: 'piercing', url: 'https://book.useetattoo.com/piercing' },
    { de: 'Cover-Up', en: 'Cover-up', service: 'cover-up', url: 'https://book.useetattoo.com/cover-up' },
    { de: 'Sleeve Tattoo', en: 'Sleeve tattoo', service: 'sleeve', url: 'https://book.useetattoo.com/Consultation' },
  ],
  phone: { display: '+49 30 27979327', href: 'tel:+493027979327' },
  mobile: { display: '+49 176 47615189', href: 'tel:+4917647615189' },
  whatsapp: 'https://wa.me/4917647615189',
  email: { primary: 'hello@useetattoo.de', secondary: 'info@useetattoo.com' },
  address: { street: 'Neue Kantstraße 6', zip: '14057', city: 'Berlin', district: 'Charlottenburg' },
  mapQuery: 'Neue+Kantstra%C3%9Fe+6,+14057+Berlin',
  social: {
    instagram: 'https://www.instagram.com/usee.tattoo',
    instagramHandle: '@usee.tattoo',
    facebook: 'https://www.facebook.com/useetattooo/',
    pinterest: 'https://www.pinterest.co.uk/usmejdar/',
    tiktok: 'https://www.tiktok.com/@useetattoofamily',
  },
};
