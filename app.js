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
let arrayWines = [0];


// chargement de la page
xhr.onload = function(){
    // traitement de la requête

    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        winesSize = Object.keys(xhrContent).length;

        let btFilter = document.getElementById("btFilter");
        //let btSort = document.getElementById("btSort"); //TODO
        btFilter.addEventListener('click', filter);
        //btSort.addEventListener('click', sort); //TODO

        getYears();
        getCountries();
        getWinesName();
        filter();
        showWine();

    }
    // Effet sur un élément de la liste
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

// afficher les vins
function showWines(wines){
    // boucle pour récupérer les données individuellement
    for(let i = 1; i <= winesSize; i++){
        // on créer une balite li pour chaque élément

        if(xhrContent[i]['name'] == arrayWines[i] && xhrContent[i]['country'] == 'France'){ //test quand france en filtre // en cours
            li = document.createElement("li");
            ul = document.getElementById("wines_list");
            // on ajoute un id personnel à chacun de ces éléments pour pouvoir les sélectionner
            li.setAttribute("class", "list-group-item");
            li.setAttribute("id", i);
            ul.appendChild(li);
            document.getElementById(i).innerHTML = '<i>'+arrayWines[i]+'</i>';
            //
        }
    }
}

function getYears(){
    // partie récupération des filtres (years)
    for(let i = 1; i <= winesSize; i++){
        years[i-1] = xhrContent[i]['year'];
        option = document.createElement('option');
        select = document.getElementById('years');
        option.innerHTML = xhrContent[i]['year'];
        option.setAttribute("value", xhrContent[i]['year']);
        select.appendChild(option);
    }
}

function getWinesName(){
    for(let i = 1; i <= winesSize; i++){
        arrayWines.push(xhrContent[i]['name']);
    }
}

function getCountries(){
    // partie récupération des filtres (country)
    for(let i = 1; i <= winesSize; i++){
        countries[i-1] = xhrContent[i]['country'];
        option = document.createElement('option');
        select = document.getElementById('countries');
        option.innerHTML = xhrContent[i]['country'];
        option.setAttribute("value", xhrContent[i]['country']);
        select.appendChild(option);
    }
}

function showWine(){
    // afficher les éléments de chaque vin
    let idAf = document.querySelector('#description > span');
    let imgWin = document.querySelector('#photo > img');
    let list = document.querySelectorAll('.list-group-item');

    for(let i = 0; i< list.length; i++){
        list[i].addEventListener('click', function(){
            let idAf = document.querySelector('#description > span');
            let imgWin = document.querySelector('#photo > img');

            imgWin.src = pictureURL + xhrContent[list[i].id]['picture'];
            idAf.innerHTML = '# ' + xhrContent[list[i].id]['id'];
            let name = document.querySelectorAll('#description > label > h3 > i');
            name[0].innerHTML = xhrContent[list[i].id]['name'];
            let grapes = document.getElementById("grapes");
            grapes.innerHTML = xhrContent[list[i].id]['grapes'];
            let country = document.getElementById("country");
            country.innerHTML = xhrContent[list[i].id]['country'];
            let region = document.getElementById("region");
            region.innerHTML = xhrContent[list[i].id]['region'];
            let year = document.getElementById("year");
            year.innerHTML = xhrContent[list[i].id]['year'];
            let capacity = document.getElementById("capacity");
            capacity.innerHTML = xhrContent[list[i].id]['capacity'];
            let color = document.getElementById("color");
            color.innerHTML = xhrContent[list[i].id]['color'];
            let price = document.getElementById("price");
            price.innerHTML = xhrContent[list[i].id]['price'];
        });
    }
}

function winesData(id){

}

// TODO trier sur base de l'element
function sortBy(element){

}

// In Progress (ne fonctionne pas)
function filter(){
    let selectCountry = document.getElementById("countries");
    let selectedCountry = selectCountry.value;
    let selectYear = document.getElementById("years");
    let selectedYear = selectYear.value;

    // cas où un pays et une année ont été sélectionnés
    if(selectedCountry != 'all' && selectedYear != 'all'){
        showWines(arrayWines.filter(element => element.country == selectedCountry));
        console.log('ok');
    }

    // cas où seul un pays a été sélectionné
    if(selectedCountry != 'all' && selectedYear == 'all'){

    }

    // cas où seul une année a été sélectionnée
    if(selectedCountry != 'all' && selectedYear != 'all'){

    }

    //test
    if(selectedCountry == 'France'){
        showWines(arrayWines.filter(element => element.country == 'France'));
    }

    else{
        showWines();
    }


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
