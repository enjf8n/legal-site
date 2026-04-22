document.addEventListener("DOMContentLoaded", () => {
  const quiz = document.querySelector(".js-quiz");
  if (!quiz) return;

  const steps = [...quiz.querySelectorAll(".js-quiz-step")];
  const nextBtns = quiz.querySelectorAll(".js-quiz-next");
  const prevBtns = quiz.querySelectorAll(".js-quiz-prev");
  const form = quiz.querySelector(".js-quiz-form");
  const output = quiz.querySelector(".js-quiz-result");

  let activeStep = 0;

  const renderStep = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("hidden", index !== activeStep);
    });
  };

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = steps[activeStep].querySelector("[data-required-step]");
      if (field && !field.value.trim()) {
        alert("Выберите вариант, чтобы продолжить.");
        return;
      }
      activeStep = Math.min(activeStep + 1, steps.length - 1);
      renderStep();
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeStep = Math.max(activeStep - 1, 0);
      renderStep();
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const debt = quiz.querySelector('[name="debtAmount"]')?.value || "";
    const mortgage = quiz.querySelector('[name="hasMortgage"]')?.value || "";
    const phone = quiz.querySelector('[name="phone"]')?.value || "";

    const isPhoneValid = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone);
    if (!isPhoneValid) {
      alert("Введите телефон в формате +7 (999) 123-45-67");
      return;
    }

    const quizResult = {
      debtAmount: debt,
      hasMortgage: mortgage,
      phone,
      submittedAt: new Date().toISOString(),
    };

    console.log("Quiz submit:", quizResult);
    if (output) {
      output.textContent = "Спасибо! Мы свяжемся с вами в течение 10 минут.";
      output.classList.remove("hidden");
    }
    form.reset();
    activeStep = 0;
    renderStep();
  });

  renderStep();
});
