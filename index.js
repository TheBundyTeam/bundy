//Might delete when we get the authentication working
//var userName = getElementById("email");
//var pass = getElementById("password");

//User adds new income source
var incomeName = getElementById("");
//New or updated income amount
var incomeAmount = getElementById("");

// User adds new expense name or could be existing
var expenseName = getElementById("");
// New or updated budget amount
var expenseAmount = getElementById("");

// Initialize the database
var fireData = firebase.database().ref();

function AddExpense(){
	//Access te child nodes and set to value
	fireData.child(expenseName).set(expenseName);
	fireData.child(expenseName).child("value").set(expenseAmount);
}

function AddIncome(){
	//Access te child nodes and set to value
	fireData.child(incomeName).set(incomeName);
	fireData.child(incomeName).child("value").set(incomeAmount);
}