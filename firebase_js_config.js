function enrollTeacher() {

  var counterRef = firebase.database().ref("FacultyCounter/myCollectionCounter");
  const teachersDB1 = firebase.database().ref("Faculty");
  var firstName = document.getElementById("Fname-a001").value;
  var lastName = document.getElementById("Lname-a001").value;
  var emailID = document.getElementById("email-0df9").value;
  var age = document.getElementById("number-f2c8").value;
  var DOB = document.getElementById("date-cd51").value;
  var phoneNo = document.getElementById("phone-c786").value;
  var subject = document.getElementById("text-afa2").value;
  var dept = document.getElementById("select-c87d").value;
  var city = document.getElementById("Cname-3409").value;
  var street = document.getElementById("Sname-3409").value;
  var zipCode = document.getElementById("Zname-3409").value;
  var country = document.getElementById("country-3409").value;
  var address = street + " " + zipCode + " " + city + " " + country + " ";

  counterRef.transaction(function (currentValue) {
    return (currentValue || 0) + 1;
  }, function (error, committed, snapshot) {
    if (error) {
      console.log("Transaction failed abnormally!", error);
    } else if (!committed) {
      console.log("Transaction aborted because the counter location is null.");
    } else {
      // Get the incremented counter value
      var newCounterValue = snapshot.val();
      var tName = "F" + newCounterValue;
      // Add the new item with the incremented counter value as the key
      var newItemRef = teachersDB1.child(tName);
      const newteacher = {
        ID: "F" + newCounterValue,
        FirstName: firstName,
        LastName: lastName,
        EmailID: emailID,
        Age: age,
        DOB: DOB,
        PhoneNo: phoneNo,
        Subject: subject,
        Dept: dept,
        Address: address
      };
      newItemRef.set(newteacher);
      var msg = "NEW FACULTY ADDED SUCCESSFULLY WITH ID " + "(" + "F" + newCounterValue + ")!!";
      showAlert(msg, "success", "Admin_Login.html", "Sucess", "#AAFF00");

    }
  });


}
function deleteFaculty() {

  var fID = document.getElementById("name-558c").value;


  // Get a reference to the Firebase Realtime Database collection you want to delete
  var path = "Faculty/" + fID;
  var myCollectionRef = firebase.database().ref(path);

  // Use the once() method to read the child nodes of the collection
  myCollectionRef.once("value").then(function (snapshot) {
    // Loop through the child nodes of the collection and delete them one by one
    if (snapshot.exists()) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childRef = myCollectionRef.child(childKey);
        childRef.remove();

        myCollectionRef.remove().then(function () {
          showAlert("FACULTY DELETED", "success", "Admin_Login.html", "Success!", "#AAFF00");

        })
      });
    }
    else {
      showAlert("FACULTY NOT FOUND", "warning", "DeleteFaculty.html", "Alert!", "#FF2E2E");
    }
  });
}
function showAlert(message, icon, fun, title, color) {
  const alertopt = {
    title: title,
    text: message,
    icon: icon,
    confirmButtonText: "OK",
    confirmButtonColor: color,
  };
  if (fun != "") {
    swal.fire(alertopt).then((result) => {
      if (result.isConfirmed) {
        window.location.href = fun;
      }
    });
  }
  else {
    swal.fire(alertopt);
  }


}

function enrollStudent() {
  var firstName = document.getElementById("Fname-49a7").value;
  var lastName = document.getElementById("Lname-49a7").value;
  var emailID = document.getElementById("email-8edf").value;
  var age = document.getElementById("number-72f9").value;
  var DOB = document.getElementById("date-a094").value;
  var phoneNo = document.getElementById("phone-4384").value;
  var div = document.getElementById("text-aaed").value;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let selectedValue;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  var year = selectedValue;
  var dept = document.getElementById("select-2d99").value;

  var city = document.getElementById("Cname-b2f3").value;
  var street = document.getElementById("Sname-b2f3").value;
  var zipCode = document.getElementById("Zname-b2f3").value;
  var country = document.getElementById("country-b2f3").value;

  var address = street + " " + zipCode + " " + city + " " + country + " ";

  var studentPath = "Students/" + dept + "/" + year + "/" + div;
  var counterpath = "StudentsCounter/" + dept + "/" + year + "/" + div;
  var student = firebase.database().ref(studentPath);
  var counter = firebase.database().ref(counterpath);

  counter.transaction(function (currentValue) {
    return (currentValue || 0) + 1;
  }, function (error, committed, snapshot) {
    if (error) {
      console.log("Transaction failed abnormally!", error);
    } else if (!committed) {
      console.log("Transaction aborted because the counter location is null.");
    } else {
      var newCounterValue = snapshot.val();
      var rollNo = "S" + newCounterValue;
      var newStudentRef = student.child(rollNo);
      const stud = {
        RollNo: rollNo,
        FirstName: firstName,
        LastName: lastName,
        emailID: emailID,
        age: age,
        DOB: DOB,
        phoneNo: phoneNo,
        dept: dept,
        address: address,
        Div: div
      };
      newStudentRef.set(stud);
      localStorage.setItem('NewStudentCheck','old')
      var msg = "NEW STUDENT ADDED SUCCESSFULLY WITH ROLL NO " + "(" + "S" + newCounterValue + ")!!";
      showAlert(msg, "success", "Admin_Login.html", "Sucess", "#AAFF00");

    }

  });
}
function enrollStudentFromTeacher() {
  var firstName = document.getElementById("Fname-49a7").value;
  var lastName = document.getElementById("Lname-49a7").value;
  var emailID = document.getElementById("email-8edf").value;
  var age = document.getElementById("number-72f9").value;
  var DOB = document.getElementById("date-a094").value;
  var phoneNo = document.getElementById("phone-4384").value;
  var div = document.getElementById("text-aaed").value;
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let selectedValue;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  var year = selectedValue;
  var dept = document.getElementById("select-2d99").value;

  var city = document.getElementById("Cname-b2f3").value;
  var street = document.getElementById("Sname-b2f3").value;
  var zipCode = document.getElementById("Zname-b2f3").value;
  var country = document.getElementById("country-b2f3").value;

  var address = street + " " + zipCode + " " + city + " " + country + " ";

  var studentPath = "Students/" + dept + "/" + year + "/" + div;
  var counterpath = "StudentsCounter/" + dept + "/" + year + "/" + div;
  var student = firebase.database().ref(studentPath);
  var counter = firebase.database().ref(counterpath);

  counter.transaction(function (currentValue) {
    return (currentValue || 0) + 1;
  }, function (error, committed, snapshot) {
    if (error) {
      console.log("Transaction failed abnormally!", error);
    } else if (!committed) {
      console.log("Transaction aborted because the counter location is null.");
    } else {
      var newCounterValue = snapshot.val();
      var rollNo = "S" + newCounterValue;
      var newStudentRef = student.child(rollNo);
      const stud = {
        RollNo: rollNo,
        FirstName: firstName,
        LastName: lastName,
        emailID: emailID,
        age: age,
        DOB: DOB,
        phoneNo: phoneNo,
        dept: dept,
        address: address,
        Div: div
      };
      newStudentRef.set(stud);
      var msg = "NEW STUDENT ADDED SUCCESSFULLY WITH ROLL NO " + "(" + "S" + newCounterValue + ")!!";
      showAlert(msg, "success", "Teacher_login.html", "Sucess", "#AAFF00");

    }

  });
}

let otp = Math.floor(100000 + Math.random() * 900000);

function AsendOtp() {
  var TO = document.getElementById("name-2b50").value;
  var database = firebase.database();
  if(TO.substr(-13) === "@dypvp.edu.in"){
    database.ref("Admins").orderByChild("EmailID").equalTo(TO).once("value").then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          var adminName = childSnapshot.key;
          localStorage.setItem('AdminKey', adminName);
          var path = "Admins/" + adminName + "/FirstName";
          var dbRef = firebase.database().ref(path);
          dbRef.once("value").then(function (snapshot1) {
            var name = snapshot1.val();
            localStorage.setItem('AuserName', name);
          }).catch(function (error) {
            console.error(error);
          });
          var loggedInAdminKey = localStorage.getItem('AdminKey');
          var name = "";
            firebase.database().ref('Admins/'+loggedInAdminKey).once("value")
              .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                  
                  const key = childSnapshot.key;
                  if(key === 'About'){
                    localStorage.setItem('AAboutTextAdmin',childSnapshot.val());
                    
                  }
                  else if(key === 'EmailID'){
                    localStorage.setItem('AEmailDescription',childSnapshot.val());
                   
                  }
                  else if(key === 'PhoneNo'){
                    localStorage.setItem('APhoneNoDescription',childSnapshot.val());
                  
                  }
                  else if(key === 'Address'){
                    localStorage.setItem('AAddressDescription',childSnapshot.val());
                  
                  }else if(key === 'DOB'){
                    localStorage.setItem('ADOBDescription',childSnapshot.val());
                    
                  }
                  else if(key === 'FirstName'){
                      name = name+childSnapshot.val();
                  }
                  else if(key === 'LastName'){
                    name = name+ " " +childSnapshot.val();
                }
                localStorage.setItem('AName',name);
                });
              });
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "akshadclg@gmail.com",
            Password: "546777A00214ED311839906610D4BDBAE1D8",
            To: TO,
            From: "akshadclg@gmail.com",
            Subject: "Your OveerSeer Login OTP",
            Body: "The OTP is: " + otp
          }).then(
            showAlert("OTP SENT TO: " + TO, "success", "", "Success!", "#AAFF00")
          );
        });
      }
      else {
        showAlert("Invalid EMAIL ID , Please Try again", "error", "", "Oops!", "#FF2E2E");
        document.getElementById("name-2b50").value = "@dypvp.edu.in";
      }
  });
  }
  else{
    showAlert("Not An Official Institute Email ID, Please Try again", "error", "", "Oops!", "#FF2E2E");
    document.getElementById("name-2b50").value = "@dypvp.edu.in";
  }


}


function FSendOtp() {
  var TO = document.getElementById("name-F").value;
  var database = firebase.database();

  if(TO.substr(-13) === "@dypvp.edu.in"){

    database.ref("Faculty").orderByChild("EmailID").equalTo(TO).once("value").then(function (snapshot) {
      
      if (snapshot.exists()) {

        snapshot.forEach(function (childSnapshot) {
          console.log("HI");
          var teacherName = childSnapshot.key;

          localStorage.setItem('TeacherKey', teacherName);

          var path = "Faculty/" + teacherName + "/FirstName";

          var dbRef = firebase.database().ref(path);

          dbRef.once("value").then(function (snapshot1) {
            var name = snapshot1.val();
            localStorage.setItem('AuserName', name);

          }).catch(function (error) {
            console.error(error);
          });
          var loggedInAdminKey = localStorage.getItem('TeacherKey');
          var name = "";
            firebase.database().ref('Faculty/'+loggedInAdminKey).once("value")
              .then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                  
                  const key = childSnapshot.key;
                  if(key === 'About'){
                    localStorage.setItem('AAboutTextAdmin',childSnapshot.val());
                    
                  }
                  else if(key === 'EmailID'){
                    localStorage.setItem('AEmailDescription',childSnapshot.val());
                   
                  }
                  else if(key === 'PhoneNo'){
                    localStorage.setItem('APhoneNoDescription',childSnapshot.val());
                  
                  }
                  else if(key === 'Address'){
                    localStorage.setItem('AAddressDescription',childSnapshot.val());
                  
                  }else if(key === 'DOB'){
                    localStorage.setItem('ADOBDescription',childSnapshot.val());
                    
                  }
                  else if(key === 'FirstName'){
                      name = name+childSnapshot.val();
                  }
                  else if(key === 'LastName'){
                    name = name+ " " +childSnapshot.val();
                }
                localStorage.setItem('AName',name);
                });
              });
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "akshadclg@gmail.com",
            Password: "546777A00214ED311839906610D4BDBAE1D8",
            To: TO,
            From: "akshadclg@gmail.com",
            Subject: "Your OveerSeer Login OTP",
            Body: "The OTP is: " + otp
          }).then(
            showAlert("OTP SENT TO: " + TO, "success", "", "Success!", "#AAFF00")
          );
        });
      }
      else {
        showAlert("Invalid EMAIL ID , Please Try again", "error", "", "Oops!", "#FF2E2E");
        document.getElementById("name-2b50").value = "@dypvp.edu.in";
      }
  });
  }
  else{
    showAlert("Not An Official Institute Email ID, Please Try again", "error", "", "Oops!", "#FF2E2E");
    document.getElementById("name-2b50").value = "@dypvp.edu.in";
  }



}











function adminVerifyOTP() {
  var recOTP = document.getElementById("email-2b50").value;
  var emailID = document.getElementById("name-2b50").value;
  if (Number(otp) == Number(recOTP)) {
    window.location.href = "Admin_Login.html";
  }
  else {
    showAlert("Invalid OTP, Please Try again", "error", "", "Oops!", "#FF2E2E");
    document.getElementById("name-2b50").value = emailID;
    document.getElementById("email-2b50").value = "";
  }
}

function teacherVerifyOTP() {
  var recOTP = document.getElementById("email-F").value;
  var emailID = document.getElementById("name-F").value;
  localStorage.setItem('userName', emailID);

  if (Number(otp) == Number(recOTP)) {
    window.location.href = "Teacher_Login.html";
  }
  else {
    showAlert("Invalid OTP, Please Try again", "error", "", "Oops!", "#FF2E2E");

    document.getElementById("name-F").value = emailID;
    document.getElementById("email-F").value = "";
  }
}

function downloadFirebaseDataByKeyAsCSV(databaseURL, authToken, key) {
  // Fetch the data for the specific key using the Firebase REST API
  fetch(databaseURL + '/' + key + '.json?auth=' + authToken)
    .then(response => response.json())
    .then(data => {
      // Convert the data to CSV format
      const csvData = convertToCSV({[key]: data});

      // Create a download link for the CSV file
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
      downloadLink.setAttribute('download', key + '.csv');
      document.body.appendChild(downloadLink);
      
      // Trigger the download
      downloadLink.click();
      
      // Remove the download link from the DOM
      document.body.removeChild(downloadLink);
    })
    .catch(error => console.error(error));
}

// Convert JSON data to CSV format
function convertToCSV(data) {
  const keys = Object.keys(data);
  const rows = [];

  // Add header row with column names
  rows.push(Object.keys(data[keys[0]]).join(','));

  // Add data rows
  for (const key in data) {
    rows.push(Object.values(data[key]).join(','));
  }

  // Combine rows into a single CSV string
  return rows.join('\n');
}
function getAttendance(){
  
}

function editStudentDetails(){

}