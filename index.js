
function ModifyExpense(){
	var total_expenses = "expense"; //document.getElementById("").val();
	var expenseAmount = 666; //document.getElementById("").val();
	firebase.database().ref(firebase.auth().currentUser.uid).set({
		total_expenses : expenseAmount
	});
}

function ModifyIncome(){
	//User adds new income source
	var total_budget = "income"; //document.getElementById("").val();
	//New or updated income amount
	var budget = 555; //document.getElementById("").val();
	firebase.database().ref(firebase.auth().currentUser.uid).set({
		total_budget : budget
	});
}

function GetExpenses(){
	return firebase.database().ref(firebase.auth().currentUser.uid).on('value', GetData, Errors);
}

function GetData(data){
	return data.val();
}

function Errors(err){
	alert(err);
}

function GetIncome(){
	return firebase.database().ref(firebase.auth().currentUser.uid).on('value', GetData, Errors);
}
