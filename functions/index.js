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

        if(modo == "deferido"){
            //deferir aluno
            res.send("UID " + uid + " foi deferido." );
        }
        else if(modo == "indeferido"){
            //indeferir aluno
            res.send("UID " + uid + " foi indeferido." );
        }
        else{
            res.send("O usuario " + uid + " nao existe.");
        }

});