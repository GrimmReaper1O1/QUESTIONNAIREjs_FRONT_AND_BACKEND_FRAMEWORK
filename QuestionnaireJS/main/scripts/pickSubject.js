let limit = 1;
sessionStorage.getItem('page') === null ? (() => { sessionStorage.removeItem('page'); sessionStorage.removeItem('letter');}): (()=>{let numeral});
let goToInfoPage = (e) => {
    e.preventDefault();
    sessionStorage.setItem('subjectId', e.target.id);
    location.href = `/main/viewSubject.html`;

}
sessionStorage.removeItem('subjectId');
const queryString = window.location.search;

const URLParams = new URLSearchParams(queryString);

const reset = URLParams.get('reset');
if (reset === 'yes') {
    sessionStorage.removeItem('page');
    sessionStorage.removeItem('count');
    sessionStorage.removeItem('letter');
    
}

let displayInfo = (infoArray) => {
    const createString = (infoArray1) => {
        let string = '';
        for (let i = 0; i < infoArray1.length; i++) {
            string += `<h4 onclick="goToInfoPage(event)" id="${infoArray1[i].subjectId}">${infoArray1[i].name}</h4>`;

        }
        console.log(string);
        return string;
    }
    let el = document.getElementById('subjectInformationDiv');

   el.innerHTML = createString(infoArray);
}


let letterPagination = () => {
letterArray = [];
letterArray.push('A');
letterArray.push('B');
letterArray.push('C');
letterArray.push('D');
letterArray.push('E');
letterArray.push('F');
letterArray.push('G');
letterArray.push('H');
letterArray.push('I');
letterArray.push('J');
letterArray.push('K');
letterArray.push('L');
letterArray.push('M');
letterArray.push('N');
letterArray.push('O');
letterArray.push('P');
letterArray.push('Q');
letterArray.push('R');
letterArray.push('S');
letterArray.push('T');
letterArray.push('U');
letterArray.push('V');
letterArray.push('W');
letterArray.push('X');
letterArray.push('Y');
letterArray.push('Z');


let letterLinkString = '--';
for (i = 0; i < letterArray.length; i++) {
letterLinkString += `<button onclick="gatherLetterInfo(event)" class="letterLinkButtons">${letterArray[i]}</button>--`;
}

let el = document.getElementById('letterSelectionDiv');
el.innerHTML = letterLinkString;
}

let initiate = () => {
letterPagination();


let baseUrl = 'http://localhost:5000/api/auth/questions/subject';
const params = {limit: limit, option: 'count'};
const queryString = new URLSearchParams(params).toString();
apiUrl = `${baseUrl}?${queryString}`;

fetch(apiUrl).then(async res => {
console.log(res);
    if (res.ok) {
        let result = await res.json();
        console.log(result);
        displayInfo(result.result[1]);
        sessionStorage.setItem('count', result.result[0][0].count);
        sessionStorage.setItem('page', 1);
        pagination(limit);
    } else {
        throw Error('It did not go through!');
    }

}).catch(error => {
    console.log(error);

});




};

let gatherLetterInfo = (e) => {
    e.preventDefault();
    
    console.log(e.target.textContent);
    let baseUrl = 'http://localhost:5000/api/auth/questions/subject';
    const params = {limit: limit, option: 'countLetter', letter: e.target.textContent};
    const queryString = new URLSearchParams(params).toString();
    apiUrl = `${baseUrl}?${queryString}`
    console.log('got here letter info');
    fetch(apiUrl).then(async res => {
        if (res.ok) {
            let result = await res.json();
            displayInfo(result.result[1]);
            console.log(result);
            sessionStorage.setItem('page', 1);
            sessionStorage.setItem('letter', e.target.textContent);
            sessionStorage.setItem('count', result.result[0][0].count);
            pagination(limit);
        } else {
            throw Error("It didn't go through.");
        }
        
        
    }).catch(error => {
        console.log(error);
    });
    
}


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
            if (startPosition < 1 || (page - ((sideLengthNum*2))) > 1 && (endPosition - startPosition) === ((sideLengthNum*2)+1)) {
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


const goToPage = (e = sessionStorage.getItem('page')) => {
    console.log(e.target.name);
    if (typeof e.preventDefault !== 'function') {
        e.preventDefault();
    }
    let baseUrl = 'http://localhost:5000/api/auth/questions/subject';
    
    console.log(e.target.name);
    sessionStorage.setItem('page', e.target.name);
    let offset = (Number(sessionStorage.getItem('page')) -1) * limit;
    pagination(limit);
    const paramsLetter = {limit: limit, offset: offset, option: 'letterOffset', letter: sessionStorage.getItem('letter')};
    const paramsAlpha = {limit: limit, offset: offset, option: 'normalOffset' };
    let queryString;
    if (sessionStorage.getItem('letter') === null) { 
        queryString = new URLSearchParams(paramsAlpha).toString();
    } else {
        queryString = new URLSearchParams(paramsLetter).toString();
        
    }
    apiUrl = `${baseUrl}?${queryString}`
    console.log('got here letter info');
    fetch(apiUrl).then(async res => {
        if (res.ok) {
            let result = await res.json();
            console.log(result);
            displayInfo(result.result);
            
            
        } else {
            throw Error("It didn't go through.");
        }
        
        
    }).catch(error => {
        console.log(error);
    });
}

if (sessionStorage.getItem('page') === null && sessionStorage.getItem('letter') === null) {
    initiate();
    console.log('first');
    pagination(limit);
} else {
    letterPagination();
    console.log('second');
    goToPage();
    pagination(limit);
}

