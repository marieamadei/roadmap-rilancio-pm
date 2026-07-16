document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("#primary-nav");

function setHeaderState() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60%", threshold: [0.01, 0.25, 0.5] },
);

navSections.forEach((section) => navObserver.observe(section));

const creativeConcepts = {
  alice: {
    label: "Concept 1 · Continuità",
    title: "PM 10 Alice",
    text: "Una comunicazione calda e speranzosa, focalizzata sulla costruzione del futuro e sulla tutela dell’infanzia.",
    points: ["Penna o shopper", "Impatto di lungo periodo", "Valori di sviluppo umano"],
    image: "assets/concept-alice.webp",
    alt: "Anteprima del concept creativo Alice",
  },
  lia: {
    label: "Concept 2 · Nuova creatività",
    title: "PM 10 Lia",
    text: "Il donatore entra nel mondo di ZeroSei attraverso storie reali e immagini calde: vissuti dolorosi che possono avere un finale diverso grazie a lui.",
    points: ["Penna o shopper", "Il donatore è protagonista", "Storia recente e vicinanza emotiva"],
    image: "assets/concept-lia.webp",
    alt: "Anteprima del concept creativo Lia",
  },
  unboxing: {
    label: "Concept 3 · High-Engagement",
    title: "PM 10 Unboxing",
    text: "Un pack premium che trasforma l’apertura della busta in un percorso di scoperta, con un appello urgente e la storia di Lia.",
    points: ["Penna + foto + flyer + biglietti", "Finiture premium", "Narrazione basata sull’impatto futuro"],
    image: "assets/unboxing-elements.webp",
    alt: "Elementi inclusi nel concept Unboxing",
  },
};

const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const tabs = [...gallery.querySelectorAll("[data-tab]")];
  const label = gallery.querySelector("[data-gallery-label]");
  const title = gallery.querySelector("[data-gallery-title]");
  const text = gallery.querySelector("[data-gallery-text]");
  const points = gallery.querySelector("[data-gallery-points]");
  const image = gallery.querySelector("[data-gallery-image]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const concept = creativeConcepts[tab.dataset.tab];
      if (!concept) return;

      tabs.forEach((otherTab) => {
        const active = otherTab === tab;
        otherTab.classList.toggle("active", active);
        otherTab.setAttribute("aria-selected", String(active));
      });

      image.classList.add("changing");

      window.setTimeout(() => {
        label.textContent = concept.label;
        title.textContent = concept.title;
        text.textContent = concept.text;
        points.replaceChildren(
          ...concept.points.map((point) => {
            const item = document.createElement("li");
            item.textContent = point;
            return item;
          }),
        );
        image.src = concept.image;
        image.alt = concept.alt;
        image.classList.remove("changing");
      }, 160);
    });
  });
}

const decisionList = document.querySelector("[data-decision-list]");
const progressLabel = document.querySelector("[data-progress-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const storageKey = "roadmap-pm-approvals";

if (decisionList) {
  const checkboxes = [...decisionList.querySelectorAll('input[type="checkbox"]')];

  function readSavedDecisions() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  }

  function saveDecisions(values) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // The checklist still works when storage is disabled.
    }
  }

  function updateProgress() {
    const checked = checkboxes.filter((checkbox) => checkbox.checked);
    const percent = (checked.length / checkboxes.length) * 100;

    progressLabel.textContent = `${checked.length} / ${checkboxes.length}`;
    progressBar.style.width = `${percent}%`;
    saveDecisions(checked.map((checkbox) => checkbox.value));
  }

  const savedDecisions = readSavedDecisions();
  checkboxes.forEach((checkbox) => {
    checkbox.checked = savedDecisions.includes(checkbox.value);
    checkbox.addEventListener("change", updateProgress);
  });

  updateProgress();
}
