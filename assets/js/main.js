document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 550,
      once: true,
      offset: 50,
    });
  }

  const swipers = document.querySelectorAll(".js-cases-swiper");
  swipers.forEach((container) => {
    // eslint-disable-next-line no-new
    new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: container.querySelector(".swiper-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: container.querySelector(".swiper-button-next"),
        prevEl: container.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });

  const maskPhone = (value) => {
    const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
    if (!digits.length) return "+7";
    const core = digits.startsWith("7") ? digits.slice(1) : digits;
    let result = "+7";
    if (core.length > 0) result += ` (${core.slice(0, 3)}`;
    if (core.length >= 3) result += ")";
    if (core.length > 3) result += ` ${core.slice(3, 6)}`;
    if (core.length > 6) result += `-${core.slice(6, 8)}`;
    if (core.length > 8) result += `-${core.slice(8, 10)}`;
    return result;
  };

  const telInputs = document.querySelectorAll('input[type="tel"]');
  telInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      if (!input.value) input.value = "+7";
    });
    input.addEventListener("input", () => {
      input.value = maskPhone(input.value);
    });
    input.addEventListener("blur", () => {
      if (input.value === "+7") input.value = "";
    });
  });

  const regularForms = document.querySelectorAll(".js-prevent-submit");
  regularForms.forEach((form) => {
    const successNode = form.querySelector(".js-success-message");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const requiredFields = form.querySelectorAll("[required]");
      let hasError = false;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) hasError = true;
      });

      if (hasError) {
        alert("Пожалуйста, заполните обязательные поля.");
        return;
      }

      if (successNode) {
        successNode.classList.remove("hidden");
      }
      form.reset();
    });
  });
});
