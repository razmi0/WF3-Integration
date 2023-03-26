//-------//
//
// TITRE : Validation du formulaire de contact
// AUTHOR : Thomas Cuesta
// DATE : 2023/03/25
//
//-------//

//-------//
//
// INPUTS TYPES : text, text, email, text
// EVENTS CIBLES : focus, blur, submit
//
//-------//

//-------//
//
// TODO : 1/ Implémenter le controle des inputs à l'event keyup
//           Si error => afficher le message d'erreur mais laisser l'utilisateur
//                      libre de continuer à taper le texte.
//
//        2/ Changer RegExp pour l'input TextArea (rajouter les caractères spéciaux et
//           les chiffres)
//
//        3/ Implémenter tous les types d'inputs possibles dans un formulaire
//           (checkbox, radio, select, etc...) pour réutilisation maximale
//
//        4/ Traduire en anglais (choisis ton camp !)
//
//        5/ Exploiter l'intégralité des parametres optionnels de addEventListener
//
//        6/ Refactoriser l'usage du booleen error pour une meilleure lisibilité
//
//        7/ Decouvrir les test unitaires de formulaires
//
//
//-------//

//---------------//
//BLOC FONCTIONS
//----------------//

/**
 * @description Rajoute le compteur de caractères saisie dans le textarea
 */

function addTextareaCounter() {
  const anchor_small = document.querySelector("#textarea-counter-anchor");
  const small = document.createElement("small");
  const maxlength = el_textarea.getAttribute("maxlength");

  small.classList.add("textarea-counter");
  small.innerText = "0/" + maxlength;
  anchor_small.append(small);
  
  el_textarea.addEventListener("keyup", () => {
    let value_length = el_textarea.value.length;
    small.innerText = value_length + "/" + maxlength;
  });
}


/**
 * @description Vérifie si un input est vide
 * @param {HTMLInputElement} el_target
 * @returns {boolean} error
 */

function isInputEmpty(el_target) {
  const target_value = el_target.value;
  const target_name = el_target.name;
  let error = false;

  // TEST LONGUEUR === 0

  if (!target_value.length) {
    setError(el_target, `❌ Input ${target_name} can't be empty`);
    error = true;
    return error;
  }
}

/**
 * @description Ajoute un * sur les labels des inputs possédant
 *             l'attribut HTML required en cherchant l'HTML Element Label parmis
 *              les noeuds enfants du noeud parent de l'input.
 *
 */
function setRequiredIndicators() {
  arr_inputs_required.forEach((input) => {
    let arr_adjacents_nodes = input.parentNode.childNodes;
    arr_adjacents_nodes.forEach((child) => {
      if (child.nodeName === "LABEL") {
        child.classList.add("required");
      }
    });
  });
}

/**
 * @description Vérifie la validité d'un input de type text
 * @param {HTMLInputElement} el_target
 * @returns {boolean} error
 */

function isTextValid(el_target) {
  const target_value = el_target.value;
  const target_name = el_target.name;
  let error = false;

  // TEST REG EXP TYPE TEXT

  if (!/^[a-z][a-z-]*[a-z]?$/i.test(target_value)) {
    setError(
      el_target,
      `❌ ${target_name} must contain only alphabetic characters`
    );
    error = true;
    return error;
  }
}

/**
 * @description Vérifie la validité d'un input de type email
 * @param {HTMLInputElement} el_target
 * @returns {boolean} error
 */

function isEmailValid(el_target) {
  const target_value = el_target.value;
  const target_name = el_target.name;
  let error = false;

  // TEST REG EXP TYPE EMAIL

  if (!/^[0-9a-zA-Z-.$#]+@[0-9a-zA-Z-$#]+.[a-zA-Z]{2,5}$/i.test(target_value)) {
    setError(
      el_target,
      ` ❌ Your ${target_name} format must be words@words.word`
    );
    error = true;
    return error;
  }
}

const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const active_tooltip = tooltips.forEach(
  (element) => new bootstrap.Tooltip(element)
);

/**
 * @description* Ajoute un message d'erreur à l'input ciblé
 * @param {HTMLInputElement} target
 * @param {string} message
 */

function setError(el_target, message) {
  let el_error = document.createElement("div");
  el_error.classList.add("error");
  el_error.innerText = message;

  el_target.classList.add("is-invalid");
  el_target.parentNode.append(el_error);
}

/**
 * @description Supprime les messages d'erreurs, les classes is-invalid
 *              et le contenu des inputs
 */

function removeError() {
  const isInvalid = document.querySelectorAll(".is-invalid");

  for (const item of isInvalid) {
    item.classList.remove("is-invalid");
    item.value = "";
  }

  const errors = document.querySelectorAll(".error");

  for (const item of errors) {
    item.remove();
  }
}

//-----------------//
//--FIN BLOC FONCTIONS
//-----------------//

const arr_inputs_required = document.querySelectorAll("[required]");
setRequiredIndicators();

const el_textarea = document.querySelector("textarea");
addTextareaCounter();

//-----------------//
//--BLOC EVENEMENTS
//-----------------//

//--
//--FOCUS EVENTS--//
//--

//--
//RESET FIRSTNAME AU FOCUS SI ERROR
//--

const el_firstname = document.querySelector("input[name=firstname]");
el_firstname.addEventListener("focus", () => {
  if (isTextValid(el_firstname)) {
    removeError();
  }
});

//--
//RESET LASTNAME AU FOCUS SI ERROR
//--

const el_lastname = document.querySelector("input[name=lastname]");
el_lastname.addEventListener("focus", () => {
  if (isTextValid(el_lastname)) {
    removeError();
  }
});

//--
//RESET EMAIL AU FOCUS SI ERROR
//--

const el_email = document.querySelector("input[name=email]");
el_email.addEventListener("focus", () => {
  if (isEmailValid(el_email)) {
    removeError();
  }
});

//--
//RESET TEXTAREA AU FOCUS SI ERROR
//--

el_textarea.addEventListener("focus", () => {
  if (isTextValid(el_textarea)) {
    removeError();
  }
});

//------
//--BLUR EVENTS--//
//------

//--
//CONTROLE FIRSTNAME AU BLUR
//--

el_firstname.addEventListener("blur", () => {
  isTextValid(el_firstname);
  if (isInputEmpty(el_firstname)) {
    removeError();
  }
});

//--
//CONTROLE LASTNAME AU BLUR
//--

el_lastname.addEventListener("blur", () => {
  isTextValid(el_lastname);
  if (isInputEmpty(el_firstname)) {
    removeError();
  }
});

//--
//CONTROLE EMAIL AU BLUR
//--

el_email.addEventListener("blur", () => {
  isEmailValid(el_email);
  if (isInputEmpty(el_firstname)) {
    removeError();
  }
});

//--
//CONTROLE TEXTAREA AU BLUR
//--

el_textarea.addEventListener("blur", () => {
  isTextValid(el_textarea);
  if (isInputEmpty(el_firstname)) {
    removeError();
  }
});

//--
//CALCUL CARACTERES TEXTAREA AND APPEND THE COUNTER TO THE DOM
//--


//----------
//CONTROLE FORM AU SUBMIT => RESET SI ERROR
//----------

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  let error = false;

  //RESET FORM
  removeError();

  //CHECK TEXT INPUT
  if (isTextValid(el_firstname)) {
    error = true;
  }
  if (isTextValid(el_lastname)) {
    error = true;
  }
  if (isTextValid(el_textarea)) {
    error = true;
  }
  //CHECK MAIL INPUT
  if (isEmailValid(el_email)) {
    error = true;
  }

  //CHECK IF REQUIRED INPUTS ARE EMPTY
  arr_inputs_required.forEach((input) => {
    if (isInputEmpty(input)) {
      error = true;
    }
  });

  //PREVENT SUBMIT IF ERROR IS TRUE
  if (error) {
    e.preventDefault();
  }
});


