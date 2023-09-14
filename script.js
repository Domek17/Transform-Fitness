"use strict";

//////////////////////////////////////////////////
// Selecting elements
//////////////////////////////////////////////////
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const heroEl = document.querySelector("#hero");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const allLinks = document.querySelectorAll("a:link");
// const allLinks = document.querySelectorAll("a[href^='#']");

//////////////////////////////////////////////////
// Smooth Scrolling
//////////////////////////////////////////////////
allLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Scroll to other in-page links
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  })
);

//////////////////////////////////////////////////
// Sticky navigation
//////////////////////////////////////////////////
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.querySelector("body").classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.querySelector("body").classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-76px",
  }
);
obs.observe(heroEl);

//////////////////////////////////////////////////
// Mobile Navigation
//////////////////////////////////////////////////
btnNavEl.addEventListener("click", function (e) {
  headerEl.classList.toggle("nav-open");
});

//////////////////////////////////////////////////
// Reveal sections
//////////////////////////////////////////////////
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};
const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  section.classList.add("section-hidden");
  sectionsObserver.observe(section);
});

//////////////////////////////////////////////////
// Lazy loading images
//////////////////////////////////////////////////
const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));
