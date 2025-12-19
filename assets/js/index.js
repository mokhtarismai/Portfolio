var toggleBtn = document.getElementById("theme-toggle-button");

var htmlTag = document.documentElement;

var mobileMenuBtn = document.querySelector(".mobile-menu-btn");

var navLinks = document.querySelector(".nav-links");

var scrollBtn = document.getElementById("scroll-to-top");

var hiddenSection = document.getElementById("hero-section");

var sections = document.querySelectorAll("section[id]");

var navLink = document.querySelectorAll(".nav-link");

var filterButtons = document.querySelectorAll(".portfolio-filter");

var carousel = document.getElementById("testimonials-carousel");

var nextBtn = document.getElementById("next-testimonial");

var prevBtn = document.getElementById("prev-testimonial");

var cards = document.querySelectorAll(".testimonial-card");

var dots = document.querySelectorAll(".carousel-indicator");

var colorsGrid = document.getElementById("theme-colors-grid");

var savedTheme = localStorage.getItem("selected-theme");

var totalCards = cards.length;

var index = 0;

var resizeTimer;

var resetButton = document.getElementById("reset-settings");

var defaultFont = "tajawal";

var fontButtons = document.querySelectorAll(".font-option");

var body = document.body;

var savedFont = localStorage.getItem("siteFont");

toggleBtn.addEventListener("click", function () {
  htmlTag.classList.toggle("dark");

  if (htmlTag.classList.contains("dark")) {
    localStorage.setItem("themeMode", "dark");
  } else {
    localStorage.setItem("themeMode", "light");
  }
});

var savedMode = localStorage.getItem("themeMode");

function applySavedThemeMode() {
  var savedMode = localStorage.getItem("themeMode");
  if (savedMode === "dark") {
    htmlTag.classList.add("dark");
  } else {
    htmlTag.classList.remove("dark");
  }
}

applySavedThemeMode();

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

window.addEventListener("scroll", function () {
  var scrollY = window.scrollY;
  var sectionTop = hiddenSection.offsetTop;
  var sectionBottom = sectionTop + hiddenSection.offsetHeight;

  if (scrollY < sectionTop + 10 || scrollY <= sectionBottom) {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  } else {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  }
});

scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach((section) => {
    var sectionTop = section.offsetTop - 120;
    var sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLink.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

nextBtn.addEventListener("click", function () {
  var visibleCards = getVisibleCards();
  if (index < totalCards - visibleCards) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
});

prevBtn.addEventListener("click", function () {
  var visibleCards = getVisibleCards();
  if (index > 0) {
    index--;
  } else {
    index = totalCards - visibleCards;
  }
  updateCarousel();
});

var activeStyles = [
  "px-8",
  "py-3",
  "rounded-xl",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "font-bold",
  "transition-all",
  "duration-300",
  "hover:shadow-lg",
  "hover:shadow-primary/50",
];

var defaultStyles = [
  "px-8",
  "py-3",
  "rounded-xl",
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "font-bold",
  "transition-all",
  "duration-300",
  "hover:bg-slate-100",
  "dark:hover:bg-slate-700",
  "border",
  "border-slate-300",
  "dark:border-slate-700",
];

function filterPortfolio(filter) {
  var portfolioItems = document.querySelectorAll(".portfolio-item");

  for (var k = 0; k < portfolioItems.length; k++) {
    portfolioItems[k].classList.remove("opacity-100", "scale-100");
    portfolioItems[k].classList.add("opacity-0", "scale-95");
  }

  setTimeout(function () {
    for (var m = 0; m < portfolioItems.length; m++) {
      var item = portfolioItems[m];
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
        item.classList.remove("opacity-0", "scale-95");
        item.classList.add("opacity-100", "scale-100");
      } else {
        item.classList.add("hidden");
      }
    }
  }, 400);
}

for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function (e) {
    var clickedButton = e.currentTarget;
    var filter = clickedButton.dataset.filter;

    for (var j = 0; j < filterButtons.length; j++) {
      var btn = filterButtons[j];
      btn.className = "";

      if (btn === clickedButton) {
        btn.classList.add("active");
        for (var a = 0; a < activeStyles.length; a++) {
          btn.classList.add(activeStyles[a]);
        }
      } else {
        for (var d = 0; d < defaultStyles.length; d++) {
          btn.classList.add(defaultStyles[d]);
        }
      }
    }

    filterPortfolio(filter);
  });
}

window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    var visibleCards = getVisibleCards();
    if (index > totalCards - visibleCards)
      index = Math.max(0, totalCards - visibleCards);
    updateCarousel();
  }, 100);
});

function getVisibleCards() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function updateCarousel() {
  if (cards.length === 0) return;

  var cardWidth = cards[0].getBoundingClientRect().width;
  var style = window.getComputedStyle(carousel);
  var gap = parseFloat(style.gap) || 0;
  var totalStep = cardWidth + gap;

  if (document.dir === "rtl") {
    carousel.style.transform = `translateX(${index * totalStep}px)`;
  } else {
    carousel.style.transform = `translateX(${-index * totalStep}px)`;
  }

  updateActiveDot();
}

function updateActiveDot() {
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-accent");
    dots[i].classList.remove("bg-slate-400");
    dots[i].classList.remove("dark:bg-slate-600");

    dots[i].classList.add("bg-slate-400");
    dots[i].classList.add("dark:bg-slate-600");
    dots[i].setAttribute("aria-selected", "false");
  }

  if (dots[index]) {
    dots[index].classList.add("bg-accent");
    dots[index].classList.remove("bg-slate-400");
    dots[index].classList.remove("dark:bg-slate-600");
    dots[index].setAttribute("aria-selected", "true");
  }
}

for (var i = 0; i < dots.length; i++) {
  (function (dotIndex) {
    dots[dotIndex].addEventListener("click", function () {
      index = dotIndex;
      var visibleCards = getVisibleCards();
      if (index > totalCards - visibleCards) index = totalCards - visibleCards;
      updateCarousel();
    });
  })(i);
}

updateCarousel();

document.addEventListener("DOMContentLoaded", function () {
  var settingsToggle = document.getElementById("settings-toggle");
  var settingsSidebar = document.getElementById("settings-sidebar");
  var closeSettings = document.getElementById("close-settings");

  var openSidebar = function () {
    settingsSidebar.classList.remove("translate-x-full");
    settingsToggle.style.right = "320px";
  };

  var closeSidebar = function () {
    settingsSidebar.classList.add("translate-x-full");
    settingsToggle.style.right = "0";
  };

  settingsToggle.addEventListener("click", (e) => {
    var isOpen = !settingsSidebar.classList.contains("translate-x-full");
    if (isOpen) {
    } else {
      openSidebar();
    }
  });

  closeSettings.addEventListener("click", closeSidebar);

  document.addEventListener("click", (event) => {
    if (
      !settingsSidebar.contains(event.target) &&
      !settingsToggle.contains(event.target)
    ) {
      closeSidebar();
    }
  });
});

var colors = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

for (let i = 0; i < colors.length; i++) {
  let color = colors[i];
  let button = document.createElement("button");

  button.className =
    "group relative w-12 h-12 rounded-full cursor-pointer transition-all hover:scale-110 border-2 border-slate-200 dark:border-slate-700 shadow-sm";

  button.style.background =
    "linear-gradient(135deg, " + color.primary + ", " + color.secondary + ")";

  button.addEventListener("click", function () {
    document.documentElement.style.setProperty(
      "--color-primary",
      color.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      color.secondary
    );
    document.documentElement.style.setProperty("--color-accent", color.accent);

    localStorage.setItem("selected-theme", JSON.stringify(color));
  });

  colorsGrid.append(button);
}

if (savedTheme) {
  var theme = JSON.parse(savedTheme);

  document.documentElement.style.setProperty("--color-primary", theme.primary);
  document.documentElement.style.setProperty(
    "--color-secondary",
    theme.secondary
  );
  document.documentElement.style.setProperty("--color-accent", theme.accent);
}

if (savedFont) {
  body.classList.add(`font-${savedFont}`);

  for (let i = 0; i < fontButtons.length; i++) {
    if (fontButtons[i].dataset.font === savedFont) {
      fontButtons[i].classList.add("active");
    }
  }
}

for (let i = 0; i < fontButtons.length; i++) {
  fontButtons[i].addEventListener("click", function () {
    for (let j = 0; j < fontButtons.length; j++) {
      fontButtons[j].classList.remove("active");
    }
    this.classList.add("active");

    var font = this.dataset.font;

    var classes = Array.from(body.classList);

    for (let k = 0; k < classes.length; k++) {
      if (classes[k].startsWith("font-")) {
        body.classList.remove(classes[k]);
      }
    }

    body.classList.add(`font-${font}`);

    localStorage.setItem("siteFont", font);
  });
}

resetButton.addEventListener("click", function () {
  var classes = Array.from(body.classList);
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].startsWith("font-")) {
      body.classList.remove(classes[i]);
    }
  }
  body.classList.add(`font-${defaultFont}`);

  localStorage.removeItem("siteFont");

  fontButtons.forEach((btn) => btn.classList.remove("active"));

  applyTheme(defaultTheme);

  localStorage.removeItem("selected-theme");
});

function applyTheme(themeArray) {
  for (var i = 0; i < themeArray.length; i++) {
    var prop = themeArray[i][0];
    var value = themeArray[i][1];
    document.documentElement.style.setProperty(`--color-${prop}`, value);
  }
}

var defaultTheme = [
  ["primary", "#6366f1"],
  ["secondary", "#8b5cf6"],
  ["accent", "#a855f7"],
];

applyTheme(defaultTheme);
