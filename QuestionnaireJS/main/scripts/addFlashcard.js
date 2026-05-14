
const fetchIt =  (option, object = '') => {
    
    
    let uri, options;
    
    object = {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object)};
    switch (option) {
        case 'category':
            uri = `https://localhost:5000/api/flashCards/insertCategory`;
            
            break;
            case 'send':
                uri = `https://localhost:5000/api/flashCards/insertFlashCards`;
                break;
                default:
                    uri = `https://localhost:5000/api/flashCards/getFlashCardsViaSubject`;
                    object.method = 'POST';
                    break;
                    
                };
                try {
                    fetch(uri, options).then(async response => { 
                        if (response.ok) {      
                            let data = await response.json();
                            console.log(data);
                            if (option === 'categories') {
                                
                            } else if (option === 'send') {
                                
                            } else {
                                
                            }
                        } else {
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
            
            let selCategory = (e) => {
                let catSelector = document.getElementById('categories');
                console.log('it got in');
                if (e.target.value === 'other') {
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
                }catch (e) {
                    console.log(e);
                }
            
            
            
            
                }
            
            
            
            
                let flashEl = document.getElementById('flashcards');
            
            
            };
            
            const changeNumberOfFlashcards = (e) => {
                let start, textArrayTemp, textArray, el2, el4, el5, el6, el7, el8, el9, savedTextArray1, savedTextArray2, numeral;
                if (typeof e.target !== 'undefined') {
                    numeral = e.target.value;
     start = true;
    } else {
        numeral = e;
        start = false;
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
       
        let answerTextHeading = document.createElement('h4');
   
        textArrayTemp = [];
        textArrayTemp.push([]);
        textArrayTemp.push([]);
   
        for (let i = 0 ; i < el.length ; i++) {
            el7.push(el[i].cloneNode(true));
            el6.push(el3[i].cloneNode(true));
            textArrayTemp[0].push(el[i].value);
            textArrayTemp[1].push(el3[i].value);
            console.log(textArrayTemp);
        }
       
        
      
        if (sessionStorage.getItem('textArray') !== null) {
        textArray = JSON.parse(sessionStorage.getItem('textArray'));
        el[0].value = textArray[0][0];
        el3[0].value = textArray[1][0];
      
        } else {
              textArray = [];
        textArray.push([]);
        textArray.push([]);
  
        }
        if (start) {
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
        for (let i = 0; i < Number(numeral)+1 ; i++) {
            if (i !== 0) {
            el5 = questionTextHeading.cloneNode(true);
            el4 = answerTextHeading.cloneNode(true);
            let temp1 = el7[0].cloneNode(false);
            let temp2 = el6[0].cloneNode(false);
            temp1.value = '';
            temp2.value = '';
            temp1.classList.add('questionGroup');
            temp2.classList.add('answerGroup');
            
            el7.push(temp1);
            el6.push(temp2);
            console.log(typeof textArray);
            console.log(el[0].value, el[0].textcontent);
            if (typeof textArray[0][i] !== 'undefined') {
            el7[i].value = textArray[0][i];
            el6[i].value = textArray[1][i];
            }
            
            
            
            insertEl.appendChild(el4);
            insertEl.appendChild(el7[i]);
            insertEl.appendChild(el5);
            insertEl.appendChild(el6[i]);
        } else {
            el[i].value = textArray[0][i];
            el3[i].value = textArray[1][i];
        }
            
        }
        
    // if (numeral === 0) {
    //     insertEl2.innerHTML = '';
    // }
    console.log(document.querySelector('body').offsetHeight);
    sessionStorage.setItem('textArray', JSON.stringify(textArray));
        }
}

changeNumberOfFlashcards(0);


let eventListnerFunc = (e) => {
   let el2 = document.createElement('button');
    console.log('what the!!!!!!!!!!!!!!!!!!!!!');
    let inputString = document.getElementById('category');
    let object = {};
    let divEl = document.getElementById('catDiv');
    object.subjectId = JSON.parse(sessionStorage.getItem('subjectId'));
    object.id = JSON.parse(sessionStorage.getItem('id'));
    object.category = inputString.value;
    fetchIt('categories', object);
    divEl.remove();
    el2.removeEventListener('click', eventListnerFunc);
    let optEl = document.createElement('option');
    optEl.value = object.category;
    optEl.textContent = object.category;
    console.log(optEl);
    let selectorEl = document.getElementById('categories');
    selectorEl.appendChild(optEl);
    selectorEl.value = object.category;
   
}

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
    fetchIt('category', {category: category, id: JSON.parse(sessionStorage.getItem('id')), subjectId: JSON.parse(sessionStorage.getItem('subjectId'))});


    el.remove();
    let catSelector = document.getElementById('categories');
    let option = document.createElement('option');
    option.value = category;
    catSelector.value = category;
    catSelector.appendChild(option);
}