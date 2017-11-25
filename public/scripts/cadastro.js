var password;
var passwordConfirm;
var btnEnviar;
var txtUsername
var txtEmail;
$(document).ready(function(){
    txtUsername = document.getElementById("username");
    txtEmail = document.getElementById("email");

    password = document.getElementById("senha");
    password.addEventListener("focus",confereSenha,false);
    password.addEventListener("focusout",confereSenha,false);
    password.addEventListener("keyup",confereSenha,false);

    passwordConfirm = document.getElementById("senha-repita");
    passwordConfirm.addEventListener("focus",confereSenha,false);
    passwordConfirm.addEventListener("focusout",confereSenha,false);
    passwordConfirm.addEventListener("keyup",confereSenha,false);
    
    btnEnviar = document.getElementById("enviar");
    btnEnviar.addEventListener("click",cadastrar,false);

});

function confereSenha(){
        if(password.value === passwordConfirm.value 
        && password.value != "" 
        && passwordConfirm.value != ""){
            passwordConfirm.classList.remove("invalid");
            passwordConfirm.classList.add("valid");
        }
        else{
            passwordConfirm.classList.remove("valid");
            passwordConfirm.classList.add("invalid");

        }
}
function checaCampos(){
    if(password.value != "" 
    && passwordConfirm != ""
    && txtEmail.value != ""
    && txtUsername.value != "")
        return true;
    else
        return false;
}
function cadastrar(){
    if(checaCampos()){
        novoAdmin(txtUsername.value,txtEmail.value,password.value);
    }
    else{
        Materialize.toast("Preencha todos os campos.", 5000);
    }
}
function novoAdmin(username, email, senha){
    var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, senha).then(user =>{
        var uid = user.uid;
        var adminRef = firebase.database().ref("admin/" + username);
        var newAdmin = {
            username: username,
            uid: uid,
            email: email
        }
        adminRef.set(newAdmin);
        Materialize.toast("Cadastrado com sucesso!", 3000);
    }).catch(error =>{
        Materialize.toast("Houve um erro no cadastro: " + error, 3000);
    });
}