// (function () {
  let ruview = 0;
  let ru = 0;
  var root = location.protocol + '//' + location.host;

  let $divTopBar = $('#menu').css({ "z-index": 10,
    "position": "fixed", 'width': '180px',  'top': 5,
    "right": 0,});
  let $divTopRight = $('<div>', { id: 'topRight' }).css({'float': 'right', 'clear': 'both'});
  let $divMainButtonDiv = $('<div>', { id: 'mainButtonDiv' });

  let $divInnerButton = $('<div>', { id: 'innerButtonDiv' });
  $buttonMainMenu = $('<button>', { id: 'mainMenuButton' });
  $buttonMainMenu.attr('style', 'background: none !important;');
  $buttonMainMenu.css({ 'border': 'none', })
  let $imgMenu = $('<img>', {
    id: 'mainMenuImage',
  });
  $imgMenu.attr('src', '/IMAGES/menu.png');
  $imgMenu.attr('width', '40px');
  $imgMenu.attr('height', '40px');
  $imgMenu.attr('background-color', 'black')


  $buttonMainMenu.append($imgMenu);
  $divInnerButton.append($buttonMainMenu);
  $divMainButtonDiv.append($divInnerButton);

  $divTopRight.append($divMainButtonDiv);
  let $divMainMenuDiv = $('<div>', { id: 'mainMenuDiv' });
  $divMainMenuDiv.attr('style', 'background-color: rgb(0,0,0,0.5);')

  let $index = $('<span>', { id: 'index' }).text('HOME');
  let $createTraining = $('<span>', { id: 'train' }).text('TRAINING');
  let $enterOrCopyInformation = $('<span>', { id: 'eTrain' }).text('CREATE TRAINING');
  let $login = $('<span>', { id: 'log' }).text('LOGIN');

  $divMainMenuDiv.append($index).append('<br>');
  // $divMainMenuDiv.append($createTraining).append('<br>');
  // $divMainMenuDiv.append($enterOrCopyInformation).append('<br>');
  $divMainMenuDiv.append($login).append('<br>');

  $divTopRight.append($divMainMenuDiv);
  $divTopBar.append($divTopRight);




  let $menuDivArray = [];

  $menuDivArray[0] = $('#mainMenuDiv').toggle();
  let $menuSelectorArray = [];
  $menuSelectorArray[0] = $('#mainMenuButton');
  let toggles = [];
  toggles[0] = 0;
  toggles[1] = 0;
  let $links = [];
  $links[0] = $('#index');
  
 

  let href = [];
  href[0] = '/index.html';


  function clicker(the, nu, men, togs) {
    the[nu].click(function (e) {
      e.preventDefault();
      if (togs[nu] == 0) {

        men[nu].toggle(200, 'swing').animate({ opacity: 1 }, 200);

      } else {
        men[nu].animate({ opacity: 0 }, 200).toggle(200, 'swing');

      }
    });
  }

  for (let i = 0; i < $menuSelectorArray.length; i++) {



    clicker($menuSelectorArray, i, $menuDivArray, toggles);

  }
  
  for (let i = 0; i < $links.length; i++) {
    if (typeof $links[i] != 'undefined') {



      $links[i].click(function (e) {
        window.location.replace(root + href[i]);
      });




    };

  }

  let loginDiv = document.getElementById('loginDiv');
$login.click(()=>{

  console.log(loginDiv);
  loginDiv.classList.remove('display-none');
  let backButton = document.getElementById('back');
  console.log(backButton);
  backButton.addEventListener('click', ()=>{
    loginDiv.classList.add('display-none');
  })
});

let submitData = (e)  => {
  e.preventDefault();
  let credentials = {};
  console.log('got here');
  let pass = document.getElementById('password').value;
 let email = document.getElementById('email').value;
  if (pass.length > 4 && email.length > 6) {
    
    credentials.email = document.getElementById('email').value ;
    credentials.password  = document.getElementById('password').value ;
    let options = {method: 'POST', headers: {'Content-Type': 'application/json',}, withCredentials: true,  body: JSON.stringify(credentials)};
    let url = 'http://localhost:5000/signin';
    
    fetch(url, options).then(async req => {
      
        if (req.ok) {
        let info = await req.json()
        console.log(info);
        
        if (info.message === 'Login successfull!') {

          localStorage.setItem('id', info.id);
          console.log(localStorage.getItem('id'));
         setTimeout(()=>{location.href = '/main/mainPage.html'}, 100);
        }
        
        }

      }

    ).catch(error => {
      console.log(error);
    });
  
  }
};
let signUp = (e) => {
  e.preventDefault() ;
  location.href = '/signUp.html';

}



// }())
