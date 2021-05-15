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
    //btAddImg.addEventListener('click', addPicture(wine)); TODO
    $('#pictureFile').css('display', 'none');
    let btAddImg = document.querySelector('#description > div > i.fas.fa-camera');
    btAddImg.addEventListener('click', addPicture);
    let pictureFile = document.querySelector('#pictureFile');
    pictureFile.addEventListener('change', addPicture);

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
    effetListe();
}
// erreurs au chargement de la page
xhr.onerror = function(){

}
xhr.open('GET', apiURL + '/api/wines', true);
xhr.send();

// Effets mouseover et mouseout sur chaque élément de la liste des vins   
function effetListe(){
    $('.list-group-item').mouseover(function(){
        $(this).css('background-color', 'green');
        $(this).css('color', 'white');
    });
        $('.list-group-item').mouseout(function(){
        $(this).css('background-color', 'white');
        $(this).css('color', 'black');
    });
}

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

// partie récupération des filtres (country)
function getCountries(){
    countries = "";
    // Trie des pays
    let trieCountries = xhrContent.sort(function(a,b){
        if(a.country < b.country){
            return -1;
        }
        if(a.country > b.country){
            return 1;
        }
        return 0;
    });
    console.log(trieCountries);
    
    for(let j = 0; j < winesSize; j++){
        if(option.innerHTML !== trieCountries[j]['country']){
            countries[j] = trieCountries[j]['country'];
            option = document.createElement('option');
            select = document.getElementById('countries');
            option.innerHTML = trieCountries[j]['country'];
            option.setAttribute("value", trieCountries[j]['country']);
            select.appendChild(option);
        }
    }
}
// partie récupération des filtres (years)
function getYears(){
    // Trie des années
   let trieYears = xhrContent.sort(function(a,b){
       return a.year - b.year;
   });
   console.log(trieYears);
   
   for(let i = 0; i < winesSize; i++){
        option = document.createElement('option');
        select = document.getElementById('years');
        if(option.innerHTML !== trieYears[i]['year']){
            years[i] = trieYears[i]['year'];
            option.innerHTML = trieYears[i]['year'];
            option.setAttribute("value", trieYears[i]['year']);
            select.appendChild(option);
        }
   }    
   
}

// afficher les éléments de chaque vin
// le paramètre wines permet de rendre le filtre dynamique
// la fonction showWines appelle la fonction showWine apprès avoir afficher la liste des vins
function showWine(wines){

    // let idAf = document.querySelector('#description > span');
    // let imgWin = document.querySelector('#photo > img');
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

    // Effet sur liste
    effetListe();
}

// TODO rechercher un element
function search(element){                
                const inputSearch = document.querySelector('#inputKey');
                let keyword = inputSearch.value;
                let reg = new RegExp(keyword, 'i');
                // console.log(keyword.length);
                let tabVins = [];
                Object.values(data).forEach(function(vin){
                    if(vin.name.search(reg) != -1){
                        tabVins.push(vin);
                    }
                    else if((keyword.length <= 2) && (vin.id.search(reg) != -1)){
                        tabVins.push(vin);            
                    }
                    else if((keyword.length == 4) && (vin.year.search(reg) != -1)){
                        tabVins.push(vin);
                    }        
                })
                // Affichage de descriptions d'un vin
                for(let i=1; i<13; i++){
                    imgAffiche.src = pictureURL + tabVins[0].picture; 
                    allDescription[0].innerHTML = tabVins[0].grapes;
                    allDescription[1].innerHTML = tabVins[0].country;
                    allDescription[2].innerHTML = tabVins[0].region;
                    allDescription[3].innerHTML = data[i].year;
                    allDescription[4].innerHTML = tabVins[0].capacity;
                    allDescription[5].innerHTML = tabVins[0].color;
                    allDescription[6].innerHTML = tabVins[0].price;
                    idDescription.innerHTML = '#' + tabVins[0].id;
                    nameDescription.innerHTML = tabVins[0].name;                                  
                    list[i-1].innerHTML = '';
                }                                                    
                list[0].innerHTML = tabVins[0].name;

}

// TODO ajouter une photo à un vin
function addPicture(){
    
    console.log('OK');
    //Afficher la boite de dialogue pour changer l'image
    $('#pictureFile').css('display', 'block');   
    
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
