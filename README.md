# WindowServe — Website (v2)

A fast, professional, conversion-focused static website for **WindowServe**, a Des Moines
window treatment business. No build step, no framework — just HTML, CSS, and a little
vanilla JavaScript. It is designed to plug directly into your **GoHighLevel (GHL)** account
for lead capture, online booking, and call/text webchat.

The brand's most valuable marketing asset — the phone number **515-WINDOWS `(515) 946-3697`** —
is featured prominently across every page, with click-to-call and click-to-text links everywhere.

---

## 1. Quick start

This is a plain static site. To preview it locally, run any static server from the project root:

```bash
# Python 3 (on Windows use: py -m http.server 8099)
python -m http.server 8099
```

Then open <http://localhost:8099>.

To go live, upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, Hostinger, etc.) or point your existing `windowserve.com` hosting at these files.

---

## 2. File structure

```
windowserve-v2/
├─ index.html          Home page (hero, services, process, gallery, reviews, areas, quote)
├─ products.html       Full product catalog (blinds, shades, shutters, drapery)
├─ about.html          About / "why us" page (story, samples, values)
├─ faq.html            FAQ + financing page (with FAQ schema for SEO)
├─ service-areas.html  Local-SEO landing page (metro town cards, map, Service schema)
├─ contact.html        Contact info + GHL quote form + GHL booking calendar + map
├─ thank-you.html      Post-submit confirmation page (conversion tracking target)
├─ robots.txt
├─ sitemap.xml
└─ assets/
   ├─ css/styles.css   All styling (navy + gold brand design system)
   ├─ js/config.js     >>> EDIT THIS <<< business info + GoHighLevel IDs
   ├─ js/main.js       Shared header/footer, mobile menu, embeds, animations
   ├─ brand/           logo.svg, logo_icon.svg, favicon.png
   └─ images/          Photos (swap for your own — see below)
```

The header, footer, and sticky mobile action bar are injected by `assets/js/main.js`, so you
only maintain them in one place.

---

## 3. Editing content

- **Business info (phone, email, hours, social, service city):** edit `assets/js/config.js`.
  This updates the header, footer, and mobile bar everywhere automatically.
- **Page copy (headlines, product descriptions, reviews):** edit the relevant `.html` file directly.
- **Service-area towns:** edit the cards in `service-areas.html` (and the matching `area-chip`
  links in `index.html` and the `areaServed` JSON-LD blocks in both files).
- **Map:** the Google Map on `contact.html` and `service-areas.html` is a keyless embed centered
  on Des Moines. To center it on your exact address instead, change the iframe `src` query
  (`...maps?q=YOUR+ADDRESS&z=12&output=embed`). No API key required.
- **Reviews:** the three review cards in `index.html` are placeholders. Replace with real
  customer quotes, or embed a live GHL/Google reviews widget in that section.

---

## 4. Swapping in your own photos

All imagery lives in `assets/images/`. To use your own professional photos, simply replace
the files **keeping the same filenames** and the site picks them up with no other changes:

| File                     | Used for                                  | Suggested size            |
|--------------------------|-------------------------------------------|---------------------------|
| `hero.jpg`               | Home hero background                       | 1920×998, landscape       |
| `service-blinds.jpg`     | Blinds card / catalog                      | 1200×900, 4:3             |
| `service-shades.jpg`     | Shades card / catalog                      | 1200×900, 4:3             |
| `service-shutters.jpg`   | Shutters card / catalog                    | 1200×900, 4:3             |
| `service-drapery.jpg`    | Drapery card / catalog                     | 1200×900, 4:3             |
| `about.jpg`              | About page story section                   | 1200×900, 4:3             |
| `samples.jpg`            | About + FAQ "samples / financing" feature  | 1200×800                  |
| `brand-banner.jpg`       | About + FAQ page-hero background (branded)  | 1600×1067, landscape      |
| `gallery-1.jpg` … `-6.jpg` | Recent-work gallery                      | gallery-1 is the large feature tile |

Image sources:
- **`hero.jpg`** is your own staged room photo, pulled from the current `windowserve.com` site
  (cropped and optimized). Keep using your real photography here — it's your best asset.
- **All other photos** (`service-*`, `about`, `samples`, `brand-banner`, and `gallery-*`) are
  custom images generated specifically for WindowServe in a consistent, premium navy + gold,
  warm-neutral aesthetic. There are no third-party stock photos on the site.
- When you have photos of your **actual installs**, drop them in over the matching filenames —
  real project photos build even more trust and tend to convert best.

---

## 5. Connecting GoHighLevel (GHL)

All GHL wiring happens in **`assets/js/config.js`** under the `ghl` block. Until you add IDs,
each embed shows a friendly fallback with call/text buttons, so the site is always complete.

### a) Lead / quote form

1. In GHL: **Sites → Forms**, build (or open) your quote form.
2. Open it and click **Integrate / Share**. Copy the form **ID** from the embed URL
   (`https://api.leadconnectorhq.com/widget/form/THIS_PART`).
3. Paste it into `config.js` → `ghl.formId`.
4. In the form's settings, set the **on-submit redirect** to `thank-you.html` so submissions
   land on the confirmation page (great for tracking conversions).

The form renders inside the "Request a Free Quote" sections on `index.html` and `contact.html`.

### b) Booking calendar (free in-home consultation)

1. In GHL: **Calendars**, create a "Free In-Home Consultation" calendar.
2. Copy the calendar **ID** from its booking widget link
   (`https://api.leadconnectorhq.com/widget/booking/THIS_PART`).
3. Paste it into `config.js` → `ghl.calendarId`.

The calendar renders in the "Schedule Your Free In-Home Consultation" section on `contact.html`.

### c) Call / text webchat widget (recommended — your number is call *or* text)

1. In GHL: **Sites → Chat Widget**, configure and publish your widget.
2. Copy the **widget ID** (and the loader/resource URL if different from the default).
3. Paste into `config.js` → `ghl.chatWidgetId` (and `ghl.chatResourceUrl` if needed).

Once set, the chat bubble loads site-wide on every page. Because your number is call-or-text,
incoming webchats can route straight into GHL conversations / SMS.

---

## 6. Recommended GHL automations (high-impact, easy wins)

Set these up in GHL to convert more of the leads this site sends you:

- **Instant auto-reply text:** when a form is submitted, fire an SMS within seconds:
  *"Thanks for reaching out to WindowServe! This is 515-WINDOWS — when's a good time for a
  free in-home consultation?"* Speed-to-lead is the #1 driver of close rate.
- **Missed-call text-back:** if someone calls 515-WINDOWS and you miss it, auto-text them so
  the lead never goes cold.
- **New-lead pipeline + stages:** push every web lead into a "Window Treatments" pipeline
  (New Quote Request → Consultation Booked → Quoted → Won) so nothing slips.
- **Appointment reminders:** automated SMS/email reminders for booked consultations to cut no-shows.
- **Review request:** after a job is marked complete, auto-request a Google review (then feed
  those reviews back into the Reviews section of this site).
- **Use a GHL tracking number** for the website so you can attribute calls to the site and
  measure ROI. Keep "515-WINDOWS" as the public-facing vanity number and forward it.

---

## 7. Conversion features already built in

- Persistent **515-WINDOWS** click-to-call / click-to-text in the header, hero, every CTA band, and footer.
- **Sticky mobile action bar** (Text · Call · Free Quote) always visible on phones.
- Clear single primary action per section ("Get a Free Quote").
- Trust signals: free in-home consultation, no hidden fees, premium materials, local ownership, review cards.
- Fast load: optimized stock images, lazy loading, system + Google fonts, no heavy frameworks.
- **Local SEO:** `LocalBusiness` (HomeAndConstructionBusiness) JSON-LD schema, descriptive
  titles/meta, Open Graph tags, `sitemap.xml`, and `robots.txt`.
- `thank-you.html` is ready to be a conversion event target — drop your GA4 / Meta Pixel / GHL
  tracking snippet into the marked spot near the bottom of that file.

---

## 8. Before launch checklist

- [ ] Add your GHL `formId`, `calendarId`, and `chatWidgetId` in `assets/js/config.js`.
- [ ] Set the GHL form redirect to `thank-you.html`.
- [ ] Replace stock photos in `assets/images/` with real install photos when available.
- [ ] Replace placeholder reviews with real customer testimonials.
- [ ] Confirm the canonical/OG URLs match your live domain.
- [ ] Add analytics (GA4 / Meta Pixel) and a conversion event on `thank-you.html`.
- [ ] Submit `sitemap.xml` in Google Search Console.
