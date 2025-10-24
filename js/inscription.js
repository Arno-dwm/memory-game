//A exporter

//Se lance lorsque la validation de formulaire OK
export function creerCompte(login, email, mdp) {
    // Récupérer les utilisateurs créés dans le local storage (ou tableau vide s'il n'y en a pas)
    let utilisateurs = JSON.parse(localStorage.getItem("Utilisateurs")) || [];

    // Création d'un nouvel utilisateur vide
    const nouvelUtilisateur = {
        index: utilisateurs.length, // auto-increment index
        login: login,
        eMail: email,
        password: mdp
    };

    // Mise à jour du tableau avec le nouvel utilisateur
    utilisateurs.push(nouvelUtilisateur);

    // Sauvegarde du tableau incluant le nouveau user dans le local storage
    localStorage.setItem("Utilisateurs", JSON.stringify(utilisateurs));
}

export function afficherCompte(){

    console.log(localStorage);
    
}

export function verifierCompte(login, email){
    localStorage.getItem("login");
}

//option 2
// function creerCompte(login, email, mdp) {
//     // Get current user count (or start at 0)
//     let userCount = parseInt(localStorage.getItem("userCount") || "0");

//     // Increment the count for this new user
//     userCount++;

//     // Store the user under a unique key
//     localStorage.setItem("Utilisateur_" + userCount, JSON.stringify({
//         index: userCount,
//         login: login,
//         eMail: email,
//         password: mdp
//     }));

//     // Save the new count
//     localStorage.setItem("userCount", userCount);
// }