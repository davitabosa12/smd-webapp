var database = firebase.database();
var solicitacaoRef = database.ref("solicitacoes");
var pendenciaRef = database.ref("pendencias");

window.onload = function(){
   var btnEnvia = document.getElementById("envia");
   btnEnvia.addEventListener("click",enviarParaFirebase);
    
};

function enviarParaFirebase(){
    var mat = document.getElementsByName("mat")[0].value;
    var agora = Date.now();
    var newSolicitacao = {
        mat_aluno: mat,
        data: agora
    };
    var push = solicitacaoRef.push();
    push.set(newSolicitacao);

    console.log(push.key);
    pendenciaRef.child(push.key).set(true); //TODO: Fazer com Cloud Functions


}