var database = firebase.database();
var ss;
class Mock {
        constructor(nome,mat,cpf){
            this.nome = nome;
            this.matricula = mat;
            this.cpf = cpf;
        }
        child(property){
            return this[property];
        }

    }

var pedidoRef = database.ref("pedidoIngresso");
window.onload = function(){
    var tabela = document.getElementById("tabela_corpo");
    /*pedidoRef.orderByKey().limitToFirst(20).on("child_added", snap =>{
        renderLinha(tabela,snap);
    });*/

    //mockup data
    var data = [];
    for(var i = 0; i < 20; i++){
        var n = new Mock(faker.name.findName(),faker.random.number(),faker.random.number());
        renderLinha(tabela,n);
    }
    
}
/**
 * 
 * @param {HTMLTableElement} tabela 
 * @param {*} dados 
 */
function renderLinha(tabela,dados) {
    var row = tabela.insertRow();
    var nome = row.insertCell(0); //nome
    nome.classList.add("mdl-data-table__cell--non-numeric");
    var matricula = row.insertCell(1); //matricula
    
    var cpf = row.insertCell(2); //cpf

    

    matricula.innerHTML = dados.child("matricula").val();
    nome.innerHTML = dados.child("nome").val();
    cpf.innerHTML = dados.child("cpf").val();

    adicionarBotoes(row,()=>{console.log("Matricula" + dados.child("matricula").val() + "deferida.")},
                        ()=>{console.log("Matricula" + dados.child("matricula").val() + "indeferida.")});

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
    btnDeferir.className += "mdl-button mdl-js-button mdl-js-ripple-effect";
    row.insertCell(3).appendChild(btnDeferir);

    btnIndeferir.innerHTML = "Indeferir";
    btnIndeferir.addEventListener("click",reject);
    btnIndeferir.className += "mdl-button mdl-js-button mdl-js-ripple-effect";
    row.insertCell(4).appendChild(btnIndeferir);
}