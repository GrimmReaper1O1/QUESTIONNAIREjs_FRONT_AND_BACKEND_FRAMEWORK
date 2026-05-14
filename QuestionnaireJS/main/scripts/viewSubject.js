// let displayInformation = (object) => {
//     sessionStorage.removeItem('linkCountd');
//     sessionStorage.removeItem('linkCountl');
//     let el = document.getElementById('informationDiv');
//     let objectArray = []
// creatorId = object.creator;
// lastAlteredBy = object.lastAlteredBy;
// let changes, links, videoFiles, apendix;
// try {
// changes = JSON.parse(object.changes);
// }catch{
//     console.log('changes likely empty');
// }
// try {
// links = JSON.parse(object.links);
// } catch {
// console.log('links likely empty');
// }
// timestamp = new Date(object.timestamp);

// try {
// apendix = JSON.parse(object.apendix);
// } catch {
// console.log('apendix likely empty');
// }
// try {

// videoFiles = JSON.parse(object.videoFiles);
// } catch {
// console.log('video likely empty');
// }
// objectArray.push(`Timestamp: ${timestamp.toString()}`);
// objectArray.push((object.visible === 1 ? 'VISIBLE' : 'NOT VISIBLE'));
//     objectArray.push(`Created by: ${object.creator}`);
//     objectArray.push(`Last altered by: ${object.lastAlteredBy}`);
//     objectArray.push(`Subject name: ${object.name}`);
//     objectArray.push(`Subject's introduction: ${object.introduction}`);
//     objectArray.push({type: 'links', object: links});
//     objectArray.push({type: 'apendix', object: apendix});
//     objectArray.push({type: 'video', object: videoFiles});
//     objectArray.push({type: 'changes', object: changes});

// console.log(objectArray);
//     let display = (objectArray) => {
//         let showHelper = (info, classification, option, key) => {
          
//             switch (classification) {
//                 case 'rVideo':
//                 let el1 = document.getElementById('video');
//                 (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'video filename';  el1.innerHTML += heading}) : 'nothing');
//                 el1.innerHTML += key+ ': '+info+'<br><br>';
//                 break;
//                 case 'rApendix':
//                 let el2 = document.getElementById('apendix');
//                 (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'apendix filename';  el1.innerHTML += heading}) : 'nothing');
//                 el2.innerHTML += key+ ': '+info+'<br><br>';
//                 break;
//                 case 'rLinks':
//                 let el3 = document.getElementById('links');
//                  el3.innerHTML += (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'links'; el3.appendChild(heading)}) : '');
                 
//                 console.log(key.includes('Description'));
              
//                 let desc = () => { 
//                     let count = ( sessionStorage.getItem('linkCountd') !== null ? sessionStorage.getItem('linkCountd') : 1);
//                      sessionStorage.setItem('linkCountd', Number(count)+1);
//                        return `Link Description ${count}` 
//                     };
//                 let lin = () => { 
//                     let count = (sessionStorage.getItem('linkCountl') !== null ? sessionStorage.getItem('linkCountl') : 1);                 
//                 sessionStorage.setItem('linkCountl', Number(count)+1);
//                  return `Link ${count}` 
//                 };
            
//                 el3.innerHTML += (key.includes('Description') ? desc() : lin()) + ': '+info+'<br><br>';

//                 break;
//                 case 'apendix':
//                 let el4 = document.getElementById('changes');
//                 (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'apendix filename';  el1.innerHTML += heading}) : 'nothing');
//                 el4.innerHTML += key + ': '+info+'<br><br>';
//                 break;
//                 case 'video':

//                 let el5 = document.getElementById('changes');
//                 (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'video filename';  el1.innerHTML += heading}) : 'nothing');
//                 el5.innerHTML += info+'<br><br>';
//                 break;
//                 case 'links':

//                 let el6 = document.getElementById('changes');
//                 (option === 'first' ? (()=> {let heading = document.createElement('<h3>'); heading.textContent = 'links';  el1.innerHTML += heading}) : 'nothing');
                
//                 el6.innerHTML += info+'<br><br>';
//                 break;
//                 default:
//                 let el7 = document.getElementById('firstInfo');
//                 el7.innerHTML += info+'<br><br>';
//                 break;
//             }


//         }

//         for (let i = 0; i < objectArray.length; i++ ) {
//             if (objectArray[i].type === 'changes') {
//             // if (objectArray[i].object !== null) {

//             // for (let a = 0; a < objectArray[i].object.length; a++) {
//             //        objectArray[i].object.name;
//             //        objectArray[i].object.introduction;
//             //        for (key in objectArray[i].object) {
//             //        let linksArray = JSON.parse(objectArray[i].object[key]);
//             //        showHelper(objectArray[i].object[key], 'links', (i === 1 ? 'first' : ''), key);
//             //        }
//             //        for (key in objectArray[i].object) {
//             //        let videoArray = JSON.parse(objectArray[i].object.video);
//             //        showHelper(objectArray[i].object[key], 'video', (i === 1 ? 'first' : ''), key);
//             //         }
//             //        for (key in objectArray[i].object) {
//             //        let apendixArray = JSON.parse(objectArray[i].object.apendix);
//             //         showHelper(objectArray[i].object[key], 'apendix', (i === 1 ? 'first' : ''), key);
//             //         }
//             //     }
//             // }

//             // can't be done until demo object exists
//         } else if (objectArray[i].type === 'links') {
// if (objectArray[i].object !== null) {
//             for (key in objectArray[i].object) {
//                 if (objectArray[i].object[key] !== '') {
//             showHelper(objectArray[i].object[key], 'rLinks', '', key);
//             }
//         }
// }
//         } else if (objectArray[i].type === 'apendix') {
// if (objectArray[i].object !== null) {
// for (key in objectArray[i].object) {
//            if (objectArray[i].object[key] !== '') {
              
//     showHelper(objectArray[i].object[key], 'rApendix', '', key);
// }
// }
// }
//         } else if (objectArray[i].type === 'video') {
// if (objectArray[i].object !== null) {
// for (key in objectArray[i].object) {
//         if (objectArray[i].object[key] !== '') {
         
//     showHelper(objectArray[i].object[key], 'rVideo', '', key);
// }
// }
// }
//         } else {

//             showHelper(objectArray[i], 'input');

//         }

//     }




// };
// display(objectArray);

// };

// let subjectId = sessionStorage.getItem('subjectId');

// const baseUrl = 'https://localhost:5000/api/auth/questions/subject';
// const query = {id: subjectId, option: 'id'};
// const params = new URLSearchParams(query).toString();
// const apiUrl = `${baseUrl}?${params}`

// fetch(apiUrl).then(async res => {

//     if (res.ok) {
//         let result = await res.json();
//         console.log(result.result[0]);
//         displayInformation(result.result[0]);
    
//     } else {
//         throw Error('It did not go through!');
//     }
// }).catch(error => {
//     console.log(error);
// });
sessionStorage.removeItem('info');

const editSubject = (e) => {
    e.preventDefault();
    location.href = '/main/alterSubject.html';


};

const viewQuestionIds = (e) => {
    e.preventDefault();
    location.href = '/main/viewQuestionIds.html?reset=yes';
}
const viewAndDeleteFiles = e => {
    e.preventDefault();
    location.href = '/main/viewAndDeleteFromSubject.html';

}