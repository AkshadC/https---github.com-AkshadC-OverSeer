
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
      localStorage.setItem('NewStudentCheck', 'old')
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
  var attendanceRef = firebase.database().ref('Attendance' + '/' + dept + '/' + year + '/' + div);
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
      showAlert(msg, "success", "Teacher_Login.html", "Sucess", "#AAFF00");

    }

  });
}

let otp = Math.floor(100000 + Math.random() * 900000);

function AsendOtp() {
  var TO = document.getElementById("name-2b50").value;
  var database = firebase.database();
  if (TO.substr(-13) === "@dypvp.edu.in") {
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
          firebase.database().ref('Admins/' + loggedInAdminKey).once("value")
            .then((snapshot) => {
              snapshot.forEach((childSnapshot) => {

                const key = childSnapshot.key;
                if (key === 'About') {
                  localStorage.setItem('AAboutTextAdmin', childSnapshot.val());

                }
                else if (key === 'EmailID') {
                  localStorage.setItem('AEmailDescription', childSnapshot.val());

                }
                else if (key === 'PhoneNo') {
                  localStorage.setItem('APhoneNoDescription', childSnapshot.val());

                }
                else if (key === 'Address') {
                  localStorage.setItem('AAddressDescription', childSnapshot.val());

                } else if (key === 'DOB') {
                  localStorage.setItem('ADOBDescription', childSnapshot.val());

                }
                else if (key === 'FirstName') {
                  name = name + childSnapshot.val();
                }
                else if (key === 'LastName') {
                  name = name + " " + childSnapshot.val();
                }
                localStorage.setItem('AName', name);
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
  else {
    showAlert("Not An Official Institute Email ID, Please Try again", "error", "", "Oops!", "#FF2E2E");
    document.getElementById("name-2b50").value = "@dypvp.edu.in";
  }


}


function FSendOtp() {
  var TO = document.getElementById("name-F").value;
  var database = firebase.database();

  if (TO.substr(-13) === "@dypvp.edu.in") {

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
          firebase.database().ref('Faculty/' + loggedInAdminKey).once("value")
            .then((snapshot) => {
              snapshot.forEach((childSnapshot) => {

                const key = childSnapshot.key;
                if (key === 'About') {
                  localStorage.setItem('AAboutTextAdmin', childSnapshot.val());

                }
                else if (key === 'EmailID') {
                  localStorage.setItem('AEmailDescription', childSnapshot.val());

                }
                else if (key === 'PhoneNo') {
                  localStorage.setItem('APhoneNoDescription', childSnapshot.val());

                }
                else if (key === 'Address') {
                  localStorage.setItem('AAddressDescription', childSnapshot.val());

                } else if (key === 'DOB') {
                  localStorage.setItem('ADOBDescription', childSnapshot.val());

                }
                else if (key === 'FirstName') {
                  name = name + childSnapshot.val();
                }
                else if (key === 'LastName') {
                  name = name + " " + childSnapshot.val();
                }
                else if (key == 'Subject') {
                  localStorage.setItem('TeacherSubject', childSnapshot.val())
                }
                localStorage.setItem('AName', name);
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
  else {
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

function getAttendance() {


  const keyRef = firebase.database().ref('Attendance/CE/BE');

  const headers = [];


  keyRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val();

      // Convert the data into an array of objects
      const dataArray = Object.keys(data).map((key) => {
        return data[key];
      });



      Object.keys(dataArray[0]).forEach(header => {
        headers.push(header);
      });

      displayFurther(headers);



    });

}
function displayFurther(headers) {

  var year = document.getElementById("select-0cf8").value;
  var division = document.getElementById("select-14e7").value;
  var fromDate = document.getElementById("date-f412").value;
  var toDate = document.getElementById("date-bfca").value;
  var sub = localStorage.getItem("TeacherSubject");
  const keyRef2 = firebase.database().ref('Attendance/CE/BE/B');

  keyRef2.once('value', (snapshot) => {
    const data = snapshot.val();


    const newData = Object.keys(data).map((key, index) => {
      return { 'OVERSEER': headers[index], ...data[key] };
    });


    for (let i = 0; i < newData.length; i++) {

      const data = newData[i];
      for (const key in data) {
        if (key != "OVERSEER") {
          for (const k in data[key]) {

            if (data[key][k] != "EL5") {

              data[key][k] = "  ";
            }
          }
        }

      }
    }

    const parsedData = Papa.parse(Papa.unparse(newData), { header: true });

    const [month1, day1, year1] = fromDate.split('/');
    const date1 = new Date(`${month1}-${day1}-${year1}`);

    const [month2, day2, year2] = toDate.split('/');
    const date2 = new Date(`${month2}-${day2}-${year2}`);

    const convertedDateString1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')}`;
    const convertedDateString2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;



    const minDate = new Date(convertedDateString1);
    const maxDate = new Date(convertedDateString2);

    parsedData.meta.fields.forEach(field => {


      const colDate = new Date(field);
      if (colDate > maxDate) {
        const columnIndex = parsedData.meta.fields.indexOf(field);

        // Delete the column from the data
        parsedData.data.forEach(row => {
          delete row[field];
        });

        // Remove the column name from the header
        parsedData.meta.fields.splice(columnIndex, 1);
      }
      else if (colDate < minDate) {
        const columnIndex = parsedData.meta.fields.indexOf(field);

        // Delete the column from the data
        parsedData.data.forEach(row => {
          delete row[field];
        });

        parsedData.meta.fields.splice(columnIndex, 1);
      }
    });


    const parsedObject = Papa.parse(Papa.unparse(parsedData));
    const rows = parsedObject.data;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        const newValue = value.replace(/,/g, ' ');
        row[j] = newValue;
      }
    }


    const tableDiv = document.getElementById('tableContainer');
    tableDiv.style.top = '50px';
    tableDiv.style.margin = '0 auto';
    tableDiv.innerHTML = '';

    const table = document.createElement('table');
    tableDiv.style.width = "1000px";
    tableDiv.style.height = "500px";
    table.style.borderCollapse = 'collapse';
    rows.forEach(row => {
      const tableRow = table.insertRow();
      Object.values(row).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        td.style.border = '1px solid black';
        td.style.padding = '5px';
        tableRow.appendChild(td);
      });
    });
    table.style.borderCollapse = 'collapse';
    table.style.border = '2px solid black';

    table.style.overflow = 'auto';

    // Set the cell styles
    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.border = '2px solid black';
      cell.style.padding = '8px';
      cell.style.textAlign = 'center';
    });
    table.style.backgroundColor = 'white';
    table.style.width = tableDiv.offsetWidth + "px";
    table.style.height = tableDiv.offsetHeight + "px";
    tableDiv.style.overflow = "auto";
    tableDiv.appendChild(table);
    window.scrollBy(0, 300);

  });

}




function downloadCSV() {

  const keyRef = firebase.database().ref('Attendance/CE/BE');

  const headers = [];


  keyRef.once('value')
    .then((snapshot) => {
      const data = snapshot.val();

      // Convert the data into an array of objects
      const dataArray = Object.keys(data).map((key) => {
        return data[key];
      });



      Object.keys(dataArray[0]).forEach(header => {
        headers.push(header);
      });
      downloadFurther(headers);
    });
}

function downloadFurther(headers) {
  var year = document.getElementById("select-0cf8").value;
  var division = document.getElementById("select-14e7").value;
  var fromDate = document.getElementById("date-325e").value;
  var toDate = document.getElementById("date-8ddc").value;
  var sub = localStorage.getItem("TeacherSubject");
  const keyRef = firebase.database().ref('Attendance/CE/BE');
  const keyRef2 = firebase.database().ref('Attendance/CE/BE/B');
  const path = 'Subjects/BE/CE/B/EL5';
  const subjects = firebase.database().ref('Subjects/BE/CE/B/');
  const subRef = firebase.database().ref(path);

  var subMap;
  subjects.once('value',(snapshot)=>{
    const value = snapshot.val();
    subMap = value;
  });

  keyRef2.once('value', (snapshot) => {
    const data = snapshot.val();


    const newData = Object.keys(data).map((key, index) => {
      return { 'OVERSEER': headers[index], ...data[key] };
    });
    const tempData = newData;
    const parsedDataa = Object.values(newData).map(obj => Object.values(obj));
    const firstROW = Object.keys(newData[0]);
    
    firstROW.push("Attendance_Percentage");
    console.log(firstROW);
    for (let i = 0; i < parsedDataa.length; i++) {
      const row = parsedDataa[i];
      for(var j = 1; j<row.length;j++){
        if(Array.isArray(row[j])){

        }
      }
      row.push(count.toString());
    }
    console.log(parsedDataa);
    parsedData.unshift(firstROW);

    var value;

    subRef.once('value',(snapshot)=> {
      value = snapshot.val();
    
      localStorage.setItem('value', value);

    });

    parsedData.slice(1).forEach(function (row) {
      var lastColumnIndex = row.length - 1;
      row[lastColumnIndex] = (row[lastColumnIndex] / parseInt(localStorage.getItem('value'))) * 100 + "%";
    });

  });
}
function downloadcsv(csv, filename) {

  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(csvData, filename);
  } else {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvData);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
function editStudentDetails() {

  const parsedData1 = Object.values(tempData).map(obj => Object.values(obj));

  var individual = [];
  for (var i = 0; i < parsedData1.length; i++) {
    var ele = parsedData1[i];
    var countMap= { "HPC":0,"EL5":0,"EL6":0,"DL":0};
    for (var j = 0; j < ele.length; j++) {
      
      if (Array.isArray(ele[j])) {
        var element = ele[j];
        
        for (var k = 0; k < element.length; k++) {
          var subElement = element[k];

          if(subElement !="NA"){
            countMap[subElement] = (countMap[subElement] || 0) + 1;
          };
        }
      } 
    }
    individual.push(countMap);
  }
  
  var final = [];
  for(var i = 0; i < individual.length; i++){
    
    var ele = individual[i];
    var res = "";
    for (var key in ele) {
      if (ele.hasOwnProperty(key)) {

        var value = ele[key];

        for(var subject in subMap){

          var total = subMap[subject];
          if(key===subject){
            res = res + key + ': ' + (value/total)*100 + "% ";
          }
        }
      }
    }
    final.push(res);
  }

  for (var i = 0; i < parsedData1.length; i++) {
    parsedData1[i].push(final[i]);
    
  }
  
  const firstROWALL = Object.keys(newData[0]);
  firstROWALL.push("All Subject % \n for the given range");
  parsedData1.unshift(firstROWALL);
  const csv1 = Papa.unparse(parsedData);
  console.log(parsedData);
  const csv2 = Papa.unparse(parsedData1); 
  const mergedCsv = `${csv1}\n\n${csv2}`;
  console.log(mergedCsv);
  //downloadcsv(mergedCsv,'NEW.csv');
}