const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";

// chargement de la page
xhr.onload = function(){
    // traitement de la requête
    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        console.log(xhrContent); //Affichage des données dans la console

        // boucle pour récupérer les données individuellement
        for(let i = 0; i <= Object.keys(xhrContent).length; i++){
            document.getElementById("wineName").innerHtml = xhrContent[i];
        }

    }
}

// erreurs au chargement de la page
xhr.onerror = function(){

}

xhr.open('GET', 'http://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines', true);
xhr.send();

// afficher les vins
function showWines(){

}

// trier sur base de l'element
function sortBy(element){

}

// filtrer sur base de l'element
function filterBy(element){

}

// rechercher un element
function search(element){

}

// ajouter une photo à un vin
function addPicture(wine){

}

// ajouter une note à un vin
function addNote(wine){

}

// ajouter un j'aime à un vin
function like(wine){
// un utilisateur ne peut aimer 2 fois un vin

}

// TODO gérer la connexion
// TODO gérer les utilisateurs autorisés
