var database = firebase.database();
var solicitacaoRef = database.ref("solicitacoes");
var pendenciasRef = database.ref("pendencias");
var alunosRef = database.ref("alunos");
var tst;
window.onload = function(){
    var tblPendencias = document.getElementById("lista_alunos");
    pendenciasRef.orderByKey().limitToFirst(20) //Ordem crescente a partir da pendencia mais antiga, 20 pendencias por vez.
    .on("child_added", dataSnapshot =>{
        pegarAlunoEmSolicitacao(dataSnapshot.key, dataSnapshot => {
            const dados = dataSnapshot.val();
            addLinha(tblPendencias, dados.nome,dados.matricula,"whatever");
        });
        
    });
    
};
/**
 * 
 * @param {HTMLTableElement} tabela 
 * @param {string} coisas 
 */
function addLinha(tabela, ...coisas){
    
    var row = tabela.insertRow(-1);
    for(var i =0; i < arguments.length - 1; i++){
        row.insertCell(i).innerHTML = coisas[i];
    }

}

function pegarAlunoEmSolicitacao(keySolicitacao,callback){ //a key de solicitacao e a mesma da pendencia
    console.log("key solicitacao: " + keySolicitacao);
    solicitacaoRef.child(keySolicitacao).child("mat_aluno").on("value", snap =>{
        console.log(snap.val());
        alunosRef.child(snap.val()).once("value",callback);
    });
}