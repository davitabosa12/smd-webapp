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
function pegaNoticia(callbackVariable){
    var teste = $.getJSON("https://smdevasao.firebaseio.com/noticia.json");
                    teste.done(function(data){
                       callbackVariable.data = Object.entries(data);
                        console.log(data);
                        renderNoticia(callbackVariable.data);
                    })
                     .fail(function(jqxhr, textStatus, error){
                      var result = "Requisicao falhou. " + textStatus + error;  
                        console.log(result);
                        callbackVariable.data = Object.entries(data);
                        renderNoticia(callbackVariable.data);
                    });
}

function pegaNoticiaFirebase(){
    var section = document.getElementById("news");
    section.innerHTML = "";
    noticiaRef.orderByKey().limitToFirst(20).on("child_added", snap =>{
        var titulo = snap.child("titulo").val();
        var desc = snap.child("descricao").val();
        var tipo = snap.child("tipo").val();
        newsBit(titulo,desc,tipo,section);
    });
}

function newsBit(titulo, desc, tipo, destino) {
    
    var art = document.createElement("article");
    var titl = document.createElement("h2");
    titl.innerHTML = titulo + "<br>";
    var descricao = document.createElement("p");
    descricao.innerHTML = desc + "<br>";
    var tp = document.createElement("p");
    tp.innerHTML = "<b>Tipo:</b>" + tipo + "<br>";
    art.appendChild(titl);
    art.appendChild(descricao);
    art.appendChild(tp);
    destino.appendChild(art);
}