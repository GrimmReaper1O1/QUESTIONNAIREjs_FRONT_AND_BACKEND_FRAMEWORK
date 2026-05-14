
const limit = 4;
let param = new URLSearchParams(location.search);
let reset = param.get('reset');

if (reset === 'yes') {
sessionStorage.removeItem('page');
sessionStorage.setItem('page', 1);
} else {
(sessionStorage.getItem('page') === 'null' ? sessionStorage.setItem('page', 1) : ()=>{})
}

let deepCopy = (obj) => {
    if (obj === null) {
        return obj;
    }
    let copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (typeof obj[key] !== 'object' && typeof obj[key] !== 'array') {
            copy[key] = obj[key];
        } else if (typeof obj[key] === 'array') {
            for (let i = 0; i < obj[key].length; i++) {
                if (typeof obj[key][i] === 'array') {
                    copy.push((deepCopy(obj[key][i])));
                } else {
                    copy.push(obj[key][i]);
                }
            }
        } else if (typeof obj === 'object') {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy
}

console.log(sessionStorage.getItem('subjectId'));
let fetchIt = (option, limit = '', offset = '') => {
const baseUrl = 'http://localhost:5000/api/auth/questions/questionInformation';
let queryString;
if (option === 'count') {
    queryString = {questionId: sessionStorage.getItem('questionId'), option: 'count'};
} else {
 queryString = {questionId: sessionStorage.getItem('questionId'), option: 'normalOffset', limit: limit, offset: offset};
}

const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`

fetch(apiUrl).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result.result);
        if (option === 'count') {
            sessionStorage.setItem('count', result.result[0].count);
        } else {
            displayInformation(result.result);
        }
        
    } else {
        throw Error('It did not go through!');
    }
}).catch(error => {
    console.log(error);
});
};



fetchIt('count');

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



let displayInformation = (objectArray) => {
        
        let display = (objectArray1) => {
        let el = document.getElementById('informationDiv');
        let counter = 0;
        console.log(objectArray1);


        console.log(objectArray1);
        objectObject4 = {};
        
        let getArraysAndObject = (objectObject4) => {
            let choiceArr = [];
            let replyArr = [];
            let hintArr = [];
            let everything = {};
            for (anotherKey in objectObject4) {
                console.log(anotherKey);
            
                if (anotherKey.includes('CHOICE') && !anotherKey.includes('CORRECT')) {
                   
                    choiceArr.push({name: anotherKey, value: objectObject4[anotherKey]});
                    
                } else if (anotherKey.includes('REPLY')) {
                    
                    replyArr.push({name: anotherKey, value: objectObject4[anotherKey]});
                    
                } else if (anotherKey.includes('HINT')) {
                    
                    hintArr.push({name: anotherKey, value: objectObject4[anotherKey]});
                   
                } else {
                    everything = {...everything, ...{[anotherKey]:{name: anotherKey, value: objectObject4[anotherKey]}, [`${(anotherKey === 'INFORMATION ID' ? 'informationId' : anotherKey)}`]: objectObject4[anotherKey]}};
                }
            
            }
            console.log(everything);
            let returnArray = [];
            returnArray.push(everything);
            returnArray.push(hintArr);
            returnArray.push(choiceArr);
            returnArray.push(replyArr);
            return returnArray
            
        }
        let string = '';
        for (let u = 0; u < objectArray1.length; u++) {
            let objectObject4 = deepCopy(objectArray1[u]);
            console.log(objectObject4);
            let arr = getArraysAndObject(objectObject4);
            let everything = {}
            everything = arr[0];
            let hintArr = arr[1];
            let choiceArr = arr[2];
            let replyArr = arr[3];
            console.log(replyArr);
            counter++
            console.log(everything);
            string += `<div style="border-bottom: solid 2px white;" class="align-centered width-80 margin-auto">`;
            string += `<br><br>`;
            string += `<button class="clearButton" onclick="alterQuestion(event)" id="${everything['informationId']}">ALTER </button>`;
            string += `<br><br><br>${'INFORMATION ID'+': '+everything['INFORMATION ID'].value}<br><br>`;
            string += `VISIBLE:<br><br>${(everything['VISIBLE'] === 1 ? 'YES!' : 'NO!')}<br><br>`;
            string += `TIMESTAMP:<br><br>${(new Date(everything['TIMESTAMP']).toString())}<br><br>`;
                string += `CREATOR:<br><br>${everything['CREATOR']}<br><br>`;
                string += `LAST ALTERED BY:<br><br>${everything['LAST ALTERED BY']}<br><br>`;
                string += `<p>QUESTION INFORMATION:<br><br>${everything['QUESTION INFORMATION']}<br><br></p>`;
               
                        for (e = hintArr.length-1; e >= 0; e=e-1) {
                            console.log(hintArr, 'here', e);

                            string += `<p>${hintArr[e].name}:<br><br>${hintArr[e].value}<br><br></p>`;

                        }
                        console.log(replyArr, choiceArr);
                     for (b = choiceArr.length-1; b  >= 0; b=b-1) {
                        if (choiceArr[b].value !== null) {
                    string += `<p>${choiceArr[b].name}:<br><br>${(choiceArr[b].value === "" ? 'NOT FILLED' : choiceArr[b].value)}<br><br></p>`;
                    }
                    if (replyArr[b].value !== null) {
                    string += `<p>${replyArr[b].name}:<br><br>${(replyArr[b].value === "" ? 'NOT FILLED' : replyArr[b].value)}<br><br></p>`;
                    }
                }
                string += `</div>`;
            }
            el.innerHTML = string
        
    };
    let string = '';
    let rCount, hCount, chCount, oCount;
    let infoArray = [];
    let infoObject
    let infoArray2 = []

     oCount = 0;
    for (let i = 0; i < objectArray.length; i++) {
        infoArray2.push({['a'+oCount]: {}});
         chCount = 0;
        rCount = 0;
        hCount = 0;
        
        
        for (let key in objectArray[i]) {
            // console.log(infoObject);
            let temporary = key;
            let temporaryValue = objectArray[i][key] 
            // console.log(objectObject[temporary]);
            if (typeof objectArray[i][temporary] !== 'undefined') {
                switch (temporary) {
                    case 'informationId':
                    infoArray2[i] = {...{['INFORMATION ID']: temporaryValue}, ...infoArray2[i]};
                    break;
                    case 'changes':
                        console.log(infoObject);
                        
                        infoArray2[i] =  {...{['CHANGES']: temporaryValue}, ...infoArray2[i]};
                        break;
                        case 'correctChoice':
                            infoArray2[i] = {...{['CORRECT CHOICE']: temporaryValue}, ...infoArray2[i]};
                            break;
                            
                            case 'creator':
                                infoArray2[i] = {...{['CREATOR']: temporaryValue}, ...infoArray2[i]};
                                break;
                                
                                
                                case 'lastAlteredBy':
                                    infoArray2[i] = {...{['LAST ALTERED BY']: temporaryValue}, ...infoArray2[i]};
                                    break;
                                    
                                    
                                    case 'questionInformation':
                                        infoArray2[i] =  {...{['QUESTION INFORMATION']: temporaryValue}, ...infoArray2[i]};
                                        break;
                                        
                                        
                                        case 'timestamp':
                                            console.log(infoObject);
                                            infoArray2[i] =  {...{['TIMESTAMP']: temporaryValue}, ...infoArray2[i]};
                                            break;
                                            
                                            
                                            case 'visible':
                                                infoArray2[i] =  {...{['VISIBLE']: temporaryValue}, ...infoArray2[i]};
                                                break;
                                                
                                                
                                                
                                                case 'informationId':
                                                    infoArray2[i] =  {...{['INFORMATION ID']: temporaryValue}, ...infoArray2[i]};
                                                    break;
                                                    
                                                    
                                                    
                                                    case 'subjectId':
                                                        infoArray2[i] =  {...{['SUBJECT ID']: temporaryValue}, ...infoArray2[i]};
                                                        break;
                                                        
                                                        
                                                    }
                                                    console.log(infoArray2);
                                                    console.log(infoArray2['a'+oCount]);
                                                    if (temporary.includes('choice')) {
                                                        chCount = chCount + 1;
                                                        console.log(infoObject);
                                                       
                                                        infoArray2[i] = {...{['CHOICE '+chCount]: temporaryValue}, ...infoArray2[i]};                                                       
                                                        
                                                        
                                                    } else if (key.includes('reply')) {
                                                        rCount++
                                                        infoArray2[i] =  {...{['REPLY '+rCount]: temporaryValue}, ...infoArray2[i]};
                                                        
                                                        
                                                    } else if (key.includes('hint')) {
                                                        hCount++
                                                        infoArray2[i]  = {...{['HINT ' + rCount]: temporaryValue}, ...infoArray2[i]};
                                                        
                                                        
                                                    }
                                                    
                                                }        
                                                // console.log(infoObject);
                                                console.log(infoArray2);
                                            }
                                           
                                            
                                            oCount = oCount +1;
                                            
                                        }
                                        console.log(infoArray2);
                                        
                                        
                                        
                                        
                                        
                                        
                                            
                                            display(infoArray2);
                                            pagination(limit);
                                        };
let goToPage = (e) => {
    e.preventDefault();
    sessionStorage.setItem('page', e.target.name);
    runDisplayAndGather();
    

};

let runDisplayAndGather = () => {
setTimeout(()=>{
    let el = document.getElementById('informationDiv');
    el.innerHTML = '';

let offset = (sessionStorage.getItem('page') -1) * limit;
fetchIt('acquire', limit, offset);}, 100);

};
runDisplayAndGather();



let alterQuestion = (e) => {
    e.preventDefault();
    sessionStorage.setItem('informationId', e.target.id);
    console.log(e.target.id);
    location.href = '/main/alterQuestionInformation.html';
}

 const addQuestionInformation = (e) => {

    e.preventDefault();
    location.href = '/main/insertQuestionInformation.html';

}