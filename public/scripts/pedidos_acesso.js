var database = firebase.database();
var ss;
var pedidoRef = database.ref("pedidoIngresso");
window.onload = function(){
    var tabela = document.getElementById("tabela_corpo");
    pedidoRef.orderByKey().limitToFirst(20).on("child_added", snap =>{
        renderLinha(tabela,snap);
    });
}
/**
 * 
 * @param {HTMLTableElement} tabela 
 * @param {*} dados 
 */
function renderLinha(tabela,dados) {
    var row = tabela.insertRow();
    var matricula = row.insertCell(0); //matricula
    var nome = row.insertCell(1); //nome
    var cpf = row.insertCell(2); //cpf

    

    matricula.innerHTML = dados.child("matricula").val();
    nome.innerHTML = dados.child("nome").val();
    cpf.innerHTML = dados.child("cpf").val();

    adicionarBotoes(row,()=>{alert("Matricula" + dados.child("matricula").val() + "deferida.")},
                        ()=>{alert("Matricula" + dados.child("matricula").val() + "indeferida.")});

}
/**
 * 
 * @param {HTMLTableRowElement} row 
 * @param {Function} accept 
 * @param {Function} reject 
 */
function adicionarBotoes(row, accept, reject){
    var btnDeferir = document.createElement("button");
    var btnIndeferir = document.createElement("button");

    btnDeferir.innerHTML = "Deferir";
    btnDeferir.addEventListener("click",accept);
    row.insertCell(3).appendChild(btnDeferir);

    btnIndeferir.innerHTML = "Indeferir";
    btnIndeferir.addEventListener("click",reject);
    row.insertCell(4).appendChild(btnIndeferir);
}