const limit = 10;
let fetchIt = (option, limit = '', offset = '') => {
const baseUrl = 'http://localhost:5000/api/auth/questions/questionIds';
let queryString;
if (option === 'count') {
 queryString = {subjectId: sessionStorage.getItem('subjectId'), option: 'count'};
} else {
 queryString = {subjectId: sessionStorage.getItem('subjectId'), option: 'acquire', limit: limit, offset: offset};
}

const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result);
        
        if (option === 'acquire') {
            displayInformation(result.result);
            pagination(limit);
        } else {
            console.log(result.result[0].count)
            sessionStorage.setItem('count', result.result[0].count);
        }
    } else {
        throw Error('It did not go through!');
    }
}).catch(error => {
    console.log(error);
});
};
let goToQuestionId =  (e) => {
    e.preventDefault();
    const baseUrl = '/main/viewQuestionInformation.html';
    const query = {questionId: e.target.name};
    const Params = new URLSearchParams(query).toString();
    const url = `${baseUrl}?${Params}`;
    location.href = url;
};

let param = new URLSearchParams(window.location.search);
// console.log(Object.fromEntries(param.entries()));
const Params = Object.fromEntries(param.entries());
if (Params.reset === 'yes') {
    sessionStorage.removeItem('page');
    sessionStorage.removeItem('count');
}
if (sessionStorage.getItem('count') === null) {
fetchIt('count');

}

(sessionStorage.getItem('page') === null ? sessionStorage.setItem('page', 1) : 1);
console.log(sessionStorage.getItem('page'));



let pagination = (limit) => {

    let differenceHelper = (startPosition, endPosition, numberOfPages, sideLengthNum) => {
        if ((endPosition - startPosition) < ((sideLengthNum)+1)) {
            if ((startPosition+sideLengthNum) >= numberOfPages) {
                startPosition = endPosition - (sideLengthNum*2);
            } else if ((endPosition - startPosition) <= ((sideLengthNum)+1)) {

                endPosition =  startPosition + ((sideLengthNum)) ;
                startPosition = page - sideLengthNum;
                if (endPosition > numberOfPages) {
                    endPosition = numberOfPages;
                    startPosition = numberOfPages - ((sideLengthNum)+1);
                    if (page <= startPosition) {
                        startPosition = page - ((sideLengthNum)+1);

                    }
                }
            } 
            else {
                startPosition = page;
                endPosition = page +1
            }
            if (startPosition < 1 || (page - ((sideLengthNum*2))) > 1 && !(endPosition - startPosition) === ((sideLengthNum*2)+1)) {
                startPosition = 1;

                endPosition = (sideLengthNum*2)+1;
            }
        }
        if (page === 2) {
            startPosition = 1;
            endPosition = (sideLengthNum*2)+1;
        }
        if (page === numberOfPages-1) {
            startPosition = numberOfPages - (sideLengthNum*2);
        }
        if (endPosition > numberOfPages) {
            endPosition = numberOfPages;
        }
        if (startPosition < 1 ) {
            startPosition = 1;
        }
        console.log(startPosition, endPosition, page);
       return {start: startPosition, end: endPosition}
    }




    let sideLength = 1;
    let page = Number(sessionStorage.getItem('page'));
    let count = sessionStorage.getItem('count');
    console.log(count, limit, page);
    let numberOfPages = Math.ceil(Number(count) / Number(limit));
    let string = '';
    let endString = '';
    console.log(numberOfPages);
    let startPosition = 0;
    let endPosition = 0;
    if ((page-sideLength) <= 0) {
        startPosition = 1;
        console.log('one')
    } else {
        string = '<button name="1" onclick="goToPage(event)">1</button>...';
        startPosition = page;
        console.log('two');
    }
    if ((startPosition+sideLength) > numberOfPages) {
        string = '';
        startPosition = page-sideLength;
    if (page > 3) {
                string = '<button name="1" onclick="goToPage(event)">1</button>...';

    }
    if (page > numberOfPages -(sideLength+1)) {
        endPosition = numberOfPages;
    } else {
        endPosition = page + sideLength;
        endString = `...<button name="${numberOfPages}" onclick="goToPage(event)">${numberOfPages}</button>`;
    
    }
        console.log('three');
    } else {
        endPosition = page+sideLength;
        console.log('four');
        endString = `...<button name="${numberOfPages}" onclick="goToPage(event)">${numberOfPages}</button>`;
    }
    let position = differenceHelper(startPosition, endPosition, numberOfPages, sideLength);
    startPosition = position.start;
    endPosition = position.end;
    if (endPosition === numberOfPages) {
        endString = '';
    }
    if (startPosition === 1) {
        string = '';
    }

    for (let i = startPosition; i <= endPosition; i++) {
        string += `<button name="${i}" onclick="goToPage(event)">${i}</button>`;
    }
    string += endString
    
    
    let el = document.getElementById('pagination');
    el.innerHTML = string;
    
}


let displayInformation = (objectObject) => {
        
        let display = (objectObject1) => {
            console.log(objectObject1);
        let el = document.getElementById('informationDiv');
        let string = `<button class="clearButton" id="${objectObject1.position}" name="${objectObject1.questionId}" onclick="viewQuestionIds(event)">`;
        for (info of objectObject1.objectArray) {
            string +=  info + '<br>';
        }
        string += '</button>' + '<br><br>';
        el.innerHTML += string;
    };

    for (let objectArr of objectObject) {
    let objectArray = []
    let timestamp = new Date(objectArr.timestamp);
    objectArray.push(`Timestamp: ${timestamp.toString()}`);
    objectArray.push((objectArr.visible === 1 ? 'VISIBLE' : 'NOT VISIBLE'));
    objectArray.push(`Created by: ${objectArr.creator}`);
    objectArray.push(`Last altered by: ${objectArr.lastAlteredBy}`);
    objectArray.push(`Subject name: ${objectArr.name}`);
    objectArray.push(`Information: ${objectArr.info}`);
    
    let objectObject2 = {questionId: objectArr.questionId, objectArray: objectArray};
    display(objectObject2);
    }
    
};

let goToPage = (e) => {
    e.preventDefault();
 sessionStorage.setItem('page', e.target.name);
runDisplayAndGather();
}
let runDisplayAndGather = () => {
setTimeout(()=>{
    let el = document.getElementById('informationDiv');
    el.innerHTML = '';
    let page = sessionStorage.getItem('page');
let subjectId = sessionStorage.getItem('subjectId');
let count = sessionStorage.getItem('count');
console.log(count);
let numberOfPages = Math.ceil(count/limit);
let offset = (page-1) * limit;
fetchIt('acquire', limit, offset);},100);

};
runDisplayAndGather();
const editSubject = (e) => {
    e.preventDefault();
    location.href = '/main/alterSubject.html';


};

const viewQuestionIds = (e) => {
    e.preventDefault();
    sessionStorage.setItem('questionId', e.target.name);
    sessionStorage.setItem('position', e.target.position);
    console.log(sessionStorage.getItem('questionId'));
      const baseUrl = '/main/viewIndividualQuestionIds.html';
    const query = {questionId: e.target.name};
    const Params = new URLSearchParams(query).toString();
    const url = `${baseUrl}?${Params}`;
    location.href = url;
   }

   const addQuestionInformation = (e) => {

    e.preventDefault();


    location.href = '/main/insertQuestionId.html';

}