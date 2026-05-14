let changeNumberOfQuestions = (e) => {
    if (!e.switcher) {
    e.preventDefault();
    }
    let numeral = Number(e.target.value);

    let el = document.getElementById('insertQuestions');
    let string = '';
    for (i = 1; i < numeral+1; i++) {
        string +=  `<br>`;
        string +=  `<label for="choice${i}">Choice ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="choice${i}"></textarea><label><br>`;
        string +=  `<label for="answer${i}">Answer ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="answer${i}"></textarea></label><br>`;
        console.log(string);
                }

    el.innerHTML = string;
}

let changeNumberOfHints = (e) => {
    if (!e.switcher) {
    e.preventDefault();
    }
    let numeral = Number(e.target.value);

    let el = document.getElementById('insertHints');
    let string = '';
    for (i = 0; i < numeral+1; i++) {

        string +=  `<label for="hint${i}">Hint ${i+1}:<br>`
        string +=  `<textarea class="formGroup"  cols="50" rows="2" id="hint${i}"></textarea><label><br><br>`;
        console.log(string);
                }

    el.innerHTML = string;
}


let falVal = {};
falVal.target = {};
falVal.target.value = 1;
falVal.switcher = true;
changeNumberOfQuestions(falVal);

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
    objectInfo.id = localStorage.getItem('id');

    if (typeof objectInfo.correct === 'string') {
        objectInfo.correct = Number(1);
    }
    
    console.log(objectInfo);
    let url = 'http://localhost:5000/api/auth/questions/questionInformation';
    let options = {method: 'PUT', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(objectInfo), 
    //credentials: 'include',
    // UNCOMMENT CREDENTIALS: INCLUDE FOR SSL TOKEN VERIFICATION HTTPONLY COOKIES
    };

    fetch(url, options).then(async req => {
        if (req.ok) {

            let result = await req.json();
            console.log('success', result);
            location.reload();
        } else {
        throw Error(`It didn't get through.`);
        }

    }).catch(error => {
        console.log(error);
    })

}
console.log(localStorage.getItem('id'));