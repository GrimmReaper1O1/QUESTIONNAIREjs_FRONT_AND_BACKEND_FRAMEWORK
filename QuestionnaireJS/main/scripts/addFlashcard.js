let paragraphReplace = (string) => {
    console.log(string);
    let text = string.replace(/\n(?!;)/g, '</p><p>');
    text = text.replace(';</p><p>', '');
    return text;

};

const enterInfo = (e) => {
    e.preventDefault();
    let category = document.getElementById('categories');
    if (category.value !== 'Other') {
    let qEl = document.getElementById('question');
    let aEl = document.getElementById('answer');
    // if (qEl.classList.contains('questionGroup')) {
    //     qEl.classList.remove('questionGroup');
    //     aEl.classList.remove('answerGroup');
    // }
    let questionGroup = document.getElementsByClassName('questionGroup');
    let answerGroup = document.getElementsByClassName('answerGroup');
    let object = {};
    object.questions = [];
    object.answers = [];
    console.log(questionGroup[0].value);
    for (let i = 0; i < questionGroup.length; i++) {
    object.questions.push(questionGroup[i].value);
    object.answers.push(answerGroup[i].value);
    }
    object.category = category.value;
    console.log(object);
    fetchIt('send', object);
    setTimeout(
        ()=> {
    fetchIt('category', {category: category.value});
        }, 100);
    } else {
        // put error message here
    }

}

const insertFlashCardsViaCategoryAndSubject = (object) => {
    let elFlashCards = document.getElementById('flashCards');
    let stringQ = 'Question ';
    let stringA = 'Answer ';
    let inputString = '';
    let elDiv = document.createElement('div');
    elFlashCards.innerHTML = '';
    let questionHEl = document.createElement('h4');
    let answerHEl = document.createElement('h4');
    let paragraphEl = document.createElement('p');
    for (let i = 0; i < object.length; i++) {
        let qH = questionHEl.cloneNode(true);
        qH.textContent = `Question ${i+1}:`;
        let aH = questionHEl.cloneNode(true);
        aH.textContent = 'Answer';
        let p1 = '<p>';
        let p2 = '</p>';
        let strObj1 = paragraphReplace(object[i].question);
        let strObj2 = paragraphReplace(object[i].answer);
       let str1 = p1 + strObj1 + p2;
       let str2 = p1 + strObj2 + p2;
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        div1.classList.add('width-100');
        div2.classList.add('width-100');
         div1.innerHTML = str1;
         div2.innerHTML = str2;
         console.log(str1);
        elDiv.appendChild(qH);
        elDiv.appendChild(div1);
        elDiv.appendChild(aH);
        elDiv.appendChild(div2);
    }
    elFlashCards.appendChild(elDiv);
    
}

const insertCategories = (object) => {
        let catSelector = document.getElementById('categories');
        let object2 = [];

      

        for (let i = 0; i < object.length ; i++) {
            let catInput = document.createElement('option');
            catInput.value = object[i].category;
            catInput.textContent = object[i].category;
            catSelector.appendChild(catInput);
        }

}

const fetchIt =  (option, object1 = {}) => {
    
    
    let uri, options;
    
    object1.subjectId = JSON.parse(sessionStorage.getItem('subjectId'));
    object1.id = JSON.parse(localStorage.getItem('id'));
    options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object1)};
    switch (option) {
        case 'categories':
            uri = `http://localhost:5000/api/auth/flashCards/fetchCategories`;
            options.method = 'POST'
            break;
            case 'send':
                uri = `http://localhost:5000/api/auth/flashCards/insertFlashCards`;
                options.method = 'PUT';
                break;
                default:
                    uri = `http://localhost:5000/api/auth/flashCards/getFlashCardsViaCategoriesAndSubject`;
                    options.method = 'POST';
                    break;
                    
                };
                try {
                    fetch(uri, options).then(async response => { 
                        if (response.ok) {      
                            let data = await response.json();
                            console.log(data);
                            if (option === 'categories') {
                                insertCategories(data.result);
                                sessionStorage.setItem('categoryArray', JSON.stringify(data.result));
                                return
                            } 
                                insertFlashCardsViaCategoryAndSubject(data.result);
                                return          } else {
                            throw new Error("The request couldn't go through!");
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                    
                } catch (e) {
                    console.log(e);
                }
                console.log('not halted');
}
            
const clearBoxes = (e) => {
                    e.preventDefault();
                    sessionStorage.removeItem('textArray');
                    let questionGroup = document.getElementsByClassName('questionGroup');
                    let answerGroup = document.getElementsByClassName('answerGroup');
                    for (let i = 0 ; i < questionGroup.length; i++) {
                        questionGroup[i].value = '';
                        answerGroup[i].value = '';
                    }
                
}

let selectCategory = (e) => {
                e.preventDefault();
                let catSelector = document.getElementById('categories');
                console.log('it got in');
               
                
                if (e.target.value === 'Other') {
                   

                    let flashDiv = document.getElementById('flashCards');
                    flashDiv.innerHTML = '';
                    
                    let divEl = document.createElement('div');
                    divEl.id = 'catDiv';
                    let inputDiv = document.getElementById('catInputDiv');
                    let el = document.createElement('input');
                    el.id = 'category';
                    el.type = 'text';
                    let el2 = document.createElement('button');
                    el2.setAttribute('onchange', 'inputCategory(event)');
                    el2.textContent = ' SUBMIT CATEGORY!';
                    el2.id = 'catButton';
                    let breakEl = document.createElement('br');
                    divEl.appendChild(breakEl.cloneNode(true));
                    divEl.appendChild(el);
                    divEl.appendChild(breakEl.cloneNode(true));
                    divEl.appendChild(breakEl.cloneNode(true));
                    divEl.appendChild(el2);
                    inputDiv.appendChild(divEl);
                    el2.addEventListener('click', eventListnerFunc);
                    
                } else {
                    try {
                        let divEl = document.getElementById('catDiv');
                        divEl.remove();
                        fetchIt('category', {category: e.target.value});
                        
                    }catch (e) {
                    // console.log(e);
                }
            
            
            
            
                }
            
            
            
            
                let flashEl = document.getElementById('flashcards');
            
            
};
            
            const changeNumberOfFlashcards = (e) => {
                let start, textArrayTemp, textArray, el2, el4, el5, el6, el7, el8, el9, savedTextArray1, savedTextArray2, numeral;
                
                    numeral = e.target.value;
     start = true;
                let subBut = document.getElementById('enterInfo');
                if (numeral > 0) {
                    if (subBut.classList.contains('hidden')) subBut.classList.remove('hidden');
                    
                } else {
                    
                    if (!subBut.classList.contains('hidden')) subBut.classList.add('hidden');
                }

    console.log(numeral);
    let infoArray = [];
    let insertEl2 = document.getElementById('repeatingFlashcardInputs');
    console.log(insertEl2);

        
        
        el7 = [];
        el6 = [];
        let insertEl = document.getElementById('repeatingFlashcardInputs');
        let el = document.getElementsByClassName('questionGroup');
        let el3 = document.getElementsByClassName('answerGroup');
        let button = document.getElementById('enterInfo')
     
        let answerTextHeading = document.createElement('h4');
        let tAQuestion = document.getElementById('question');
        let tAAnswer = document.getElementById('answer');
        console.log(tAAnswer);
        textArrayTemp = [];
        textArrayTemp.push([]);
        textArrayTemp.push([]);
   
        for (let i = 0 ; i < el.length ; i++) {
       
            textArrayTemp[0].push(el[i].value);
            textArrayTemp[1].push(el3[i].value);
            console.log(textArrayTemp);
        }
       
        
      
        if (sessionStorage.getItem('textArray') !== null) {
        textArray = JSON.parse(sessionStorage.getItem('textArray'));

      
        } else {
              textArray = [];
        textArray.push([]);
        textArray.push([]);
  
        }
       
        if (textArray[0].length <= textArrayTemp[0].length) {
            for (let i = 0; i < textArrayTemp[0].length; i++) {
                if (i < textArray[0].length) { 
                if ((textArray[0][i] !== textArrayTemp[0][i] || textArray[1][i] !== textArrayTemp[1][i])) {
                    textArray[0][i] = textArrayTemp[0][i];
                    textArray[1][i] = textArrayTemp[1][i];
               
                }
                } else {
               
                    textArray[0].push(textArrayTemp[0][i]);
                    textArray[1].push(textArrayTemp[1][i]);
                }
            }
         
        } else {
            for (let i = 0; i < textArray[0].length; i++) {
                if (typeof textArrayTemp[0][i] !== 'undefined' &&  (textArray[0][i] !== textArrayTemp[0][i] || textArray[1][i] !== textArrayTemp[1][i])) {
                    textArray[0][i] = textArrayTemp[0][i];
                    textArray[1][i] = textArrayTemp[1][i];
                }
            }
       
        }
        console.log(textArray);
        console.log(textArrayTemp);
        insertEl.innerHTML = '';
        answerTextHeading.textContent = 'QUESTION';
        let questionTextHeading = document.createElement('h4');
        questionTextHeading.textContent = 'ANSWER';
        for (let i = 0; i < Number(numeral) ; i++) {
            
            let temp1 = tAQuestion.cloneNode(true);
            let temp2 = tAAnswer.cloneNode(true);
            temp1.value = '';
            temp2.value = '';
            temp1.classList.add('questionGroup');
            temp2.classList.add('answerGroup');
            temp1.id = '';
            temp2.id = '';
            el7.push(temp1);
            el6.push(temp2);
            console.log(typeof textArray);
        }
        console.log(el7);
        for (let i = 0 ; i < Number(numeral); i++) {
            if (typeof textArray[0][i] !== 'undefined') {
                console.log(textArray[0][i]);
                el7[i].value = textArray[0][i];
                el6[i].value = textArray[1][i];
            }
        }
        for (let i = 0 ; i <  Number(numeral); i++) {
            
            el5 = questionTextHeading.cloneNode(true);
            el4 = answerTextHeading.cloneNode(true);
            // el5.textContent += ` ${i+1}:`;
            el4.textContent += ` ${i+1}:`;
            
            insertEl.appendChild(el4);
            insertEl.appendChild(el7[i]);
            insertEl.appendChild(el5);
            insertEl.appendChild(el6[i]);
 
                
            }
            
   
    console.log(document.querySelector('body').offsetHeight);
    sessionStorage.setItem('textArray', JSON.stringify(textArray));
        
}

let eventListnerFunc = (e) => {
    e.preventDefault();
   let el2 = document.createElement('button');
    console.log('what the!!!!!!!!!!!!!!!!!!!!!');
    let optEl = document.createElement('option');
    let inputString = document.getElementById('category');
    let divEl = document.getElementById('catDiv');
    let selectorEl = document.getElementById('categories');
    if (inputString.value !== 'Other') {
    let cats = JSON.parse(sessionStorage.getItem('categoryArray'));
    console.log(cats);
    let arr = [];
    try {
    arr = cats.filter(item => item.category === inputString.value || item.category === e.target.value);
    console.log(arr);
    } catch {};
    if (arr.length < 1) {
    let object = {};
    object.category = inputString.value;

    el2.removeEventListener('click', eventListnerFunc);
    optEl.value = object.category;
    console.log(optEl);
    selectorEl.value = inputString.value;
    optEl.textContent = inputString.value;
    
    selectorEl.appendChild(optEl);
} 
    }
selectorEl.value = inputString.value;
divEl.remove();
}

const gatherFlashcardCategoriesViaSubject = () => {
    fetchIt('categories');
    
}
gatherFlashcardCategoriesViaSubject();

if (document.getElementById('categories').children.length > 0) {
      let inputDiv = document.getElementById('catInputDiv');
        let el = document.createElement('input');
        el.id = 'category';
        el.type = 'text';
        let el2 = document.createElement('button');
        el2.setAttribute('onchange', 'inputCategory(event)');
        el2.textContent = ' SUBMIT CATEGORY!';
        el2.id = 'catButton';
        let divEl = document.createElement('div');
        divEl.id = 'catDiv';
         let breakEl = document.createElement('br');
        divEl.appendChild(breakEl.cloneNode(true));
        divEl.appendChild(el);
        divEl.appendChild(breakEl.cloneNode(true));
        divEl.appendChild(breakEl.cloneNode(true));
        divEl.appendChild(el2);
        inputDiv.appendChild(divEl);
        el2.addEventListener('click', eventListnerFunc);

}

const submitCategory = (e) => {
    let el = document.getElementById(category);
    let category = el.value;
    // send info
    el.remove();
    let catSelector = document.getElementById('categories');
    let option = document.createElement('option');
    option.value = category;
    catSelector.value = category;
    catSelector.appendChild(option);
    fetchIt('category');
}
