
//fonction mise en place du jeu : attribuer une image par paires de cases
//fonction cleanBoard : retourne les 2 cartes retournées, set timeout
//fonction retournerCarte
//fonction shuffle avec propriété flex order

import {pokemonTab} from "/js/donnees.js";

let premiereCarte;
let secondeCarte;
let uneCarteRetournee = false;
let allCartesRetournees = 0;
let nbCoups = 0;
let meilleurEssai;
let tableauVerrouille = false;

const $afficheCoups = document.getElementById("nombreCoups");
const $afficheMeilleur = document.getElementById("meilleurEssai");
const $overlay = document.getElementById("overlay");


//ecoute pour relanccer le jeu
document.addEventListener('keydown', function(e){
    if(e.key == " "){
        //Recharger la page : globalThis.location.reload();
        relancerJeu();
    }

});

    //duplication du tableau pour crééer les paires
    let gameGrid = pokemonTab.concat(pokemonTab)
    
    //création des éléments HTML + association du tableau d'img 
    for (let carte of gameGrid) {
        const sectionJeu = document.getElementById('grilleJeuFly')
        const caseJeu = document.createElement('div');
        const innerCase = document.createElement('div');
        const rectoCase = document.createElement('div');
        const versoCase = document.createElement('div');

        caseJeu.classList.add('case');
        innerCase.classList.add('inner');
        rectoCase.classList.add('recto');
        versoCase.classList.add('verso');

        versoCase.style.backgroundImage = `url(${carte.img})`
        rectoCase.style.backgroundImage = `url(${carte.defaut})`

        innerCase.appendChild(rectoCase);
        innerCase.appendChild(versoCase);
        caseJeu.appendChild(innerCase);        
        sectionJeu.appendChild(caseJeu);
    }

    //déclaration des variables éléments post-création
    const $caseClic = document.querySelectorAll(".inner");
    const $mesCases = document.querySelectorAll(".case");

lancerJeu();

function lancerJeu(){

    //mélange l'ordre des div flex
    melanger();
    
    
    //Ajout des ecouteurs au clic sur chaque case
    for (let maCase of $caseClic){
        maCase.addEventListener("click", retournerCarte)
    }
}

function retournerCarte(e){

    //empêche de dévoiler une troisieme carte si 2 sont déjà retournées
    if(tableauVerrouille) return;
    
    this.classList.add('flip');

    //regarde si une carte a déjà été retournée, si non, initialise premiereCarte
    if(!uneCarteRetournee){ 
        uneCarteRetournee = true;
        premiereCarte = e.currentTarget;
        
        return;
    }
    
    secondeCarte = e.currentTarget; 

    //vérifier que la seconde carte est différente de la première
    if (secondeCarte == premiereCarte)
    {
        secondeCarte = undefined;
        return;
    }

    comparer();

    //Gestion de l'affichage du nombre de coups joués
    nbCoups += 1;
    $afficheCoups.textContent = nbCoups;
    console.log("Nombre de coups joués :", nbCoups);

    //verifier si toutes les cartes sont retournées, MAJ 12
    if (allCartesRetournees == 4)
    {
        setTimeout(gagner,1000);

        if (!(meilleurEssai) || (nbCoups < meilleurEssai)){
            meilleurEssai = nbCoups
            $afficheMeilleur.textContent = meilleurEssai;
        }

    }


}

function comparer(){
        //comparaison de la propriété "image de fond" pour le match
        let urlPremiereCarte = premiereCarte.lastElementChild.style.backgroundImage;
        let urlSecondeCarte = secondeCarte.lastElementChild.style.backgroundImage;

        //ternaire...
        if (urlPremiereCarte == urlSecondeCarte){
            console.log("dans comparer true");
            //si les 2 cartes retournées matchent, on les désactive en retirant les écouteurs
            desactiverCarte();
        } else { 
            //sinon on cache les cartes en supprimant la classe flip
            cacherCarte();
        }

    }



function cacherCarte(){
    tableauVerrouille = true;
    console.log("verrouillage tableau");
    //Timing de 2 seoncdes si les cartes ne sont pas identiques
    setTimeout( () => {
        console.log('dans le timeout')
        premiereCarte.classList.remove('flip');
        secondeCarte.classList.remove('flip')
    reinitialiserChoix();
    }, 2000);

}



function desactiverCarte(){
    console.log('dans désactiverCarte');
    //Suppression des écouteurs pour rendre les cartes identiques non cliquables
    premiereCarte.removeEventListener("click", retournerCarte);
    secondeCarte.removeEventListener("click", retournerCarte);
    reinitialiserChoix();

    //incrémentation de la condition de victoire
    allCartesRetournees += 2;
}



function melanger(){
    //pour chaque case de mesCases, mettre un order compris entre 1 et 12
    for (let uneCase of $mesCases){
        uneCase.style.order = Math.floor(Math.random() * 12);
    }

}

function relancerJeu(){
    const $casesAcacher = document.querySelectorAll(".inner");

    for (let maCase of $casesAcacher){
        maCase.classList.remove("flip")
    }

     reinitialiserChoix();
     allCartesRetournees = 0;
     nbCoups = 0;
     $afficheCoups.textContent = nbCoups;
     //timeout pour permettre à l'animation de retournement de s'effectuer AVANT de retirer les cartes
     setTimeout(lancerJeu,1000);
}


//Mise à "zéro" des variables pour permettre au jeu de continuer
function reinitialiserChoix(){
    premiereCarte = undefined;
    secondeCarte = undefined;
    tableauVerrouille = false;
    uneCarteRetournee = false;

}

//Affichage de la popu de victoire
function gagner(){
    console.log('win');
    $overlay.style.display = "block"
    $overlay.addEventListener("click", () => {
        $overlay.style.display = "none";
        relancerJeu();
    })

}


