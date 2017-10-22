
//Might delete when we get the authentication working
var email = getElementById("email");
var pass = getElementById("password");

//User adds new income source
var incomeName = getElementById("");
//New or updated income amount
var incomeAmount = getElementById("");

// User adds new expense name or could be existing
var expenseName = getElementById("a");
// New or updated budget amount
var expenseAmount = getElementById("b");

firebase.initializeApp(firebaseConfig);

function AddUser(){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			
			firebase.database().ref('users/' + users.uid).set({
				email:email;
			});
		}
});

function AddExpense(){
	firebase.database().ref('users/' + user.uid).child("email").set({
		expense: expenseAmount;
	});
}

function AddIncome(){
	firebase.database().ref('users/' + user.uid).child("email").set({
		income: incomeAmount;
	});
}

function GetAllExpenses(){
	return firebase.database().ref('users/' + user.uid).child("email").on('value', GetData, Errors);
}

function GetData(data){
	Console.log(data.val());
	return data.val();
}

function Errors(err){
	alert(err);
}

function GetAllIncome(){
	return firebase.database().ref('users/' + user.uid).child("email").on('value', GetData, Errors);
}