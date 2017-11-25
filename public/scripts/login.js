var txtUsername;
var txtSenha;
var btnLogin;
var strEmail;
window.onload = () =>{
    init();
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            //Redirecionar para inicio
            window.location = "dashboard.html";
        }
    });
}

function init() {
    txtUsername = document.getElementById("username");
    txtSenha = document.getElementById("senha");
    btnLogin = document.getElementById("login");

    btnLogin.addEventListener("click",() =>{
         let strUsername = txtUsername.value;
         console.log(strUsername);
         let    strSenha = txtSenha.value;
         prepararLogin(strUsername, strSenha);
        //
    },false);
}

function realizarLogin(email, senha){
    firebase.auth().signInWithEmailAndPassword(email,senha).then(result =>{
        Materialize.toast("Logado",3000);
    }).catch(error =>{
        Materialize.toast("Erro: " + error,3000);
    });
}

function prepararLogin(username,senha){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                //caminho feliz
                realizarLogin(xhr.responseText,senha);              
                

            }
            else{
                if(this.status == 404){
                    Materialize.toast("Username nao encontrado",3000);
                }
            }
        }
        
    }
    xhr.open("GET","http://localhost:5001/smdevasao/us-central1/pegarEmailAdmin?username=" + username,true);
    xhr.send();
}

