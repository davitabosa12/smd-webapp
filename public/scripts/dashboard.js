var welcome;
var usuario;
window.onload = function(){
     init();
}

function init(){
    welcome = document.getElementById("welcome");
    firebase.auth().onAuthStateChanged(user =>{
       usuario = user;
       updateUI();
    });
}

function updateUI(){
    if(usuario){
        //user esta logado
        welcome.innerHTML += usuario.uid;
    }
    else{
        //User nao esta logado
    }
}