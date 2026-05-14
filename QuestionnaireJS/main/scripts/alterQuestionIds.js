runFirst = () => {
    const insertInformation = (object) => {
            console.log(object);
            for (key in object) {
                let el = document.getElementById(key);
                console.log(key);
                if (key === 'info') {
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
    
   

    let questionId = sessionStorage.getItem('questionId');
    console.log(questionId);
const baseUrl = 'http://localhost:5000/api/auth/questions/questionIds';
const queryString = {questionId: questionId, option: 'id'};
const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

    fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result[0]);
        insertInformation(result.result[0]);
       
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
    let completeObject = {};
    let objectInfo = {};
    objectInfo.keys = [];
    for (i = 0; i < objectArray.length; i++) {
       
            completeObject[objectArray[i].id] = objectArray[i].value;
            
        
        
    }

    
    console.log(completeObject);
    completeObject.creator = localStorage.getItem('id');
    completeObject.changes = sessionStorage.getItem('last');
    sessionStorage.removeItem('last');
    let options = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({subjectId: JSON.parse(sessionStorage.getItem('subjectId')), object: completeObject, questionId: sessionStorage.getItem('questionId')}), 
    //credentials: 'include'
    // uncomment credentials for https httponly cookie 
    };
    console.log(options);
    let url = 'http://localhost:5000/api/auth/questions/questionIdsUpdate';

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