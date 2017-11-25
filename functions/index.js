const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendMessageToTopic = functions.database.ref("noticia/{pushID}").onCreate(dataSnapshot =>{
    
    var tipo = dataSnapshot.data.child("tipo").val();
    var idNoticia = dataSnapshot.data.key;
    console.log("idnoticia",idNoticia);
    tipo = Number(tipo);
    var descricao = dataSnapshot.data.child("descricao").val();
    descricao = descricao.length > 30 ? descricao.substring(0,28) + "..." : descricao;
    var titulo = dataSnapshot.data.child("titulo").val();
    console.log("titulo: " + titulo + " descricao: " + descricao + " tipo:" + tipo);
    var payload = {
        notification:{
            title: titulo,
            body: descricao,
            sound: "default"
        },
        data:{
            title: titulo,
            msg: descricao,
            pushId:idNoticia

        }
    };
    var topic = "/topics/";
    switch (tipo) {
        case 1:
            //estagios
            topic += "estagios";
            break;
        case 2:
            //oportunidades
            topic += "oportunidades";
            break;
        case 3:
            //instituto
            topic += "instituto";
            break;
        case 4:
            //eventos
            topic += "eventos";
            break;
    
        default:
           console.log("Nao foi enviada a mensagem. Nao ha topicos!");
            break;
    }
    admin.messaging().sendToTopic(topic,payload).then(function(response) {
    console.log("Mensagem enviada com sucesso: ", response);
  })
  .catch(function(error) {
    console.log("Erro no envio: ", error);
  });
});

exports.novoPedido = functions.database.ref("pedidoIngresso/{uid}").onCreate(snap =>{
    const data  = snap.data;
    const userID  = data.key;
    const userRef = admin.database().ref("users/"+userID);
    userRef.child("enviadoPedido").set(true);
});

exports.deferirCadastro = functions.https.onRequest((req,res) =>{
    const modo = req.query.resultado;
    const uid = req.query.uid;

    
    const pedidoRef = admin.database().ref("pedidoIngresso/" + uid);
    pedidoRef.once("value", snap =>{
        if(snap.exists()){
            var aluno = {
                nome : snap.child("nome").val(),
                matricula : snap.child("matricula").val(),
                cpf : snap.child("cpf").val(),
                uid : snap.key
            };
            const alunosRef = admin.database().ref("alunos/" + aluno.matricula);
            alunosRef.once("value", snap =>{
                if(snap.exists()){
                    //Nao fazer nada, ja que o aluno existe no sistema.
                    console.error("A matricula " + snap.key +" ja esta no sistema");
                    res.send("A matricula " + snap.key +" ja esta no sistema");
                    res.redirect("index.html");
                }
                else{ //continuar
                    //deferir ou indeferir?
                    if(modo == "deferido"){
                        //deferir aluno
                        console.log(aluno.cpf + " , " + aluno.matricula + " , " + aluno.nome + " , " + aluno.uid);
                        alunosRef.set(aluno);
                        
                        let userRef = admin.database().ref("users/" + uid);
                        userRef.child("confirmadoSecretaria").set(true); //confirma na secretaria.
                        pedidoRef.set(null); //apaga dos PedidosAcesso

                        console.log("Aluno de matricula " + aluno.matricula +" associado com o UID " + aluno.uid);
                        res.send("Aluno de matricula " + aluno.matricula +" associado com o UID " + aluno.uid);
                        //envia msg pro usuario
                    }
                    else if(modo == "indeferido"){
                        //indeferir aluno
                        pedidoRef.set(null);
                        let userRef = admin.database().ref("users/" + uid);
                        userRef.child("enviadoPedido").set(false);
                        console.log("Aluno de matricula " + aluno.matricula + " foi indeferido.");
                        res.send("Aluno de matricula " + aluno.matricula + " foi indeferido.");
                        //envia msg pro usuario
                    }
                    else{
                        //comando errado.
                        console.log("Metodo errado. Metodo deve ser \"deferido\" ou \"indeferido\".");
                        res.send("Metodo errado. Metodo deve ser \"deferido\" ou \"indeferido\".");
                    }
                    
                }
            });
        }
        else{
            console.log("UID " + uid + " nao se refere a um pedido.");
            res.send("UID " + uid + " nao se refere a um pedido.");
        }
        
    });

});

exports.pegarEmailAdmin = functions.https.onRequest((req,res)=>{
    const username = req.query.username;
    const adminRef = admin.database().ref("admin/" + username);
    adminRef.once("value", snap =>{
        if(snap.exists()){
            //caminho feliz
            console.log("username existe");
            res.header('Access-Control-Allow-Origin','*');
            res.status(200);
            res.send(snap.child("email").val());
        }
        else{
            //username nao existe
            res.header('Access-Control-Allow-Origin','*');
            res.sendStatus(404);

        }
    }, fail =>{
        res.sendStatus(500);
    });
});