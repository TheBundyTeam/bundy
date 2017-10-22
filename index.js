//Might delete when we get the authentication working
var userName = getElementById("");
var pass = getElementById("");

//User adds new income source
var incomeName = getElementById("");
//New or updated income amount
var incomeAmount = getElementById("");

// User adds new expense name or could be existing
var expenseName = getElementById("");
// New or updated budget amount
var expenseAmount = getElementById("");

/*
function NewAccount(){
	const auth = firebase.auth();
	const account = auth.createUserWithEmailAndPassword(username.value, pass.value).catch(function(error){
		alert(error.message);
	});
}

function LogIn(){
	const auth = firebase.auth();
	const logged = auth.signInWithEmailAndPassword(userName.value, pass.value).catch(function(error){
		alert(error.message);
	});
}

function LogOut(){
	firebase.auth.signOut().catch(function(error){
		alert(error.message);
	});
}
*/

function AddExpense(){
	//Initialize the database
	var fireData = firebase.database().ref();
	//Access the child nodes and set to value
	//For testing purposes, only one expense can be added and changed
	fireData.child("expenses").set("expenses");
	fireData.child("expenses").child("value").set(expenseAmount.value);
}

function AddIncome(){
	// Initialize the database
	var fireData = firebase.database().ref();
	//Access the child nodes and set to value
	fireData.child("income").set("income");
	fireData.child("income").child("value").set(incomeAmount.value);
}

function GetAllExpenses(){
	var database = firebase.database().ref();
	database.child("expenses").on('child_added', function(data, prev){
		var info = data.val();
		alert(info.value);
	});
}

function GetAllIncome(){
	var database = firebase.database().ref();
	database.child("income").on('child_added', function(data, prev){
		var info = data.val();
		alert(info.value);
	});
}