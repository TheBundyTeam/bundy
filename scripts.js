//  Scripts
firebase.initializeApp({
  apiKey: "AIzaSyC9DkdsLY2SA6j3McDKkAPdTIcVVjUR8X8",
  authDomain: "thebundyteam.firebaseapp.com",
  databaseURL: "https://thebundyteam.firebaseio.com",
  projectId: "thebundyteam",
  storageBucket: "thebundyteam.appspot.com",
  messagingSenderId: "608738133731"
});


// Handling User Authentication

// Function to Clear
function clearFields() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Signup Function
function signupBundy(){
  // Set email and password as variables "email" and "password"
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // Firebase Authentication Signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function () {
    // Toast indicating registration was successful
    Materialize.toast("Registration Successful!", 4000);
    // Close Modal
    $('#modal1').modal('close');
  }, function(error) {
    // Stores the error message in variable errorMessage
    var errorMessage = error.message;
    // Display the errorMessage to the user to correct their error
    Materialize.toast(errorMessage, 4000);
  });
}

// Signin Function
function signinBundy() {

// Set email and password as variables "email" and "password"
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Firebase Authentication Signin
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      // Toast indicating sign-in was successful
      Materialize.toast("You have been successfully signed in!", 4000);
      $('#modal1').modal('close');
      location.replace("dashboard.html")

    }).catch(function(error) {
      // Stores the error message in variable errorMessage
      var errorMessage = error.message;
      // Display the errorMessage to the user to correct their error
      Materialize.toast(errorMessage, 4000);
    }
  );
}


// Logout Function
function logoutBundy(){
  // Attempts to sign-out
  firebase.auth().signOut().then(function() {
  // Executes when Sign-out successful.
  location.replace("index.html")
  }).catch(function(error) {
  // Error Handling
  });
}


$(document).ready(function () {
  $(".button-collapse").sideNav();
  $(".modal").modal();
  $('.tooltipped').tooltip({delay: 50});
});
