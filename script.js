let puissance4 = [];
let finDePartie = false;
let joueurEnCours = 1;
let finDuJeu = false

const joueur1 = {
    name: "",
    pion: "/images/bitcoin.png",
};
const joueur2 = {
    name: "",
    pion: "/images/ethcoin.png",
};
const nbColonnes = 7;
const nbLignes = 6;
const tourDeJoueur = document.getElementById('tourDeJoueur');
const gagnant = document.getElementById('gagnant');
const boutonDemarrer = document.getElementById('boutonDemarrer');
const menu = document.getElementById('menu');
const plateau = document.getElementById('plateauDeJeu');
const jetonEnCours = document.getElementById('jetonEnCours');

// Démarrage de la partie au clique
boutonDemarrer.addEventListener('click', () =>{

    joueur1.name = document.getElementById('joueur1').value;
    joueur2.name = document.getElementById('joueur2').value;

    if(joueur1.name !== "" && joueur2.name !== ""){
        menu.hidden = true;
        plateau.hidden = false;
        tourDeJoueur.textContent = joueur1.name + " a toi de jouer";
        jetonEnCours.setAttribute('src', joueur1.pion);
        plateauDeJeu
        puissance4 = initTableauPions(nbColonnes, nbLignes, 0);
        majPlateau();
    }
    
})


/**
 * Fonction qui permet au joueur de placer un pion dans une colonne et déclenche donc la fonction du jeu Puissance 4.
 * @param {String} joueur 
 * @returns  True, si victoire.
 */
function jouer(colonne){
    if(!finDePartie){

        let ligneLibre = verifLigneLibre(colonne);

        if(ligneLibre !== -1){
            placerPion(joueurEnCours, ligneLibre, colonne);
            majPlateau();

            if(verifVictoire(joueurEnCours)){
                
                if(joueurEnCours === 1){
                    gagnant.textContent =  `${joueur1.name} a gagné la partie !`;
                    jetonEnCours.setAttribute('hidden', 'true');
                }else{
                    gagnant.textContent =  `${joueur2.name} a gagné la partie !`;
                    jetonEnCours.setAttribute('hidden', 'true');
                }   

                partieTerminée();   
            }
        
            if(joueurEnCours === 1){
                tourDeJoueur.textContent = joueur2.name + " à toi de jouer";
                jetonEnCours.setAttribute('src', joueur2.pion);
                joueurEnCours = 2;
            }else{
                tourDeJoueur.textContent = joueur1.name + " à toi de jouer";
                jetonEnCours.setAttribute('src', joueur1.pion);
                joueurEnCours = 1;
            }

        }
    
    }
    
}

/**
 * Fonction fin de jeu qui permet d'afficher le vainqueur ainsi que le bouton de
 */
function partieTerminée(){
    let recommencer = document.getElementById('boutonRecommencer');
        recommencer.hidden = false;
        recommencer.setAttribute('onclick', 'restart()');
    tourDeJoueur.setAttribute('hidden', 'true');
    gagnant.removeAttribute('hidden');
    jetonEnCours.nextElementSibling.removeAttribute('hidden');
    finDePartie = true;
}
/**
 * Permet de reloader la page pour recommencer une partie / Améliorable en faisant un refresh du tableau uniquement et pas toute l'interface
 */
function restart(){
    window.location.reload();
}

/**
 * Fonction qui permet de parcourir les lignes et retourner la première ligne vide d'une colonne
 * Retourner un -1 si la colonne est pleine
 * @param {Number} colonne 
 * @returns 
 */
function verifLigneLibre(colonne){
    for(let i = nbLignes-1; i >= 0; i--) {
        if(verifCaseVide(i, colonne)) return i;
    }
    return -1;
}

/**
 * Fonction qui retourne TRUE si la case et la ligne/Colonne est = a 0 donc vide car on a initialisé a 0 notre Array puissance4, 
 * et False si il y a un élement qui s'y trouve déja. Ecriture équivalente a un "if";
 * @param {Number} ligne 
 * @param {Number} colonne 
 * @returns Boolean
 */
function verifCaseVide(ligne, colonne){
    return puissance4[ligne][colonne-1] === 0; // 
}

// Mémo perso : Mêmes fonctions de vérification de victoire que le jeu du Morpion 
/**
 * Fonction qui verifie si un joueur a gagné le jeu
 * @param {String} joueur 
 * @returns 
 */
function verifVictoire(joueur){
    if(gagnerLigne(joueur) || gagnerColonne(joueur) || gagnerDiag(joueur)){
        return true;
    }
    return false;
}

/**
 * Fonction qui permet de vérifier qu'un joueur a gagné en Ligne
 * @param {String} joueur 
 * @returns 
 */
function gagnerLigne(joueur){
    for (let i = nbLignes-1; i >= 0; i--) {
        for (let j = 0; j < nbColonnes-3; j++) {
            if( puissance4[i][j] === joueur && 
                puissance4[i][j+1] === joueur &&
                puissance4[i][j+2] === joueur &&
                puissance4[i][j+3] === joueur)
                return true;  
        }    
    }
    return false;
}

/**
 * Fonction qui permet de vérifier si un jour a gagné en colonne
 * @param {String} joueur 
 */
function gagnerColonne(joueur){
    for (let i = 0; i < nbColonnes; i++) {
        for (let j = nbLignes-4; j > 0; j--) {
            if( puissance4[j][i] === joueur && 
                puissance4[j+1][i] === joueur &&
                puissance4[j+2][i] === joueur &&
                puissance4[j+3][i] === joueur)
                return true; 
        }    
    }
    return false;
}

/**
 * Fonction qui permet de vérifier qu'un joueur a gagné en diagonale
 * @param {String} joueur 
 */
function gagnerDiag(joueur){
    for (let i = nbLignes-1; i >= 3; i--) {
        for (let j = 0; j < nbColonnes; j++) {
            if( puissance4[i][j] === joueur && 
                puissance4[i-1][j+1] === joueur &&
                puissance4[i-2][j+2] === joueur &&
                puissance4[i-3][j+3] === joueur)
                return true;

            if( puissance4[i][j] === joueur && 
                puissance4[i-1][j-1] === joueur &&
                puissance4[i-2][j-2] === joueur &&
                puissance4[i-3][j-3] === joueur)
                return true;
        }    
    }
    return false;
}


/**
 * Fonction qui permet de stocker dans une variable la grille du Puissance 4 avec le nombre de ligne et de colonne en paramètre
 * @param {Number} nbColonnes 
 * @param {Number} nbLignes 
 * @param {String} car 
 * @returns Array
 */
function initTableauPions(nbColonnes, nbLignes, car){
    let tempTab = [];
    for(let i = 0; i < nbLignes; i++ ){
        let lignes = [];
        for(let j = 0; j < nbColonnes; j++ ){
            lignes.push(car);
        }  
        tempTab.push(lignes)
    }
    return tempTab;
}

/**
 * Fonction qui permet de générer l'affichage du plateau de jeu du Puissance 4. Méthode 1.
 */
function majPlateau(){
    const jeu = document.querySelector("#plateauDeJeu");
        jeu.textContent = "";
        
        var content = "<table>";
            for(var i=0; i < nbLignes;i++){
                content += "<tr>";
                for(var j=0 ; j < nbColonnes;j++){
                    content += "<td class='border text-center' style='width:100px;height:100px'>";
                    if(puissance4[i][j]=== 0){
                        content += "";
                    } else if(puissance4[i][j]=== 1){
                        content += '<img style="width:100%" src="/images/bitcoin.png" />';
                    } if(puissance4[i][j]=== 2){
                        content += '<img style="width:100%" src="/images/ethcoin.png" />';;
                    }
                    content += "</td>";
                }
                content += "</tr>";
            }
            content += "<tr>";
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(1)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(2)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(3)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(4)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(5)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(6)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
                content += '<td><button type="button" class="mt-2 btn btn-dark" onClick="jouer(7)"><i class="bi bi-arrow-up-square-fill text-success"><br>ClickHere</i></button></td>';
            content += "</tr>";
        content += "</table>";
        jeu.innerHTML = content;
}

// /**
//  * Fonction qui permet de générer la grille du Puissance 4. Méthode 2.
//  * @param {Array} tab Plateau de jeu avec contenu
//  * @param {*} joueur1 Pion du joueur 1
//  * @param {*} joueur2 Pion du joueur 2
//  */
// function affichagePlateau(){
//     const plateauDeJeu = document.getElementById('plateauDeJeu');  
//     // Génere le plateau de jeu du Puissance 4
//     for (let i = 0; i < nbLignes; i++) {
//         const ligne = document.createElement("tr");
//         plateauDeJeu.appendChild(ligne);
//         for (let j = 0; j < nbColonnes; j++) {
//             let casePion = document.createElement('td');
//             casePion.classList.add('border', 'border-primary', 'text-center')
//             casePion.style.width = "100px";
//             casePion.style.height = "100px";          
//             ligne.appendChild(casePion);              
//         }
//     }
//     //Génere les boutons de jeu du Puissance 4
//     let ligneCommande = document.createElement('tr');
//     for(let k = 0; k < nbColonnes; k++){
//         let caseBouton = document.createElement('td');
//         let bouton = document.createElement('button');
//             bouton.classList.add('btn','btn-success');
//             bouton.textContent = "Colonne"+k;
//             bouton.setAttribute('type', 'button');
//             bouton.setAttribute('onclick', `jouer(${k})`);
//         plateauDeJeu.appendChild(ligneCommande);
//         ligneCommande.appendChild(caseBouton);
//         caseBouton.appendChild(bouton);
//     }   
// }

/**
 * Permet de remplir la case du tableau du jeu avec la valeur du joueur passé en paramètre aprés vérification que la case soit vide.
 * @param {Number} joueur 
 * @param {Number} ligne 
 * @param {Number} colonne 
 */
function placerPion(joueur, ligne, colonne){ 
    puissance4[ligne][colonne-1] = joueur;
}



// Algo écrite du jeu du P4
// Tant que le jeu n'est pas terminé
// Chaques joueurs joue un pion => 
//          Jouer un pion => Vérifier ou est la permière ligne vide de la colonne selectionnée
//                  dans Jouer un Pion => VerifierVictoire ?
//                          dans VerifierVictoire => Vérifier conditions : Ligne, Colonnes, Diagonales
// 










