let params = new URLSearchParams(location.href);
let reset = params.get('reset');
if (reset === 'yes') {
    sessionStorage.clear();
}

runFirst = async () => {

let insertInformation = (object) => {
    console.log(object);
    for (key in object) {
        let el = document.getElementById(key);
        console.log(key);
        if (key === 'introduction') {
            try {
                el.textContent = object[key];
            } catch {}
        } else {
            try {
                el.value = object[key];
            } catch {}
        }        
    }   
};

if (sessionStorage.getItem('subjectId') === null) {
    
    let string = ''
    for (let i = 1; i < 11; i++) {
        string += `Page Link ${i} <br>`;
        string += `<input class="formGroup" type="text" id="link${i}"/><br>`;
        string += `Link Description <br>`;
        string += `<textarea class="formGroup" cols="20" rows="3" id="linkDescription${i}"></textarea><br>`;

    }
    let element = document.getElementById('numberOfRemoval');
    let div = document.createElement('div');
    div.innerHTML = string;
    element.after(div);
   
    console.log(div);

} else {
    let string = ''
    for (let i = 1; i < 11; i++) {
        string += `Page Link ${i} <br>`;
        string += `<input class="formGroup" type="text" id="link${i}"/><br>`;
        string += `Link Description <br>`;
        string += `<textarea class="formGroup" cols="20" rows="3" id="linkDescription${i}"></textarea><br>`;
    }
    let element = document.getElementById('numberOfRemoval');
    let div = document.createElement('div');
    div.innerHTML = string;
    element.after(div);
    console.log(div);
    if (sessionStorage.getItem('info') === null) {
        const subjectId = sessionStorage.getItem('subjectId');
        console.log(subjectId);
        const baseUrl = 'http://localhost:5000/api/auth/questions/subject';
        const queryString = {id: subjectId, option: 'id', get: 'subject'};
        const params = new URLSearchParams(queryString).toString();
        const apiUrl = `${baseUrl}?${params}`
       await fetch(apiUrl).then(async res => {
    
        if (res.ok) {
            let result = await res.json();
            console.log(result.result[0]);
            insertInformation(result.result[0]);
            insertInformation(JSON.parse(result.result[0].links));
            sessionStorage.setItem('info', JSON.stringify(result.result[0]));
        } else {
            throw Error('It did not go through!');
        }
    }).catch(error => {
        console.log(error);
    });
    } else {
    insertInformation(JSON.parse(sessionStorage.getItem('info')));
            
    
    }

    }
}

runFirst();


let collectInfo = async (e) => {
    if (e !== 'not') e.preventDefault();
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
    console.log(JSON.parse(sessionStorage.getItem('info')))
    let obj = JSON.parse(sessionStorage.getItem('info'));
    
    objectInfo.version = obj.version; 
    console.log(objectInfo);
    sessionStorage.setItem('info', JSON.stringify(objectInfo));
    let objectInfo2 = {};
    let completeObject = {};
    for(key in objectInfo) {
        console.log(key);
        if (key.includes('link')) {
            console.log(objectInfo[key]);
            objectInfo2[key] = objectInfo[key];
            
        } else {
            completeObject[key] = objectInfo[key];
        }
    }
    completeObject['link'] = JSON.stringify(objectInfo2);
    console.log(completeObject);
    completeObject.creator = localStorage.getItem('id');
    
    completeObject['subjectId'] = sessionStorage.getItem('subjectId');
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(completeObject), 
    //credentials: 'include'
    // uncomment credentials for https httponly cookie 
    };
    
    let url = 'http://localhost:5000/api/auth/questions/subjectUpdate';
console.log(completeObject);
    await fetch(url, options).then(async req => {
        console.log(req);



        if (req.ok) {
            console.log('got here');
            let id = await req.json();
            console.log(id);
            if (sessionStorage.getItem('subjectId') === null) {
                sessionStorage.setItem('subjectId', Number(id.insertId));
            }
            if (sessionStorage.getItem('send') === 'yes') {
                sessionStorage.setItem('send', 'no');
                location.href = '/main/insertQuestionId.html';
            }
        
        } else {
            throw Error('The transmission did not go well.')
        }
        
        
    }).catch(error => {
        console.log(error);
    })
  
}

const insertAudio = async e => {
e.preventDefault();

sessionStorage.setItem('send', 'no');
await collectInfo('not');
location.href = '/main/insertAudio.html?alter=1';

}

const runFlashCards = async e => {
e.preventDefault();

sessionStorage.setItem('send', 'no');
await collectInfo('not');
location.href = '/main/viewFlashCards.html';

}

const insertVideo = async  e => {
e.preventDefault();

sessionStorage.setItem('send', 'no');
await collectInfo('not');
location.href = '/main/insertVideo.html?alter=1';

}

const insertAppendix = async e => {
e.preventDefault();

sessionStorage.setItem('send', 'no');
await collectInfo('not');
location.href = '/main/insertAppendix.html?alter=1';


}
const addFlashcardPage = async e => {
    e.preventDefault();
    sessionStorage.setItem('send', 'no');
    await collectInfo('not');
    location.href = '/main/addFlashcard.html';
}