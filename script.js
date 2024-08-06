const inputPassword = document.querySelector(
  "div:not(div.hidden)>form>label>.input-password"
);
const buttonDialogClose = document.querySelector(".btn-dialog");
const buttonModalClose = document.querySelector(".btn-modal");

const submitButton = document.querySelector(".btn-submit");
const restoreButton = document.querySelector(".btn-restore");
const registButton = document.querySelector(".btn-regist");
const dialogElement = document.querySelectorAll(".dialog");

const authBlock = document.querySelector(".authorization-block");
const restoreBlock = document.querySelector(".restore-password-block");
const registBlock = document.querySelector(".registration-block");
const restoreLink = document.querySelector("#restore-link");
const registLink = document.querySelectorAll("#registration-link");
const regexpMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexpName = /[а-яё\s]/i;

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const loginModalRejectedParagraph = document.querySelector(
    "#reject-login-modal p"
  );
  const loginDialogSuccessParagraph = document.querySelector(
    "#success-login-dialog p"
  );
  const inputPassword = document.querySelector(
    "div:not(div.hidden)>form>label>.input-password"
  );
  const inputLogin = document.querySelector(
    "div:not(div.hidden)>form>label>.input-login"
  );

  if (!regexpMail.test(inputLogin.value)) {
    window["incorrect-email"].showModal();
    setTimeout(() => {
      window["incorrect-email"].close();
    }, 2500);
    return;
  }

  if (inputLogin.value === "123@gmail.com") {
    /* Например, если нет такого пользователя */

    loginModalRejectedParagraph.insertAdjacentHTML(
      "afterbegin",
      `<p class="temp" style="font-weight: 600;">${inputLogin.value}?</p>`
    );

    document.body.classList.add("scroll-lock");
    window["reject-login-modal"].showModal();
    inputLogin.value = "";
    inputPassword.value = "";
    return;
  }
  if (inputPassword.value <= 0) {
    window["empty-pass"].showModal();
    setTimeout(() => {
      window["empty-pass"].close();
    }, 2500);
    return;
  }

  loginDialogSuccessParagraph.insertAdjacentHTML(
    "afterbegin",
    `<p class="temp">Добро пожаловать, <b>${inputLogin.value}</b>!</p>`
  );

  window["success-login-dialog"].show();
  inputLogin.value = "";
  inputPassword.value = "";
  setTimeout(() => {
    const tempUserName = document.querySelector(".temp");
    window["success-login-dialog"].close();
    setTimeout(() => {
      tempUserName.remove();
    }, 100);
  }, 2500);
});

restoreButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputLogin = document.querySelector(
    "div:not(div.hidden)>form>label>.input-login"
  );
  const loginModalRejectedParagraph = document.querySelector(
    "#reject-login-modal p"
  );

  if (!regexpMail.test(inputLogin.value)) {
    window["incorrect-email"].showModal();
    setTimeout(() => {
      window["incorrect-email"].close();
    }, 2500);
    return;
  }

  if (inputLogin.value === "123@gmail.com") {
    loginModalRejectedParagraph.insertAdjacentHTML(
      "afterbegin",
      `<p class="temp" style="font-weight: 600;">${inputLogin.value}?</p>`
    );

    document.body.classList.add("scroll-lock");
    window["reject-login-modal"].showModal();
    inputLogin.value = "";
    inputPassword.value = "";
    return;
  }
  window["success-email-restore"].show();
  inputLogin.value = "";
  setTimeout(() => {
    window["success-email-restore"].close();
    authBlock.classList.remove("hidden");
    restoreBlock.classList.add("hidden");
    registBlock.classList.add("hidden");
  }, 2500);
});

registButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputPassword = document.querySelector(
    "div:not(div.hidden)>form>label>.input-password"
  );
  const inputLogin = document.querySelector(
    "div:not(div.hidden)>form>label>.input-login"
  );
  const inputName = document.querySelector(
    "div:not(div.hidden)>form>label>.input-name"
  );
  const inputPasswordCheck = document.querySelector(
    "div:not(div.hidden)>form>label>.input-password-check"
  );

  if (!regexpName.test(inputName.value)) {
    window["incorrect-name"].showModal();
    setTimeout(() => {
      window["incorrect-name"].close();
    }, 2500);
    return;
  }
  if (!regexpMail.test(inputLogin.value)) {
    window["incorrect-email"].showModal();
    setTimeout(() => {
      window["incorrect-email"].close();
    }, 2500);
    return;
  }

  if (inputPassword.value <= 0 || inputPasswordCheck.value <= 0) {
    window["empty-pass"].showModal();
    setTimeout(() => {
      window["empty-pass"].close();
    }, 2500);
    return;
  }
  if (inputPassword.value !== inputPasswordCheck.value) {
    window["incorrect-pass"].showModal();
    setTimeout(() => {
      window["incorrect-pass"].close();
    }, 2500);
    return;
  }
  window["success-regist"].show();
  inputLogin.value = "";
  inputPassword.value = "";
  inputPasswordCheck.value = "";
  inputName.value = "";
  setTimeout(() => {
    window["success-regist"].close();
    authBlock.classList.remove("hidden");
    restoreBlock.classList.add("hidden");
    registBlock.classList.add("hidden");
  }, 2500);
});

buttonDialogClose.addEventListener("click", () => {
  const temp = document.querySelector(".temp");
  setTimeout(() => {
    temp.remove();
  }, 100);
  window["success-login-dialog"].close();
});

buttonModalClose.addEventListener("click", (event) => {
  console.log(event.target);
  document.body.classList.remove("scroll-lock");
  const temp = document.querySelector(".temp");
  setTimeout(() => {
    temp.remove();
  }, 100);
  window["reject-login-modal"].close();
  window["incorrect-email"].close();
});

for (const element of dialogElement) {
  element.addEventListener("click", closeOnBackDropClick);
}

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    document.body.classList.remove("scroll-lock");
    const temp = document.querySelector(".temp");
    setTimeout(() => {
      temp.remove();
    }, 100);
    dialogElement.close();
  }
}

registLink.forEach((elem) =>
  elem.addEventListener("click", () => {
    window["reject-login-modal"].close();
    const imgRight = (document.querySelector(".right-screen-img").src =
      "./img/regist_right_screen.svg");
    const lorem = (document.querySelector(".lorem").innerText =
      "Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции играет важную роль в формировании кластеризации усилий.");
    authBlock.classList.add("hidden");
    restoreBlock.classList.add("hidden");
    registBlock.classList.remove("hidden");
  })
);

restoreLink.addEventListener("click", () => {
  const imgRight = (document.querySelector(".right-screen-img").src =
    "./img/reset_right_screen.svg");
  const lorem = (document.querySelector(".lorem").innerText =
    "Равным образом, семантический разбор внешних противодействий не даёт нам иного выбора, кроме определения прогресса профессионального сообщества.");
  authBlock.classList.add("hidden");
  restoreBlock.classList.remove("hidden");
});
