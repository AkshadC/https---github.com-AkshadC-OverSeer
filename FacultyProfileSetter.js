window.onload = function () {
    setProfilePage();
  };
  
  function setProfilePage() {
    
    document.getElementById('NameDescription').innerHTML = localStorage.getItem('AName');
    document.getElementById('AboutTextAdmin').innerHTML = localStorage.getItem('AAboutTextAdmin');
    document.getElementById('EmailDescription').innerHTML = localStorage.getItem('AEmailDescription');
    document.getElementById('PhoneNoDescription').innerHTML = localStorage.getItem('APhoneNoDescription');
    document.getElementById('AddressDescription').innerHTML = localStorage.getItem('AAddressDescription');
    document.getElementById('DOBDescription').innerHTML = localStorage.getItem('ADOBDescription');
  
  }