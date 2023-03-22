window.onload = function() {
    var Aheading = document.getElementById("admin_login_heading");
    var Theading = document.getElementById("TeacherLoginHeading");
    var heading1 = "Welcome " + localStorage.getItem('AuserName')+"!";
    var heading2 = "Welcome " + localStorage.getItem('TuserName')+"!";
    Aheading.innerHTML = heading1;
    Theading.innerHTML = heading2;
  };