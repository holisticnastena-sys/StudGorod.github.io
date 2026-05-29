function openFaq(id){


  // скрываем все категории FAQ

  document
    .querySelectorAll(".faq-block")
    .forEach(block=>{

      block.classList.remove("active");

    });



  // закрываем все раскрытые вопросы

  document
    .querySelectorAll("details")
    .forEach(item=>{

      item.removeAttribute("open");

    });



  // открываем выбранную категорию

  document
    .getElementById(id)
    .classList.add("active");



  // плавный переход

  document
    .getElementById(id)
    .scrollIntoView({

      behavior:"smooth"

    });


}