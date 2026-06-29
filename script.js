// =====================================================
// Configuração geral
// =====================================================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// =====================================================
// Ano automático no rodapé
// =====================================================
document.getElementById("year").textContent = `© ${new Date().getFullYear()}`;

// =====================================================
// Efeito de "digitação" no bloco de código do hero
// ✏️ Edite o texto abaixo para refletir seus próprios dados
// =====================================================
const codeLines = [
  '  Nome: "Bruno Ryan Preté Vieira Mota",',

  '  Stack: ["JavaScript" & "Python"]',
];

const typedEl = document.getElementById("typed-code");

function typeCode() {
  if (!typedEl) return;

  const fullText = codeLines.join("\n");

  if (prefersReducedMotion) {
    typedEl.textContent = fullText;
    return;
  }

  let i = 0;
  const speed = 18; // ms por caractere

  function step() {
    if (i <= fullText.length) {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}
typeCode();

// =====================================================
// Menu mobile (abas)
// =====================================================
const tabBar = document.getElementById("tab-bar");
const menuToggle = document.getElementById("menu-toggle");
const tabs = document.querySelectorAll(".tab");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = tabBar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabBar.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// =====================================================
// Aba ativa + reveal das seções ao rolar a página
// =====================================================
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const matchingTab = document.querySelector(`.tab[data-tab="${id}"]`);

      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        if (matchingTab) {
          tabs.forEach((t) => t.classList.remove("is-active"));
          matchingTab.classList.add("is-active");
        }
      }
    });
  },
  {
    rootMargin: "-40% 0px -50% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));

// =====================================================
// Formulário de contato
// Front-end apenas: monta um e-mail (mailto) com os dados
// preenchidos para abrir no cliente de e-mail do visitante.
//
// ✏️ Para receber mensagens sem depender do mailto, conecte
// este formulário a um serviço como Formspree ou EmailJS —
// veja as instruções no README.md
// =====================================================
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const DEST_EMAIL = "brunoryannn.dev@gmail.com";

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Preencha todos os campos antes de enviar.";
      status.style.color = "#FF8A8A";
      return;
    }

    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\nNome: ${name}\nE-mail para retorno: ${email}`
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DEST_EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    status.textContent = "Abrindo seu cliente de e-mail com a mensagem pronta…";
    status.style.color = "";
    form.reset();
  });
}
