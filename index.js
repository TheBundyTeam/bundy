//Might delete when we get the authentication working
//var userName = getElementById("email");
//var pass = getElementById("password");



// User adds new expense name or could be existing
var expenseName = getElementById("");
// New budget amount
var expenseAmount = getElementById("");

function logIn(){
	var fireData = firebase.database().ref();
	//Access te child nodes and set to value
	fireData.child(expenseName).set(expenseName);
	fireData.child(expenseName).child("value").set(expenseAmount);
}