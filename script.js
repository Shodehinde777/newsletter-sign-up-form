class Newsletter {
  constructor() {
    this._parentElement = document.querySelector(".form");
    this._emailInput = document.getElementById("email");
    this._userEmail = document.getElementById("user-email");
    this._gridDiv = document.querySelector(".grid-div");
    this._success = document.querySelector(".success");
    this._dismissBtn = document.querySelector(".dismiss-btn");

    this._handleForm();
    this._btnDismiss();
  }

  _handleForm() {
    this._parentElement.addEventListener("submit", this._email.bind(this));
  }
  _email(e) {
    e.preventDefault();

    this._clearErrors();

    const formData = [...new FormData(this._parentElement)];
    const data = Object.fromEntries(formData);

    const email = this._emailInput.value.trim();
    const errorMsg = this._parentElement.querySelector(".error-msg");

    if (!this._isValidEmail(email)) {
      // Show error
      errorMsg.textContent = "Valid email required";
      this._emailInput.classList.add("input-error");

      // Add border and background color
      this._emailInput.style.border = "1px solid red";
      this._emailInput.style.backgroundColor = "#ffe6e6"; // light red background
      return;
    }
    // if valid and correct 👍
    this._gridDiv.classList.add("hidden");
    this._success.classList.remove("hidden");
    this._userEmail.textContent = `${data.email}`;
  }
  _clearErrors() {
    const errorMsg = this._parentElement.querySelector(".error-msg");
    errorMsg.textContent = "";
    this._emailInput.classList.remove("input-error");
    this._emailInput.style.border = "1px solid #bbb"; // reset to normal
    this._emailInput.style.backgroundColor = "#fff"; // reset to white
  }

  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  _btnDismiss() {
    this._dismissBtn.addEventListener(
      "click",
      function () {
        // console.log("hi");
        this._emailInput.value = "";
        this._gridDiv.classList.remove("hidden");
        this._success.classList.add("hidden");
        this._emailInput.focus(); // 👈  the user immediately start typing a new email without clicking the input again.
      }.bind(this)
    );
  }
}

const newsLetter = new Newsletter(); //instantiation
