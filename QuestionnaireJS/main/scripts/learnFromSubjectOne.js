let fetchIt = async (option,  limit = '', letter = '',  searchInfo = '', offset = '' ) => {
  
//    test 
   let baseUrl = 'http://localhost:5000/api/auth/questions/subject';
   const params = {id: sessionStorage.getItem('subjectId'), option: 'id', get: 'subjectList'};

   console.log(params);
   
   let queryString = new URLSearchParams(params).toString();
   let apiURL = `${baseUrl}?${queryString}`;
   
   await fetch(apiURL).then(async res => {
       if (res.ok) {
           
           let response = await res.json();
            console.log(response);
           displayVideoOrAudio(response.result);
           displayAppendix(response.result);
           displayInfo(response.result);
            console.log(response.result[0]);
            sessionStorage.removeItem('subjectObj');
            sessionStorage.setItem('subjectObj', JSON.stringify(response.result[0]));
       } else {
           throw Error('It did not go through!');
       }
       
   }).catch(error => {
       console.log(error);
       
   });

};
var displayInfo = async (object2) => {
      
        let object = [];
        object = object2[0];

    let obj2 = {}; 
        obj2 = {...object, ...{
            // appendixArr: (typeof object.appendix === 'string' ? JSON.parse(object.appendix) : null),
            // videoArr: (typeof object.videos === 'string' ? JSON.parse(object.videos) : null),
            linkObj: (typeof object.links === 'string' ? JSON.parse(object.links) : null),
        }};

        delete obj2.links;

        console.log(obj2);



        let showHelper = (obj) => {



            let el0, el1, el2, el3, el4, indexNu, temp0, temp1, br;
            el0 = document.getElementById('heading');
            el1 = document.getElementById('introductionOne');
            el2 = document.getElementById('links');
    
     
            for (key in obj.linkObj) {
                const fillLinks = (option, obj, key) => {
                    let temp0 = option;
                    console.log(option.length, key.length);
                    let position = key.length - ((key.length - option.length)) ;

                    indexNu =  key[(position)]+`${(typeof key[(Number(position)+1)] !== 'undefined' ? key[(Number(position)+1)] : '')}`;
               
                let element = document.createElement('h4')
                element.setAttribute('id', key);
                br = document.createElement('br');
                
                console.log(element);
                el2.append(element);
                if (obj.linkObj[key] !== '' && obj.linkObj[key] !== null && obj.linkObj[key] !== '' && obj.linkObj[key] !== null && obj.linkObj[key]) {
                document.getElementById(key).textContent = (option === 'link' ? `link ${indexNu}: ` :'description :')+ obj.linkObj[key];
                }
                }

            if (key.includes('kDescription')) {
                
                fillLinks('linkDescription', obj, key);
            
            } else {
                
                fillLinks('link', obj, key);
            
            }
                

            }
let el;
            for (key in obj) {

                if (key !== 'videoArr' && key !== 'appendixArr' && key !== 'linkObj') {
                    
                     el = document.getElementById('heading');
                     let introductionEl = document.getElementById('introduction');
                     let introductionDiv = document.getElementById('introductionOne');
                     console.log(el);
                     if (el !== null) {
                        console.log(el);
                        switch (key) {
                            case 'name':
                                if (object2[0].type !== null) {
                            let header2 = document.createElement('h2');
                            header2.textContent = obj[key];
                            el.append(header2);
                                }
                            break;
                            case 'introduction':
                            element = document.createElement('h2');
                            element.textContent = 'INTRODUCTION';
                            introductionEl.textContent = obj[key];
                            introductionDiv.prepend(element);
                            break;
                            default:

                            break;
                        }
                    }
                }

            }
            let buttonDiv = document.getElementsByClassName('buttonDivs');
            let studyButton = document.createElement('button');
            studyButton.textContent = 'STUDY QUESTIONNAIRE';
            studyButton.setAttribute('onclick', 'goToPage(event)');
            console.log(obj);
           
                let ela = studyButton.cloneNode(true);
                ela.id = 'button';
            console.log(object2);
             if (object2[0].type !== null) {
                        buttonDiv[0].append(ela);
             }
                
           
            
            
            }

showHelper(obj2);

// object extraction
        
    }

let displayImage = e => {
    console.log(e.target.id);
    
    let el = document.getElementById(e.target.id);
    let prevEl = document.getElementById('mainWindow');
    let holderEl = document.getElementById('floatingGraphix');
    if (sessionStorage.getItem('imageToggle') === null || sessionStorage.getItem('imageToggle') === 'off') {
    prevEl.classList.add('hidden');
    let image = el.cloneNode(true);
    image.id = 'stored';
    image.classList.remove('appendixImage');
    console.log('test');
    image.classList.add('appendixImageHolder');
    let div = document.createElement('div');
    div.setAttribute('style', 'padding-left:  auto; padding-rigth: auto; width: 100%;  height: 100%');
    div.append(image);
    holderEl.classList.remove('hidden');
    holderEl.append(div);
    image.setAttribute('onclick', 'displayImage(event)');
    sessionStorage.setItem('imageToggle', 'on');
} else {
    
    holderEl.innerHTML = '';
    holderEl.classList.add('hidden');
    prevEl.classList.remove('hidden');
    sessionStorage.setItem('imageToggle', 'off');

    }


}


let displayAppendix = (object) => {
    console.log(object);
    let appendixObj = object.filter(obj => obj.type === 3);
    console.log(appendixObj);
    let containerEl = document.getElementById('appendix');
    let imageEl, figureEl, figCaptionEl
    for (let i = 0; i < appendixObj.length; i++ ) {
        imageEl = document.createElement('img');
        imageEl.setAttribute('onclick', 'displayImage(event)')
        imageEl.src = '/main/uploads/'+appendixObj[i].filename;
        imageEl.classList.add('appendixImg');
        imageEl.id = 'image' + i;
        figCaptionEl = document.createElement('figCaption');
        figCaptionEl.textContent = appendixObj[i].info;
        
        figureEl = document.createElement('figure');
        figureEl.classList.add('figureSubject');
       
        figureEl.append(imageEl);
        figureEl.append(figCaptionEl);
        
       
        containerEl.append(figureEl);
        console.log(appendixObj);
    }
    console.log(object);
    // WORKING HERE
    if (object[0].type === null) {
        console.log('got here');
        containerEl.innerHTML = '';
       let sideHolder = document.getElementById('sideHolder')
       sideHolder.innerHTML = '';
       let el1 = document.getElementById('info');
       el1.setAttribute('style', 'min-width: 145%;');
       console.log(el1);
        console.log(el1.offsetHeight);
       }
}

let createVideoEl = (el, videoId, source, text) => {
    let videoEl = document.createElement('video');
    videoEl.id = videoId;
    videoEl.controls = true;
    videoEl.style = 'width: 100%; heigth: auto; text-align: center;';




        let sourceElement = document.createElement('source');

        sourceElement.src = '/main/uploads/'+source;
        let index = source.lastIndexOf('.')
        
        sourceElement.type = 'video/'+source.slice(index+1);
        
        console.log(sourceElement);
        let videoElement = document.getElementById('videosOrAudio');
        let p = document.createElement('p').textContent = text;
        videoEl.append(sourceElement);
        console.log(videoElement);
        
        el.classList.add('align-centered');
        el.append(p)
        el.append(videoEl);
        let br = document.createElement('br');
        el.append(br);
        return el
    };
    
    
    
    
    let displayVideoOrAudio = (object) => {
        
        let el2 = document.getElementById('media')
        console.log(el2);
        
        let header1 = document.createElement('h1');
        header1.textContent = object[0].name;
        el2.append(header1)
        let studyButton = document.createElement('button');
            studyButton.textContent = 'STUDY QUESTIONNAIRE';
            studyButton.setAttribute('onclick', 'goToPage(event)');
        el2.append(studyButton);
        for (let i = 0; i < object.length; i++) {
        if (object[i].type === 1) {
          el2 =  createVideoEl(el2, 'a'+i, object[i].filename, object[i].info);

        } else if (object[i].type === 2) {

            let audio = document.createElement('audio');
            audio.src = '/main/uploads/'+object[i].filename;
            audio.controls = true;
            audio.style = 'display: block; width: 80%; padding: 10%;';
            let para = document.createElement('p');
            para.textContent = object[i].info;
            para.classList.add('align-centered');
            console.log(el2);
            el2.append(para)
            el2.append(audio);
            let br = document.createElement('br');
            el2.append(br);
        }

}
}


fetchIt();

let goToPage = (e)=>{ e.preventDefault(); sessionStorage.setItem('pNum', 1); location.href = 'learnFromSubjectTwo.html?reset=yes&resetTwo=yes'; }