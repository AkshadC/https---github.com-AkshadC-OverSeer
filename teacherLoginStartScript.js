window.onload = function() {

    setWelcomeHeading();
    

  };
function setWelcomeHeading(){
    
    var Theading = document.getElementById("TeacherLoginHeading");
    var heading2 = "Welcome " + localStorage.getItem('AuserName')+"!";
    Theading.innerHTML = heading2;
}