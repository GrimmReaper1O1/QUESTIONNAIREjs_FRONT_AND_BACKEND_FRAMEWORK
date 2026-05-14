let sendInfo = (e) => {
  e.preventDefault();
  let info = {};
  info.firstName = document.getElementById('firstName').value;
  info.middleNames = document.getElementById('middleNames').value;
  info.surname = document.getElementById('surname').value;
  info.email = document.getElementById('email').value;
  info.pass0 = document.getElementById('pass0').value;
  info.pass1 = document.getElementById('pass1').value;
  
  if (info.pass0 === info.pass1 && info.email.length > 5 && info.firstName.length > 2 && 
    info.middleNames.length > 2 && info.surname.length > 2 && info.email.length > 6 && info.pass1.length > 5) {
      delete info.pass1;
      let options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(info)};
      let url = 'http://localhost:5000/signup';

      fetch(url, options).then(async res => {
         
        if (res.ok){
          
          let response = await res.json();
          let body = response;
          console.log(response);
          sessionStorage.setItem('id', response.id);
setTimeout(()=>{location.href = '/main/mainPage.html'}, 100);
        }
        throw Error('it is not finnished');
      }).catch(error => {
        console.log(error);
      })


  }


}


let back = (e)=> {
  e.preventDefault();
  location.href = '/';
}