
function AddExpense(){
	// User adds new expense name or could be existing
	var expenseName = document.getElementById("");
	// New or updated budget amount
	var expenseAmount = document.getElementById("");
	firebase.database().ref('users/' + user.uid).child("email").set({
		expense: expenseAmount;
	});
}

function AddIncome(){
	//User adds new income source
	var incomeName = document.getElementById("");
	//New or updated income amount
	var incomeAmount = document.getElementById("");
	firebase.database().ref('users/' + user.uid).child("email").set({
		income: incomeAmount;
	});
}

function GetAllExpenses(){
	return firebase.database().ref('users/' + user.uid).child("email").on('value', GetData, Errors);
}

function GetData(data){
	console.log(data.val());
	return data.val();
}

function Errors(err){
	console.log(err);
}

function GetAllIncome(){
	return firebase.database().ref('users/' + user.uid).child("email").on('value', GetData, Errors);
}