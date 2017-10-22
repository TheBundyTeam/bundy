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
    // use user.uid to add user data to database
    firebase.database().ref('users/' + user.uid).set({
      email: email,
      month: {
        10: {
          total: 0,
          sub: {
            rent: {
              fixed: true,
              expected: 0,
              actual: 0
            }
          }
        }
      }
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
function readData() {
  var user = firebase.auth().currentUser;
  var items = firebase.database().ref('users/' + user.uid + '/month');
  items.once("value").then(function (snap) {
    data = snap.val();

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
 });
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
    var num = Math.abs(a / e) * 100;
    return (num <= 100)? num : 100;
  };

  var totalActual = 0;
  var totalExpect = 0;
  var j = 0;

  content.innerHTML = "";

  for (i in data[month].sub) {
    var item = data[month].sub[i]
    totalActual += item.actual;
    totalExpect += item.expected;


    var str = "<div class='col s12 m12 l6'><h5>" +
              i + " | $" + item.actual + " / $" + item.expected +
              "</h5><div class='bar z-depth-1'><div id='d-" + j + "'" +
              " class='amount " + color(item.actual) + " accent-4' style='width: " + percent(item.actual, item.expected) + "%;'></div></div><a class='waves-effect waves-light btn teal lighten-1 modal-trigger' href='#modal1' onclick='update(\"" + i + "\");'>Update</a></div>";
    content.innerHTML += str;
    j++;
  }

  totalH.innerHTML = "Budget | $" + totalActual + "/ $" + data[month].total;
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
  console.log(monthi);
  console.log(month);
  var valueTo;
  if (mode) {
    valueTo = Number(data[monthi].sub[head].actual) + Number(num);
    data[monthi].sub[head].actual = valueTo;
    console.log(data[monthi].sub[head]);
    //String(valueTo);
    console.log(valueTo);
  } else {
    valueTo = Number(data[monthi].sub[head].actual) - Number(num);
    data[monthi].sub[head].actual = valueTo;
    //String(valueTo);
    console.log(valueTo);
  }
  var userString = firebase.auth().currentUser.uid;
  console.log(month);
  var monthString = monthi.toString();
  var headString = head.toString()
  console.log(monthString);
  console.log(headString);
  var dbqueryString = "/users" +"/" + userString + "/month/" + monthString +"/sub/" + headString;
  console.log(dbqueryString);
  firebase.database().ref(dbqueryString).update({
    actual: valueTo
  });
  buildPage(monthi);
}
