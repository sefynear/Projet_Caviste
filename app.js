const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";
let wineNames = "";
let countries = [];
let li = "";
let ul = "";
let select = "";
let option = "";
const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php';
const pictureURL ='file:///C:/Users/BelAgencyWeb/Desktop/Caviste/images/pics/'; 

// chargement de la page
xhr.onload = function(){
    // traitement de la requête
    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        //console.log(xhrContent); //Affichage des données dans la console
        //afficher les vins
        showWines();

        //afficher les élements du vin
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
function showWines(){
    // boucle pour récupérer les données individuellement
    for(let i = 1; i <= Object.keys(xhrContent).length; i++){
        // on créer une baliste li pour chaque élément
        li = document.createElement("li");
        ul = document.getElementById("wines_list");
        // on ajoute un id personnel à chacun de ces éléments pour pouvoir les sélectionner
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", i);
        ul.appendChild(li);
        document.getElementById(i).innerHTML = '<i>'+xhrContent[i]['name']+'</i>';

        // partie récupération des filtres (country)
        countries[i-1] = xhrContent[i]['country'];
        option = document.createElement("option");
        select = document.getElementById("countries");
        option.setAttribute("id", i);
        option.innerHTML = xhrContent[i]['country'];
        option.setAttribute("value", xhrContent[i]['country']);
        select.appendChild(option);

        // partie récupération des filtres (years)
        countries[i-1] = xhrContent[i]['year'];
        option = document.createElement("option");
        select = document.getElementById("years");
        option.setAttribute("id", i);
        option.innerHTML = xhrContent[i]['year'];
        option.setAttribute("value", xhrContent[i]['year']);
        select.appendChild(option);      
    
    }
    /*
    let counter = 1;
    for (let element in xhrContent[counter]){
        li = document.createElement("li");
        ul = document.getElementById("wineData");
        li.setAttribute("id", counter);
        ul.appendChild(li);
        document.getElementById("wineData").innerHTML = xhrContent[counter][element];
        console.log(xhrContent[counter][element]);
        counter++;
    }*/
//for (let k in xhrContent[1]){console.log(xhrContent[1][k])} Permet de récupérer chaque valeur


}

// sélectionner un vin dans la liste
function showWine(id = 1){ //id = 1 pour les tests
    // afficher les éléments de chaque vin  
    let list = document.querySelectorAll('.list-group-item');
    let idAf = document.querySelector('#description > span');
    let imgWin = document.querySelector('#photo > img');    

    for(let i=1; i<13; i++){
        list[i-1].addEventListener('click', function(){
            imgWin.src = pictureURL + xhrContent[i]['picture'];
            idAf.innerHTML = '# ' + xhrContent[i]['id'];
            let name = document.querySelectorAll('#description > label > h3 > i');
            name[0].innerHTML = xhrContent[i]['name'];
            let grapes = document.getElementById("grapes");
            grapes.innerHTML = xhrContent[i]['grapes'];
            let country = document.getElementById("country");
            country.innerHTML = xhrContent[i]['country'];
            let region = document.getElementById("region");
            region.innerHTML = xhrContent[i]['region'];
            let year = document.getElementById("year");
            year.innerHTML = xhrContent[i]['year'];
            let capacity = document.getElementById("capacity");
            capacity.innerHTML = xhrContent[i]['capacity'];
            let color = document.getElementById("color");
            color.innerHTML = xhrContent[i]['color'];
            let price = document.getElementById("price");
            price.innerHTML = xhrContent[i]['price'];
        });
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
