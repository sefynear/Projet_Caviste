const xhr = new XMLHttpRequest();
let xhrContent = "";
let data = "";
let wineNames = "";
let countries = [];
let years = [];
let li = "";
let ul = "";
const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php';
const pictureURL ='http://cruth.phpnet.org/epfc/caviste/public/pics/';
let winesSize = 0;
let arrayWines = [];
let filtered = false;
let order = false;
let option = "";



// chargement de la page
window.onload = function(){
    let btFilter = document.getElementById("btFilter");

    let btSort = document.getElementById("btSort");
    btFilter.addEventListener('click', filter);
    btSort.addEventListener('click', sort);

    $('#pictureFile').css('display', 'none');

    let btAddImg = document.querySelector('#description > div > i.fas.fa-camera');
    btAddImg.addEventListener('click', addPicture);

    let pictureFile = document.querySelector('#pictureFile');
    pictureFile.addEventListener('change', addPicture);
    //déconnexion
    $('#ko').css('display', 'none');
    let btDeconnex = document.querySelector('#ko');
    btDeconnex.addEventListener('click', deconnexion);
    //add note
    $('#commentaire').css('display', 'none');
    const btNote = document.querySelector('#addPicNoteLike > i.fas.fa-pencil-alt');
    btNote.addEventListener('click', addComments);
    //send comments
    const btEnvoyer = document.querySelector('#commentaire > button');
    btEnvoyer.addEventListener('click', sendComments);
     //like
     const btLike = document.querySelector('#addPicNoteLike > i.fab.fa-gratipay');
     btLike.addEventListener('click', like);
    // effets sur btCommentaires
    let btCommentaires = document.querySelector('#nav-44518-tab-2');
    btCommentaires.onclick = function(){
        //description
        $('#nav-44518-tab > li:nth-child(1) > a').css('backgroundColor', 'white');
        $('#nav-44518-tab > li:nth-child(1) > a').css('color', 'blue');
        //commentaires  
        $('#nav-44518-tab-2').css('backgroundColor', 'blue');
        $('#nav-44518-tab-2').css('color', 'white');
        //pays producteurs
        $('#nav-44518-tab-4').css('backgroundColor', 'white');
        $('#nav-44518-tab-4').css('color', 'blue');
        //vins préférés
        $('#nav-44518-tab-5').css('backgroundColor', 'white');
        $('#nav-44518-tab-5').css('color', 'blue');
    }
    // effets sur btDescriptions
    let btDescription = document.querySelector('#nav-44518-tab > li:nth-child(1) > a');
    btDescription.onclick = function(){
        //description
        $('#nav-44518-tab > li:nth-child(1) > a').css('backgroundColor', 'blue');
        $('#nav-44518-tab > li:nth-child(1) > a').css('color', 'white');
        //commentaires  
        $('#nav-44518-tab-2').css('backgroundColor', 'white');
        $('#nav-44518-tab-2').css('color', 'blue');
        //pays producteurs
        $('#nav-44518-tab-4').css('backgroundColor', 'white');
        $('#nav-44518-tab-4').css('color', 'blue');
        //vins préférés
        $('#nav-44518-tab-5').css('backgroundColor', 'white');
        $('#nav-44518-tab-5').css('color', 'blue');
    }
    // effets sur btPaysProducteurs
    let btPaysProd = document.querySelector('#nav-44518-tab-4');
    btPaysProd.onclick = function(){
        //description
        $('#nav-44518-tab > li:nth-child(1) > a').css('backgroundColor', 'white');
        $('#nav-44518-tab > li:nth-child(1) > a').css('color', 'blue');
        //commentaires  
        $('#nav-44518-tab-2').css('backgroundColor', 'white');
        $('#nav-44518-tab-2').css('color', 'blue');
        //pays producteurs
        $('#nav-44518-tab-4').css('backgroundColor', 'blue');
        $('#nav-44518-tab-4').css('color', 'white');
        //vins préférés
        $('#nav-44518-tab-5').css('backgroundColor', 'white');
        $('#nav-44518-tab-5').css('color', 'blue');
        let afficheCountries = document.querySelector('#nav-44518-content-4');
        let tabCountries = [];
        for(let l=0; l<xhrContent.length; l++){
            tabCountries[l] = xhrContent[l].country;                    
        }
        afficheCountries.innerHTML = tabCountries;
    }
    // effets sur btVinsPréférés
    let btVinsPréférés = document.querySelector('#nav-44518-tab-5');
    btVinsPréférés.onclick = function(){
        //description
        $('#nav-44518-tab > li:nth-child(1) > a').css('backgroundColor', 'white');
        $('#nav-44518-tab > li:nth-child(1) > a').css('color', 'blue');
        //commentaires  
        $('#nav-44518-tab-2').css('backgroundColor', 'white');
        $('#nav-44518-tab-2').css('color', 'blue');
        //pays producteurs
        $('#nav-44518-tab-4').css('backgroundColor', 'white');
        $('#nav-44518-tab-4').css('color', 'blue');
        //vins préférés
        $('#nav-44518-tab-5').css('backgroundColor', 'blue');
        $('#nav-44518-tab-5').css('color', 'white');
    }
    //recherche dynamique sans boutton
    $(document).ready(function(){
        $('#inputKey').keyup(function(){
            search_wine($(this).val());
        });
        function search_wine(value){
            $('.list-group-item').each(function(){
                var found = 'false';
                $(this).each(function(){
                    if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)
                    {
                        found = 'true';
                    }
                });
                if(found == 'true')
                {
                    $(this).show();
                }
                else
                {
                    $(this).hide();
                }
            });
        }
    });
}

// traitement de la requête
xhr.onload = function(){
    if(this. status == 200 && this.readyState == 4){
        xhrContent = JSON.parse(xhr.responseText);
        winesSize = Object.keys(xhrContent).length;
        jsonToArray();
        getYears();
        getCountries();
        sort();
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
    //console.log(wines);
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
    //console.log(trieCountries);

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
       if(a.year < b.year){
           return -1;
       }
       if(a.year > b.year){
           return 1;
       }
       return 0;
   });
   //console.log(trieYears);

   for(let i = 0; i < winesSize; i++){

        if(option.innerHTML !== trieYears[i]['year']){
           years[i] = trieYears[i]['year'];
           option = document.createElement('option');
           select = document.getElementById('years');
           option.innerHTML = trieYears[i]['year'];
           option.setAttribute("value", trieYears[i]['year']);
           select.appendChild(option);
       }
   }

}

// afficher les éléments de chaque vin
// le paramètre wines permet de rendre le filtre dynamique en fonction du filtre, du tri ou de la recherche
// la fonction showWines appelle la fonction showWine après avoir affiché la liste des vins
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

            //Afficher les commentaires des users
            afficherComments();
        });
    }
}

// tri croissant et décroissant
function sort(){
    order = !order;

    if(order){
        showWines(xhrContent.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0));
    }
    else{
        showWines(xhrContent.sort((a, b) => a.name !== b.name ? a.name > b.name ? -1 : 1 : 0));
    }
        if(filtered){
            filter();
    }
    effetListe();
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
        filtered = true;
    }

    // cas où seul un pays a été sélectionné
    else if(selectedCountry != 'all' && selectedYear == 'all'){
        showWines(xhrContent.filter(element => element.country == selectedCountry));
        filtered = true;
    }

    // cas où seul une année a été sélectionnée
    else if(selectedCountry == 'all' && selectedYear != 'all'){
        showWines(xhrContent.filter(element => element.year == selectedYear));
        filtered = true;
    }

    else{
        showWines();
    }

    // Effet sur liste
    effetListe();
}

function wineDescription(){

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

// ajouter un j'aime à un vin
let cptLike = 0;
function like(){
    let idAf = document.querySelector('#description > span');
    let idWine = (idAf.innerHTML).split('# ');
    let inputLogin = document.querySelector('#frmLogin > input[type=text]');
    let inputPwd = document.querySelector('#frmLogin > input[type=password]');    
    let loginUser = inputLogin.value;
    let pwdUser = inputPwd.value;
    let affLike = document.querySelector('#addPicNoteLike > span');
    const credentials = btoa(loginUser+':'+ pwdUser);    
    const wineId = idWine[1];
	const options = {
        'method': 'PUT',
        'body': JSON.stringify({ "like" : true }),	
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic '+ credentials	
        }
    };
    
    const fetchURL = '/api/wines/'+wineId+'/like';
    
    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                cptLike++;
                affLike.innerHTML = cptLike;
            });
        }
    });
    
}

// afficher les commentaires du vin
function afficherComments(){
    let idAf = document.querySelector('#description > span');
    const idWine = (idAf.innerHTML).split('# ');
    let inputLogin = document.querySelector('#frmLogin > input[type=text]');
    let inputPwd = document.querySelector('#frmLogin > input[type=password]');
    let tabComments = [];
    let loginUser = inputLogin.value;
    let pwdUser = inputPwd.value;
    const credentials = btoa(loginUser+':'+ pwdUser);
    const afficheNote = document.querySelector('#nav-44518-content-2'); //affichage des commentaires
    //if(loginUser != ""){
        let cpt = 1;
        let wineId = idWine[1];
        const options = {
            'method': 'GET',
            //'mode': 'cors',
            //'headers': {
                //'content-type': 'application/json; charset=utf-8',
                //'Authorization': 'Basic '+ credentials  //Try with other credentials (login:password)
            //}
        };

        const fetchURL = '/api/wines/'+wineId+'/comments';

        fetch(apiURL + fetchURL, options).then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    console.log(data);
                    if(data.length != 0){
                        for(let i=0; i<data.length; i++){
                            console.log(data[i].content);
                            for(let j=0; j<users.length; j++){
                                if(users[j].id == data[i].user_id){
                                    tabComments.push(cpt + '.' + data[i].content + ' ( ' + users[j].name  + ' )' + '<br>');
                                }
                            }

                            cpt++;
                        }
                        afficheNote.innerHTML = tabComments;
                    }else{
                        afficheNote.innerHTML = "Pas de commentaires"
                    }
                });
            }
        });
    // }else{
    //     console.log('KO');
    // }
}
//Ajouter un commentaire
function addComments(){
    $('#commentaire').css('display', 'block');
}
function sendComments(){
    $('#commentaire').css('display', 'none');
    let idAf = document.querySelector('#description > span');
    const idWine = (idAf.innerHTML).split('# ');
    let inputLogin = document.querySelector('#frmLogin > input[type=text]');
    let inputPwd = document.querySelector('#frmLogin > input[type=password]');
    let loginUser = inputLogin.value;
    let pwdUser = inputPwd.value;
    const credentials = btoa(loginUser+':'+ pwdUser);
    const commentaire = document.querySelector('#comments').value;
    let commentSend = { "content" : commentaire };
    let wineId = idWine[1];
	const options = {
        'method': 'POST',
        'body': JSON.stringify(commentSend),
        'mode': 'cors',
        'headers': {
            'content-type': 'application/json; charset=utf-8',
            'Authorization': 'Basic ' + credentials
        }
    };

    const fetchURL = '/api/wines/'+wineId+'/comments';

    fetch(apiURL + fetchURL, options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        }
        else{
            console.log('Not ok');
        }
    });
}

// gérer la connexion
//Liste Users
let users = [
    {
        id: 1,
        name: 'ced',
        pwd: 123
    },
    {
        id: 2,
        name: 'bob',
        pwd: 123
    },
    {
        id: 25,
        name: 'mehdi',
        pwd: 123
    },
    {
        id: 26,
        name: 'youssef',
        pwd: 123
    },
    {
        id: 27,
        name: 'mamadou',
        pwd: 123
    },
    {
        id: 28,
        name: 'manuel',
        pwd: 123
    },
    {
        id: 29,
        name: 'alain',
        pwd: 123
    },
    {
        id: 30,
        name: 'alexandre',
        pwd: 123
    },
    {
        id: 31,
        name: 'fred',
        pwd: 123
    },
    {
        id: 32,
        name: 'ali',
        pwd: 123
    },
    {
        id: 33,
        name: 'angeline',
        pwd: 123
    },
    {
        id: 34,
        name: 'sylwester',
        pwd: 123
    },
    {
        id: 35,
        name: 'alessandro',
        pwd: 123
    },
    {
        id: 36,
        login: 'rachida',
        pwd: 123
    },
    {
        id: 37,
        name: 'badredddine',
        pwd: 123
    },
    {
        id: 38,
        name: 'amandine',
        pwd: 123
    },
    {
        id: 39,
        name: 'guilherme',
        pwd: 123
    },
    {
        id: 40,
        name: 'lauren',
        pwd: 123
    },
    {
        id: 41,
        name: 'ismael',
        pwd: 123
    },
    {
        id: 42,
        name: 'aboubacar',
        pwd: 123
    },
];
function connexion(){
    $('#frmLogin').css('display', 'none');

    $('#addPicNoteLike').css('display', 'none');
    
    $('#ok').click(function(){
        $('#frmLogin').css('display', 'block');
    });
    
    // gérer les utilisateurs autorisés      
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
            if(inputLogin.value == users[i].name && inputPwd.value == users[i].pwd){
                $('#frmLogin').css('display', 'none');
                $('#ok').css('display', 'none');
                $('#ko').css('display', 'block');
                $('#addPicNoteLike').css('display', 'block');
                //blockUsers.hidden = false;
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
//Stattistique
let dataWines ;
let nbWineArgentina,nbWineFrance,nbWinesItaly,nbWineSpain,nbWineUSA  ;
let cptWineArg = 0;
let cptWineFr = 0; 
let cptWineIta = 0;
let cptWineSpa = 0;
let cptWineUs = 0;
fetch(apiURL+'/api/wines')
    .then(function(response){
        return response.json();
    })
    .then(function(dataList){
        console.log(dataList);
        dataWines = dataList;
        Object.values(dataWines).forEach(function(wine){
            if(wine.country=="Argentina"){
                cptWineArg++;
            }
            if(wine.country=="France"){
                cptWineFr++;
            }
            if(wine.country=="Italy"){
                cptWineIta++;
            }
            if(wine.country=="Spain"){
                cptWineSpa++;
            }
            if(wine.country=="USA"){
                cptWineUs++;
            }
        })
        nbWineArgentina = cptWineArg;
        // console.log(cptWineArg);
        nbWineFrance = cptWineFr;
        //console.log(cptWineFr);
        nbWinesItaly = cptWineIta;
        //console.log(cptWineIta);
        nbWineSpain = cptWineSpa;
        //console.log(cptWineSpa);
        nbWineUSA = cptWineUs;
        //console.log(cptWineUs);

        // creation of the charts 
        let myLabel = ['Argentina','France','Italy','Spain','USA'];
        let myData = [nbWineArgentina,nbWineFrance,nbWinesItaly,nbWineSpain,nbWineUSA];

        // Definition of the wine production's charts
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: myLabel,
                datasets: [{
                    label: 'Productions of wine by countries',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: myData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
.catch(function(err){
    console.log(err);
})
