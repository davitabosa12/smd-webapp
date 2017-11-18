var txtEmail;
var txtSenha;
var btnLogin;
window.onload = () =>{
    init();
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            //Redirecionar para inicio
            window.location = "dashboard.html";
        }
    })
}

function init() {
    txtEmail = document.getElementById("email");
    txtSenha = document.getElementById("senha");
    btnLogin = document.getElementById("login");

    btnLogin.addEventListener("click",() =>{
        let strEmail = txtEmail.value;
        let strSenha = txtSenha.value;
        realizarLogin(strEmail,strSenha);
    },false);
}

function realizarLogin(email, senha){
    firebase.auth().signInWithEmailAndPassword(email,senha).catch(error =>{
        alert("Falha no login: " + error);
    });
}

