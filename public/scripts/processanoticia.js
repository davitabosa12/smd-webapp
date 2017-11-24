var dadosRecebidos = {
    data:undefined
};

var noticiaRef = firebase.database().ref("noticia");
$(document).ready(function(){
    var btnGet = document.getElementById("get_noticias");
    btnGet.addEventListener("click",function(){
     pegaNoticiaFirebase();   
    
    },false);
    
                  
});

function renderNoticia(dados){
    var i,campo;
    var section = document.getElementById("news");
    section.innerHTML = "";
    for(i = 0; i < dados.length; i++){
        campo = dados[i][1];//pega o objeto que esta na posicao 1, ja que o 0 é a id da noticia.
        newsBit(campo.titulo, campo.descricao,campo.tipo,section);
    }
}

function pegaNoticiaFirebase(){
    var collapse = document.getElementById("news");
    var news = [];
    collapse.innerHTML = "";
    noticiaRef.orderByKey().limitToLast(20).on("child_added", snap =>{
        var titulo = snap.child("titulo").val();
        var desc = snap.child("descricao").val();
        var tipo = snap.child("tipo").val();
        news.push({titulo,desc,tipo});
        newsBitMaterialize(titulo,desc,tipo,collapse);
        
    });
        
}

function newsBitMaterialize(titulo, desc, tipo, destino) {
    var container = document.createElement("li");

    var header = document.createElement("div");
    header.classList.add("collapsible-header");

    var body = document.createElement("div");
    body.classList.add("collapsible-body");

    var icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.style.verticalAlign = "middle";

    var titl = document.createElement("p");
    titl.innerHTML = titulo;

    var descricao = document.createElement("p");
    descricao.innerHTML = desc;

    //saber qual icone usar
    tipo = Number(tipo) || -1;
    switch(tipo){
        case 1:
            //estagios
            icon.innerHTML = "business_center";
            break;
        case 2:
            //oportunidades
            icon.innerHTML = "monetization_on";
            break;
        case 3:
            //instituto
            icon.innerHTML = "account_balance";
            break;
        case 4:
            //eventos
            icon.innerHTML = "event";
            break;
        default:
            //nada :(
            icon.innerHTML = "cancel";
            break;
    }

    header.appendChild(icon);
    header.appendChild(titl);
    body.appendChild(descricao);
    container.appendChild(header);
    container.appendChild(body);
    container.setAttribute("tabindex","0");
    destino.insertBefore(container, destino.childNodes[0]);
}
