/* =========================================================
   WindowServe — shared behavior + header/footer injection
   ========================================================= */
(function () {
  "use strict";

  var CFG = window.WINDOWSERVE || {};
  var B = CFG.business || {};
  var G = CFG.ghl || {};

  var TEL = "tel:" + (B.phoneDigits || "");
  var SMS = "sms:" + (B.phoneDigits || "");
  var MAILTO = "mailto:" + (B.email || "");

  /* ---------- tiny SVG icon set ---------- */
  var icon = {
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    chat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    shield: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    home: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
    ruler: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7 17 21l4-4L7 3z"/><path d="M7.5 7.5 9 9M11 4l1.5 1.5M11 11l1.5 1.5M4 11l1.5 1.5M14.5 14.5 16 16"/></svg>',
    tag: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
    fb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    ig: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    li: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>'
  };

  function tel(label, cls) {
    return '<a class="' + (cls || "") + '" href="' + TEL + '">' + label + "</a>";
  }

  /* ---------- Header ---------- */
  function buildHeader(active) {
    var nav =
      navLink("index.html", "Home", active === "home") +
      navLink("products.html", "Products", active === "products") +
      navLink("about.html", "About", active === "about") +
      navLink("faq.html", "FAQ", active === "faq") +
      navLink("contact.html", "Contact", active === "contact");

    return (
      '<div class="topbar"><div class="topbar__inner">' +
        '<div class="topbar__left">' +
          '<span>' + icon.pin + ' Serving the ' + (B.city || "") + " metro</span>" +
          '<span class="sep hide-sm">|</span>' +
          '<span class="hide-sm">' + (B.hours || "") + "</span>" +
        "</div>" +
        '<div class="topbar__socials">' +
          '<span class="hide-sm">Call or text ' + tel(B.phoneVanity) + "</span>" +
          social() +
        "</div>" +
      "</div></div>" +
      '<header class="site-header" id="hdr">' +
        '<div class="container header__inner">' +
          '<a class="brand" href="index.html" aria-label="' + (B.name || "WindowServe") + ' home">' +
            '<img class="brand__icon" src="assets/brand/logo_icon.svg" alt="" width="42" height="42">' +
            '<img class="brand__wordmark" src="assets/brand/logo.svg" alt="' + (B.name || "WindowServe") + '">' +
          "</a>" +
          '<nav class="nav" aria-label="Primary">' + nav + "</nav>" +
          '<div class="header__cta">' +
            '<a class="header__phone" href="' + TEL + '">' +
              '<span class="vanity">' + (B.phoneVanity || "") + "</span>" +
              '<span class="label">Call or Text</span>' +
            "</a>" +
            '<a class="btn btn--gold" href="contact.html">Free Quote</a>' +
            '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
          "</div>" +
        "</div>" +
      "</header>"
    );
  }

  function navLink(href, label, isActive) {
    return '<a href="' + href + '"' + (isActive ? ' aria-current="page"' : "") + ">" + label + "</a>";
  }

  function social() {
    var s = B.social || {};
    return (
      '<a href="' + (s.facebook || "#") + '" aria-label="Facebook" target="_blank" rel="noopener">' + icon.fb + "</a>" +
      '<a href="' + (s.instagram || "#") + '" aria-label="Instagram" target="_blank" rel="noopener">' + icon.ig + "</a>" +
      '<a href="' + (s.linkedin || "#") + '" aria-label="LinkedIn" target="_blank" rel="noopener">' + icon.li + "</a>"
    );
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var s = B.social || {};
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
        '<div class="container footer__grid footer">' +
          '<div class="footer__brand">' +
            '<img src="assets/brand/logo_icon.svg" alt="' + (B.name || "WindowServe") + '">' +
            "<p>" + (B.name || "") + " brings premium custom window treatments and expert in-home installation to the " + (B.city || "") + " metro.</p>" +
            '<a class="footer__phone" href="' + TEL + '">' + (B.phoneVanity || "") + "</a>" +
            '<div class="footer__socials">' +
              '<a href="' + (s.facebook || "#") + '" aria-label="Facebook" target="_blank" rel="noopener">' + icon.fb + "</a>" +
              '<a href="' + (s.instagram || "#") + '" aria-label="Instagram" target="_blank" rel="noopener">' + icon.ig + "</a>" +
              '<a href="' + (s.linkedin || "#") + '" aria-label="LinkedIn" target="_blank" rel="noopener">' + icon.li + "</a>" +
            "</div>" +
          "</div>" +
          "<div><h4>Products</h4><ul>" +
            '<li><a href="products.html#blinds">Blinds</a></li>' +
            '<li><a href="products.html#shades">Shades</a></li>' +
            '<li><a href="products.html#shutters">Shutters</a></li>' +
            '<li><a href="products.html#drapery">Drapery &amp; Hardware</a></li>' +
          "</ul></div>" +
          "<div><h4>Company</h4><ul>" +
            '<li><a href="about.html">About Us</a></li>' +
            (CFG.team && CFG.team.show ? '<li><a href="about.html#team">Meet the Team</a></li>' : "") +
            '<li><a href="faq.html">FAQ &amp; Financing</a></li>' +
            '<li><a href="service-areas.html">Service Areas</a></li>' +
            '<li><a href="contact.html">Book a Consultation</a></li>' +
          "</ul></div>" +
          "<div><h4>Contact</h4><ul>" +
            "<li>" + icon.phone + " " + tel(B.phonePretty) + "</li>" +
            '<li>' + icon.mail + ' <a href="' + MAILTO + '">' + (B.email || "") + "</a></li>" +
            "<li>" + icon.pin + " " + (B.city || "") + ", " + (B.regionCode || "") + "</li>" +
            "<li>" + icon.clock + " " + (B.hours || "") + "</li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="container"><div class="footer__bottom">' +
          "<span>&copy; " + year + " " + (B.name || "") + ". All rights reserved.</span>" +
          '<span class="footer__legal">' +
            '<a href="privacy-policy.html">Privacy Policy</a>' +
            '<span class="footer__legal-sep">·</span>' +
            '<a href="terms-of-conditions.html">Terms &amp; Conditions</a>' +
          "</span>" +
          "<span>Call or text " + tel(B.phoneVanity) + " &nbsp;·&nbsp; " + (B.city || "") + ", " + (B.region || "") + "</span>" +
        "</div></div>" +
      "</footer>"
    );
  }

  /* ---------- Mobile sticky action bar ---------- */
  function buildMobileBar() {
    return (
      '<nav class="mobile-bar" aria-label="Quick actions">' +
        '<a href="' + SMS + '">' + icon.chat + "Text Us</a>" +
        '<a class="is-primary" href="' + TEL + '">' + icon.phone + "Call Now</a>" +
        '<a href="contact.html">' + icon.tag + "Free Quote</a>" +
      "</nav>"
    );
  }

  /* ---------- GHL embeds ---------- */
  function renderGHLEmbeds() {
    var nodes = document.querySelectorAll("[data-ghl]");
    if (!nodes.length) return;
    var needScript = false;

    nodes.forEach(function (el) {
      var type = el.getAttribute("data-ghl");
      if (type === "form" && G.formId) {
        el.innerHTML =
          '<iframe src="https://api.leadconnectorhq.com/widget/form/' + G.formId +
          '" style="width:100%;height:' + (G.formHeight || 640) + 'px;border:none;border-radius:18px" ' +
          'title="Request a free quote" id="ghl-form-' + G.formId + '"></iframe>';
        needScript = true;
      } else if (type === "calendar" && G.calendarId) {
        el.innerHTML =
          '<iframe src="https://api.leadconnectorhq.com/widget/booking/' + G.calendarId +
          '" style="width:100%;height:' + (G.calendarHeight || 720) + 'px;border:none;border-radius:18px" ' +
          'scrolling="no" title="Book a free in-home consultation" id="ghl-cal-' + G.calendarId + '"></iframe>';
        needScript = true;
      }
      // else: leave the HTML fallback that is already inside the element
    });

    if (needScript && !document.getElementById("ghl-embed-js")) {
      var sc = document.createElement("script");
      sc.id = "ghl-embed-js";
      sc.src = "https://link.msgsndr.com/js/form_embed.js";
      sc.async = true;
      document.body.appendChild(sc);
    }
  }

  /* ---------- GHL chat / SMS webchat widget ---------- */
  function loadGHLChat() {
    if (!G.chatWidgetId || !G.chatResourceUrl) return;
    var sc = document.createElement("script");
    sc.src = G.chatResourceUrl;
    sc.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
    sc.setAttribute("data-widget-id", G.chatWidgetId);
    sc.async = true;
    document.body.appendChild(sc);
    liftChatAboveMobileBar();
  }

  /* The GHL chat bubble is fixed at bottom-right and collides with the sticky
     mobile action bar. It lives in a shadow DOM, so we inject a style into the
     widget's shadow root to lift the launcher + panel above the bar on phones. */
  function liftChatAboveMobileBar() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var host = document.querySelector("chat-widget");
      if (host && host.shadowRoot) {
        if (!host.shadowRoot.getElementById("ws-chat-offset")) {
          var st = document.createElement("style");
          st.id = "ws-chat-offset";
          st.textContent =
            "@media (max-width:860px){" +
            "#lc_text-widget,#lc_text-widget--btn{bottom:84px !important;}" +
            "}";
          host.shadowRoot.appendChild(st);
        }
        clearInterval(iv);
      } else if (tries > 40) {
        clearInterval(iv);
      }
    }, 500);
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNav() {
    var hdr = document.getElementById("hdr");
    var btn = document.getElementById("hamburger");
    if (!hdr || !btn) return;
    btn.addEventListener("click", function () {
      var open = hdr.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    hdr.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        hdr.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Team section (config-driven, toggleable) ---------- */
  function renderTeam() {
    var mount = document.querySelector("[data-team]");
    if (!mount) return;
    var T = CFG.team || {};
    var members = T.members || [];
    if (!T.show || !members.length) { mount.remove(); return; }

    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    var cards = members.map(function (m) {
      return (
        '<article class="team-card reveal">' +
          '<div class="team-card__photo">' +
            (m.photo ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name) + ' — ' + esc(m.role) + '" loading="lazy">' : "") +
          "</div>" +
          '<div class="team-card__body">' +
            '<h3>' + esc(m.name) + "</h3>" +
            '<div class="team-card__role">' + esc(m.role) + "</div>" +
            (m.bio ? "<p>" + esc(m.bio) + "</p>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");

    mount.innerHTML =
      '<div class="container">' +
        '<div class="section-head reveal">' +
          (T.eyebrow ? '<span class="eyebrow">' + esc(T.eyebrow) + "</span>" : "") +
          "<h2>" + esc(T.heading || "Meet the Team") + "</h2>" +
          (T.intro ? '<p class="section-head__intro">' + esc(T.intro) + "</p>" : "") +
        "</div>" +
        '<div class="team-grid">' + cards + "</div>" +
      "</div>";
  }

  /* ---------- Team teaser (homepage, config-driven) ---------- */
  function renderTeamTeaser() {
    var mount = document.querySelector("[data-team-teaser]");
    if (!mount) return;
    var T = CFG.team || {};
    var members = T.members || [];
    if (!T.show || !members.length) { mount.remove(); return; }

    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    var avatars = members.slice(0, 4).map(function (m) {
      return m.photo
        ? '<img class="team-teaser__avatar" src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy">'
        : "";
    }).join("");

    mount.innerHTML =
      '<div class="container">' +
        '<div class="team-teaser reveal">' +
          '<div class="team-teaser__avatars">' + avatars + "</div>" +
          '<div class="team-teaser__text">' +
            '<span class="eyebrow" style="justify-content:center;">' + esc(T.eyebrow || "Our Team") + "</span>" +
            "<h2>" + esc(T.teaserHeading || "Meet the team") + "</h2>" +
            (T.teaserText ? '<p class="lead">' + esc(T.teaserText) + "</p>" : "") +
            '<div class="mt-3"><a class="btn btn--gold btn--lg" href="about.html#team">Meet the Team</a></div>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  /* ---------- Hero crossfade slideshow (desktop only) ---------- */
  function initHeroSlides() {
    var box = document.querySelector("[data-hero-slides]");
    if (!box) return;
    var slides = box.querySelectorAll(".hero__slide");
    if (slides.length < 2) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var INTERVAL = 6000;
    var idx = 0;
    var timer = null;

    function show(n) {
      slides[idx].classList.remove("is-active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
    }
    function next() { show(idx + 1); }
    function start() {
      if (timer || reduce) return;
      timer = setInterval(function () {
        if (!document.hidden) next();
      }, INTERVAL);
    }

    if (reduce) { show(0); return; }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { if (timer) { clearInterval(timer); timer = null; } }
      else start();
    });

    start();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Boot ---------- */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var active = document.body.getAttribute("data-page") || "";
    inject("site-header", buildHeader(active));
    inject("site-footer", buildFooter());

    // mobile bar appended to body once
    if (!document.querySelector(".mobile-bar")) {
      var holder = document.createElement("div");
      holder.innerHTML = buildMobileBar();
      document.body.appendChild(holder.firstChild);
    }

    initNav();
    renderTeam();
    renderTeamTeaser();
    initHeroSlides();
    initReveal();
    renderGHLEmbeds();
    loadGHLChat();
  });
})();
