firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'login.html'; //If User is not logged in, redirect to login page
  }
});