
//Might delete when we get the authentication working
var userName = getElementById("");
var pass = getElementById("");

//User adds new income source
var incomeName = getElementById("");
//New or updated income amount
var incomeAmount = getElementById("");

// User adds new expense name or could be existing
var expenseName = getElementById("a");
// New or updated budget amount
var expenseAmount = getElementById("b");

firebase.initializeApp(firebaseConfig);

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
	firebase.database().ref('users/' + user.uid).set({
		expense: expenseAmount;
	});
	//Access the child nodes and set to value
	//For testing purposes, only one expense can be added and changed
	//fireData.child("expenses").set("expenses");
	//fireData.child("expenses").child("value").set(expenseAmount.value);
}

function AddIncome(){
	// Initialize the database
	firebase.database().ref('users/' + user.uid).set({
		income: incomeAmount;
	});
	//Access the child nodes and set to value
	//fireData.child("income").set("income");
	//fireData.child("income").child("value").set(incomeAmount.value);
}

function GetAllExpenses(){
	firebase.database().ref('users/' + user.uid).on('value', snap => {
		alert(JSON.stringify.(snap.val(), null, 1); //supposed to return the amount of income
	});
}

function GetAllIncome(){
	firebase.database().ref('users/' + user.uid).on('value', snap => {
		alert(JSON.stringify.(snap.val(), null, 1); //supposed to return the amount of income
	});
}