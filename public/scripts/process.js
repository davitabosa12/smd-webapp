//var btnSend;
var database;
var rootNoticia;
        var btnSend = document.getElementById("envia");
    btnSend.addEventListener("click",enviaDadosFirebase,false);

    function enviaDadosFirebase(){
        var titulo = document.getElementsByName("titulo")[0].value;
        var desc = document.getElementsByName("descricao")[0].value;
        var tipo = document.getElementsByName("tipo")[0].value;
        database = firebase.database();
        console.log(firebase);
        console.log(database);
        rootNoticia = database.ref("noticia");
        var newNoticia = {
            titulo: titulo,
            descricao: desc,
            tipo: tipo
        };
        
        var ss = rootNoticia.push(newNoticia);
        console.log(ss);

    }
