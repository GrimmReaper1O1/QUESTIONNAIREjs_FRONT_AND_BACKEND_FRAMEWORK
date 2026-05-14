let removeSplash = () => {
    let el = document.getElementById('mainSplashScreen');
    let el2 = document.getElementById('indexText');
    el2.classList.remove('hidden');
    el.classList.add('hidden');
}

let addSplash = () => {
    let el = document.getElementById('mainSplashScreen');
    let el2 = document.getElementById('indexText');
    el2.classList.add('hidden');
    el.classList.remove('hidden');

}
let blank = [];
 sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.removeItem('link');
    sessionStorage.removeItem('copyObj');
       sessionStorage.removeItem('csw2');
        sessionStorage.removeItem('csw1');
        sessionStorage.removeItem('fPath2');
       sessionStorage.removeItem('swap2');
        sessionStorage.removeItem('swap1');
    sessionStorage.removeItem('yesNo');