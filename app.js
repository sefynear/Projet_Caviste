const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";
let wineNames = "";
let countries = [];
let years = [];
let li = "";
let ul = "";
const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php';
const pictureURL ='file:///C:/Users/BelAgencyWeb/Desktop/Caviste/images/pics/';
let winesSize = 0;
let arrayWines = [];


// chargement de la page
window.onload = function(){
    let btFilter = document.getElementById("btFilter");
    //let btSort = document.getElementById("btSort"); //TODO
    btFilter.addEventListener('click', filter);
    //btSort.addEventListener('click', sort); //TODO
    let btSearch = document.getElementById("btSearch");
    btSearch.addEventListener('click', search);
}

// traitement de la requête
xhr.onload = function(){
    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        winesSize = Object.keys(xhrContent).length;
        jsonToArray();
        getYears();
        getCountries();
        filter();


    }
    // Effets sur chaque élément de la liste des vins
    let list = document.querySelectorAll('.list-group-item');
    for(let i=0; i<list.length; i++){
        list[i].addEventListener('mouseover', function(){
            list[i].style.backgroundColor = 'green';
            list[i].style.color = 'white';
        });
    }

    for(let i=0; i<list.length; i++){
        list[i].addEventListener('mouseout', function(){
            list[i].style.backgroundColor = 'white';
            list[i].style.color = 'black';
        });
    }
}



// erreurs au chargement de la page
xhr.onerror = function(){

}

xhr.open('GET', apiURL + '/api/wines', true);
xhr.send();

// conversion en array pour permettre l'utilisation de la fonction filtre
function jsonToArray(){
    let result = [];
    for (let element in xhrContent) {
		result.push(xhrContent[element]);
    }
    xhrContent = result;
}

// afficher les vins
function showWines(wines = xhrContent){
    console.log(wines);
    // boucle pour récupérer les données individuellement
        // on crée une balise li pour chaque élément
        $('.list-group-item').remove();

        Object.keys(wines).forEach(function(i){
                li = document.createElement("li");
                ul = document.getElementById("wines_list");
                // on ajoute un id personnel à chacun de ces éléments pour pouvoir les sélectionner
                li.setAttribute("class", "list-group-item");
                li.setAttribute("id", i);
                ul.appendChild(li);
                document.getElementById(i).innerHTML = '<i>'+wines[i]['name']+'</i>';
                //
            });
            showWine(wines);

}

// partie récupération des filtres (years)
function getYears(){
    for(let i = 0; i < winesSize; i++){
        years[i] = xhrContent[i]['year'];
        option = document.createElement('option');
        select = document.getElementById('years');
        option.innerHTML = xhrContent[i]['year'];
        option.setAttribute("value", xhrContent[i]['year']);
        select.appendChild(option);
    }
}

// partie récupération des filtres (country)
function getCountries(){
    countries = "";
    for(let i = 0; i < winesSize; i++){
        countries[i] = xhrContent[i]['country'];
        option = document.createElement('option');
        select = document.getElementById('countries');
        option.innerHTML = xhrContent[i]['country'];
        option.setAttribute("value", xhrContent[i]['country']);
        select.appendChild(option);
    }
}

// afficher les éléments de chaque vin
// le paramètre wines permet de rendre le filtre dynamique
// la fonction showWines appelle la fonction showWine apprès avoir afficher la liste des vins
function showWine(wines){
    let idAf = document.querySelector('#description > span');
    let imgWin = document.querySelector('#photo > img');
    let list = document.querySelectorAll('.list-group-item');

    for(let i = 0; i< list.length; i++){
        list[i].addEventListener('click', function(){
            let idAf = document.querySelector('#description > span');
            let imgWin = document.querySelector('#photo > img');
            imgWin.src = pictureURL + wines[list[i].id]['picture'];
            idAf.innerHTML = '# ' + wines[list[i].id]['id'];
            let name = document.querySelectorAll('#description > label > h3 > i');
            name[0].innerHTML = wines[list[i].id]['name'];
            let grapes = document.getElementById("grapes");
            grapes.innerHTML = wines[list[i].id]['grapes'];
            let country = document.getElementById("country");
            country.innerHTML = wines[list[i].id]['country'];
            let region = document.getElementById("region");
            region.innerHTML = wines[list[i].id]['region'];
            let year = document.getElementById("year");
            year.innerHTML = wines[list[i].id]['year'];
            let capacity = document.getElementById("capacity");
            capacity.innerHTML = wines[list[i].id]['capacity'];
            let color = document.getElementById("color");
            color.innerHTML = wines[list[i].id]['color'];
            let price = document.getElementById("price");
            price.innerHTML = wines[list[i].id]['price'];
        });
    }
}

// TODO trier sur base de l'element
function sortBy(element){
    //sort(a, b) TODO
}

// permet la filtration selon les critères sélectionnés
function filter(){
    let selectCountry = document.getElementById("countries");
    let selectedCountry = selectCountry.value;
    let selectYear = document.getElementById("years");
    let selectedYear = selectYear.value;

    // cas où un pays et une année ont été sélectionnés
    if(selectedCountry != 'all' && selectedYear != 'all'){
        showWines(xhrContent.filter(element => element.country == selectedCountry && element.year == selectedYear));
    }

    // cas où seul un pays a été sélectionné
    else if(selectedCountry != 'all' && selectedYear == 'all'){
        showWines(xhrContent.filter(element => element.country == selectedCountry));
    }

    // cas où seul une année a été sélectionnée
    else if(selectedCountry == 'all' && selectedYear != 'all'){
        showWines(xhrContent.filter(element => element.year == selectedYear));
    }

    else{
        showWines();
    }


    //TODO ne pas avoir de doublons dans les filtres
    //TODO trier les éléments filtrés
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
