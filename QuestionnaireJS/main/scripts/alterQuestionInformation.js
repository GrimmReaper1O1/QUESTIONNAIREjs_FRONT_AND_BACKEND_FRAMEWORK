console.log(sessionStorage.getItem('informationId'));

let fill = (object) => {    
for (key in object) {


    try {
        let el = document.querySelector('#'+key);
        console.log(el);
        if (el.id.includes('choice') && !el.id.includes('correct')) {
            el.textContent = object[key];
        } else {
            el.value = object[key];
        }
    } catch {
        console.log('a value was null');
    }

    }
};

let changeNumberOfQuestions = (e) => {
    if (!e.switcher) {
    e.preventDefault();
    }
    let numeral = Number(e.target.value);

    let el = document.getElementById('insertQuestions');
    let string = '';
    for (i = 0; i <= numeral; i++) {
        string +=  `<br>`;
        string +=  `<label for="choice${i}">Choice ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="choice${i}"></textarea><label><br>`;
        string +=  `<label for="reply${i}">Answer ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="reply${i}"></textarea></label><br>`;
        console.log(string);
                }

    el.innerHTML = string;
    fill(JSON.parse(sessionStorage.getItem('info')));
};

let changeNumberOfHints = (e) => {
    if (!e.switcher) {
    e.preventDefault();
    }
    let numeral = Number(e.target.value);

    let el = document.getElementById('insertHints');
    let string = '';
    if (numeral !== 0) {
    for (i = 0; i < numeral; i++) {

        string +=  `<label for="hint${i}">Hint ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="hint${i}"></textarea><label><br><br>`;
        console.log(string);
                }
            }
    el.innerHTML = string;
fill(JSON.parse(sessionStorage.getItem('info')));

};

let fetchIt = () => {
const baseUrl = 'http://localhost:5000/api/auth/questions/questionInformation';
let queryString = {informationId: sessionStorage.getItem('informationId'), option: 'informationId'};

console.log(sessionStorage.getItem('informationId'));
const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result);
        
            displayInformation(result.result[0]);
            sessionStorage.setItem('info', JSON.stringify(result.result[0]));
        
    } else {
        throw Error('It did not go through!');
    }
}).catch(error => {
    console.log(error);
});
};



fetchIt();



const haveNotFilled = () => {

    if (sessionStorage.getItem('needToFillPreviousQuestionIds') === '1') {
        sessionStorage.setItem('needToFillPreviousQuestionIds', '2');        
        
        
    } else if (sessionStorage.getItem('needToFillPreviousQuestionIds') === '2') {   
        let el = document.getElementById('needToFill');
        el.classList.remove('hidden');
        sessionStorage.removeItem('needToFillPreviousQuestionIds');
}

}

haveNotFilled();


let collectInfo = (e) => {
    e.preventDefault();
    let objectArray = document.querySelectorAll('.formGroup');
    console.log(objectArray);
    let objectInfo = {};
    objectInfo.keys = [];
    for (i = 0; i < objectArray.length; i++) {
        if (objectArray[i].value !== '') {
            objectInfo[objectArray[i].id] = objectArray[i].value;
        } else {
            objectInfo[objectArray[i].id] = objectArray[i].textContent;
        
        }
        objectInfo.keys.push(objectArray[i].id);
    } 
    objectInfo.subjectId = sessionStorage.getItem('subjectId');
    objectInfo.questionId = sessionStorage.getItem('questionId');
    objectInfo.informationId = sessionStorage.getItem('informationId');
    objectInfo.creator = localStorage.getItem('id');
    if (typeof objectInfo.correct === 'string') {
        objectInfo.correct = Number(objectInfo.correctChoice);
    }
    
    
    console.log(objectInfo);
    let url = 'http://localhost:5000/api/auth/questions/questionInformationUpdate';
    let options = {method: 'PUT', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(objectInfo), 
    //credentials: 'include',
    // UNCOMMENT CREDENTIALS: INCLUDE FOR SSL TOKEN VERIFICATION HTTPONLY COOKIES
    };

    fetch(url, options).then(async req => {
        if (req.ok) {

            let result = await req.json();
            console.log('success', result);
            // location.reload();
        } else {
        throw Error(`It didn't get through.`);
        }

    }).catch(error => {
        console.log(error);
    })

}




let displayInformation = (object) => {

    let string1 = '';
    let string2 = '';
    let count = 1;
    let count2 = 1;
        for (key in object) {
        if (object[key] !== null && key.includes('choice') && !key.includes('correct')) {
             string1 +=  `<br>`;
        string1 +=  `<label  class="this" for="${key}">${'Choice '+count}:<br>`
        string1 +=  `<textarea class="formGroup this" cols="50" rows="2" id="${key}"></textarea><label><br>`;        
        string1 +=  `<label class="this" for="${'reply'+(count-1)}">Answer ${(count)}:<br>`
        string1 +=  `<textarea class="formGroup this"  cols="50" rows="2" id="${'reply'+(count-1)}"></textarea></label><br>`;
       count++
        }
         if (object[key] !== null && key.includes('hint')) {
             string2 +=  `<br>`;
        string2 +=  `<label class="this" for="${key}">${'Hint '+count2}:<br>`
        string2 +=  `<textarea class="formGroup this"  cols="50" rows="2" id="${key}"></textarea><label><br>`;
        count2++
        }
    }
        console.log(string1);
      const htmlString = '<p class="text">Hello World</p>';
let el1 = document.getElementById('insertQuestions');
let el2 = document.getElementById('insertHints');
let template1 = document.createElement('div');
let template2 = document.createElement('div');
template1.innerHTML = string1;
template2.innerHTML = string2;
el1.appendChild(template1);
el2.appendChild(template2);
   fill(object);
};