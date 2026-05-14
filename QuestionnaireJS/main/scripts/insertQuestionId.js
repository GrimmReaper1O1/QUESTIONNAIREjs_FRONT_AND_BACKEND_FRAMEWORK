let blankEverythingButPosition = () => {
     let objectArray2 = document.querySelectorAll('.formGroup');
console.log(objectArray2);

for (i = 0; i < objectArray2.length; i++) {
    if (objectArray2[i].id !== 'position') {
        if (objectArray2[i].value !== '') {
        objectArray2[i].value = '';
        } else {
            objectArray2[i].textContent = '';
        }

    }
} 

}

let changePosition = (position = null) => {
    let el = document.getElementById('position');
    pos = parseFloat(el.value) +1;
    if (!position) {
    el.value = pos;
    } else {
        el.value = parseFloat(position) +1;
    }
    console.log(el);
}
let gatherPositon = () => {

    let subjectId = sessionStorage.getItem('subjectId');
    let baseUrl = 'http://localhost:5000/api/auth/questionIds';
    const params = { subjectId: subjectId, option: 'position' };
    const queryString = new URLSearchParams(params).toString();
    apiUrl = `${baseUrl}?${queryString}`;
    

    fetch(apiUrl).then(async res => {
        if (res.ok) {
            let pos = res.body;
            changePosition(pos);
            // finish later.
            sessionStorage.setItem('needToFillPreviousQuestionIds', '1');
        } else {
            throw Error('The request did not go through.');
        }

    }).catch(error => {

    })

}

let collectInfoAndChangePage = (e) => {
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
   objectInfo.id = localStorage.getItem('id');
        objectInfo.subject = sessionStorage.getItem('subjectId');
    console.log(objectInfo);
    let url = 'http://localhost:5000/api/auth/questions/questionIds';
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, 
    //credentials: 'include', 
    // UNCOMMENT CREDENTIALS: INCLUDE FOR SSL TOKEN VERIFICATION HTTPONLY COOKIES
    body: JSON.stringify(objectInfo)};
    
    fetch(url, options).then(async res => {
            if (res.ok) {
                    let response = await res.json();
                    console.log(response);
                    sessionStorage.setItem('questionId', response.insertId);
                    // changePosition(position+1);
                    // finish when backend complete
                    location.href = '/main/insertQuestionInformation.html';
                } else {
                // blankEverythingButPosition();
                throw Error('It did not go through.');
                }
    }).catch(error => {
        console.log(error);
    })


}


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
        objectInfo.id = localStorage.getItem('id');
        objectInfo.subject = sessionStorage.getItem('subjectId');
    console.log(objectInfo);
    let url = 'http://localhost:5000/api/auth/questions/questionIds';
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, 
    //credentials: 'include', 
    // UNCOMMENT CREDENTIALS: INCLUDE FOR SSL TOKEN VERIFICATION HTTPONLY COOKIES
    body: JSON.stringify(objectInfo)};
    
    fetch(url, options).then(async res => {
            if (res.ok) {
                    let result = await res.json();
                    
                    changePosition();
                    blankEverythingButPosition();
                    // finish when backend complete
            
                } else {
            throw Error('It did not go through.');
        }
    }).catch(error => {
        console.log(error);
    })


}

// let addQuestionInformation = () => {

//     // sessionStorage(

// };