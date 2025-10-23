import { creerCompte, afficherCompte } from "/js/inscription.js";

console.log('hey');

const btnCreate = document.getElementById("btnCreate");

//variables elements
let $login = document.getElementById("login");
let $champConfirmMdp = document.getElementById("verifMdp");
let $champMdp = document.getElementById("mdp");
let $email = document.getElementById("email");

let $annul = document.getElementById("btnAnnul");
$annul.addEventListener("click", afficherCompte);

//Variables booleenne de validation
let mdpMatch = false;
let loginOk = false;
let emailOk = false;
let mdpOk = false;


btnCreate.addEventListener("click", verifier);
checkMdp.addEventListener("click", afficheMdp);

$champConfirmMdp.addEventListener("input", confirmerMatchMdp);
$login.addEventListener("input", lectureInput);

//fonction globale au clic sur "Création du compte" vérifiant les différents champs
function verifier(e){
    const login = $login.value; 
    const email = $email.value;
    const motDePasse = $champMdp.value;
    const validMdp = $champConfirmMdp.value;

    //si tous les champ sont remplis, lancer la vérification des champs non écoutés
    if (login && email && motDePasse && validMdp) {
        confirmerMdp();
        emailOk = validerEmail($email); // true ou false
        console.log("Email", emailOk, "Login", loginOk, "mdp", mdpOk, mdpMatch);
        
        //SI nom, mail, mdp et mdpMatch OK alors Créer le compte
        if (loginOk && mdpOk && mdpMatch && emailOk){
          creerCompte(login, email, motDePasse);
        }
    }
   else {
        alert("Veuillez remplir tous les champs");
    }
  }


//vérifier taille et contenu du mdp
function confirmerMdp(){
  if ($champMdp.length < 6) {
    console.log("Mot de passe trop court, 6 caractère minimum");
    mdpOk = false;
  } else {
    mdpOk = true;
  }
    
}

//vérifie que les mdp entrés dans les 2 champs correspondent
function confirmerMatchMdp(e){
    let $mdp = document.getElementById("mdp").value;
    let $mdpConfirme = document.getElementById("verifMdp").value;

    if ($mdp == $mdpConfirme) {
        e.target.style.borderColor = "green";
        mdpMatch = true;
    } else {
        e.target.style.borderColor = "red";
        mdpMatch = false;
    }

        
}

//Validation du format mail avec expression régulières A EXPLICITER
function validerEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
}


function lectureInput(e){

    let saisie = e.target.value;
    if(saisie.length < 3){
        toggleVerification(login, "faux")
        loginOk = false;

    } else {
        toggleVerification(login, "vrai")
        loginOk = true;

    }
}

function toggleVerification(element, condition){
  switch (condition){
    case "faux":     element.style.borderColor = "#F2684A";
        element.nextElementSibling.style.visibility = "visible";
        element.nextElementSibling.nextElementSibling.style.visibility = "visible";
        element.nextElementSibling.setAttribute("src", "/ressources/error.png");
      break;
    case "vrai" : element.style.borderColor = "#419EAE";
        element.nextElementSibling.setAttribute("src", "/ressources/check.png");
        element.nextElementSibling.nextElementSibling.style.visibility = "hidden";
      break;
  }

}

//Fonction pour afficher/cacher les saisies mdp
function afficheMdp() {
  let x = document.getElementById("mdp");
  let y = document.getElementById("verifMdp");
  if (x.type === "password") {
    x.type = "text";
    y.type = "text"
  } else {
    x.type = "password";
    y.type = "password";
  }
} 
