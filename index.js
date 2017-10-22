
function AddExpense(){
	var expenseName = "expense"; //document.getElementById("").val();
	var expenseAmount = 666; //document.getElementById("").val();
	firebase.database().ref('users/' + user.uid).set({
		expenses : expenseAmount
	});
}

function AddIncome(){
	//User adds new income source
	var incomeName = "income"; //document.getElementById("").val();
	//New or updated income amount
	var incomeAmount = 555; //document.getElementById("").val();
	firebase.database().ref('users/' + user.uid).set({
		income : incomeAmount
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