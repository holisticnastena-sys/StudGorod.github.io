const chatbotBtn = document.getElementById("chatbotBtn");
const chatbotWindow = document.getElementById("chatbotWindow");
const closeChat = document.getElementById("closeChat");

chatbotBtn.addEventListener("click", () => {
  chatbotWindow.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
  chatbotWindow.classList.remove("active");
});
