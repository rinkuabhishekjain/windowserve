/**
 * WindowServe site configuration.
 *
 * Edit the values below to update business info site-wide and to connect
 * your GoHighLevel (GHL) embeds. Anything left as an empty string ("")
 * renders a friendly fallback so the site still looks complete before
 * your GHL assets are wired up.
 *
 * Where to find your GHL IDs:
 *   Form ID      -> GHL > Sites > Forms > (open form) > Integrate > the ID in the embed URL
 *                   e.g. .../widget/form/THIS_PART
 *   Calendar ID  -> GHL > Calendars > (open calendar) > ... the ID in the booking link
 *                   e.g. .../widget/booking/THIS_PART
 *   Chat Widget  -> GHL > Sites > Chat Widget > copy the widget id + resource url
 */
window.WINDOWSERVE = {
  business: {
    name: "WindowServe",
    tagline: "Custom Blinds, Shades, Shutters & Drapery",
    phoneVanity: "515-WINDOWS",
    phoneDigits: "5159463697", // used for tel: and sms: links
    phonePretty: "(515) 946-3697",
    email: "info@windowserve.com",
    city: "Des Moines",
    region: "Iowa",
    regionCode: "IA",
    hours: "Mon–Sat: 8am–7pm  ·  Sun: By appointment",
    social: {
      facebook: "https://www.facebook.com/windowserve/",
      instagram: "https://www.instagram.com/windowserve/",
      linkedin: "https://www.linkedin.com/company/windowserve"
    }
  },

  // ---- Team section (About page) ----
  // Set show:false to hide the entire "Meet the Team" section site-wide.
  // Add, remove, or edit members below. Each photo lives in assets/images/.
  team: {
    show: false,
    heading: "Meet the Team",
    eyebrow: "The People Behind WindowServe",
    intro: "Friendly local experts who handle everything from your first design consultation to a flawless final install.",
    // Homepage teaser (links to about.html#team). Hidden automatically when show:false.
    teaserHeading: "Meet the people behind your windows",
    teaserText: "From your first design consultation to a flawless final install, you'll work with the same friendly, local WindowServe team — never a call center.",
    members: [
      {
        name: "Sarah Mitchell",
        role: "Design & Sales Consultant",
        photo: "assets/images/team-consultant.jpg",
        bio: "A licensed real estate agent with over a decade in home design and staging, Sarah helps homeowners choose treatments that fit their light, lifestyle, and budget — right in their living room."
      },
      {
        name: "Mike Reynolds",
        role: "Lead Installer",
        photo: "assets/images/team-installer.jpg",
        bio: "With 15+ years of precision install experience, Mike measures to the fraction of an inch and treats every home like his own — clean, level, and done right the first time."
      }
    ]
  },

  // ---- GoHighLevel embeds (paste your IDs/URLs here) ----
  ghl: {
    // Lead/quote form embed id
    formId: "KElhEliAt1sqJzsuHoCk",
    formHeight: "640",

    // Booking calendar embed id (free in-home consultation)
    calendarId: "CAh3OfHyXS7A75abEHVV",
    calendarHeight: "720",

    // Chat / SMS webchat widget
    chatWidgetId: "6a358ba13d8db71ca21f4996",
    // Usually "https://widgets.leadconnectorhq.com/loader.js"
    chatResourceUrl: "https://widgets.leadconnectorhq.com/loader.js"
  }
};
