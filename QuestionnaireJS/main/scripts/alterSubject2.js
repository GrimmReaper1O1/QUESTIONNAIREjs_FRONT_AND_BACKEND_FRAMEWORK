runFirst = () => {
    const insertInformation = (object) => {
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

    const subjectId = sessionStorage.getItem('subjectId');
    console.log(subjectId);
const baseUrl = 'http://localhost:5000/api/auth/questions/subject';
const queryString = {id: subjectId, option: 'id'};
const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

    fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result[0]);
        insertInformation(result.result[0]);
        insertInformation(JSON.parse(result.result[0].links));
        sessionStorage.setItem('last', JSON.stringify(result.result[0]));
    } else {
        throw Error('It did not go through!');
    }
}).catch(error => {
    console.log(error);
});




}
runFirst();

let collectInfo = (e) => {
    e.preventDefault();
    let objectArray = document.querySelectorAll('.formGroup');
    console.log(objectArray);
    let objectInfo = {};
    objectInfo.keys = [];
    for (i = 0; i < objectArray.length; i++) {
      
            objectInfo[objectArray[i].id] = objectArray[i].value;
            
     
        objectInfo.keys.push(objectArray[i].id);
    }
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
    completeObject.changes = sessionStorage.getItem('last');
    sessionStorage.removeItem('last');
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({object: completeObject, subjectId: sessionStorage.getItem('subjectId')}), 
    //credentials: 'include'
    // uncomment credentials for https httponly cookie 
    };
    
    let url = 'http://localhost:5000/api/auth/questions/subjectUpdate';

    fetch(url, options).then(async req => {
        console.log(req);



        if (req.ok) {
            console.log('got here');
            let id = await req.json();
            console.log(id);
            
            
        } else {
            throw Error('The transmission did not go well.')
        }
        
        
    }).catch(error => {
        console.log(error);
    })
    
    
}