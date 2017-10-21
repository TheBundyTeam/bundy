/* jshint node: true */
var hasher = require('password-hash');

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