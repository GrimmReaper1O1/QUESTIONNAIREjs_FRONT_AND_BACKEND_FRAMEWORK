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
  $imgMenu.attr('src', '../IMAGES/menu.png');
  $imgMenu.attr('width', '40px');
  $imgMenu.attr('height', '40px');
  $imgMenu.attr('background-color', 'black')


  $buttonMainMenu.append($imgMenu);
  $divInnerButton.append($buttonMainMenu);
  $divMainButtonDiv.append($divInnerButton);

  $divTopRight.append($divMainButtonDiv);
  let $divMainMenuDiv = $('<div>', { id: 'mainMenuDiv' });
  $divMainMenuDiv.attr('style', 'background-color: rgb(0,0,0,0.5); padding: 2rem;')

  let $index = $('<span>', { id: 'index' }).text('INDEX');
  let $createTraining = $('<span>', { id: 'train' }).text('TRAINING');
  let $inputTraining = $('<span>', { id: 'input'}).text('INPUT TRAINING!');

  let $enterOrCopyInformation = $('<span>', { id: 'eTrain' }).text('CREATE TRAINING');
  let $signOut = $('<span>', { id: 'signOut'}).text('SIGN OUT!');
  let $search = $('<span>', { id: 'search'}).text('SEARCH!');

  $divMainMenuDiv.append($index).append('<br>');
  $divMainMenuDiv.append($createTraining).append('<br>');
  $divMainMenuDiv.append($inputTraining).append('<br>');
  $divMainMenuDiv.append($enterOrCopyInformation).append('<br>');
  $divMainMenuDiv.append($search).append('<br>');
  $divMainMenuDiv.append($signOut).append('<br>');

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
  $links[1] = $('#train');
  $links[2] = $('#eTrain');
  $links[3] = $('#signOut')
  $links[4] = $('#search');
  $links[5] = $('#input')

   let href = [];
  href[0] = '/main/mainPage.html';
  href[1] = '/main/pickSubject.html';
  href[2] = '/main/createTraining.html';
  href[3] = '/main/signOut.html';
  href[4] = '/main/searchForSubject.html?reset=yes';
  href[5] = '/main/inputSubject.html';

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
        location.href = root + href[i];
      });




    };

  }

// }())
