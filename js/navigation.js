const navButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");

function resetFaq() {
  document.querySelectorAll(".faq-block").forEach(block => {
    block.classList.remove("active");
  });
}

function showPage(pageId, addHistory = true) {

  if (pageId !== "faq") {
    resetFaq();
  }

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document
    .getElementById(pageId)
    .classList.add("active");

  document
    .querySelectorAll(".nav-link")
    .forEach(link => {
      link.classList.remove("active");
    });

  document
    .querySelectorAll(`[data-page="${pageId}"]`)
    .forEach(link => {
      if (link.classList.contains("nav-link")) {
        link.classList.add("active");
      }
    });

  if (addHistory) {
    history.pushState(
      { page: pageId },
      "",
      "#" + pageId
    );
  }

  nav.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("popstate", function () {
  const page = location.hash.replace("#", "") || "home";
  showPage(page, false);
});

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;
    showPage(pageId);
  });
});

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  const page = location.hash.replace("#", "") || "home";

  if (document.getElementById(page)) {
    showPage(page, false);
  }
});