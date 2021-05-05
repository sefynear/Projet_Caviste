const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";
let wineNames = "";
let countries = [];

// chargement de la page
xhr.onload = function(){
    // traitement de la requête
    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        console.log(xhrContent); //Affichage des données dans la console

        //afficher les vins
        showWines();


    }
}

// erreurs au chargement de la page
xhr.onerror = function(){

}

xhr.open('GET', 'http://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines', true);
xhr.send();

// afficher les vins
function showWines(){
    // boucle pour récupérer les données individuellement
    for(let i = 1; i <= Object.keys(xhrContent).length; i++){
        // on créer une baliste li pour chaque élément
        let li = document.createElement("li");
        let ul = document.getElementById("wineName");
        // on ajoute un id personnel à chacun de ces éléments pour pouvoir leur donner un nom propre
        li.setAttribute("id", i);
        ul.appendChild(li);
        document.getElementById(i).innerHTML = xhrContent[i]['name'];

        // partie récupération des filtres (country)
        countries[i-1] = xhrContent[i]['country'];
        let option = document.createElement("option");
        let select = document.getElementById("countries");
        option.setAttribute("id", i);
        option.textContent = xhrContent[i]['country'];
        option.setAttribute("value", xhrContent[i]['country']);
        select.appendChild(option);

        // partie récupération des filtres (years)
        countries[i-1] = xhrContent[i]['year'];
        option = document.createElement("option");
        select = document.getElementById("years");
        option.setAttribute("id", i);
        option.textContent = xhrContent[i]['year'];
        option.setAttribute("value", xhrContent[i]['year']);
        select.appendChild(option);
    }


}

// TODO trier sur base de l'element
function sortBy(element){

}

// TODO filtrer sur base de l'element (exemple years ou countries)
function filterBy(element){
    //TODO ne pas avoir de doublons dans les filtres
    //TODO trier les éléments
}

// TODO rechercher un element
function search(element){

}

// TODO ajouter une photo à un vin
function addPicture(wine){

}

// TODO ajouter une note à un vin
function addNote(wine){

}

// TODO ajouter un j'aime à un vin
function like(wine){
// TODO un utilisateur ne peut aimer 2 fois un vin

}

// TODO gérer la connexion
// TODO gérer les utilisateurs autorisés
