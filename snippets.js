/* jshint node: true */
var hasher = require('password-hash');
var firebase = require('firebase');

var authentication = firebase.auth();

// creates user with email and password
authentication.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
});

// sign in existing user
authentication.signInWithEmailAndPassword(email, password).catch(function(error) {
    // handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
});

function writeUserData(userId, email, password) {
    var database = firebase.database();
    var hashPassword = getHashPassword(password);
    database.ref('users/' + userId).set({
        email: email,
        password: hashPassword
    });
}

function getHashPassword(password) {
    var hashPassword = hasher.generate(password)
    return hashPassword;
}

function authenticate(email, password) {
    
}