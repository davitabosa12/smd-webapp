var tabela;
var btnEnvia;
var database;
var lol;
$(document).ready(function(){
    btnEnvia = document.getElementById("envia");
    btnEnvia.addEventListener("click",enviarDados,false);
    database = firebase.database();
    tabela = document.getElementsByTagName("table")[0];

    database.ref("users").on("value", function(dataSnapshot){
        console.log("ok");
        dataSnapshot.forEach(child =>{
            var nome = child.val().nome;
            var matricula = child.key;
            var cpf = child.val().cpf;
            //adiciona a linha na tabela
            addLinha(tabela,nome,Number(matricula),cpf);

        })//teste do lambda
    });
});
/**
 * Adiciona uma linha de alunos na tabela
 * @param {HTMLTableElement} tabela A tabela destino
 * @param {string} nome Nome do aluno
 * @param {number} matricula matricula do aluno
 * @param {string} cpf cpf do aluno
 */
function addLinha(tabela, nome, matricula, cpf){
    var row = tabela.insertRow(-1);
    var cellNome = row.insertCell(0);
    var cellMat = row.insertCell(1);
    var cellCpf = row.insertCell(2);

    cellNome.innerHTML = nome;
    cellMat.innerHTML = matricula;
    cellCpf.innerHTML = cpf;
}

//Retirado do site http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
//Verifica se CPF é válido
function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;   
    strCPF  = removerCaractereCPF(strCPF);
    if (strCPF == "00000000000")
	return false;
    for (i=1; i<=9; i++)
	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )
	return false;
	Soma = 0;
    for (i = 1; i <= 10; i++)
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false;
    return true;
}
function enviarDados(){
    var nome = document.getElementsByName("nome")[0].value;
    var matricula = document.getElementsByName("matricula")[0].value;
    lol = matricula;
    var cpf = document.getElementsByName("cpf")[0].value;
    var newUser = {
        nome: nome,
        matricula: matricula,
        cpf: cpf
    };
    if(TestaCPF(cpf) && !(matricula == undefined || matricula == "") ){
        database.ref("users").child(matricula).set(newUser);
    }
}
function removerCaractereCPF(strCPF){
    var nova = strCPF;
    nova = nova.replace(/([^0-9])/g,'');
    return nova;
}