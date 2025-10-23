//A exporter

//Se lance lorsque la validation de formulaire OK
let utilisateur = 0;

export function creerCompte(login, email, mdp){


    localStorage.setItem("Utilisateur"+utilisateur, JSON.stringify({
        index : utilisateur,
        login : login,
        eMail: email,
        password: mdp
    }));

    utilisateur += 1;

}

export function afficherCompte(){
    const compte = localStorage.getItem("Utilisateur"+utilisateur);
    console.log(localStorage);
    
}