//var btnSend;
var database;
var rootNoticia;
        var btnSend = document.getElementById("envia");
    btnSend.addEventListener("click",enviaDadosFirebase,false);

    function enviaDadosFirebase(){
        var titulo = document.getElementsByName("titulo")[0].value;
        var desc = document.getElementsByName("descricao")[0].value;
        var tipo = document.getElementsByName("tipo")[0].value;
        if(titulo === undefined || titulo === ""||
             desc === undefined ||   desc === ""){
            Materialize.toast("Preencha todos os campos.",5000);
            return;
        }
        database = firebase.database();
        console.log(firebase);
        console.log(database);
        rootNoticia = database.ref("noticia");
        var newNoticia = {
            titulo: titulo,
            descricao: desc,
            tipo: tipo
        };
        
        var ss = rootNoticia.push(newNoticia, error=>{
            if(!error){
                Materialize.toast("Mensagem enviada com sucesso",3000,"rounded");
            }
            else{
                var msg = "Houve um erro: " + error;
                Materialize.toast(msg, 5000,"rounded")
            }
        });
        console.log(ss);

    }
    var connectedRef = firebase.database().ref(".info/connected");
    setTimeout(() =>{
        var connectionLostOnce = false;
        connectedRef.on("value", function(snap) {
            
        if (snap.val() === true) {
            if(connectionLostOnce){
                Materialize.Toast.removeAll();
                Materialize.toast("Estamos de volta =)",5000);
            }
                
        } else {
            connectionLostOnce = true;
            Materialize.toast("Você está desconectado.");
        }
    }); 
    },2000)
    