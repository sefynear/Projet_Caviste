const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";
let wineNames = "";
let countries = [];
let years = [];
let li = "";
let ul = "";
const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php';
const pictureURL ='file:///C:/Users/BelAgencyWeb/Desktop/Projet_Caviste/images/pics/';
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
    //déconnexion
    $('#ko').css('display', 'none');
    let btDeconnex = document.querySelector('#ko');
    btDeconnex.addEventListener('click', deconnexion);
    //blockUsers
    //const blockUsers = document.querySelector('#block2');
    //blockUsers.hidden = true;

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
        connexion(); 
        //deconnexion();
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
    //connexion
    $('#ok').mouseover(function(){
        $(this).css('color', 'blue');
        $(this).css('cursor', 'pointer');
        $(this).css('fontSize', '30px');
    });
    $('#ok').mouseout(function(){
        $(this).css('color', 'black');
        $(this).css('fontSize', '14px');
    });
    //déconnexion
    $('#ko').mouseover(function(){
        $(this).css('color', 'blue');
        $(this).css('cursor', 'pointer');
        $(this).css('fontSize', '30px');
    });
    $('#ko').mouseout(function(){
        $(this).css('color', 'black');
        $(this).css('fontSize', '14px');
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
            let descriptionWine = document.querySelector('#nav-44518-content-1');
            descriptionWine.innerHTML =  wines[list[i].id]['description'];
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
    let descriptionWine = document.querySelector('#nav-44518-content-1');
    descriptionWine.innerHTML =  "";

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

// gérer la connexion
function connexion(){
    $('#frmLogin').css('display', 'none');

    $('#addPicNoteLike').css('display', 'none');
    
    $('#ok').click(function(){
        $('#frmLogin').css('display', 'block');
    });
    //Liste Users
    let users = [
        {
            login: 'ced',
            pwd: 1
        },
        {
            login: 'bob',
            pwd: 2
        },
        {
            login: 'mehdi',
            pwd: 25
        },
        {
            login: 'youssef',
            pwd: 26
        },
        {
            login: 'mamadou',
            pwd: 27
        },
        {
            login: 'manuel',
            pwd: 28
        },
        {
            login: 'alain',
            pwd: 29
        },
        {
            login: 'alexandre',
            pwd: 30
        },
        {
            login: 'fred',
            pwd: 31
        },
        {
            login: 'ali',
            pwd: 32
        },
        {
            login: 'angeline',
            pwd: 33
        },
        {
            login: 'sylwester',
            pwd: 34
        },
        {
            login: 'alessandro',
            pwd: 35
        },
        {
            login: 'rachida',
            pwd: 36
        },
        {
            login: 'badredddine',
            pwd: 37
        },
        {
            login: 'amandine',
            pwd: 38
        },
        {
            login: 'guilherme',
            pwd: 39
        },
        {
            login: 'lauren',
            pwd: 40
        },
        {
            login: 'ismael',
            pwd: 41
        },
        {
            login: 'aboubacar',
            pwd: 42
        },
    ];
    for(let i=0; i<users.length; i++){
        console.log(users[i]);
    }
    // Tgérer les utilisateurs autorisés      
    let inputLogin = document.querySelector('#frmLogin > input[type=text]');
    let inputPwd = document.querySelector('#frmLogin > input[type=password]');
    const btValider = document.querySelector('#frmLogin > input.btn.btn-success');    
    //const blockUsers = document.querySelector('#block2');
    //let btConnex = document.querySelector('#ok');    
    let message = document.querySelector('#mesage');
   
    btValider.addEventListener('click', function(e){
        e.preventDefault();

        //Connexion
        for(let i=0; i<users.length; i++){
            if(inputLogin.value == users[i].login && inputPwd.value == users[i].pwd){
                $('#frmLogin').css('display', 'none');
                $('#ok').css('display', 'none');
                $('#ko').css('display', 'block');
                //$('#addPicNoteLike').css('display', 'block');
                blockUsers.hidden = false;
            }else{
                message.innerHTML = "Login ou mot de passe incorrect";
                $('#mesage').css('color', 'red');
            }
        }
    });
}
// gérer la déconnexion
function deconnexion(){  
    $('#ko').css('display', 'none');
    $('#ok').css('display', 'block');
    $('#addPicNoteLike').css('display', 'none');
}

    
