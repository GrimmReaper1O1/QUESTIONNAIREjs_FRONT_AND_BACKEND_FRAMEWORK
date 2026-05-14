
let start = performance.now();
let toggle = false;
let URLParams = new URLSearchParams(window.location.search);
let reseter =  URLParams.get('reset');
let reseterTwo = URLParams.get('resetTwo');
resetTwo = URLParams.get('resetTwo');
choiceNumsSwitch = 'false'
sessionStorage.removeItem('offset');
//// // console.log(reseter);
let subjectObj, limit, answerObj;
subjectObj = JSON.parse(sessionStorage.getItem('subjectObj'));
console.log(subjectObj.numberOfQuestions);
 limit = subjectObj.numberOfQuestions;
// limit = 10;
let pNum = sessionStorage.getItem('pNum') === null ? 1 : JSON.parse(sessionStorage.getItem('pNum') ) ;
let offset = (pNum -1) * limit;
sessionStorage.setItem('page', pNum);
console.log(pNum);
let pNumKey = `pNum${pNum}`;
let reset = ()=> {
    // sessionStorage.removeItem('answerObj');
    sessionStorage.removeItem('option');
    sessionStorage.removeItem('placeHolder');
    sessionStorage.removeItem('questionIdList');
    sessionStorage.removeItem('infoStore');
    sessionStorage.removeItem('runningCount');
    sessionStorage.removeItem('countPagination');
    sessionStorage.setItem('submitToggle', 'off')
    sessionStorage.removeItem('count')
    sessionStorage.removeItem('answerObj');
    choiceNumsSwitch = 'true';
    sessionStorage.removeItem('placeHolder');
    
    sessionStorage.removeItem('runningCount');
    sessionStorage.removeItem('storageArray');
};

let realReset = () => {
   sessionStorage.removeItem('aESObject');
}
if (reseter === 'yes') {
    reset();
}
if (reseterTwo === 'yes') {
    realReset();

}

// console.log(pNumKey);
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
        // // console.log(startPosition, endPosition, page);
       return {start: startPosition, end: endPosition}
    }



    let count;
    let sideLength = 1;
    let page = Number(JSON.parse(sessionStorage.getItem('page')));
    // // console.log(sessionStorage.getItem('count'));
    
  
    count = sessionStorage.getItem('countPagination') !== null ? JSON.parse(sessionStorage.getItem('countPagination')) : count;
    // // console.log(count, sessionStorage.getItem('searchCount'), sessionStorage.getItem('count'), limit, page);
    
    let numberOfPages;
    console.log(count)
    if (count !== '') {
    numberOfPages = Math.ceil(Number(count) / Number(limit));
    // // console.log(numberOfPages);
    sessionStorage.setItem('numberOfPages', numberOfPages);
    } else {
    numberOfPages = JSON.parse(sessionStorage.getItem('numberOfPages'));
    }

    let string = '';
    let endString = '';
    // // console.log(numberOfPages);
    let startPosition = 0;
    let endPosition = 0;
    if ((page-sideLength) <= 0) {
        startPosition = 1;
        // // console.log('one')
    } else {
        string = '<button name="1" onclick="goToPage(event)">1</button>...';
        startPosition = page;
        // // console.log('two');
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
        // // console.log('three');
    } else {
        endPosition = page+sideLength;
        // // console.log('four');
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


const goToPage = (e) => {
    // // console.log(e.target.name);
  
        e.preventDefault();
  
   let numeral = Number(e.target.name);
    sessionStorage.setItem('pNum', Number(e.target.name));


  
   
    reset();

    location.href = `/main/learnFromSubjectTwo.html?reset=yes&resetTwo=yes`
};

const insertReplyHTML = async (itemStore, storageItem, newObj, positionObj, subjectObj, answerObj) => {
let h4El, h4El2, string, string2, el, key, numeral, replyElText, questionChoiceText, placeNumeral;
// console.log(newObj, answerObj);
    // // console.log(itemStore, storageItem, newObj, positionObj);
    



    //#################################################################################
    // !!! warning confusing function do not alter  !!!
    //##############################################################################



    key = 'pNum' + pNum;
    // // console.log('pNum'+pNum)
    numeral
    replyElText = [];
    questionChoiceText = [];

    // // console.log(key);     
    // console.log(storageItem);
  let counter = 0;
  let numArray = [];
  let numArray2 = [];
  let counteress = storageItem.length -1;
  answerObj = JSON.parse(sessionStorage.getItem('answerObj'));
//   for (let i = (storageItem.length-1) ; i >= 0; i=i-1) {
    let tester = true;
    // // console.log(i, count, counter3, storageItem.length, JSON.parse(sessionStorage.getItem('answerObj')));
    // // console.log(answerObj);
    let removalArray = [];
    let numArray3 = [];
    answerObj =   JSON.parse(sessionStorage.getItem('answerObj'));
    console.log(answerObj);
    for (let i = 0 ; i < storageItem.length; i++) {
          removalArray.push('on');
        if (numberOfCorrectRemoval((Number(subjectObj.numberOfRemoval)), answerObj, i)) {
            numArray.push(i);
            numArray2.push(counteress);
            numArray3.push(i);
        } else {
            if (answerObj.object.questionNumbers[pNumKey]['group'+i].right-2 < Number(subjectObj.numberOfRemoval)) {
            tester = false;
            removalArray[i] ='off';
            // console.log('active');
            numArray.push(i);
            numArray2.push(counteress);
    }
}
  
counteress--
       counter++
    }
    // console.log(numArray);
// console.log(numArray);
let count = 0;
let counter3 = numArray.length;
counter3--
let counter2 = 0;
counter = numArray.length;
// for (let i = 0 ; i < numArray.length; i++) {
    counter--
    // console.log(counter);

for (let i = numArray.length-1 ; i > -1; i=i-1) {
        // console.log(counter3);
    //     // // console.log(newObj);
    tester = true;
    if ((document.getElementById('question'+numArray[i])) !== null ) {
        if (answerObj.object.questionNumbers[pNumKey]['group'+numArray[i]].right-2 < Number(subjectObj.numberOfRemoval)) tester = false;
                // console.log(answerObj.object.questionNumbers[pNumKey]['group'+numArray[i]].right-1, subjectObj.numberOfRemoval+1);
                // console.log(numArray[i]);
        if (numberOfCorrectRemoval((Number(subjectObj.numberOfRemoval)+1), JSON.parse(sessionStorage.getItem('answerObj')), numArray[i], tester, removalArray[i])) {
            // may need -1
            placeNumeral = itemStore.entireArray[numArray[i]].place-1;
            // console.log(itemStore);

            if (placeNumeral === -1) {
                placeNumeral = storageItem[numArray[i]].length-1;
            }

            // console.log(placeNumeral);
            // // console.log(placeNumeral);
            // reverses questions if count is changed to i
            // console.log(numArray[i]);
            // console.log(positionObj, numArray[counter3]);
            numeral = positionObj.object.questionNumbers[pNumKey]['group'+numArray[i]].lastChecker ;
            // console.log(numeral);
            // console.log(storageItem);
            if (numeral !== 9){
                replyElText.push(storageItem[numArray[i]][placeNumeral][`reply`+String(numeral)]);
                questionChoiceText.push(storageItem[numArray[i]][placeNumeral]['choice'+String(numeral)]);
            } else {
                replyElText.push('NOT ATTEMPTED');
                questionChoiceText.push(' ');
            }
            // console.log('heyaaa');
            // // console.log(positionObj);
            // console.log(positionObj);
            // // console.log(numeral);
            // // console.log(placeNumeral, numeral);
            // // console.log(placeNumeral, numeral);
            h4El = document.createElement('h4');
            string = `Choice: <br>${questionChoiceText[count]}`
            h4El2 = h4El.cloneNode(true);
            string2 = ` Reply: <br>${replyElText[count]}`;
            // console.log(numArray[counter2], counter2, numArray);

            // console.log(el);
            el = document.getElementById('question'+numArray[i]);
            // if (el === null) {
            //     el = document.getElementsByClassName('qGroup');
            //     // console.log(el);
            let radioGroupEl = document.getElementsByClassName('radioGroup'+numArray[i]);
            
            for (let i = 0; i < radioGroupEl.length; i++) {
            
                radioGroupEl[i].classList.add('hidden'); 
            
            }
            
            el.innerHTML = '<br>';
            h4El.innerHTML = string;
            h4El2.innerHTML = string2;

            el.append(h4El);
            el.append(h4El2);
            // }
            counter2++
            counter--
        }
        counter3--
        positionObj.object.questionNumbers[pNumKey]['group'+numArray[i]].lastChecker = 9;
        count++
        // console.log('group'+counter);
    }
    }
    
    sessionStorage.setItem('answerObj', JSON.stringify(positionObj));
    return positionObj;
}


const resetScore = async e => {
    e.preventDefault();
    let answerObj = JSON.parse(sessionStorage.getItem('answerObj'));
    answerObj.right = 0;
    answerObj.wrong = 0;
    answerObj.attempted = 0;
    for (key in answerObj.object.questionNumbers) {
        for (key2 in answerObj.object.questionNumbers[key]) {
            for (key3 in answerObj.object.questionNumbers[key][key2]) {
            answerObj.object.questionNumbers[key][key2][key3] = 0;
            }
        }


    }
    // // console.log(answerObj);

    storeName = `sId${sessionStorage.getItem('subjectId')}Score`;

   
        key = `sId${sessionStorage.getItem('subjectId')}Score`+JSON.parse(sessionStorage.getItem('pNum'));
         await clearStore(`questionnairsId${sessionStorage.getItem('subjectId')}`, storeName);
    
    saveToBrowser(answerObj, 'saveScore')
    
    reset();
    
sessionStorage.setItem('pNum'+pNum, 1);

    location.href = '/main/learnFromSubjectTwo.html?reset=yes&resetTwo=yes';  
    
    
}





const submitAnswers =  e => {
    // e.preventDefault();
    
    // let answerObj1 = JSON.parse(sessionStorage.getItem('presetScoreObj'));
    let answerObj = JSON.parse(sessionStorage.getItem('answerObj'));
    let newObj = {};
    // // console.log(answerObj1, answerObj);
    // // console.log('one')
    
    if (sessionStorage.getItem('submitToggle') !== 'on') {
        sessionStorage.setItem('submitToggle', 'on');
        let right, wrong, attempted;
        // // console.log('two')
        
        
        newObj.object = {};
        newObj.object.questionNumbers = {};
        //// // console.log(pNum);
        // // console.log(answerObj, answerObj1);
        // console.log(answerObj);
        // if (typeof answerObj1.object === 'undefined') {
            
        //         newObj = answerObj1;
        //         // // console.log('one');
        //      // console.log(newObj);
        // }
        // // console.log(answerObj1);
        
        
        // if (typeof newObj.right === 'undefined') {
            newObj.right = 0;
            newObj.wrong = 0;
            newObj.attempted = 0;
            // }
            let addingSwitch = true ;
            // console.log(answerObj);
            
            newObj = answerObj
            // // console.log('two');
            // addingSwitch = false ;
            
            
            // console.log(newObj);
            // // console.log(newObj);
            // console.log(newObj);
            // if (typeof newObj.object.questionNumbers[pNumKey] === 'undefined') {
                
            //     // // console.log('howdy', answerObj);
            //     for (key in newObj) {
                //         if (key.contains('group')) delete newObj[key] ;
                //     }
                //     newObj.object.questionNumbers[pNumKey] = {};
                //     newObj = JSON.parse(sessionStorage.getItem('answerObj'));
                //     // // console.log(answerObj.object.questionNumbers[pNumKey]);
                
                // }
                // console.log(newObj);
                for (key2 in answerObj) {
                    for (key in answerObj[key2]) {
                        
                        // if (key === 'lastChecker') {
                            //     newObj.object.questionNumbers[pNumKey][key2][key] = Number(answerObj[key2][key]);
                            // } 
                            // else if (addingSwitch) {
                                //     newObj.object.questionNumbers[pNumKey][key2][key] += Number(answerObj1[key2][key]);
                                // } 
                                // console.log(newObj);
                                
                                
                                // console.log(key);
                                switch (key) {
                                    case 'right':
                                        // console.log('I got here');
                                        
                                        newObj.right = newObj.right + newObj.object.questionNumbers[pNumKey][key2].right;
                                        break;
                                        case 'wrong':
                                            
                                            newObj.wrong = newObj.wrong + newObj.object.questionNumbers[pNumKey][key2].wrong;
                                            break;
                                            case 'attempted':
                                                
                                                newObj.attempted = newObj.attempted + newObj.object.questionNumbers[pNumKey][key2].attempted;
                                                break;
                                                
                                                default:
                                                    
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        // console.log(answerObj, newObj);
                                        
                                        
                                        // // console.log(answerObj, newObj);
                                        
                                        //// // console.log(newObj);
                                        // // console.log(newObj)
                                        console.log(newObj);
                                        saveToBrowser(newObj, 'saveScore');
                                        
                                        
                                        // insert reply function here 
                                        // console.log(newObj);
                                        sessionStorage.setItem('answerObj', JSON.stringify(newObj));
                                        
                                        // // console.log('what the');
                                        let storageArrayTemp = JSON.parse(sessionStorage.getItem('storageArray'));
                                        let storageArray = storageArrayTemp[pNumKey];
                                        // // console.log(answerObj1, newObj);
                                        let infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
                                        let infoStore = infoStore2;
                                        if (typeof infoStore2[pNumKey] !== 'undefined') infoStore = infoStore2[pNumKey];
                                        // // console.log(infoStore);
                                        newObj = insertReplyHTML(infoStore, storageArray, answerObj, newObj, JSON.parse(sessionStorage.getItem('subjectObj')), answerObj);
                                        // // console.log('four after insert');
                                        e.target.textContent = 'GO TO NEXT ROUND'
                                    
                                    } else {
                                        sessionStorage.setItem('submitToggle', 'off');
                                        // // console.log('two ended');
                                        init();
                                        
                                    }
                                    
                                    let div = document.getElementById('startDiv');
                                    console.log(div);
                                    div.scrollIntoView({
behavior: 'smooth', // for smooth scrolling animation
block: 'start',     // aligns the top of the element to the top of the viewport
inline: 'nearest'   // aligns the element as close to the visible area as possible
});
                                    
                                    // saveToBrowser(answerObj, 'saveScore')
                }

const radioButton = e => {
       let  iString,  choicePlaceNumber;
    choicePlaceNumber = e.target.id;
    //// // console.log(e.target.name);
    
    
    iString = choicePlaceNumber.replace('radio', '');
    iString = iString.replace('z', ' ');
    iString = iString.split(' ');
    // // console.log(iString);
            qNum = iString[0];
            // console.log(qNum);
            choicePlaceNumber = iString[1];
            choicePlaceNumber = Number(choicePlaceNumber);
            let radioGroup = document.getElementsByClassName('radioGroup'+qNum);
    // // console.log(qNum, choicePlaceNumber);
    //// // console.log(qNum, choicePlaceNumber);
    //     let radioGroup = document.getElementsByClassName('radioGroup'+qNum);
for (let y = 0; y < radioGroup.length; y++) {
    
    if (radioGroup[y].id !== e.target.id) {
        radioGroup[y].checked = false;


    } else {
        radioGroup[y].checked = true;
    }
}
let answerObj2 = JSON.parse(sessionStorage.getItem('answerObj'));
// console.log(answerObj);
console.log(answerObj2);
let object = JSON.parse(sessionStorage.getItem('displayObj'));
//// // console.log(answerObj, comple;
// // console.log(completeAnswerObj);
// // console.log(answerObj, completeAnswerObj);
// // console.log(object);
// // console.log(choicePlaceNumber);
let tempChoice = choicePlaceNumber;
// // console.log(typeof answerObj['group'+qNum].lastChecker, typeof tempChoice);
answerObj = answerObj2.object.questionNumbers[pNumKey];
console.log(answerObj);

     if (answerObj['group'+qNum].lastChecker !== tempChoice) {
        if (object.questionArray[qNum].correctChoice-1 === tempChoice) {
            if (answerObj['group'+qNum].lastChecker === 9) {
            answerObj['group'+qNum].attempted = (answerObj['group'+qNum].attempted +1);
          
            answerObj['group'+qNum].right = (answerObj['group'+qNum].right +1);
          
            Number(answerObj['group'+qNum].lastChecker);
            answerObj['group'+qNum].lastChecker = Number(tempChoice);
            } else {
            answerObj['group'+qNum].right = (answerObj['group'+qNum].right +1);
            answerObj['group'+qNum].wrong = (answerObj['group'+qNum].wrong -1);
            
            Number(answerObj['group'+qNum].lastChecker);
            answerObj['group'+qNum].lastChecker = Number(tempChoice);
            


            }
        } else {
            if (answerObj['group'+qNum].lastChecker === 9) {
                answerObj['group'+qNum].attempted = (answerObj['group'+qNum].attempted +1);
                answerObj['group'+qNum].wrong = (answerObj['group'+qNum].wrong +1);
                // answerObj['group'+qNum].lastChecker = 0;
                Number(answerObj['group'+qNum].lastChecker);
                answerObj['group'+qNum].lastChecker = Number(tempChoice);
            } else {
                answerObj['group'+qNum].wrong = (answerObj['group'+qNum].wrong +1);
                if (object.questionArray[qNum].correctChoice-1 === answerObj['group'+qNum].lastChecker) {
                    answerObj['group'+qNum].right = (answerObj['group'+qNum].right -1);
                } else {
                    answerObj['group'+qNum].wrong = (answerObj['group'+qNum].wrong -1);
                }
                    // answerObj['group'+qNum].lastChecker = 0;
                    Number(answerObj['group'+qNum].lastChecker);
                    answerObj['group'+qNum].lastChecker = Number(tempChoice);
                    

            }
        }
    }
    // // console.log(answerObj);
   
    answerObj2.object.questionNumbers[pNumKey] = answerObj;
        // console.log(temporary);
    // sessionStorage.setItem('presetScoreObj', JSON.stringify(answerObj));
    sessionStorage.setItem('answerObj', JSON.stringify(answerObj2));
    saveToBrowser(answerObj2, 'saveScore');
}


const handlerHint = (e)=> {
        e.preventDefault();
        // // console.log(sessionStorage.getItem(e.target.id));
        let toggle = sessionStorage.getItem('s'+e.target.id);
        let numeral = e.target.id.slice(4);
        console.log(toggle);
        let location = {a: 0, i: numeral}
 
        location = sessionStorage.getItem('hintRotation'+e.target.id) === null ? location : JSON.parse(sessionStorage.getItem('hintRotation'+e.target.id));
        //// // console.log(e.target.id);
        let hideEl =  document.getElementById('changeForHint'+e.target.id[e.target.id.length-1]);
        // // console.log(e.target.id);
        console.log(toggle);
        let hintText = JSON.parse(sessionStorage.getItem('displayObj'));
        console.log(toggle);
        
        // // console.log(aValue);
        
        
        if (toggle !== null) {
            console.log(hintText);
            if (hintText.hintArray[location.i].length-1 === location.a || hintText.hintArray[location.i].length === 0){
                location.a = 0;
            } else  {
                location.a++
            } 
            
            
            if (hintText.hintArray[location.i][location.a] === '' || hintText.hintArray[location.i][location.a] === null) {
                do {
                    
                    if (hintText.hintArray[location.i].length-1 === location.a) {
                        location.a = 0;
                    } else {
                        location.a++
                    } 
                    
                } while ((hintText.hintArray[location.i][location.a] === '' || hintText.hintArray[location.i][location.a] === null))
                }
            }
            let aValue = location.a;
            
            if ( hideEl.textContent === 'QUESTION ' +String(Number(location.i)+1)+': '+(hintText.questionArray[location.i].question !== '' ? hintText.questionArray[location.i].question : 'NOT FILLED!')){
                hideEl.textContent = hintText.hintArray[location.i][aValue];
                sessionStorage.removeItem('s'+e.target.id);
            } else {
                hideEl.textContent = 'QUESTION ' +(Number(location.i)+1)+': '+(hintText.questionArray[location.i].question !== '' ? hintText.questionArray[location.i].question : 'NOT FILLED!');
                sessionStorage.setItem('s'+e.target.id, 'true');
            }
            
            sessionStorage.setItem('hintRotation'+e.target.id, JSON.stringify(location));
            // } else {
                //     sessionStorage.removeItem(e.target.id);
                // }
            };
            let numberOfCorrectRemoval = (numberOfRemoval, answerObj, position, test = true, remArr = 'on') => {
                
                // console.log(answerObj, subjectObj, position)
                console.log(answerObj);
                let answerObj3 = {};
                if (answerObj === null) return true
                if (typeof answerObj !== 'undefined') {
                    if (answerObj !== null && typeof answerObj.object !== 'undefined') answerObj3 = answerObj.object.questionNumbers[pNumKey];
                    if (!test && remArr === 'off') {
                        return true
                        
                    } else if (answerObj3 !== null && answerObj3['group'+String(position)].right+1 > numberOfRemoval) {
                        return false
                        
                    }
                    
                    return true
                } else {
                    return true
                }
            }
            
            let enterDisplayBlock = (object) => {
                
                let clonedEl = document.createElement('div');
                let cEl = clonedEl.cloneNode(true);
    sessionStorage.setItem('displayObj', JSON.stringify(object));
    let infoEl = document.getElementById('info');
    let startDiv = document.createElement('div');
    startDiv.id = 'startDiv';
    infoEl.innerHTML = '';
    infoEl.append(startDiv);

    cEl.setAttribute('style', 'background-color: black;');
    cEl.id = 'centralContainer';
    cEl.classList.remove('hidden');
    cEl.classList.add('height-auto', 'overflowScroll');
    clonedEl.classList.add('individualQuestionContainer', 'height-auto');
    let answerObj, answerObj2, hintButton, spacer, el0, el1, el2, insertionIQC, questionC, choiceC, questionP, sDiv1, sDiv2, sDivC, sDivCC, choiceArray;
    //// // console.log(object);
    insertionIQC = [];
    sDivCC = [];
    answerObj2 = {};
    // let offsetCount = Number(sessionStorage.getItem('offset'))+1;
    offsetCount = offset+1;
    let oldPlace = sessionStorage.getItem('oldPlace');
    let ela
    hintButton = [];
  
    el1 = [];
    sDiv1 = [];
    sDiv2 = [];
    el2 = [];
    el0 = [];
    questionC = [];
    let counter = 0;
    let i = 0;
    console.log(object);
    let heightOfEl = 0;
    for (let counter = 0; counter < object.choiceArray.length ; counter++) {
        if (object.questionArray[counter].questionId === 0) {
            let warning = document.createElement('h2');
            warning.textContent = 'This is appearing as you have entered a question id without any information. Please either delete the question id or fill it with a multiple choice question.';
            warning.setAttribute('style', 'color: white;');
            cEl.append(warning);
            infoEl.append(cEl);
        }
        // if (typeof answerObj.object.questionNumbers[pNumKey]['group'+i] === 'undefined') {
            //     answerObj.object.questionNumbers[pNumKey]['group'+i] = {right: 0};
            // }
        
        el1.push([]);
        el2.push([]);
        el0.push([]);
        spacer = document.createElement('div');
        spacer.style.height = '2rem';    
        insertionIQC.push(clonedEl.cloneNode(true));
        insertionIQC[counter].classList.add('height-auto', 'overflowScroll','border-radius');
        insertionIQC[counter].setAttribute('style', 'color: black');
        insertionIQC[counter].id = 'questionInformation'+counter;
        questionC.push(clonedEl.cloneNode(true));
        questionC[counter].classList.add('height-auto', 'padding-2rem', 'qGroup');
        
        
        questionP = document.createElement('p')
        // console.log(object, counter);
        questionP.textContent = 'QUESTION ' +(offsetCount)+': '+(object.questionArray[counter].question !== '' ? object.questionArray[counter].question : 'NOT FILLED!');
        temp = document.createElement('button');
        hintButton.push(temp);
        choiceArray = [];
        choiceC = clonedEl.cloneNode(true);
        choiceC.id = 'choiceContainer'+counter;
        choiceC.classList.add('height-auto');
        sDivC = document.createElement('div') 
        questionP.id = 'changeForHint'+counter;
        hintButton[counter].id = 'hint'+counter;
        hintButton[counter].textContent = 'SHOW HINT!';
        hintButton[counter].setAttribute('onClick', 'handlerHint(event)');
        a = 0;
        sDivCC.push([]);
        sDiv1.push([]);
        sDiv2.push([]);
        console.log(sessionStorage.getItem('answerObj'));
       answerObj = sessionStorage.getItem('answerObj') !== null ? JSON.parse(sessionStorage.getItem('answerObj')) : 'unfilled';
        
            console.log(answerObj);
          if (typeof answerObj !== 'undefined' || answerObj === 'unfilled' || typeof answerObj.object !== 'undefined' || (typeof answerObj.object.questionNumbers[pNumKey] === 'undefined' || typeof answerObj.object.questionNumbers[pNumKey]['group'+counter] === 'undefined'))  {
                if (typeof answerObj === 'undefined' || answerObj === "unfilled") {

                    answerObj = {object: {questionNumbers: {}}};
                    console.log(answerObj);
                }

                if (typeof answerObj.object.questionNumbers[pNumKey] === 'undefined') {
                     answerObj.object.questionNumbers[pNumKey] = {};
                console.log('here?????')
                }

                if (typeof answerObj.object.questionNumbers[pNumKey]['group'+counter] === 'undefined') {
                console.log(answerObj);
                 answerObj.object.questionNumbers[pNumKey] =  {...answerObj.object.questionNumbers[pNumKey], ...{['group'+counter]:{right: 0, wrong: 0, attempted: 0, lastChecker: 9}}};
                sessionStorage.setItem('answerObj', JSON.stringify(answerObj));
            }            
          }
        console.log(answerObj, answerObj2);
 
      questionC[counter].id = 'question'+counter;
   
        for (let a = 0; a < object.choiceArray[counter].length; a++) {
            insertionIQC[counter].id = 'questionC'+counter+'a'+a;
            insertionIQC[counter].append(questionP);
            
            sDiv1[counter].push(document.createElement('div'));
            sDiv2[counter].push(sDiv1[counter][a].cloneNode(true));
            let num = a + 1;
            sDivCC[counter].push(sDivC.cloneNode(true));
            sDivCC[counter][a].classList.add('flex','flex-direction-column');
            el1[counter].push(document.createElement('h4'));
            el1[counter][a].textContent = 'Choice '+num+': ';
            el2[counter].push(document.createElement('p'));
            sDivCC[counter][a].id = 'sDivCC'+counter+a;
            sDiv1[counter][a].id = 'sDiv1'+counter+a;
            sDiv2[counter][a].id = 'sDiv2'+counter+a;
            if (object.choiceArray[counter][a] !== null && object.choiceArray[counter][a] !== '') {
                el0[counter].push(document.createElement('input'));
                el0[counter][a].type = 'radio';
                el0[counter][a].id = 'radio'+i+'z'+a;
                el0[counter][a].name = 'radio'+a+'z'+i;
                
                
              
                el0[counter][a].setAttribute('onclick', 'radioButton(event)');
                el0[counter][a].classList = 'radioGroup'+counter
                el2[counter][a].textContent = object.choiceArray[counter][a];
                sDiv2[counter][a].append(el1[counter][a]);
                sDiv2[counter][a].setAttribute('style', 'max-width: 89%; display: inline-block;');
                sDiv2[counter][a].append(el2[counter][a]);
                sDiv1[counter][a].append(el0[counter][a]);
                sDiv1[counter][a].setAttribute('style', 'max-width: 4rem; min-width: 4rem; display: inline-block;'); 
            }
            sessionStorage.setItem('hintRoation'+counter, JSON.stringify({counter: counter,a: 0, lastCheckerPos: 0}));
            
            
            
            
            
            
            sDivCC[counter][a].append(sDiv1[counter][a]);
            sDivCC[counter][a].append(sDiv2[counter][a]); 
            
            insertionIQC[counter].append(hintButton[counter]); 
            insertionIQC[counter].append(questionC[counter]);
            insertionIQC[counter].setAttribute('style', 'background-color: darkgray');
            
            choiceArray.push(sDivCC[counter][a]);
            questionC[counter].append(choiceArray[a]);
            heightOfEl = questionC[counter].offsetHeight;
            console.log(questionC[counter].offsetHeight);
            // // console.log(answerObj);
            // sessionStorage.setItem('presetScoreObj', JSON.stringify(answerObj));
            // //// // console.log('here in time');
            // console.log(answerObj2);
            // if (typeof answerObj2['group0'] !== 'undefined') answerObj = answerObj2;
            // console.log(answerObj);
            console.log(answerObj);
            if (numberOfCorrectRemoval(Number(subjectObj.numberOfRemoval), answerObj, counter)) {
                // //// // console.log(insertionIQC);
                cEl.append(spacer);
                heightOfEl = heightOfEl + insertionIQC[counter].offsetHeight;
                cEl.append(insertionIQC[counter]);
            } else {
                insertionIQC[counter].innerHTML = '';
                let completedNotice = document.createElement('h2');

                completedNotice.textContent = 'Contratulations! You have completed question '+(offsetCount)+'!';

                heightOfEl = heightOfEl + insertionIQC[counter].offsetHeight;
                insertionIQC[counter].append(completedNotice);
                cEl.append(spacer); 
                cEl.append(insertionIQC[counter]);
            }
        }
        offsetCount++
        console.log(counter);
        i++
    }
        console.log(answerObj);
        sessionStorage.setItem('answerObj', JSON.stringify(answerObj));
        // //// // console.log(cEl);
    let height2 = cEl.offsetHeigth;
    infoEl.append(cEl);
    console.log(infoEl.offsetHeight);
    sessionStorage.setItem('height', infoEl.offsetHeight);
    console.log(height2);
    console.log(heightOfEl);
    // //// // console.log(infoEl.offsetHeight);
    // infoEl.setAttribute('style', 'height: height;');

}
// enterDisplayBlock();


const selectAndDisplay = (infoStore, storageArray) => {
    // running count may be missin
    // console.log(infoStore);
    //// // console.log('is it working', infoStore, storageArray);
    const displayHelper = (object) => {
    let centralElement, questionArray, choiceArray, hintArray, replyArray;
    choiceArray = [];
    displayArray = {};
    hintArray = [];
    questionArray = [];
    replyArray = [];
    // // console.log(object, storageArray);
    console.log(infoStore, storageArray);
    for (let i = 0; i < infoStore.entireArray.length; i++) {
        questionArray.push({question: '', questionId: 0});
        choiceArray.push([]);
        replyArray.push([]);
        hintArray.push([]);
        
        for (key in storageArray[i][infoStore.entireArray[i].place]) {
            if (object[i][key] !== null) {
            if (key.includes('questionInformation')) {
                
                questionArray[i].question = object[i][key];
                
            }

            if (key.includes('correctChoice')) {

                questionArray[i].correctChoice = object[i][key];
                
            }

            if (key.includes('questionId')) {
                
                questionArray[i].questionId = object[i][key];
                
            }
            
            if (key.includes('choice') && !key.includes('correct')) {
                choiceArray[i].push(object[i][key]);
            }
            
            
            if (key.includes('reply')) {
                replyArray[i].push(object[i][key]);
            }
            
            if (key.includes('hint')) {
                hintArray[i].push(object[i][key]);
            }
        }
        }
    }
    

    centralElement = {};
    centralElement = {questionArray: questionArray, choiceArray: choiceArray, hintArray: hintArray, replyArray}; 
    //// // console.log(centralElement);
enterDisplayBlock(centralElement);
    };


   let infoObj = deepCopy(infoStore);
storageArray = storageArray;
    let output = [];
//// // console.log(infoObj, storageArray);
let oldPlace = [];

if (typeof infoObj[pNumKey] !== 'undefined') infoObj = infoObj[pNumKey];
// console.log(infoObj, `pNum${pNum}`, infoObj[pNumKey]);
for (let i = 0; i < infoObj.entireArray.length; i++) {
         output.push([])   
        // // console.log(infoObj.entireArray[i].place, storageArray);
         oldPlace.push(infoObj.entireArray[i].place);
            // // console.log(storageArray, infoObj.entireArray[i].place );
    output[i] = storageArray[i][infoObj.entireArray[i].place]; 
    
        // console.log(infoObj, infoObj.entireArray[i].place, infoObj.entireArray[i].infoArr.length-1);
        if (infoObj.entireArray[i].place >= infoObj.entireArray[i].infoArr.length-1) {
                infoObj.entireArray[i].place = 0;
                infoObj.entireArray[i].finnishedArray = true;
                
            } else {
                infoObj.entireArray[i].place++
                // console.log('whatthe');
            }
        }
        
        let counting = 0
        // // console.log(infoObj);
        for (let i = 0; i < infoObj.entireArray.length; i++) {
            //// // console.log(infoObj.entireArray[i].finnishedArray);
            if (infoObj.entireArray[i].finnishedArray === true) {
                counting++
                if (counting === infoObj.entireArray.length) {
                    //// // console.log('said true');
                    infoObj.allComplete = true;

                }

            }

        }

        // console.log(infoObj);
        //// // console.log(output);
        let temp = JSON.parse(sessionStorage.getItem('infoStore'));
        temp[pNumKey] = infoObj;
        // // console.log(temp);
        // // console.log(temp);
        sessionStorage.setItem('infoStore', JSON.stringify(temp));
        // // console.log(oldPlace);
        sessionStorage.setItem('oldPlace', JSON.stringify(oldPlace));
        displayHelper(output);
};




// // console.log(offset);
// sessionStorage.setItem('offset', offset);
//// // console.log(offset);
// debugger;
let startLoading =  async () => {
let storeName = `sId${sessionStorage.getItem('subjectId')}`;
    let key = `sId${sessionStorage.getItem('subjectId')}p`+JSON.parse(sessionStorage.getItem('pNum'));
   let score, loadedResultSets;
    try {

// get version number refunction and refactor

let subjectObj = JSON.parse(sessionStorage.getItem('subjectObj'));
     loadedResultSets = await loadFromIndexedDB(`questionnairsId${sessionStorage.getItem('subjectId')}`, storeName, key);
     console.log(subjectObj, loadedResultSets);
// check version here refunction and refactor
console.log(subjectObj, 'here')
// delete page and give signal somehow refunction and refactor


//// // console.log(loadedResultSets);
// // console.log(loadedResultSets.object);
// console.log(loadedResultSets);
if (Number(subjectObj.version) === Number(loadedResultSets.object.version)) {
    sessionStorage.setItem('aESObject', JSON.stringify(loadedResultSets.object));
for (let key in loadedResultSets.object) {
    //// // console.log(key);
    if (key === 'countPagination') {
        sessionStorage.setItem(key, loadedResultSets.object[key]);
    } else {
        sessionStorage.setItem(key, JSON.stringify(loadedResultSets.object[key]));
    }
}
    
    //// // console.log(sessionStorage.getItem(key));
}

} catch {
    //// // console.log('error');
}
storeName = `sId${sessionStorage.getItem('subjectId')}Score`;
key = `sId${sessionStorage.getItem('subjectId')}Score`+JSON.parse(sessionStorage.getItem('pNum'));
try {
    score = await loadFromIndexedDB(`questionnairsId${sessionStorage.getItem('subjectId')}`, storeName, key);
    console.log(score, 'hellllloooooo');
    let obj2 = score.object;
    console.log(obj2);
    // // console.log(obj2);
    // // console.log(obj2);
    console.log(obj2);
    if (typeof obj2 !== 'undefined') {
        console.log('went here anyway');
        sessionStorage.setItem('answerObj', JSON.stringify(obj2));
    }
} catch (error) { console.log(error); };
//// // console.log(score);
// need to reset choice parameter in array on reset
// if (Number(subjectObj.version) !== Number(loadedResultSets.object.version)) {
//     reset();
//     realReset();
//     sessionStorage.removeItem('oldPlace');
    
//    await clearStore(`questionnairsId${sessionStorage.getItem('subjectId')}`, storeName);
//     console.log("It should have deleted here!");
//     sessionStorage.removeItem('questionIdList');
//     sessionStorage.removeItem('aESObject');
//     // detete from indexedDb here. also delete session storage for ids here
// }
await init();
pagination(limit);

}


//// // console.log('here');
startLoading();


//// // console.log(sessionStorage.getItem('pNum'));

const saveToBrowser = async (object, option = '') => {
   
    let storeName, key;
    storeName = `sId${sessionStorage.getItem('subjectId')}`;

    if (option === 'saveScore') {

    storeName = `sId${sessionStorage.getItem('subjectId')}Score`;
        key = `sId${sessionStorage.getItem('subjectId')}Score`+JSON.parse(sessionStorage.getItem('pNum'));
        
    } else {
        key = `sId${sessionStorage.getItem('subjectId')}p`+JSON.parse(sessionStorage.getItem('pNum'));
        
}
console.log(object);
try {
    await saveToIndexedDB( storeName,{id: key, object: object},  key, `questionnairsId${sessionStorage.getItem('subjectId')}`);
} catch {

}



};

let fetchItQuestionIds = async (option, object) => {
    //// // console.log(object);
   //// // console.log(sessionStorage.getItem('subjectId'));

 
let baseUrl = 'http://localhost:5000/api/auth/questions/questionIds';
if (option.includes('grouped')){ 

    baseUrl = 'http://localhost:5000/api/auth/questions/selecteGroupedQuestionInfoId';

}
let queryString, options;
options = {};
if (option === 'count') {
    queryString = {subjectId: sessionStorage.getItem('subjectId'), option: 'count'};
} else if (option === 'table') {
    queryString = {subjectId: sessionStorage.getItem('subjectId'), option: 'table'};
    // // console.log(sessionStorage.getItem('subjectId'));
} else if (option === 'grouped') {
    options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object)
  };
} 
// if (option !== 'grouped') {
//// // console.log(options);
const params = new URLSearchParams(queryString).toString();
const apiUrl = `${baseUrl}?${params}`
//// // console.log(options);
let obj = await fetch(apiUrl, options).then(async res => {

    if (res.ok) {
        let result = await res.json();
        console.log(result);
        switch (option) {
            case 'count':
                // // console.log(result.result)
                sessionStorage.setItem('count', result.result[0].count);
            break;
            case 'table':
              
                sessionStorage.setItem('questionIdList', JSON.stringify(result.result));
            break;
            case 'grouped':
                sessionStorage.setItem('questionInformation', JSON.stringify(result));
                return result.result
            break;
            default:
                break;
            
        }
        return result.result
    } else {
        throw Error('It did not go through!');
        return
    }
}).catch(error => {
    //// // console.log(error);
    
});


return obj;
};
let init = async () => {
    
    let ids, count;
    let infoStore = {};
    let counter, runningCount;

    const storageController =  async (ids, runningCount) => {
        console.log(ids);
        let storageArr = (sessionStorage.getItem('storageArray') === null ? 'not filled' : JSON.parse(sessionStorage.getItem('storageArray')));
        if (storageArr === 'not filled') {
            storageArr = [];
        } else {
            // console.log(storageArr);
            storageArr = storageArr[pNumKey];
        }
        // console.log(storageArr);
        // // console.log(storageArr);
        //// // console.log(runningCount, ids);
        // // console.log(storageArr);
        let stopInfo = JSON.parse(sessionStorage.getItem('infoStore'));
        stopInfo = stopInfo[pNumKey];
        // stopInfo = stopInfo[pNumKey];
        //// // console.log(stopInfo, runningCount);
        let notSentCounter = [];
        let skipCounter = 0;
        let temp = [];
       // // console.log(ids,runningCount,stopInfo, storageArr);
        for (let i = 0 ; i < stopInfo.entireArray.length; i++) {
            notSentCounter.push(false);
            if (runningCount === 0) {
                notSentCounter.push(false);
                storageArr.push([]);
            }
            // may need to alter running count
            
// // console.log(stopInfo);
            if (stopInfo.entireArray[i].finnishedArray === true) {
                notSentCounter[i] = true;
        }
        // // console.log(ids);
        if (notSentCounter[i] === false) {
            // console.log(storageArr);
            if (typeof storageArr[i] === 'undefined') storageArr.push([]);
            storageArr[i].push(ids[skipCounter]);
        skipCounter++    
        } 
    }
        skipCounter = 0;
        // // console.log(storageArr);
        console.log(storageArr);
        let temp2 = sessionStorage.getItem('storageArray') !== null ? JSON.parse(sessionStorage.getItem('storageArray')) : {};
        temp2[pNumKey] = storageArr;
        sessionStorage.setItem('storageArray', JSON.stringify(temp2));
            // // console.log(storageArr);
        return storageArr
    };

    const infoPicker = async (runningCount, infoObj) => {
       //// // console.log(runningCount, infoObj);
       let idCount = [];
     let switchObj = false;
     if (typeof infoObj[pNumKey] !== 'undefined') infoObj = infoObj[pNumKey];
     // console.log(infoObj);
      if (typeof infoObj['runningCount'] === 'undefined') {
       infoObj = {...infoObj, ...{runningCount: runningCount, finnishedCount: []}};
      
        switchObj = true;
    }
        let idObj = []
        
        for (let i = 0; i < infoObj.entireArray.length; i++) {
            //// // console.log(runningCount);
            if (switchObj) {
                
                
                infoObj.entireArray[i].place = 0
            }
            //// // console.log(infoObj.entireArray[i].place+1, infoObj.entireArray[i].infoArr.length);
            //// // console.log(infoObj.entireArray[i].infoArr);
            if (infoObj.entireArray[i].finnishedArray === false) {
            idObj.push(infoObj.entireArray[i].infoArr[infoObj.entireArray[i].place].informationId);

            
            }
            //// // console.log(idObj);
            
        }
        let response;
        //// // console.log(infoObj);
        if (infoObj.allComplete !== true) {
        response  = await fetchItQuestionIds('grouped', {toggle: true, arr: idObj});
        }
        if (switchObj) {
        let temp = JSON.parse(sessionStorage.getItem('infoStore'));
        temp[pNumKey] = infoObj;
        //// // console.log(infoObj);
        sessionStorage.setItem('infoStore', JSON.stringify(temp));
        }
        //// // console.log(response, infoObj);
        return response



    }



    const positioningSystem = (infoObj, questionInfo, reducedIdArray) => {
        let placeHolderArray = [];
        //// // console.log(infoObj, 'objectInfo', questionInfo, 'questionInfo');
        let infoStore2 = sessionStorage.getItem('infoStore') === null ? {} : JSON.parse(sessionStorage.getItem('infoStore'));
       let infoStore = infoStore2[pNumKey];

        if (typeof infoStore2[pNumKey] === 'undefined' || infoStore.allComplete !== true) {
            //// // console.log(questionInfo.length, infoObj.length);
            
            for (let i = 0; i < questionInfo.length; i++) {
                counter = 0;
                if (reseter === 'yes' || reseterTwo === 'yes') {
                    //// // console.log('the big labowski');
                    infoStore = {complete: 0 , entireArray:[], allComplete: false, compNum: 0, length: infoObj.length};
                    reseter = 'no';
                    reseterTwo = 'no';
                    
                }
               
            infoStore.entireArray.push({finnishedArray: false, infoArr: [], object: {}, complete: 0, place: 0})
            //// // console.log(infoStore);
                for (let a = 0; a < infoObj.length; a++) {
                    if (reducedIdArray[i] === infoObj[a].questionId) {

                        
                    
                if (reseterTwo === 'no'  || reseter === 'no' || i === 0) {
                    placeHolderArray.push({place: 0, complete: i});
                    
                    
                } else {
                    if (placeHolderArray[i].place === 0) {
                        placeHolderArray[i].place = 0;
                    }
                    placeHolderArray[i].place++
                }
                
                // if (placeHolderArray[i].complete !== questionInfo.length) {
                //// // console.log(placeHolderArray);
                //// // console.log(infoStore);
                infoStore.entireArray[i].infoArr.push([]);
                infoStore.entireArray[i].infoArr[counter] = infoObj[a]
                infoStore.entireArray[i].object = {complete: i, place: placeHolderArray[i].place};
                //// // console.log(infoStore);
                counter++
                
                
                // } else {
                    
                    
                    
                    
                    // } 
                    
                    //// // console.log(infoStore.entireArray[i].infoArr.length, placeHolderArray);
                   
            }
        }
    }
    
    //// // console.log(placeHolderArray, infoStore);
    infoStore2[pNumKey] = infoStore;
    // // console.log(infoStore);
    sessionStorage.setItem('infoStore', JSON.stringify(infoStore2));
};
sessionStorage.setItem('placeHolder', JSON.stringify(placeHolderArray));
//// // console.log(infoStore);
};


// refunction and refactor check the current viability of sessionStorage info store


let infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
console.log(infoStore2);
if (infoStore2 === null || infoStore2[pNumKey] === 'undefined') {
    // console.log('one')
//// // console.log(sessionStorage.getItem('questionIdList'));

// // console.log('got here');

ids = await fetchItQuestionIds('table');
console.log(ids);
// ids = JSON.parse(sessionStorage.getItem('questionIdList'));
console.log(ids);
//// // console.log(performance.now(), 'time end 2 requests');
//// // console.log(ids);
ids.sort((a,b) => a.position - b.position);
console.log(ids);
let count2 = 0;
let temp2 = [];
let temp ;
console.log(ids);
for (let object of ids) {
    if (object.questionId !== temp) {
        temp2.push(object.questionId);
        count2++
        temp = object.questionId;
    }
}

console.log(temp2);
sessionStorage.setItem('countPagination', temp2.length);
// // console.log(pNum);

console.log(offset);
// // console.log(pNum);
sessionStorage.setItem('offset', offset);
console.log(offset);
// // console.log(offset, (offset+limit-1));
if (sessionStorage.getItem('countPanination') === null) sessionStorage.setItem('countPagination', String(temp2.length));
let alteredQuestionIdArray = temp2.slice(offset, (offset+limit));
console.log(temp2);
console.log(alteredQuestionIdArray);

let gatheredQuestionInformation;
//// // console.log(alteredQuestionIdArray);
//// // console.log(sessionStorage.getItem('infoStore'));
gatheredQuestionInformation = await fetchItQuestionIds('grouped', {toggle: false, arr: alteredQuestionIdArray});

if (sessionStorage.getItem('runningCount') === null) {
    sessionStorage.setItem('runningCount', 0);
}
let finalObjectArr;
finalObjectArr = [];


for (let i = 0; i < alteredQuestionIdArray.length; i++) {
    
    finalObjectArr.push({object: []});
    for (let a = 0; a < gatheredQuestionInformation.length; a++) {
        if (alteredQuestionIdArray[i] === gatheredQuestionInformation[a].questionId) {
            
            finalObjectArr[i].object.push(gatheredQuestionInformation[a]);
            
        }
        
    }
    
}

let runningCount = 0;
positioningSystem(ids, finalObjectArr, alteredQuestionIdArray);
// resetTwo === 'no';

//// // console.log(ids);
infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
if (typeof infoStore2[pNumKey] !== 'undefined') infoStore2 = infoStore2[pNumKey];
// // console.log(infoStore2);

let ids2 = await infoPicker(runningCount, infoStore2);
// // console.log(ids2);
//// // console.log(runningCount); 
// if (reset === 'yes') {
    //    ids2 = await infoPicker(runningCount, JSON.parse(sessionStorage.getItem('infoStore')));
    //     reset = 'no';
    // }
    let toStore = await storageController(ids2, runningCount);
    //// // console.log(toStore);
    
    
    
    let  placeHolder, storageArrayTemp, storageArray;

    placeHolder = sessionStorage.getItem('placeHolder');
    questionIdList = sessionStorage.getItem('questionIdList')
    storageArrayTemp = JSON.parse(sessionStorage.getItem('storageArray'));
    storageArray = storageArrayTemp[pNumKey];
    infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
    let infoStore = infoStore2[pNumKey]
    // // console.log(infoStore);
    // // console.log(storageArray);
    selectAndDisplay(infoStore, storageArray); 
    // storageArrayTemp = JSON.parse(sessionStorage.getItem('infoStore'));
    // storageArray = storageArrayTemp[pNumKey];
    
    
    infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
    let aESObject = {version: subjectObj.version, countPagination: sessionStorage.getItem('countPagination'), storageArray: storageArrayTemp, infoStore: infoStore2, runningCount: runningCount, pNum: pNum, placeHolder: JSON.parse(placeHolder), questionIdList: JSON.parse(questionIdList)};
    // console.log(infoStore2);
    saveToBrowser(aESObject);
    //// // console.log(JSON.parse(sessionStorage.getItem('infoStore')));
    //// // console.log('here');
    // // console.log(JSON.stringify(sessionStorage.getItem('storageArr')), JSON.stringify(sessionStorage.getItem('aESObject')));
    // console.log(infoStore2)
    // saveToBrowser(aESObject);
// console.log(storageArrayTemp);
    // console.log(infoStore2)
} else {
    // console.log('two')
    // // console.log(JSON.parse(sessionStorage.getItem('storageArr')), JSON.parse(sessionStorage.getItem('aESObject')));
    // let placeHolder = sessionStorage.getItem('placeHolder');
    // //// // console.log(placeHolder);
   let infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
   if (typeof infoStore2[pNumKey] !== 'undefined') infoStore = infoStore2[pNumKey];
    // // console.log(infoStore2);
    
    if (infoStore.allComplete === false) {
        //// // console.log('where Am I');
        
runningCount = sessionStorage.getItem('runningCount');
runningCount++
sessionStorage.setItem('runningCount', runningCount);
// console.log(ids2);
//// // console.log(JSON.stringify(sessionStorage.getItem('infoStore')));
let ids2 = await infoPicker(runningCount, infoStore2);
//// // console.log(ids2);
let toStore = await storageController(ids2, runningCount);
//// // console.log(toStore);

let  placeHolder, questionIdList,  infoStore, storageArrayTemp, storageArray;

placeHolder = sessionStorage.getItem('placeHolder');
questionIdList = sessionStorage.getItem('questionIdList')
infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
if (typeof infoStore2[pNumKey] !== 'undefined') infoStore2 = infoStore2[pNumKey];
 storageArrayTemp = JSON.parse(sessionStorage.getItem('storageArray'));
    storageArray = storageArrayTemp[pNumKey];
    let result = selectAndDisplay(infoStore2, storageArray);
    infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
     // console.log(infoStore2);
    let aESObject = {version: subjectObj.version, countPagination: sessionStorage.getItem('countPagination'), storageArray: storageArrayTemp, infoStore: infoStore2, runningCount: runningCount, pNum: pNum, placeHolder: JSON.parse(placeHolder), questionIdList: JSON.parse(questionIdList)};
    
    saveToBrowser(aESObject);

    // console.log(aESObject);
    saveToBrowser(aESObject);

// // console.log('here');
//// // console.log('or here');
} else {
    // console.log('three');
    // // console.log(JSON.parse(sessionStorage.getItem('storageArr')), JSON.parse(sessionStorage.getItem('aESObject')));
    // // console.log('or here');
    let placeHolder, questionIdList, storageArray, storageArrayTemp;

    placeHolder = sessionStorage.getItem('placeHolder');
    questionIdList = sessionStorage.getItem('questionIdList')
    let infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
    if (typeof infoStore2[pNumKey] !== 'undefined') infoStore2 = infoStore2[pNumKey];
    storageArrayTemp = JSON.parse(sessionStorage.getItem('storageArray'));
    storageArray = storageArrayTemp[pNumKey];
    //// // console.log(storageArray);
    let result = selectAndDisplay(infoStore2, storageArray);
    
    infoStore2 = JSON.parse(sessionStorage.getItem('infoStore'));
    // console.log(infoStore2);
    // if (typeof infoStore2[pNumKey] === 'undefined') infoStore2 = infoStore2[pNumKey];
    let aESObject = {version: subjectObj.version, countPagination: sessionStorage.getItem('countPagination'), storageArray: storageArrayTemp, infoStore: infoStore2, runningCount: runningCount, pNum: pNum, placeHolder: JSON.parse(placeHolder), questionIdList: JSON.parse(questionIdList)};
    // console.log(storageArrayTemp);
    console.log(aESObject);
    saveToBrowser(aESObject);


}
}
}


   
//// // console.log('hereeo!');



// let deepCopy = (obj) => {
    // if (obj === null) {
    //     return obj;
    // }
    // let copy = Array.isArray(obj) ? [] : {};

    // for (let key in obj) {
    //     if (typeof obj[key] !== 'object' && typeof obj[key] !== 'array') {
    //         copy[key] = obj[key];
    //     } else if (typeof obj[key] === 'array') {
    //         for (let i = 0; i < obj[key].length; i++) {
    //             if (typeof obj[key][i] === 'array') {
    //                 copy.push((deepCopy(obj[key][i])));
    //             } else {
    //                 copy.push(obj[key][i]);
    //             }
    //         }
    //     } else if (typeof obj === 'object') {
    //         copy[key] = deepCopy(obj[key]);
    //     }
    // }
    // return copy
function deepCopy(value) {
  // Primitives (number, string, boolean, null, undefined, symbol)
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Date
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Array
  if (Array.isArray(value)) {
    return value.map(deepCopy);
  }

  // Plain Object
  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepCopy(value[key]);
    }
  }
  return result;
}

let switchQuestions = (e) => {
    e.preventDefault();
    init();

}