//  Scripts
firebase.initializeApp({
  apiKey: "AIzaSyC9DkdsLY2SA6j3McDKkAPdTIcVVjUR8X8",
  authDomain: "thebundyteam.firebaseapp.com",
  databaseURL: "https://thebundyteam.firebaseio.com",
  projectId: "thebundyteam",
  storageBucket: "thebundyteam.appspot.com",
  messagingSenderId: "608738133731"
});

// Handling User Authentication

var data;
var a;

// Function to Clear
function clearFields() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Signup Function
function signupBundy() {
  // Set email and password as variables "email" and "password"
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // Firebase Authentication Signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user) {
    // Toast indicating registration was successful
    Materialize.toast("Registration Successful!", 4000);
    // Close Modal
    $('#modal1').modal('close');
    // clear the fields
    clearFields();
    var frame = {}
    for (i=1; i<= 12; i++) {
      frame[i] = {
        total: 0,
        sub: {
          rent: {
            fixed: true,
            expected: 0,
            actual: 0
          }
        }
      };
    }
    // use user.uid to add user data to database
    firebase.database().ref('users/' + user.uid).set({
      email: email,
      month: frame
    }).then(function() {
      location.replace("dashboard.html");
    });
    console.log("UID:", user.uid);
  }, function(error) {
    // Stores the error message in variable errorMessage
    var errorMessage = error.message;
    // Display the errorMessage to the user to correct their error
    Materialize.toast(errorMessage, 4000);
  });
}

// Signin Function
function signinBundy() {

// Set email and password as variables "email" and "password"
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Firebase Authentication Signin
  firebase.auth().setPersistence(
    firebase.auth.Auth.Persistence.SESSION).then(function () {
      return firebase.auth()
      .signInWithEmailAndPassword(email, password).then(function(user) {
        // get user UID upon successful login
        console.log("Login UID:", user.uid);
        // Toast indicating sign-in was successful
        Materialize.toast("You have been successfully signed in!", 4000);
        $('#modal1').modal('close');
        location.replace("dashboard.html");
      });
    }).catch(function(error) {
      // Stores the error message in variable errorMessage
      var errorMessage = error.message;
      // Display the errorMessage to the user to correct their error
      Materialize.toast(errorMessage, 4000);
    }
  );

}

// Logout Function
function logoutBundy(){
  // Attempts to sign-out
  firebase.auth().signOut().then(function() {
  // Toast for Logout
  Materialize.toast("You have been successfully logged out!", 4000);
  // Executes when Sign-out successful.
  location.replace("index.html")
  }).catch(function(error) {
  // Error Handling
  });
}

$(document).ready(function () {
  $(".button-collapse").sideNav();
  $(".modal").modal();
  $('.tooltipped').tooltip({delay: 50});
  $('.scrollspy').scrollSpy({"scrollOffset": 70});
});

// Read Database
function readData(func) {
  var user = firebase.auth().currentUser;
  var items = firebase.database().ref('users/' + user.uid + '/month');
  items.once("value").then(function (snap) {
    data = snap.val();
  }).then(func);
}

function loadDash() {
    var select = document.getElementById("dashboard-month");
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];

    for (month in data) {
      if (month === "10") {
        select.innerHTML += "<option value='" + month + "' selected>" + monthNames[month-1] + "</option>";
      } else if (month) {
        select.innerHTML += "<option value='" + month + "'>" + monthNames[month-1] + "</option>";
      }
    }
    $('select').material_select();
	  buildPage("10");
}

 //Builds
function buildPage(month) {
  var totalH = document.getElementById("dashboard-all");
  var totalD = document.getElementById("d-all");
  var content = document.getElementById("dashboard-content");

  var color = function (actual) {
    return (actual >= 0) ? "green" : "red";
  };

  var percent = function (a, e) {
    a = Number(a);
    e = Number(e);
    if (e === 0) {
      if (a === 0) {
        return 0;
      } else {
        return 100;
      }
    }
    var num = Math.abs(a / e) * 100;
    return (num <= 100)? num : 100;
  };

  var totalActual = 0;
  var totalExpect = Number(data[month].total);
  var j = 0;

  content.innerHTML = "";

  for (i in data[month].sub) {
    var item = data[month].sub[i];
    totalActual += Number(item.actual);
    totalExpect += Number(item.expected);


    var str = "<div class='col s12 m12 l6'><h5>" +
              i + " | $" + Number(item.actual) + " / $" + Number(item.expected) +
              "</h5><div class='bar z-depth-1'><div id='d-" + j + "'" +
              " class='amount " + color(item.actual) + " accent-4' style='width: " + percent(item.actual, item.expected) + "%;'></div></div><a class='waves-effect waves-light btn teal lighten-1 modal-trigger' href='#modal1' onclick='update(\"" + i + "\");'>Update</a></div>";
    content.innerHTML += str;
    j++;
  }

  totalH.innerHTML = "Budget | $" + totalActual + "/ $" + totalExpect;
  totalD.innerHTML = "<div class='" + color(totalActual) + " accent-4' style='width: " + percent(totalActual, totalExpect) + "%;'></div>"

}

function update(section) {
  console.log(section);
  var head = document.getElementById("section-name");
  var num = document.getElementById("section-amount");
  var month = document.getElementById("dashboard-month");
  month = month.options[month.selectedIndex].value;

  head.innerHTML = section;
  num.innerHTML = data[month].sub[section].actual + " / " + data[month].sub[section].expected;

}

function log(mode) {
  var head = document.getElementById("section-name").innerHTML;
  var num = document.getElementById("section-number").value;
  var monthi = document.getElementById("dashboard-month");
  monthi = monthi.options[monthi.selectedIndex].value;

  var valueTo;
  if (mode) {
    valueTo = Number(data[monthi].sub[head].actual) + Number(num);
    data[monthi].sub[head].actual = valueTo;

  } else {
    valueTo = Number(data[monthi].sub[head].actual) - Number(num);
    data[monthi].sub[head].actual = valueTo;

  }
  var userString = firebase.auth().currentUser.uid;

  var monthString = monthi.toString();
  var headString = head.toString()

  var dbqueryString = "/users" +"/" + userString + "/month/" + monthString +"/sub/" + headString;

  firebase.database().ref(dbqueryString).update({
    actual: valueTo
  });
  buildPage(monthi);
}

function loadEdit() {
  var select = document.getElementById("dashboard-month");
  var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
  ];

  for (month in data) {
    if (month === "10") {
      select.innerHTML += "<option value='" + month + "' selected>" + monthNames[month-1] + "</option>";
    } else if (month) {
      select.innerHTML += "<option value='" + month + "'>" + monthNames[month-1] + "</option>";
    }
  }
  $('select').material_select();
  loadList(10);
}

function loadList(month) {
  var list = document.getElementById("in-list");
  var j = 0;
  list.innerHTML = "";

  for (i in data[month].sub) {
    list.innerHTML += "<a id='i-" + j + "' href='javascript:loadDet(" + j + ", \"" + i + "\");' class='collection-item'>" + i + "</a>";
    j++;
  }
}

function loadDet(index, header) {
  if (a != null) {
    $("#i-" + a).removeClass("active");
  }
  $("#i-" + index).addClass("active");
  a = index;

  var month = document.getElementById("dashboard-month").value;
  var head = document.getElementById("in-name");
  var exp = document.getElementById("in-num");
  var act = document.getElementById("in-curr");
  var tog = document.getElementById("in-flex");

  head.innerHTML = header;
  exp.value = data[month].sub[header].expected;
  act.value = data[month].sub[header].actual;
  tog.checked = data[month].sub[header].fixed;
  tog.checked = !tog.checked;
  Materialize.updateTextFields();
}

function saveBudgetCategory() {
  var month = document.getElementById("dashboard-month").value;
  var head = document.getElementById("in-name").innerHTML;
  var exp = document.getElementById("in-num").value;
  var act = document.getElementById("in-curr").value;
  var tog = !(document.getElementById("in-flex").checked);


  var userString = firebase.auth().currentUser.uid;
  var dbqueryString = "/users" +"/" + userString + "/month/" + month.toString() +"/sub/" + head;
  console.log(dbqueryString);

  firebase.database().ref(dbqueryString).update({
    actual: act,
    expected: exp,
    fixed: tog.toString()
  });
  Materialize.toast("Budget has been updated.", 4000);
  readData();
}

function deleteBudgetCategory() {
  var month = document.getElementById("dashboard-month").value;
  var head = document.getElementById("in-name").innerHTML;
  var exp = document.getElementById("in-num").value;
  var act = document.getElementById("in-curr").value;
  var tog = !(document.getElementById("in-flex").checked);


  var userString = firebase.auth().currentUser.uid;
  var dbqueryString = "/users" +"/" + userString + "/month/" + month.toString() +"/sub/";
  console.log(dbqueryString);

  firebase.database().ref(dbqueryString).child(head).remove();
  location.reload();
}

function createBudgetCategory() {
  var head = document.getElementById("in-new").value;
  var month = document.getElementById("dashboard-month").value;
  var userString = firebase.auth().currentUser.uid;

  var dbqueryString = "/users" +"/" + userString + "/month/" + month.toString() +"/sub/" + head;

  if (head) {
    firebase.database().ref(dbqueryString).set({
      actual: 0,
      expected: 0,
      fixed: false
    });
    Materialize.toast("Your budget category has been added", 4000);
  } else {
    Materialize.toast("Your budget update has failed", 4000);
  }
  location.reload();
}
