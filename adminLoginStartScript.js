window.onload = function() {

    setWelcomeHeading();
    
  };

function setWelcomeHeading(){
  var Aheading = document.getElementById("admin_login_heading");
  var heading1 = "Welcome " + localStorage.getItem('AuserName')+"!";
  Aheading.innerHTML = heading1;
}
