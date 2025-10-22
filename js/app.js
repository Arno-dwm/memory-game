console.log('Hello');

//fonction mise en place du jeu : attribuer une image par paires de cases
//fonction cleanBoard : retourne les 2 cartes retournées, set timeout
//fonction retournerCarte
//fonction shuffle avec propriété flex order

let premiereCarte;
let secondeCarte;
let uneCarteRetournee = false;
let allCartesRetournees = 0;
let nbCoups = 0;
const $mesCases = document.querySelectorAll(".case");
const $casesVerso = document.querySelectorAll(".verso");
const $caseClic = document.querySelectorAll(".inner");
const $afficheCoups = document.getElementById("nombreCoups");

//ecoute pour relanccer le jeu, A FAIRE
document.addEventListener('keydown', function(e){
    if(e.key == " "){
        console.log("spaaaace");
        lancerJeu();
    }

});

lancerJeu();

function lancerJeu(){
    //mise en place, A OPTIMISER
    $casesVerso[0].style.backgroundImage = "url('/ressources/pkmn/1.png')";
    $casesVerso[1].style.backgroundImage = "url('/ressources/pkmn/1.png')";
    $casesVerso[2].style.backgroundImage = "url('/ressources/pkmn/2.png')";
    $casesVerso[3].style.backgroundImage = "url('/ressources/pkmn/2.png')";
    $casesVerso[4].style.backgroundImage = "url('/ressources/pkmn/3.png')";
    $casesVerso[5].style.backgroundImage = "url('/ressources/pkmn/3.png')";
    $casesVerso[6].style.backgroundImage = "url('/ressources/pkmn/4.png')";
    $casesVerso[7].style.backgroundImage = "url('/ressources/pkmn/4.png')";
    $casesVerso[8].style.backgroundImage = "url('/ressources/pkmn/5.png')";
    $casesVerso[9].style.backgroundImage = "url('/ressources/pkmn/5.png')";
    $casesVerso[10].style.backgroundImage = "url('/ressources/pkmn/6.png')";
    $casesVerso[11].style.backgroundImage = "url('/ressources/pkmn/6.png')";

    //mélange l'ordre des div flex
    melanger();


    //Ajout des ecouteurs clic
    for (let maCase of $caseClic){
        maCase.addEventListener("click", retournerCarte)

    }



    function retournerCarte(e){
        
        //verifie si l'utilisateur a déjà cliqué sur 2 cartes <=> carte1 ET carte2 initialisée
        if(premiereCarte != undefined && secondeCarte !=undefined){
            console.log("Eh bah alors on veut tricher ?!");
            
        } else { //sinon lance la séquence de jeu
            this.classList.add('flip');
            
            if(!uneCarteRetournee){ //regarde si une carte a déjà été retournée
                uneCarteRetournee = true;
                premiereCarte = e.currentTarget;
                return;
            }
            
            secondeCarte = e.currentTarget;
            if (secondeCarte == premiereCarte)
            {
                secondeCarte = null;
                return;
            }
                

            comparer();
            uneCarteRetournee = false;
            //Gestion de l'affichage du nombre de coups joués
            nbCoups += 1;
            $afficheCoups.textContent = nbCoups;
            console.log("Nombre de coups joués :", nbCoups);

            //verifier si toutes les cartes sont retournées, MAJ 12
            if (allCartesRetournees == 4)
            {
                console.log("c'est win");
                gagner();
            }

        }




    }
    function comparer(){
        //comparaison de la propriété "image de fond" pour le match
        let urlPremiereCarte = premiereCarte.lastElementChild.style.backgroundImage;
        let urlSecondeCarte = secondeCarte.lastElementChild.style.backgroundImage;

        if (urlPremiereCarte == urlSecondeCarte){
            console.log("dans comparer true");
            //si les 2 cartes retournées matchent, on les désactive en retirant les écouteurs
            desactiverCarte();
        } else { //sinon o
                cacherCarte();

        }


        //si premiere carte = seconde carte alors fonction disabled card
        //sinon unflip card()

        //fonction disable premierecarte remove event listener pareil sur la deuxieme
        //unflip : timeout sur prem et deux pour remove class flip
         }

    function melanger(){
        //pour chaque case de mesCases, mettre un order compris entre 1 et 12
        for (let uneCase of $mesCases){
            uneCase.style.order = Math.floor(Math.random() * 12);

        }

    }

        function cacherCarte(){
        setTimeout( () => {
            console.log('dans le timeout')
            premiereCarte.classList.remove('flip');
            secondeCarte.classList.remove('flip')
            premiereCarte = null;
            secondeCarte = null;
        }, 2000);

    }



        function desactiverCarte(){
        console.log('dans désactiverCarte');
        
        premiereCarte.removeEventListener("click", retournerCarte);
        secondeCarte.removeEventListener("click", retournerCarte);
        premiereCarte = null;
        secondeCarte = null;
        allCartesRetournees += 2;
    }

    function gagner(){
        console.log('win');
        

    }

        //Créer un tableau avec les valeurs de 1 à 12 stockées aléatoirement
        //servira pour attribuer une image par paires de case
        let nombre = new Set();
        let tirage;

        while (nombre.size < 12){
            tirage = Math.floor(Math.random() * 12) + 1;
            nombre.add(tirage);
        }
        const arr = [...nombre];

        //console.log(arr[0]);
        const $case1 = document.getElementById("case"+arr[0]);
        //console.log($case1);
        
}

        