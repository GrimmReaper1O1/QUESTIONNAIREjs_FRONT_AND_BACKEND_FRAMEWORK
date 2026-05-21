
sessionStorage.removeItem('question');
sessionStorage.setItem('question', 'true');
let flashCardOnly = false;
let mainObj = {version: 0, selectionNu: 0, subjectId: 310, showDisplay: true, truthyFilledTextarea: false, allowSeenTA: true, indexObj: {complete: false, seenNu: 0, length: false}, infoObj: {seenNu: 0, length: false, filled: false, complete: false, completelyViewed: false}, randNu: 0, scoreObj: {subjectId: 310, overallTestCorrect: 0, overallTestIncorrect: 0}};
sessionStorage.removeItem('mainObj');
sessionStorage.setItem('mainObj', JSON.stringify(mainObj));
let tallyHelperFunc = (mainObj) => {
    let overallTestCorrect = mainObj.scoreObj.overallTestCorrect
    , overallTestIncorrect = mainObj.scoreObj.overallTestIncorrect
    , highestCorrect, lowestCorrect, overallCorrect, overallIncorrect
    , oCTFullSet, percentCorrectOTC, percentIncorrectOTC,
    oCFullSet, percentCorrectOC, percentIncorrectOC;
    if (typeof mainObj.scoreObj[mainObj.randNu] !== 'undefined') {
     overallCorrect = mainObj.scoreObj[mainObj.randNu].overallCorrect
     overallIncorrect = mainObj.scoreObj[mainObj.randNu].overallIncorrect
     oCFullSet = overallCorrect + overallIncorrect;
     if (overallCorrect === 0 || oCFullSet === 0) { 
    percentCorrect = 0; 
    } else {
     percentCorrectOC = 10*(overallCorrect / oCFullSet);
     }
     percentIncorrectOC = 100 - percentCorrectOC;
    }
    
    
    oCTFullSet = overallTestCorrect + overallTestIncorrect;
    if (oCTFullSet === 0 || overallTestCorrect === 0) {
    percentCorrectOTC = 0;
    } else {
    percentCorrectOTC = 10*(overallTestCorrect / oCTFullSet);
    }
    percentIncorrectOTC = 100 - percentCorrectOTC;
    let h6El = document.createElement('h6');
    let br = document.createElement('br');
    let insertEl = document.getElementById('scoreDiv');
    h6El.textContent = `OVERALL NUMBER OF QUESTIONS ATTEMPTED: ${oCTFullSet}`;
    insertEl.appendChild(h6El.cloneNode(true));

    h6El.textContent = `Percentage of answers from round.`;
    insertEl.appendChild(h6El.cloneNode(true));
    h6El.textContent = `CORRECT: ${percentCorrectOTC} INCORRECT: ${percentIncorrectOTC}`;
    insertEl.appendChild(h6El.cloneNode(true));
    console.log(oCTFullSet,overallTestCorrect,overallTestIncorrect,percentCorrectOTC,percentIncorrectOTC);
    if (typeof mainObj.scoreObj[mainObj.randNu] !== 'undefined' && typeof mainObj.scoreObj[mainObj.randNu].overallCorrect !== 'undefined') {
        h6El.textContent = `Percentage of answers from category ${mainObj.indexObj[mainObj.randNu].categoryName}`;
        insertEl.appendChild(h6El.cloneNode(true));
        h6El.textContent = `CORRECT: ${percentCorrectOC} INCORRECT: ${percentIncorrectOC}`;
    }
    return
}

let loadOrSaveIndexedDb = async (option, object = {}) => {
    
        storeName = `flashCards`;
        try {
        if (option === 'load') {
            let obj = await loadFromIndexedDB(`questionnairsId${sessionStorage.getItem('subjectId')}Score`, 'flashCards', 'flashCards');
            console.log(obj.object);
            sessionStorage.setItem('mainObj', JSON.stringify(obj.object));    
            return
        }
    } catch (e) {console.log(e);
        return
    }
        if (option === 'save') { 
            let  key;
            key = `flashCards`;
           await saveToIndexedDB( storeName,{id: key, object: object},  key, `questionnairsId${sessionStorage.getItem('subjectId')}Score`);
            sessionStorage.setItem('mainObj', JSON.stringify(object));    
           
            return 
            
        }
}

let checkVer = (mainObj) => {
    console.log(JSON.parse(sessionStorage.getItem('info')));
let info = JSON.parse(sessionStorage.getItem('info'));
try {
loadOrSaveIndexedDb('load', {});
} catch { console.log('error here'); }
setTimeout(()=> {
let secondaryObj =  JSON.parse(sessionStorage.getItem('mainObj'));
console.log(secondaryObj);
if (typeof secondaryObj !== 'undefined' && (info.version === secondaryObj.version)) {
    mainObj = secondaryObj;
}

sessionStorage.setItem('mainObj', JSON.stringify(mainObj));

}, 100)
}

checkVer(mainObj)
let changeVisibilityOfReplyArea = async (e) => {
   e.preventDefault();
   let mainObj = JSON.parse(sessionStorage.getItem('mainObj'));
   let textareaDiv = document.getElementById('insertTextareaDiv');
   mainObj.allowSeenTA = (sessionStorage.getItem('question') === 'true' ? false : true);
   mainObj.showDisplay = (mainObj.showDisplay) ? false : true;
//    
    
sessionStorage.setItem('mainObj', JSON.stringify(mainObj));
}

let fetchIt = (opt, mainObj) => {
  
    console.log('two here');
    console.log(mainObj);
    console.log(mainObj.indexObj);
    console.log(mainObj.indexObj[mainObj.randNu])
   let options, uri;
    if (opt === 'category') {
      uri = 'http://localhost:5000/api/auth/flashCards/getFlashCardsViaCategoriesAndSubject';
               options = {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({subjectId: 310, category: mainObj.indexObj[`${mainObj.randNu}`].categoryName})};
               
        } else { 
            uri = 'http://localhost:5000/api/auth/flashCards/fetchCategories';
        options = {method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({subjectId: '310'})};
//   JSON.parse(sessionStorage.getItem('subjectId'))
        }
     
       
     
            fetch(uri, options).then(async res => {
                    if (res.ok) {
                        let data = await res.json();
                        console.log(data);
                        if (opt === 'category') { 
                               fillInfoObj(data.result, mainObj);
                            }
                            else {
                               createIndex(data.result, mainObj);
                            };

                    } else {
                        throw Error("This didn't work! fetch statement.");
                    }

            }).catch(error => {

            })
}
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let completedListener = () => {
    let mainObj = JSON.parse(sessionStorage.getItem('mainObj'));
    let insertBox = document.getElementById('insertBox');
    insertBox.removeEventListener('click', completedListener);
    chooseRandomCategory();
     fillInfoObj({}, mainObj);
}

let chooseRandomCategory = (e = '') => {
    if (e !== '') {
    e.preventDefault();
    console.log(e.target.textContent);
}
console.log((typeof mainObj.scoreObj[mainObj.randNu] !== 'undefined' && e.target.textContent === 'correct') );
if (e !== '' && typeof mainObj.scoreObj[mainObj.randNu] !== 'undefined' && e.target.textContent === 'correct') {

let displayCompletedRound = (mainObj) => {

    let insertBox = document.getElementById('insertBox');
    insertBox.addEventListener('click', completedListener);
    let headingEl = document.createElement('h1');
    headingEl.textContent = 'COMPLETED ROUND!';
    insertBox.innerHTML = '';
    insertBox.appendChild(headingEl);
}

if (typeof mainObj.scoreObj[mainObj.randNu].flashCards !== 'undefined' ) mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].correct++;
mainObj.scoreObj[mainObj.randNu].overallCorrect++
} else if (typeof mainObj.scoreObj[mainObj.randNu] !== 'undefined') {
    if (typeof mainObj.scoreObj[mainObj.randNu].flashCards !== 'undefined' ) mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].incorrect++;
    mainObj.scoreObj[mainObj.randNu].overallIncorrect++
}
mainObj.scoreObj.overallTestCorrect++
mainObj.scoreObj.overallTestIncorrect++


setTimeout(()=> {
    let mainObj =  JSON.parse(sessionStorage.getItem('mainObj'));
    let insertBox = document.getElementById('insertBox');
    loadOrSaveIndexedDb('save', mainObj);
       insertBox.innerHTML = '<h2>Please wait.</h2> <h2>Shuffling...</h2>';
       console.log('one here');
       console.log(mainObj);
       console.log(mainObj.indexObj, mainObj.infoObj);
       console.log('gotHere', sessionStorage.getItem('question'));
       let infoDataCounter = 0, wipe = false;
       
       
       mainObj.randNu = getRandomIntInclusive(0, mainObj.infoObj.length-1);
       
       
       
       console.log('what the!!!');
       
       let changeNu = (mainObj) => {
        // let mainObj3 = deepCopy(mainObj)
        let mainObj3 = mainObj;
        let helper = (mainObj2) => { 
            let counter = 0, counter2 = 0, counter3 = 0;
            let helper2 = (mainObj2) => { 
                // mainObj2 = deepCopy(mainObj2);
                if (mainObj2.infoObj.length-1 === mainObj2.randNu) { mainObj2.randNu = 0; 
                    console.log(mainObj2.randNu, 'posOne'); 
                    
                } else if (mainObj2.randNu < mainObj2.infoObj.length-1)  { mainObj2.randNu++ 
                console.log(mainObj2.randNu, 'posTwo');
            }
            return mainObj2
        }
        mainObj2 = helper2(mainObj2);
        if (mainObj2.infoObj.filled) {
            let count = 0;
            for (let i = 0; i < mainObj2.infoObj.length; i++) {
                if (mainObj2.infoObj[i].seen) count++;
            }
            if (count !== 1 && mainObj2.randNu === JSON.parse(sessionStorage.getItem('prevNumeral'))) mainObj2 = helper2(mainObj2);
            for (let i = 0; i < mainObj2.infoObj.length; i++) {
                if (mainObj2.infoObj[i].seen) counter3++
            }
            console.log(counter3, mainObj2.infoObj.length);
            if (counter3 === mainObj2.infoObj.length) {
                for (let i = 0; i < mainObj2.infoObj.length; i++) {
                    if (!mainObj2.infoObj[i].completelyViewed) {
                        mainObj2.infoObj[i].seen = false;
                        console.log('completed Objective');
                    }
                }
                
                // return mainObj2
            }
            console.log(mainObj2)
            // for (let i = 0; i < mainObj2.infoObj[mainObj2.randNu].data.length; i++) {
                //     console.log(mainObj2.randNu, i);
                //     console.log(mainObj2.randNu, mainObj2)
                //     if (mainObj2.infoObj[mainObj2.randNu].data[i].seen) {
                    //         counter++;
                    //     }
                    // }
                    // if (mainObj2.infoObj[mainObj2.randNu].data.length) mainObj2.infoObj[mainObj2.randNu].completelyViewed = true;
                    
                    for (let i = 0; i < mainObj2.infoObj.length; i++) {
                        if (mainObj2.infoObj[i].completelyViewed) counter2++
                        
                    }
                    if (counter2 === mainObj2.infoObj.length) {
                        
                        
                        
                        
                        
                        mainObj.scoreObj.overallTestCorrect = 0;
                        mainObj.scoreObj.overallTestIncorrect = 0;
                        
                        for (let a = 0; a < mainObj2.infoObj.length; a++) {
                            mainObj.scoreObj[a].overallCorrect = 0;
                            mainObj.scoreObj[a].overallIncorrect = 0;
                            mainObj2.infoObj[a].seen = false;
                            for (let i = 0; i < mainObj2.infoObj[a].data.length; i++) {
                                console.log('activated');
                                mainObj2.infoObj[a].data[i].seen = false;
                                mainObj2.infoObj[a].data[i].completelyViewed = false;
                            }
                            
                        }
                        mainObj2.infoObj.completelyViewed = true;
                        console.log(mainObj2.infoObj.completelyViewed, mainObj2.infoObj[mainObj.randNu].seen );
                        // if (!mainObj2.infoObj[mainObj2.randNu].seen && !mainObj2.infoObj[mainObj2.randNu].completelyViewed) return mainObj2
                        // if (mainObj2.infoObj[mainObj2.randNu].completelyViewed) {
                            
                        //     mainObj2 = helper(mainObj2);
                        //     return mainObj2 }
                        return mainObj2
                    } else {
                        return mainObj2
                    }
                } else {
                    if (typeof mainObj2.infoObj[mainObj2.infoObj] !== 'undefined' && mainObj2.infoObj[mainObj2.randNu].seen) mainObj2 = helper(mainObj2); 
                    return mainObj2;
                }
                
            }
            
            return helper(mainObj3);
        }
        
        
        let l2SeenNu = 0, switchValOuter = true, switchValInner = true, l1SeenNu = 0;
        let countCompleteView = 0;
        console.log(switchValInner, 'switchVal');
        outermostLoop: do { 

            l2SeenNu = (typeof mainObj.infoObj[mainObj.randNu] !== 'undefined' ) ? getRandomIntInclusive(0, mainObj.infoObj[mainObj.randNu].data.length-1) : 0;
            let counterNu = 0;
            if (typeof mainObj.infoObj[mainObj.randNu] !== 'undefined') {
                if (!mainObj.infoObj[mainObj.randNu].seen) {
                    console.log(mainObj.randNu, 'before inner loop');
                    innerDoLoop: do {
                        counterNu++
                        // if (l2SeenNu === mainObj.infoObj[mainObj.randNu].data.length) l2SeenNu = 0; 
                        if (counterNu !== mainObj.infoObj[mainObj.randNu].data.length+1) {
                            
                            console.log(mainObj.randNu, l2SeenNu, mainObj.infoObj[mainObj.randNu].data.length);
                            console.log(mainObj.infoObj[mainObj.randNu].data[l2SeenNu].seen);
                            if (!mainObj.infoObj[mainObj.randNu].data[l2SeenNu].seen) {
                                console.log('got hereeo ', l2SeenNu, mainObj)
                                mainObj.selectionNu = l2SeenNu;
                                console.log('objective complete one');
                                switchValInner = false;
                                switchValOuter = false;
                                break;
                                
                                
                            } else if (l2SeenNu === mainObj.infoObj[mainObj.randNu].data.length-1 && mainObj.infoObj[mainObj.randNu].data[l2SeenNu].seen) {
                                
                                console.log('did i get here two');
                                l2SeenNu = 0;
                                
                            } else if (l2SeenNu < mainObj.infoObj[mainObj.randNu].data.length-1 && mainObj.infoObj[mainObj.randNu].data[l2SeenNu].seen){
                                console.log('why Not three');
                                l2SeenNu++
                                
                            } 
                            console.log('skipped all');
                        } else {
                            console.log('went to change five');
                            switchValOuter = false;
                            switchValInner = false;
                            mainObj = changeNu(mainObj);
                            break
                        }
                        
                    } while (switchValInner)
                        
                    } else {
                        console.log('CHANGE', mainObj.infoObj[mainObj.randNu].completelyViewed, mainObj.infoObj[mainObj.randNu], mainObj.infoObj[mainObj.randNu].data[l2SeenNu].completelyViewed)
                        mainObj = changeNu(mainObj)
                        
                        
                        
                        
                    }
                } else { switchValOuter = false }
                
                
            } while (switchValOuter)
    
                
                
                
                console.log(mainObj.randNu);
                if (!mainObj.infoObj.filled) {
    fetchIt('category',  mainObj);
} else {


if (mainObj.completelyViewed) {
    displayCompletedRound(mainObj);
    mainObj.completelyViewed = false;
   
} else {
    fillInfoObj({}, mainObj);
}
}
}, 100);
    
}

let createIndex = (arr, mainObj) => {
    console.log(arr);
    
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'undefined') mainObj.indexObj = {...mainObj.indexObj, ...{[`${i}`]:{categoryName: arr[i].category}}};
        
    }
    mainObj.infoObj.length = arr.length;
    mainObj.indexObj.length = arr.length;
    console.log(mainObj.indexObj, mainObj.infoObj);
    // sessionStorage.removeItem('mainObj');
    
   sessionStorage.setItem('mainObj', JSON.stringify(mainObj));
    chooseRandomCategory('')
}

let displayFlashCard = (e = '', truthyQuestionCheck = ( sessionStorage.getItem('question') !== null ? sessionStorage.getItem('question') : 'true')) => {
    if (e !== '') {
    e.preventDefault();
        console.log(e.target.textContent);
}

    console.log('got here too sdf sfdg fsdfsds sfdsgs');
    setTimeout(()=> {
    let mainObj =  JSON.parse(sessionStorage.getItem('mainObj'));
        console.log(mainObj);
        let insertDiv = document.getElementById('insertBox');
        console.log(mainObj.infoObj, mainObj.randNu, mainObj.indexObj);
        let buttonEl = document.getElementById('button');
        let button2El = document.getElementById('button2');
        let button3El = document.getElementsByClassName('button3');
        let headingEl = document.createElement('h2');
        let textareaEl = document.getElementById('text');
        let textareaDiv = document.getElementById('insertTextareaDiv');
        if (flashCardOnly) textareaDiv.classList.add('hidden');
        insertDiv.innerHTML = '';
        console.log('hiya')
        console.log(mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].question, mainObj);
        headingEl.textContent = (truthyQuestionCheck === 'true' ? mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].question : mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].answer);
        console.log(textareaDiv.classList.contains((truthyQuestionCheck === 'false' ? 'display-block' : 'hidden')))
        if (mainObj.allowSeenTA) {
            
       if (textareaDiv.classList.contains((mainObj.showDisplay === false ? 'display-block'  : 'hidden'))) {    
           textareaDiv.classList.remove((mainObj.showDisplay === false ? 'display-block' : 'hidden'))
           textareaDiv.classList.add((mainObj.showDisplay === false ? 'hidden' : 'display-block'));
        }
    }
    if (mainObj.showDisplay) {
        // mainObj.allowSeenTa = mainObj.allowSeenTA ? false : true;
        
        if (textareaDiv.classList.contains((truthyQuestionCheck === 'false' ? 'display-block'  : 'hidden'))) {    
            textareaDiv.classList.remove((truthyQuestionCheck === 'false' ? 'display-block' : 'hidden'))
            textareaDiv.classList.add((truthyQuestionCheck === 'false' ? 'hidden' : 'display-block'));
        }
        
    }
    
    console.log(truthyQuestionCheck)
    if (truthyQuestionCheck === 'true') {
        if (typeof mainObj.scoreObj[mainObj.randNu] === 'undefined') { 
            console.log('got here one');
            mainObj.scoreObj = {...mainObj.scoreObj , ...{[mainObj.randNu]: {category: mainObj.indexObj[mainObj.randNu].categoryName }, overallCorrect: 0, overallIncorrect: 0}};
        }
        if (typeof mainObj.scoreObj[mainObj.randNu].flashCards === 'undefined') {
           console.log('got here 2')
            mainObj.scoreObj[mainObj.randNu].flashCards = {};
            mainObj.scoreObj[mainObj.randNu].flashCards = {...mainObj.scoreObj[mainObj.randNu].flashCards, ...{[mainObj.selectionNu]: {passedOnce: false, correct: 0, notCorrect: 0, qNum: mainObj.selectionNu, answerArray: []}}};
            
        } else {
            console.log('got here 3')
            if (typeof mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu] === 'undefined') 
                mainObj.scoreObj[mainObj.randNu].flashCards = {...mainObj.scoreObj[mainObj.randNu].flashCards, ...{[mainObj.selectionNu]: {passedOnce: false, correct: 0, notCorrect: 0, qNum: mainObj.selectionNu, answerArray: []}}};
        }
    } else {
        // sessionStorage.setItem('question', 'true');
    }
    console.log(mainObj);
    if (textareaEl.value !== '') {
        mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].answerArray.push(textareaEl.value);
        mainObj.truthyFilledTextarea = true;
        textareaEl.value = '';
    }
    
    insertDiv.appendChild(headingEl);
    mainObj.runs++
    let h4El = headingEl.cloneNode(true);
    if (typeof mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].answerArray[0] !== 'undefined') {
        
        let length = (mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].answerArray.length === 0 ? 0 : mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].answerArray.length-1);
        
        h4El.textContent = 'Your reply...    '+mainObj.scoreObj[mainObj.randNu].flashCards[mainObj.selectionNu].answerArray[length];
        
    }
    if (truthyQuestionCheck === 'true') {h4El.textContent = ''}
    if (mainObj.truthyFilledTextarea && mainObj.showDisplay) { mainObj.truthyFilledTextarea = false; insertDiv.appendChild(h4El);}
    (()=>{(!buttonEl.classList.contains('display-block') ? 
        (()=>{(mainObj.showDisplay ? 
            (()=>{console.log('one', truthyQuestionCheck); 
                
                // if (button2El.classList.contains('hidden') && truthyQuestionCheck === 'true') button2El.classList.add('hidden');
                (()=>{console.log('oneinner');(button3El[0].classList.contains('hidden') && !buttonEl.classList.contains('hidden') ? (()=>{console.log(button3El[0]); button3El[0].classList.remove('hidden'); button3El[1].classList.remove('hidden');})(): (()=>{console.log('threeinner'); button3El[0].classList.add('hidden'); button3El[1].classList.add('hidden');})())})();
                
                if (buttonEl.classList.contains('hidden')) {console.log('fourinner'); if (button3El[0].classList.contains('hidden')) buttonEl.classList.remove('hidden');console.log('fourinner'); button2El.classList.add('hidden')} else {if (!button3El[0].classList.contains('hidden')) {buttonEl.classList.add('hidden'); console.log('fiveinner');}}
                
                
            })() 
            : 
            (()=> {console.log('two'); 
                if (!button3El[0].classList.contains('hidden')) {button3El[0].classList.add('hidden'); button3El[1].classList.add('hidden'); } 
                if (truthyQuestionCheck) {
                    //  if (!button3El[0].classList.contains('hidden')) { 
                        // button3El[1].classList.add('hidden'); button3El[0].classList.add('hidden'); 
                        console.log('what the');
                        if (!buttonEl.classList.contains('hidden')) {
                            buttonEl.classList.add('hidden'); 
                            button2El.classList.remove('hidden');
                        }
                        else  {
                            console.log('here one');
                            buttonEl.classList.remove('hidden'); 
                            button2El.classList.add('hidden');
                            console.log('huh!')
                        } 
                    } else { 
                        console.log('here two');
                        if (!buttonEl.classList.contains('hidden')) {buttonEl.classList.remove('display-block'); buttonEl.classList.add('hidden'); button2El.classList.remove('hidden')} else { buttonEl.classList.remove('hidden'); button2El.classList.add('hidden');}
                    }})()
                )})() 
                : 
                (()=> {
                    (mainObj.showDisplay && !button3El[0].classList.contains('hidden') && buttonEl.classList.contains('display-block') ? 
                    ''
                    : 
                    (()=> {console.log('four'); buttonEl.classList.remove('display-block'); //buttonEl.classList.add('hidden');
                    })() 
                )})()
                // ''
            )
        })() ; 

    
        // ;
        sessionStorage.setItem('question', (truthyQuestionCheck === 'false' ? 'true' : 'false'));
        console.log(truthyQuestionCheck);
        // sessionStorage.removeItem('mainObj');
        
        sessionStorage.setItem('mainObj', JSON.stringify(mainObj));
        tallyHelperFunc(mainObj);
    }, 100);
  
    

}


let fillInfoObj = (arr, mainObj) =>{
    sessionStorage.setItem('prevRandNu', mainObj.randNu);
   
    console.log('what the')
    let filledCounter = 0;
    if (!mainObj.infoObj.filled) {
        console.log(mainObj, 'one');
        let tempObj = {[mainObj.randNu]:{category: arr[0].category, seen: true, completelyViewed: false, complete: false, data: [] }};
        mainObj.infoObj = {...mainObj.infoObj, ...tempObj};
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
           
            mainObj.infoObj[`${mainObj.randNu}`].data.push(arr[i]);
            console.log('here');
            mainObj.infoObj[mainObj.randNu].data[i].seen = false;
            mainObj.infoObj[`${mainObj.randNu}`].filled = true;
        } 
         console.log(mainObj, 'two');
        for (let i = 0; i < mainObj.infoObj.length; i++) {
            if (typeof mainObj.infoObj[i] !== 'undefined') filledCounter++
        }
        if (filledCounter === mainObj.infoObj.length) {
            mainObj.infoObj.filled = true;
        }
        mainObj.infoObj[mainObj.randNu].seen = true;
        mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].seen = true;
    } else {
         console.log(mainObj, 'three');
   mainObj.infoObj[mainObj.randNu].seen = true;
        
        mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].seen = true;
    }
//  may put elsewhere
    let counter = 0
    for (let i = 0; i < mainObj.infoObj[mainObj.randNu].data.length; i++) {
        if (typeof mainObj.infoObj[mainObj.randNu].data[i].seen !== 'undefined' && mainObj.infoObj[mainObj.randNu].data[i].seen) counter++;
    }
    console.log(counter === mainObj.infoObj[mainObj.randNu].data.length, counter, mainObj.infoObj[mainObj.randNu].data.length)
if (counter === mainObj.infoObj[mainObj.randNu].data.length) { mainObj.infoObj[mainObj.randNu].completelyViewed = true; 
} else { mainObj.infoObj[mainObj.randNu].completelyViewed = false; } 
    
    
    mainObj.infoObj[mainObj.randNu].seen = true;
    mainObj.infoObj[mainObj.randNu].data[mainObj.selectionNu].seen = true;
    console.log(mainObj.infoObj, mainObj.randNu);

    // sessionStorage.removeItem('mainObj');
   

   sessionStorage.setItem('mainObj', JSON.stringify(mainObj));
setTimeout(()=> {
displayFlashCard('');   
    }, 100)
}
 

let initiateFetchOfCategories = () => {
    fetchIt('categories', mainObj);
}

initiateFetchOfCategories();
