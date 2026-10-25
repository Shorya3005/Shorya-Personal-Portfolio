const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const chatbotForm = document.getElementById("chatbot-form");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const setActiveLink = () => {
  const fromTop = window.scrollY + 90;
  let currentId = "home";

  sections.forEach((section) => {
    if (fromTop >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      return;
    }

    formStatus.textContent =
      "Thanks. This form is a placeholder and does not send messages yet.";
    contactForm.reset();
  });
}

if (chatbotForm) {
  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
const projectSearch = document.getElementById("project-search");
const projectCards = document.querySelectorAll(".project-card");
const noProjects = document.getElementById("no-projects");

if (projectSearch) {
  projectSearch.addEventListener("input", () => {
    const searchText = projectSearch.value.toLowerCase().trim();
    let visibleProjects = 0;

    projectCards.forEach((card) => {
      const projectText = card.textContent.toLowerCase();
      const matches = projectText.includes(searchText);

      card.style.display = matches ? "" : "flex";

      if (matches) {
        visibleProjects++;
      }
    });

    if (noProjects) {
      noProjects.hidden = visibleProjects !== 0;
    }
  });
}


const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
}

const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

if (chatbotForm && chatbotInput && chatbotMessages) {
  chatbotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatbotInput.value.trim();

    if (!message) {
      return;
    }

    chatbotMessages.innerHTML += `
      <p class="user-bubble">${message}</p>
    `;

    chatbotInput.value = "";

    const loadingMessage = document.createElement("p");
    loadingMessage.className = "bot-bubble";
    loadingMessage.textContent = "Thinking...";
    chatbotMessages.appendChild(loadingMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      loadingMessage.textContent =
        data.reply || data.error || "Sorry, I could not answer that.";
    } catch (error) {
      loadingMessage.textContent =
        "Sorry, I could not connect to the chatbot.";
    }

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  });
}