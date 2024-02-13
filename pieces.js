import { ajoutListenerAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:8081/pieces");
const pieces = await reponse.json();

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";


        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        pieceElement.appendChild(avisBouton)
    
     }
     ajoutListenerAvis()
}

// Premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par orde de prix croissant
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", function(){
    const pieceOrdonnees = Array.from(pieces)
    pieceOrdonnees.sort(function (a, b){
        return b.prix - a.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieceOrdonnees);
    console.log(pieceOrdonnees)
});

// Ajout du listener pour trier les pièces par ordre de prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroi")
boutonTrierDecroissant.addEventListener("click", function () {
    const pieceOrdonnees = Array.from(pieces)
    pieceOrdonnees.sort(function (a,b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieceOrdonnees);
    console.log(pieceOrdonnees)
});

// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click",function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= 35;
    });
    // Effacement de l'écran er regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
});

// Ajout du listener pour filtrer les pèces sans déscription
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-no-descri")
boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.description
    });
    // Effacement de l'écran er regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
})

// Ajout d'un range listener pour filtrer par maximum de prix
const boutonFiltrerPrix = document.querySelector("#filter-prix")
boutonFiltrerPrix.addEventListener("input", function () {
    const piecesFiltrees = pieces.filter(function (pieces) {
        return pieces.prix <= boutonFiltrerPrix.value;
    });
    // Effacement de l'écran er regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
    console.log(piecesFiltrees)
});