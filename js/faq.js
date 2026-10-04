const faqMobile = window.matchMedia("(max-width: 820px)");

function isFaqMobile() {
  return faqMobile.matches;
}

function closeFaqQuestions() {
  document.querySelectorAll("#faq details").forEach(item => {
    item.removeAttribute("open");
  });
}

function resetFaqBlocks() {
  document.querySelectorAll(".faq-block").forEach(block => {
    block.classList.remove("active");
  });

  document.querySelectorAll(".faq-side-link").forEach(link => {
    link.classList.remove("active");
  });

  closeFaqQuestions();
}

function openFaq(id, button, scroll = true) {
  resetFaqBlocks();

  const block = document.getElementById(id);

  if (block) {
    block.classList.add("active");
  }

  if (button) {
    button.classList.add("active");
  }

  if (isFaqMobile() && scroll && block) {
    block.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function prepareFaqPage() {
  resetFaqBlocks();

  const firstButton = document.querySelector(".faq-side-link");

  if (!isFaqMobile()) {
    openFaq("moving", firstButton, false);
  } else {
    openFaq("moving", firstButton, false);
  }
}

function renderFaq(categories) {
  const faqContent = document.getElementById("faqContent");

  if (!faqContent) return;

  faqContent.innerHTML = categories.map(category => `
    <div class="faq-block" id="${category.id}">
      <h2>${category.title}</h2>

      ${category.questions.map(item => `
        <details>
          <summary>${item.question}</summary>
          <div class="faq-answer">${item.answer}</div>
        </details>
      `).join("")}
    </div>
  `).join("");

  document.querySelectorAll("#faq details").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        const parentBlock = detail.closest(".faq-block");

        parentBlock.querySelectorAll("details").forEach(other => {
          if (other !== detail) {
            other.removeAttribute("open");
          }
        });
      }
    });
  });

  prepareFaqPage();
}

async function loadFaq() {
  try {
    const response = await fetch("data/faq.json");

    if (!response.ok) {
      throw new Error("Не удалось загрузить FAQ");
    }

    const categories = await response.json();
    renderFaq(categories);
  } catch (error) {
    const faqContent = document.getElementById("faqContent");

    if (faqContent) {
      faqContent.innerHTML = `
        <p>Не удалось загрузить вопросы. Проверьте файл data/faq.json.</p>
      `;
    }

    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFaq();
});