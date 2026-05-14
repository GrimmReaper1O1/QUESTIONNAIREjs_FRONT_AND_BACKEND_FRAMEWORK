let limit = 1;
sessionStorage.getItem('page') === null ? (() => { sessionStorage.setItem('page', null); }): (()=>{let numeral});
let goToInfoPage = (e) => {
    e.preventDefault();
    sessionStorage.setItem('subjectId', e.target.id);
    location.href = `/main/viewSubject.html`;

}

const queryString = window.location.search;

const URLParams = new URLSearchParams(queryString);

const reset = URLParams.get('reset');
if (reset === 'yes') {
 let id =    sessionStorage.getItem('id');
    sessionStorage.clear();
}

let displayInfo = async (infoArray) => {
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
};

let initiate = () => {
    letterPagination();
};
    let fetchIt = async (option,  limit = '', letter = '',  searchInfo = '', offset = '' ) => {
   
    
    let baseUrl = 'http://localhost:5000/api/auth/questions/subject';
    let params;
    if (option === 'count') {
        params = {limit: limit, option: 'count'};
    } else if (option === 'countLetter') {
        params = {limit: limit, option: 'countLetter', letter: letter};
    } else if  (option === 'letterOffset') {
        params = {limit: limit, offset: offset, option: 'letterOffset', letter: sessionStorage.getItem('letter')};
    } else if (option === 'normalOffset') {
        params = {limit: limit, offset: offset, option: 'normalOffset' };
    } else {
        params = {limit: limit, offset: offset, searchInfo: searchInfo, option: 'search'};
        
    }
    console.log(params);
    
    let queryString = new URLSearchParams(params).toString();
    let apiURL = `${baseUrl}?${queryString}`;
    
    await fetch(apiURL).then(async res => {
        if (res.ok) {
            
            let result = await res.json();
            console.log(result);
            if (sessionStorage.getItem('option') === 'search') {
                if (Array.isArray(result.result[1])) {
                    console.log('HELLLLOOOOOO!');
                    sessionStorage.getItem('count', null);
                    sessionStorage.setItem('searchCount', result.result[1][0].count);
                }
                displayInfo(result.result[0]);
            } else if (sessionStorage.getItem('option') === 'count') {
                sessionStorage.setItem('count', result.result[1][0].count);
                sessionStorage.setItem('page', 1);
                
                 displayInfo(result.result);
            } else if (sessionStorage.getItem('option') === 'gather') {
                console.log(typeof result.result[1]);
                if (typeof result.result[1] === 'object') {
                sessionStorage.setItem('count', String(result.result[1][0].count));
                console.log('really got there', String(result.result[1][0].count));
                sessionStorage.setItem('searchCount', null);
            }
                displayInfo(result.result[0]);
                
            } else if (sessionStorage.getItem('option') === 'normal') {
                
                 displayInfo(result.result[0]);
                 console.log(result);
                 try {
                sessionStorage.setItem('count', result.result[1][0].count);
                 } catch {
                    
                 }
            } else {
                 displayInfo(result.result[0]);
            }
            
            
           setTimeout(()=>{ pagination(limit);}, 100);
        } else {
            throw Error('It did not go through!');
        }
        
    }).catch(error => {
        console.log(error);
        
    });
 
};


let gatherLetterInfo =  (e) => {
    e.preventDefault();
    // update to fetchIt
    sessionStorage.setItem('option', 'gather');
    
   
    sessionStorage.setItem('page', '1');
    sessionStorage.setItem('letter', e.target.textContent);
    fetchIt('countLetter', limit, e.target.textContent, '', 0);
   
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
    console.log(sessionStorage.getItem('count'));
    if (sessionStorage.getItem('option') === 'search') sessionStorage.setItem('count', null);
    let count;
    if (sessionStorage.getItem('option') === 'search') {
    count = sessionStorage.getItem('searchCount');
    } else {
    count = sessionStorage.getItem('count');
    }
    console.log(count, sessionStorage.getItem('searchCount'), sessionStorage.getItem('count'), limit, page);
    let numberOfPages;
    if (count !== '') {
    numberOfPages = Math.ceil(Number(count) / Number(limit));
    sessionStorage.setItem('numberOfPages', numberOfPages);
    } else {
    numberOfPages = sessionStorage.getItem('numberOfPages');
    }

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
e.preventDefault();
    sessionStorage.setItem('page', e.target.name);

    let offset = (Number(sessionStorage.getItem('page')) -1) * limit;
    console.log(offset);
    
   let option;
   console.log(sessionStorage.getItem('option'));
    if ( sessionStorage.getItem('option') === 'search') { 
      option = 'search';

    } else if (sessionStorage.getItem('option') === 'gather')  {
        
        option = 'letterOffset';

    } else {
        
        option = 'normalOffset';
    }
    
    fetchIt(option, limit, sessionStorage.getItem('letter'), sessionStorage.getItem('searchInfo'), offset);
    
};

if (sessionStorage.getItem('page') === null && sessionStorage.getItem('letter') === null) {
    initiate();
    sessionStorage.setItem('option', 'normal');
    fetchIt('count', limit);
    console.log('first');
    
} else {
    letterPagination();
    console.log('second');
    sessionStorage.setItem('option','normal');
    fetchIt('count', limit);
    
}

let searchForSubject = (e) => {
    e.preventDefault();
    let el = document.getElementById('searchField');
    sessionStorage.setItem('option', 'search');
   
    sessionStorage.setItem('page', 1);
    sessionStorage.setItem('searchInfo', el.value);
    fetchIt('search', limit, '', el.value, 'false');
    

};