
const limit = 10;
let fetchIt = (option) => {
const baseUrl = 'http://localhost:5000/api/auth/questions/questionIds';
let queryString;

 queryString = {questionId: sessionStorage.getItem('questionId'), option: option};


const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result);
        
            displayInformation(result.result);
    
        
    } else {
        throw Error('It did not go through!');
    }
}).catch(error => {
    console.log(error);
});
};



fetchIt('id');




let displayInformation = (objectObject) => {
        console.log(objectObject);
        sessionStorage.setItem('position', objectObject[0].position);
        let display = (objectObject1) => {
        let el = document.getElementById('informationDiv');
        let string = '';
        for (info of objectObject1.objectArray) {
            string +=  info + '<br>';
        }
        el.innerHTML += string;
    };

    for (let objectArr of objectObject) {
    let objectArray = []
    let timestamp = new Date(objectArr.timestamp);
    objectArray.push(`Timestamp: ${timestamp.toString()}`);
    objectArray.push((objectArr.visible === 1 ? 'VISIBLE' : 'NOT VISIBLE'));
    objectArray.push(`Created by: ${objectArr.creator}`);
    objectArray.push(`Last altered by: ${objectArr.lastAlteredBy}`);
    objectArray.push(`Question group name: ${objectArr.name}`);
    objectArray.push(`Information: ${objectArr.info}`);
    
    let objectObject2 = {questionId: objectObject.questionId, objectArray: objectArray};
    display(objectObject2);
    }
    
};




const editQuestionId = (e) => {
    e.preventDefault();
    location.href = '/main/alterQuestionIds.html';


};
const viewQuestionInformation = (e) => {
    e.preventDefault();
    location.href = '/main/viewQuestionInformation.html?reset=yes';

};
const goToQuestionInputPage = (e) => {
    e.preventDefault();
    location.href = '/main/inputIntoQuestionIds.html';
}

