//  Scripts


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
  }).catch(function(error) {
  // Error Handling
  });
}
