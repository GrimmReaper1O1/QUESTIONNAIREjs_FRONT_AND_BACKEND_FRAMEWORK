loadFromIndexedDB('menuObject', 'train', 'trainingMenu').then(response => {
    let res = response.id;

    sessionStorage.setItem('menu', res);
    let blank = [];
    // sessionStorage.setItem('path', JSON.stringify(blank));
    // sessionStorage.setItem('classP', JSON.stringify(blank));
    // sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.removeItem('link');
    sessionStorage.removeItem('copyObj');
    sessionStorage.removeItem('csw2');
    sessionStorage.removeItem('csw1');
    sessionStorage.removeItem('opt');
    sessionStorage.removeItem('swap2');
    sessionStorage.removeItem('swap1');
    sessionStorage.setItem('yesNo', null);
    sessionStorage.removeItem('theLinkObj');
}).catch(error => {
    let blank = [];
    sessionStorage.removeItem('link');
    sessionStorage.setItem('menu', JSON.stringify({ length: 0 }));
    sessionStorage.setItem('path', JSON.stringify(blank));
    sessionStorage.setItem('classP', JSON.stringify(blank));
    sessionStorage.setItem('fPath', JSON.stringify(blank));
    sessionStorage.setItem('yesNo', null);
});
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
// let deepCopyItems = (obj) => {

//     let copy = Array.isArray(obj) ? [] : (typeof obj === 'object' ? {} : 0);
//     for (let key in obj) {
//         if (typeof obj !== 'object' && typeof obj !== 'array') {
//             if (obj.hasOwnProperty(key)) {
//                 copy[key] = obj[key];
//             }
//         } else if (typeof obj === 'array') {
//             for (let i = 0; i < obj.length; i++) {
//                 if (typeof obj[i] === 'array') {
//                     copy.push((deepCopyItems(obj[i])));
//                 } else {
//                     copy.push(obj[i]);
//                 }
//             }
//         }
//     }

//     return copy

// }


let selectInfo = (e, opt2) => {
    e.preventDefault();
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let obj = gatherInfoViaPath(fPath);
    // // console.log(obj);
    let el2, el;
    if (opt2 === 'level') {
        el2 = document.getElementById('menuSelection');
        // // console.log(!el2.classList.contains('hidden'))
        if (!el2.classList.contains('hidden')) {
            el2.classList.add('hidden');
        }
        getInfoLoopedViaLevelAndInsert(obj);
        el = document.getElementById('viewLevelsOptions');
        el.classList.remove('hidden');
        // // console.log('here');
    } else if (opt2 === 'individual') {
        if (fPath.length > 0) {
            el2 = document.getElementById('menuSelection');

            if (!el2.classList.contains('hidden')) {
                el2.classList.add('hidden');
            }
            enterInformationIntoFields(obj, false);

            el = document.getElementById('viewIndividualOption');
            el.classList.remove('hidden');
        }
    }
};


let findAndReplaceLinks = (placea, fPath, option, start = true) => {

    // make function that does repeated code
    let replace;
    let option5 = false;
    let obj2 = {};
    let obj3 = {};
    let nObj = {};
    nObj = placea;
    // // console.log(placea);
    obj2 = placea;
    obj3 = placea;
    if (option === 'replace') {
        for (let i = 0; i < fPath.length - 1; i++) {

            keys = fPath[i];
            // // console.log(keys);
            // // console.log(obj2);
            obj2 = obj2[keys];
            obj3 = obj3[keys];

        }
        replace = true;
        option = 'option4';
    } else if (option === 'option5') {
        keyLength = 0;
        option5 = true;
    } else {
        if (fPath.length > 0) {
            for (let i = 0; i < fPath.length; i++) {

                keys = fPath[i];

                obj2 = obj2[keys];
                obj3 = obj3[keys];

            }
        }


        let truthy = false;
        // // console.log(obj2);      

        for (let i = 0; i < obj2.length; i++) {
            if (typeof obj2[i] === 'undefined') {
                keyLength = i;
                truthy = true

            }
        }

        if (!truthy) {
            if (placea.length === 0) {
                keyLength = 0;

            } else {
                keyLength = obj3.length;
            }
        } else {
            keyLength = placea.length;
        }
    }
  let opt = replace ? fPath[fPath.length - 1] : keyLength;
    if (option5) {
        // console.log('where am I ')
        opt = sessionStorage.getItem('opt');
        // console.log(opt);
    }
    // // console.log(fPath[fPath.length-1]);
    // // console.log(replace);

    // // console.log(theLinkObj);

    let replaceLinks = (opt, objb, fPath, start) => {
        let linky = objb;
        let arr = [];
        let theLinkObj = {};
        if (sessionStorage.getItem('theLinkObj') !== null) {
            theLinkObj = JSON.parse(sessionStorage.getItem('theLinkObj'));

            // // console.log('entered here when it should not');
        } else {
            start = true;

        }
        // // console.log(start);
        // // console.log(theLinkObj);
        let arrHelper = (counter, posArr2, linky2, tempArr4) => {
            // console.log(tempArr4);
            // console.log(counter);
            // console.log(posArr2);
            // console.log(linky2);
            for (let x = 0; x < counter; x++) {
                tempArr4.shift();
            }
            // for (let x = 0; x < posArr2.length; x++) {
            //     tempArr4.shift();
            // }
            // // console.log(tempArr4);
            // for (let x = linky2.length - 1; x >= linky2.length - posArr2.length; x--) {

            //     tempArr4.shift();
            //     // // console.log(tempArr4);
            // }
            for (let x = posArr2.length - 1; x >= 0; x--) {
                // // console.log(posArr2);
                // console.log('reverseLoop');
                tempArr4.unshift(posArr2[x]);
                // console.log(posArr2[x]);
            }
            // // console.log(linky2);
            // // console.log(tempArr4);

            return tempArr4;

        }
        // here     
        let lastPath;
        if (sessionStorage.getItem('lastPath') === null) {
            lastPath = ['0']
        } else {
            lastPath = JSON.parse(sessionStorage.getItem('lastPath'));
        }
        // // console.log(lastPath);
        // // console.log(fPath);
        let tempArr = [];
        // // console.log(lastPath);
        if (typeof linky.link !== 'undefined') {
            if (start) {
                theLinkObj[linky.uid] = [];
            }

            let linkyOfTruth, linkyOfTruthArr, linkyLinkyOfTruth;
            linkyOfTruthArr = [];
            for (let i = 0; i < linky.link.length; i++) {
                linkyOfTruth = true;
                linkyLinkyOfTruth = false;
                for (let a = 0; a < linky.link[i].length; a++) {
                    if (typeof lastPath[a] !== 'undefined' && linky.link[i][a] === lastPath[a]) {
                        if ((a === lastPath.length - 1 && linkyOfTruth)) {
                            linkyLinkyOfTruth = true;
                        }
                    } else {
                        linkyOfTruth = false;
                    }
                }

                if (linkyLinkyOfTruth) {
                    linkyOfTruthArr.push(true);
                } else {
                    linkyOfTruthArr.push(false);
                }
                if (start) {
                    theLinkObj[linky.uid].push(false);
                }

            }
            // console.log(linkyOfTruthArr);
            // console.log(typeof theLinkObj);
            // console.log(theLinkObj[linky.uid]);



            if (linky.link !== arr && typeof linky.link !== 'undefined') {

                for (let i = 0; i < linky.link.length; i++) {


                    for (let a = 0; a < linky.link.length; a++) {
                        tempArr[a] = [];
                        // // console.log(linky.link[a]);
                        for (let i = 0; i < linky.link[a].length; i++) {
                            // // // console.log(splice.link[a][i]);

                            tempArr[a].push(linky.link[a][i]);

                        }

                    }
                } // // // console.log(tempArr);


                let stop;
                let counter;
                let posArr;

                for (let a = 0; a < linky.link.length; a++) {
                    posArr = [];
                    counter = 0;
                    stop = true;

                    if (fPath.length === 0) {
                        let tempArr2;
                        posArr.push(opt);
                        console.log(opt);
                        counter++
                          tempArr2 = arrHelper(counter, posArr, linky.link[a], tempArr[a]);
                            console.log(linky.link[a]);
                            linky.link[a] = [];
                            linky.link[a] = tempArr2;
                    } else {
                    // // console.log(start);
                    // console.log(linky.uid);
                    // console.log(theLinkObj);
                    // console.log(linky.link);
                    if (lastPath.length <= fPath.length && linkyOfTruthArr[a] && (start ? true : (theLinkObj[linky.uid][a] ? false : true))) {
                        // // console.log('here');
                        // needs work for multiple entries on bottom level.
                        

                            for (let y = 0; y < fPath.length; y++) {

                                if (typeof fPath[y] !== 'undefined' && lastPath.length - 1 !== y) {


                                    if (stop && lastPath[y] === fPath[y]) {
                                        counter++
                                        stop = false;
                                        posArr.push(fPath[y]);
                                    } else {
                                        posArr.push(fPath[y]);
                                    }
                                } else {
                                    if (y === lastPath.length - 1) {
                                        // // // console.log(opt);
                                        counter++
                                        posArr.push(opt);
                                    } else {
                                        posArr.push(fPath[y]);
                                    }

                                }
                            }
                    
                        // // console.log('one');


                        // // console.log(lastPath);
                        // // console.log(fPath);
                        // // console.log(posArr);
                        // // console.log(counter);
                        // // console.log(linky.link);
                        // // console.log(linky);
                        // // console.log(tempArr);
                      } else if (lastPath.length >= fPath.length && linkyOfTruthArr[a] && (start ? true : (theLinkObj[linky.uid][a] ? false : true))) {
                            posArr = [];
                            stop = true;
                            // needs work for multiple entries on bottom level.

                                for (let y = 0; y < lastPath.length; y++) {
                                    if (typeof fPath[y] !== 'undefined' && fPath.length - 1 !== y) {
                                        if (stop && lastPath[y] === fPath[y]) {
                                            counter++
                                            stop = false;
                                            posArr.push(fPath[y])
                                        } else {
                                            posArr.push(fPath[y]);
                                        }
                                    } else {
                                        if (y === fPath.length - 1) {
                                            // // console.log(opt);
                                            posArr.push(opt)
                                            counter++
                                        } else {
                                            posArr.push(lastPath[y]);
                                        }

                                    }
                                    //   let result = nObj;
                                }
                                // // console.log('two');
                            }                        // if (lastPath.length === path.length) {
                          //     posArr.push(opt);
                            // }
                            // // // console.log(posArr);
                            // // // console.log(counter);
                            
                        // console.log(linky);

                        let tempArr2;
                        // console.log(linkyOfTruthArr[a]);
                        // console.log((start ? true : (theLinkObj[linky.uid][a] ? false : true)));
                        if (((start ? true : (theLinkObj[linky.uid][a] ? false : true)) && linkyOfTruthArr[a])) {
                            // console.log('running');
                            // console.log(lastPath);
                            // console.log(fPath);
                            // console.log(posArr);
                            // console.log(counter);
                            // console.log(linky.link);
                            // console.log(linky);
                            // console.log(tempArr);
                            tempArr2 = arrHelper(counter, posArr, linky.link[a], tempArr[a]);
                            // console.log(linky.link[a]);
                            linky.link[a] = [];
                            linky.link[a] = tempArr2;
                            // // console.log('hereo');
                            // console.log(linky.link[a]);
                            // console.log(linky);
                        }
                    }
                }
            }
                theLinkObj[linky.uid] = linkyOfTruthArr;
                sessionStorage.setItem('theLinkObj', JSON.stringify(theLinkObj));
            }



        

        //  for (let item in linky) {
        //     nObj = {};
        //     nObj = linky[item]




        if (typeof linky === 'object') {

            for (let itemKey in linky) {
                let newerObj = linky[itemKey];

                if (typeof newerObj === 'object' && typeof newerObj.bS !== 'undefined') {
                    // // console.log(newerObj);
                    linky[itemKey] = replaceLinks(opt, newerObj, fPath, start);

                    // // console.log(returnArr);

                }

            }

        }
        //  let copyLinky = deepCopyItems(linky);

        // // console.log(returnArr2);
        return linky

    }


    nObj = replaceLinks(opt, nObj, fPath, start)
    // // console.log(nObj);
    let result = nObj;
    // console.log(result);
    return result

}


let paragraphReplace = (string) => {

    let text = string.replace(/[\n\r]/g, '</p><p>');
    return text;

};
let paragraphRemove = (text) => {

    let string = text.replace('</p><p>', "\n");
    string = string.replace('<p>', '');
    string = string.replace('</p>', '\n');
    // // console.log(string);
    return string

};

let link = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('link') === null) {
        let link = sessionStorage.getItem('fPath');
        sessionStorage.setItem('link', link);
        e.target.classList.remove('selectionButton');
        e.target.classList.add('blueSelectionButton');
    } else {

        let paths = JSON.parse(sessionStorage.getItem('fPath'));
        let obj = gatherInfoViaPath(JSON.parse(sessionStorage.getItem('link')));

        // // console.log(obj);
        // // console.log(paths);
        // // console.log(obj);
        let linkArr = [];
        for (let i = 0; i < obj.link.length; i++) {
            linkArr.push(obj.link[i]);

        }
        linkArr.push([]);
        for (let i = 0; i < paths.length; i++) {
            linkArr[linkArr.length - 1].push(paths[i]);
        }
        let previousPath = JSON.parse(sessionStorage.getItem('link'));
        // // console.log(previousPath);
        let menu = JSON.parse(sessionStorage.getItem('menu'));
        let place = menu;
        for (let i = 0; i < previousPath.length; i++) {
            place = place[previousPath[i]];
        }
        // // console.log(place);
        // // console.log(previousPath);
        place.link = linkArr;
        place.cONC = 'link';
        // // console.log(place);
        e.target.classList.remove('blueSelectionButton');
        e.target.classList.add('selectionButton');
        sessionStorage.removeItem('link');
        sessionStorage.setItem('menu', JSON.stringify(menu));
        saveToIndexedDB('menuObject', { id: JSON.stringify(menu) }, 'train', 'trainingMenu');
        // runMenu();
        // // console.log(menu, paths);
        // // console.log(JSON.parse(sessionStorage.getItem('fPath')));
        setTimeout(() => {
            location.reload();
        }, 200)
    }
};
let delLink = (e) => {
    e.preventDefault();
    let menu = JSON.parse(sessionStorage.getItem('menu'));
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let menu2 = deepCopy(menu);
    let place = menu2;
    for (let i = 0; i < fPath.length; i++) {
        place = place[fPath[i]];
    }
    let li = [];
    place.link = li;
    place.cONC = 'orange'
    sessionStorage.setItem('menu', JSON.stringify(menu2));
    saveToIndexedDB('menuObject', { id: JSON.stringify(menu2) }, 'train', 'trainingMenu');
    runMenu();
    location.reload();
}

let swap = (e) => {
    e.preventDefault();
    let path = JSON.parse(sessionStorage.getItem('fPath'));
    let classP = JSON.parse(sessionStorage.getItem('classP'));
    // console.log(path);
    // console.log(classP);
    if (fPath.length > 0) {
        if (sessionStorage.getItem('swap1') === null) {
            sessionStorage.setItem('csw1', JSON.stringify(classP));
            sessionStorage.setItem('swap1', JSON.stringify(fPath));
            e.target.classList.remove('selctionButton');
            e.target.classList.add('blueSelectionButton');
        } else if (sessionStorage.getItem('swap1') !== null) {


            let path2 = JSON.parse(sessionStorage.getItem('swap1'));

            // // console.log(path2, path);
            if (path2 !== path) {

                let placea = JSON.parse(sessionStorage.getItem('menu'));
                let place0 = deepCopy(placea);
                sessionStorage.setItem('lastPath', JSON.stringify(path2));
                // let place2 = deepCopy(place);
                // console.log(place0);
                let place1 = findAndReplaceLinks(place0, path, 'replace');
                // console.log(place1);
                // let place1a = deepCopy(place1);
                sessionStorage.setItem('menu', JSON.stringify(place1));
                let obja = gatherInfoViaPath(path2);
                // let obja = deepCopy(objb);
                // console.log(obja);
                sessionStorage.setItem('lastPath', JSON.stringify(path));
                let place2 = findAndReplaceLinks(place1, path2, 'replace', false);
                sessionStorage.setItem('menu', JSON.stringify(place2));
                let obj2b = gatherInfoViaPath(path);
                // console.log(place2);
                let obj2a = deepCopy(obj2b);

                // let obj4 = deepCopy(obja);
                let place3 = findPathAndSave(place2, path, obja, 'replace', false, true);
                // console.log(obj2a);
                // // // console.log(place2);
                // let place21 = deepCopy(place2);
                // // // console.log(place3a);
                // let place31 = deepCopy(place3a);

                // // // console.log(place31);
                // let obj3a = deepCopy(obj2a);
                let place4 = findPathAndSave(place3, path2, obj2a, 'replace', false, true);
                // let place41 = deepCopy(place4);
                saveToIndexedDB('menuObject', { id: JSON.stringify(place4) }, 'train', 'trainingMenu');
                sessionStorage.setItem('menu', JSON.stringify(place4));
                sessionStorage.removeItem('theLinkObj');
                sessionStorage.removeItem('copyObj');


                sessionStorage.setItem('swap2', JSON.stringify(path));
                sessionStorage.setItem('csw2', JSON.stringify(classP));



                // classP = JSON.parse(sessionStorage.getItem('csw1'));
                // fPath = path2;

                classP.pop();
                path.pop();
                sessionStorage.setItem('classP', JSON.stringify(classP));
                sessionStorage.setItem('fPath', JSON.stringify(path));
                sessionStorage.removeItem('swap2');
                sessionStorage.removeItem('swap1');
                setTimeout(() => {
                    location.reload();
                }, 200);
            }
        }
    }
};

let gatherInfoViaPath = (path) => {
    let obj = {};
    obj = JSON.parse(sessionStorage.getItem('menu'));

    let location = obj;
    // // console.log(obj);
    // // console.log(path);
    for (let i = 0; i < path.length; i++) {
        location = location[path[i]];

    }
    return location
}

let getInfoLoopedViaLevelAndInsert = (obj) => {
    let el = document.getElementById('loopedOptionInfo');
    let string = '';
    let location = obj;
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    if (fPath.length > 0) {
        string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
        string += `<h4>Type: ${location.type}</h4>`;
        string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
        string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
        string += `<h4>Brief Summary...</h4>`;
        string += `<p>${paragraphReplace(location.bS)}</p>`;
        if (location.i !== 'NOT REQUIRED') {
            string += `<h4>Option...</h4>`;
            string += `<p>${paragraphReplace(location.o)}</p>`;
            string += `<h4>Reply to option...</h4>`;
            string += `<p>${paragraphReplace(location.r)}</p>`;
        } else {
            string += `<h4>Introduction.</h4>`;
            string += `<p>${paragraphReplace(location.i)}</p>`;
        }
    }
    for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i].bS !== 'undefined') {
            location = obj[i];
            string += `<h4>Option ${location.itemKey + 1}</h4>`;
            string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
            string += `<h4>Type: ${location.type}</h4>`;
            string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
            string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
            string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
            string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
            string += `<h4>Brief Summary...</h4>`;
            string += `<p>${paragraphReplace(location.bS)}</p>`;
            string += `<h4>Option...</h4>`;
            string += `<p>${paragraphReplace(location.o)}</p>`;
            string += `<h4>Reply to option...</h4>`;
            string += `<p>${paragraphReplace(location.r)}</p>`;
        }
    }
    el.innerHTML = string;
}

let backOptionPressFunction = (e, opt) => {
    e.preventDefault();
    if (opt === 'level') {
        let el2 = document.getElementById('viewLevelsOptions');
        el2.classList.add('hidden')

    } else if (opt === 'individual') {
        let el2 = document.getElementById('viewIndividualOption');
        el2.classList.add('hidden')

    }
    let el = document.getElementById('menuSelection');
    el.classList.remove('hidden');

}


let enterInformationIntoFields = (location, truthy = true) => {
    let fieldObj = fieldHelper();
    if (truthy) {
        // // console.log('here again');
        fieldObj.secs.value = location.s;
        fieldObj.displayBefore.checked = location.dB;
        fieldObj.displayImageWhile.checked = location.dIW;
        fieldObj.picName.value = location.pFN;
        fieldObj.breifDescription.value = paragraphRemove(location.bS);
        fieldObj.option.value = paragraphRemove(location.o);
        fieldObj.answerToOption.value = paragraphRemove(location.r);
        fieldObj.cONC.checked = location.cONC === 'correct' ? true : '';
        fieldObj.type.checked = location.type === 'module' ? true : '';
        fieldObj.info.value = paragraphRemove(location.i);
        fieldObj.l.value = paragraphRemove(location.l);
        fieldObj.lPath.checked = location.link.length !== 0 ? true : '';
        if (location.link.length !== 0) fieldObj.link = location.link;

    } else {
        // // console.log('here also');
        let menuObj = JSON.parse(sessionStorage.getItem('menu'));
        let elo1 = document.getElementById('optionInfoIndividual');
        let linkTextPos, pos;
        let linkedPosString = ''
        let level = 0;
        for (let i = 0; i < location.link.length; i++) {
            linkTextPos = menuObj;
            for (let a = 0; a < location.link[i].length; a++) {
                pos = location.link[i][a];
                linkTextPos = linkTextPos[pos];
            }
            level = location.link[i].length;
            linkedPosString += `Level: ${level} ${linkTextPos.bS} <br><br>`;

        }



        let string = '';


        if (location.link.length !== 0) {
            string += `<h4>HAS LINKS</H4>`;
        }

        string += linkedPosString;

        string += `<h4>Correct option: ${location.cONC === 'correct' ? 'CORRECT OPTION' : 'INCORRECT OPTION'}</h4>`;
        string += `<h4>Type: ${location.type}</h4>`;
        string += `<h4>Number of seconds to display image: ${location.s !== '' ? location.s : 'NOT INSERTED'}</h4>`;
        string += `<h4>Breifly display before text: ${location.dB === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Display image while selecting option: ${location.dIW === 'on' ? 'ON' : 'OFF'}</h4>`;
        string += `<h4>Picture file name: ${location.pFN !== '' ? location.pFN : 'NOT INSERTED'}</h4>`;
        string += `<h4>Brief Summary...</h4>`;
        string += `<p>${paragraphReplace(location.bS)}</p>`;
        if (location.i !== 'NOT REQUIRED') {
            string += `<h4>Option...</h4>`;
            string += `<p>${paragraphReplace(location.o)}</p>`;
            string += `<h4>Reply to option...</h4>`;
            string += `<p>${paragraphReplace(location.r)}</p>`;
        } else {
            string += `<h4>Introduction...</h4>`;
            string += `<p>${paragraphReplace(location.i)}</p>`;
        }
        string += `<h4>Link text...</h4>`;
        string += `<p>${paragraphReplace(location.l)}</p>`;

        // // console.log(string);
        elo1.innerHTML = string;

    }

};

let fieldHelper = () => {
    let obj = {};
    obj.secs = document.getElementById('secs');
    obj.displayBefore = document.getElementById('displayImageBefore');
    obj.displayImageWhile = document.getElementById('displayImageWhile');
    obj.picName = document.getElementById('picName');
    obj.breifDescription = document.getElementById('breifDescription');
    obj.option = document.getElementById('option');
    obj.answerToOption = document.getElementById('answerToOption');
    obj.info = document.getElementById('introduction');
    obj.type = document.getElementById('type');
    obj.cONC = document.getElementById('cONC');
    obj.l = document.getElementById('linkText');
    obj.lPath = document.getElementById('linkPathway')
    return obj
}

findPathAndSave = (place, fPath, infoObj, option, truthy2 = false, tInput = false) => {
    let path = fPath;
    let li = [];
    // make function that does repeated code

    let obj = infoObj;
    let obj2 = {};

    let keys;
    let keyLength;
    obj2 = place;
    let obj3 = place;
    let replace = false;
    // console.log(place);
    if (typeof place.length === 'undefined') {
        place.length = 0;
    }
    if (option === 'replace') {
        for (let i = 0; i < path.length - 1; i++) {

            keys = path[i];

            obj2 = obj2[String(keys)];
            obj3 = obj3[String(keys)];

        }
        replace = true;
        option = 'option4';
    } else {
        for (let i = 0; i < path.length; i++) {

            keys = path[i];

            obj2 = obj2[keys];
            
            obj3 = obj3[keys];
        
        }
    }
    let truthy = false;
    // // console.log(obj2);      
    for (let i = 0; i < obj2.length; i++) {
        if (typeof obj2[i] === 'undefined') {
            keyLength = i;
            truthy = true

        }
    }

    if (!truthy) {
        if (place.length === 0) {
            keyLength = 0;

        } else {
            keyLength = obj3.length;
        }
    }

    if (option === 'option' && typeof obj2 !== 'undefined') {
        obj2[keyLength] = {
            s: DOMPurify.sanitize(obj.secs.value), itemKey: keyLength, length: 0,
            dB: (obj.displayBefore.checked ? obj.displayBefore.value : ''),
            dIW: (obj.displayImageWhile.checked ? obj.displayImageWhile.value : ''),
            pFN: DOMPurify.sanitize(obj.picName.value),
            bS: DOMPurify.sanitize(obj.breifDescription.value),
            o: DOMPurify.sanitize(obj.option.value),
            r: DOMPurify.sanitize(obj.answerToOption.value), uid: uidOne(),
            cONC: (obj.cONC ? 'correct' : 'incorrect'), i: 'NOT REQUIRED', type: 'option',
            l: DOMPurify.sanitize(obj.l.value), link: li,
        };

        obj3.length = obj3.length + 1;


        return place
    } else if (option === 'option2' && typeof obj2 !== 'undefined') {
        let opt = truthy2 === false ? keyLength : obj.itemKey;

        obj2[opt] = {
            s: DOMPurify.sanitize(obj.s), itemKey: opt, length: 0,
            dB: obj.dB,
            dIW: obj.dIW, pFN: obj.pFN,
            bS: DOMPurify.sanitize(obj.bS), o: DOMPurify.sanitize(paragraphReplace(obj.o)),
            r: DOMPurify.sanitize(obj.r), uid: obj.uid,
            cONC: (obj.cONC ? 'correct' : (obj.cONC !== 'link' ? 'incorrect' : 'link')),
            i: DOMPurify.sanitize(obj.intro), type: obj.type,
            l: DOMPurify.sanitize(obj.l.value), link: li
        };
        fPath.push(String(opt));
        sessionStorage.setItem('fPath', JSON.stringify(fPath));

        obj2.length = obj2.length + 1;

        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    } else if (option === 'option3' && typeof obj2 !== 'undefined') {
        // let opt = truthy2 === false ? keyLength : obj.itemKey;
        let opt = keyLength;
        if (fPath.length > 0) {
            obj.link = [];
        } else {
            linkKey = opt;
            for (let i = 0; i < obj.link.length; i++) {
                obj.link[i][0] = opt;
            }
        }
        let tempObj = {
            s: DOMPurify.sanitize(obj.s), itemKey: opt, length: 0,
            dB: obj.dB,
            dIW: obj.dIW, pFN: DOMPurify.sanitize(obj.pFN),
            bS: DOMPurify.sanitize(obj.bS), o: DOMPurify.sanitize(paragraphReplace(obj.o)),
            r: DOMPurify.sanitize(obj.r), uid: obj.uid, cONC: obj.cONC,
            i: DOMPurify.sanitize(obj.i), type: obj.type,
            l: DOMPurify.sanitize(obj.l), link: obj.link,
        };

        obj2[opt] = tempObj;
        if (!truthy2) {
            fPath.push(String(opt));
            // sessionStorage.setItem('fPath', JSON.stringify(fPath));
            obj2.length = obj2.length + 1;
        }

        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    } else if (option === 'option4' && typeof obj2 !== 'undefined') {

        let opt = replace ? fPath[fPath.length - 1] : keyLength;
     
        // console.log(obj);

        // console.log(obj);
        if (tInput) {
            if ((obj2.length + 1) < 255) {
                obj2[opt] = {};
                obj.itemKey = opt;
                sessionStorage.setItem('opt', opt);
                if (fPath.length === 0) {
                         // console.log(sessionStorage.getItem('opt'));
                         obj = findAndReplaceLinks(obj, fPath, 'option5');
                        
                }
                obj2[opt] = obj;
            // fPath.push(String(opt));
            // sessionStorage.setItem('fPath', JSON.stringify(fPath));
            
        if (!replace) {
            obj2.length = obj2.length + 1;
        }
            } else {
                throw Error
            }
        } else {
            // // console.log(obj);
            if (typeof obj.length === 'undefined') {
                obj.length = 0;
                for (let key in obj) {
                    obj.length++
                }
            }
            // // console.log(obj.length, obj2.length);
            if ((obj.length + obj2.length) <= 256) {
                for (let item in obj) {
                    if (typeof obj[item] !== 'undefined') {
                        let obj4 = {};
                        obj4 = obj[item];
                        // console.log(obj4);
                        if (typeof obj4.bS !== 'undefined') {
                            sessionStorage.setItem('opt', opt);
                            // console.log(sessionStorage.getItem('opt'));
                            obj4 = findAndReplaceLinks(obj4, fPath, 'option5');
                            // console.log(obj4);
                            obj2[opt] = {};
                            obj4.itemKey = opt;
                            obj2[opt] = obj4;
                            opt = opt + 1;
                            obj2.length = obj2.length + 1;
                        }
                    }
                }
            } else {
                throw Error
            }
        }
        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return place
    } else if (option === 'alter' && typeof obj2.bS !== 'undefined') {
        obj2.s = DOMPurify.sanitize(obj.secs.value);
        obj2.itemKey = obj2.itemKey;
        obj2.length = obj2.length;
        obj2.dB = (obj.displayBefore.checked ? obj.displayBefore.checked : '');
        obj2.dIW = (obj.displayImageWhile.checked ? obj.displayImageWhile.checked : '');
        obj2.pFN = DOMPurify.sanitize(obj.picName.value);
        obj2.bS = DOMPurify.sanitize(obj.breifDescription.value);
        obj2.o = DOMPurify.sanitize(obj.option.value);
        obj2.r = DOMPurify.sanitize(obj.answerToOption.value);
        obj2.i = DOMPurify.sanitize(obj.info.value);
        obj2.type = obj.type.checked === true ? 'module' : 'option';
        obj2.cONC = obj.cONC.checked === true ? 'correct' : (obj.lPath.checked === true ? 'link' : 'incorrect');
        obj2.l = DOMPurify.sanitize(obj.l.value);

        return place

    } else if (option === 'module' && fPath.length === 0) {

        let link = [];
        let uid = uidOne();
        place[keyLength] = {};
        place[keyLength] = {
            itemKey: keyLength, length: 0, 'bS': DOMPurify.sanitize(paragraphReplace(obj.modName)), 'uid': uid,
            cONC: 'correct', o: 'NOT REQUIRED', r: 'NOT REQUIRED', i: DOMPurify.sanitize(paragraphReplace(obj.intro)),
            s: 0, cONC: 'correct', pFN: 'NOT INSERTED', type: 'module', l: '', link: link, dB: '', dIW: '',
        };

        place.length = place.length + 1;


        saveToIndexedDB('menuObject', { id: JSON.stringify(place) }, 'train', 'trainingMenu');
        sessionStorage.setItem('menu', JSON.stringify(place));;
        return
    }

    return false
};

let findPathAndDelete = (fPath, infoObj) => {
    let path = fPath;
    let obj = infoObj;
    let classPath;
    if (fPath.length !== 0) {
        classPath = JSON.parse(sessionStorage.getItem('classP'));
    } else {
        classPath = [];
    }

    let place = obj;

    for (let i = 0; i < path.length - 1; i++) {
        place = place[path[i]];
    }

    if (path.length === 0) {

        place = { length: 0 };
        return place;
    } else {
        if (typeof place[path[path.length - 1]].bS !== 'undefined') {

            delete place[path[path.length - 1]];
            place.length = place.length - 1;

        }
    }
    classPath.pop();
    fPath.pop();
    sessionStorage.setItem('fPath', JSON.stringify(fPath));
    sessionStorage.setItem('classP', JSON.stringify(classPath));
    return obj
}


let delEntry = () => {

    fPath = JSON.parse(sessionStorage.getItem('fPath'));

    let obj = findPathAndDelete(fPath, JSON.parse(sessionStorage.getItem('menu')));
    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');


    setTimeout(() => {
        location.reload();
    }, 200);
}


let saveHelper = (option) => {


    let messageDiv = document.getElementById('messageDiv');
    let fieldPane = document.getElementById('fieldPane');

    let obj;

    fPath = JSON.parse(sessionStorage.getItem('fPath'));

    if (option === 'option') {

        obj = findPathAndSave(fPath, fieldHelper(), option);
    } else {
        obj = findPathAndSave(fPath, fieldHelper(), option);
    }

    sessionStorage.setItem('menu', JSON.stringify(obj));
    saveToIndexedDB('menuObject', { id: JSON.stringify(obj) }, 'train', 'trainingMenu');

    setTimeout(() => {
        location.reload();
    }, 200)



    messageDiv.classList.add('hidden');
    fieldPane.classList.remove('hidden');


};


let yes = (e, opt) => {
    e.preventDefault();
    let option = sessionStorage.getItem('option');
    // // console.log(option);
    if (option === 'alter' || option === 'option') {
        // // console.log('whatthe');
        saveHelper(option);
    } else {
        delHelper(opt, 'yes');

    }
};

let no = (e, opt = true) => {
    e.preventDefault();
    delHelper(opt, 'no');
}

let delHelper = (opt = true, opt2) => {

    setTimeout(() => {
        let answer = opt2
        let messageDiv = document.getElementById('messageDiv');

        let el;
        if (opt) {
            el = document.getElementById('fieldPane');
        } else {
            el = document.getElementById('main');
        }

        if (answer === "yes") {


            let result = delEntry();

        }
        messageDiv.classList.add('hidden');
        el.classList.remove('hidden');


    }, 20);
}
let del = (e, opt = true) => {
    e.preventDefault();
    let el2;
    if (opt) {
        el2 = document.getElementById('fieldPane');
    } else {
        el2 = document.getElementById('main');
    }
    sessionStorage.setItem('option', 'delete');
    el2.classList.add('hidden')
    if (opt) {
        let saveBut = document.getElementById('modSav');
        if (!saveBut.classList.contains('hidden')) {
            saveBut.classList.add('hidden');
        }
    }
    let el = document.getElementById('messageDiv');
    el.classList.remove('hidden');



}


let uidOne = () => {
    let unT = Date.now();
    let string = '';
    for (let i = 0; i < 4; i++) {
        string += String(Math.floor(Math.random() * 10));
    }
    let uidst = unT + 'rn' + string;
    return uidst;
};
let uidH = (replace, obja, t = true, arr = false, objPath = 0, len = false, t2 = false) => {

    let nObj = obja;
    let obj2 = {};
    let obj;
    let temp;
    let fPath = JSON.parse(sessionStorage.getItem('fPath'));
    let menuObj = JSON.parse(sessionStorage.getItem('menu'));
    // // console.log(fPath);
    let place = menuObj;
    let nObj2;
    // if (!t2 && t2 !== 'dissabled') {

    //     len = menuObj.length
    // }





    len = menuObj.length;

    if (t !== true) {
        if (typeof nObj.bS !== 'undefined') {
            obj2 = nObj;
            // obj2.s = nObj.s;
            // obj2.length = 0;
            // obj2.dB = nObj.dB;
            // obj2.dIW = nObj.dIW;
            // obj2.pFN = nObj.pFN;
            // obj2.bS = nObj.bS;
            // obj2.o = nObj.o;
            // obj2.r = nObj.r;
            // obj2.i = nObj.i;
            // obj2.type = nObj.type;
            // obj2.l = nObj.l; 
            // obj2.link = nObj.link;
            // obj2.cONC = nObj.cONC;
            // if (replace) {
            //     obj2.itemKey = fPath[fPath.length - 1]
            //     t = true;
            //     findPathAndSave(fPath, obj2, 'replace', t);
            //     t = false;
            // } else {
            //     obj2.itemKey = nObj.itemKey;
            //     findPathAndSave(fPath, obj2, 'option3', t);
            // }
            obj2.uid = uidOne();
            //         if (fPath.length === 0 && !replace) {
            //        for (let i = 0; i < fPath.length; i++) {
            //         place = place.length;
            //     }
            //     if (typeof place.length !== 'undefined') {
            //     obj2.itemKey = place.length;
            //     }
            // } 
            if (replace) {
                obj2.itemKey = fPath[fPath.length - 1]

            }

            // f // if (level === 1) {
            //     len = len+1;
            // }
            // level = level -1;Path = JSON.parse(sessionStorage.getItem('fPath'));
        }
    }

    let counter = 0;

    // counter2 = counter2 + 1;

    for (let key2 in nObj) {
        if (typeof nObj[key2] !== 'undefined') {
            nObj2 = nObj[key2];
            // // console.log(nObj2);
            if (typeof nObj2.bS !== 'undefined') {

                t = false;

                obj2[key2] = {};
                obj2[key2] = uidH(false, nObj2, t, arr, objPath, len, t2);
                // if (t2 && t2 !== 'dissabled') {
                //     len = len +1;
                // }
                // if (level === 1) {
                //     len = len+1;
                // }
                // level = level -1;
            }
        }
    }
    // if (!t) {
    //     t2 = 'dissabled';
    // }
    if (!t && !replace) {
        // fPath.pop();
        // sessionStorage.setItem('fPath', JSON.stringify(fPath));
    }
    return obj2
};
// let uidH = (replace, obja, t = true, arr = false, objPath = 0) => {

//     let nObj = obja;
//     let obj2 = {};
//     let obj;
//     let temp;
//     let fPath = JSON.parse(sessionStorage.getItem('fPath'));
//     // // console.log(fPath);
//     let nObj2;
//     let t2 = false;

//     if (t !== true) {
//         if (typeof nObj.s !== 'undefined') {
//             obj2 = nObj;
//             // obj2.s = nObj.s;
//             // obj2.length = 0;
//             // obj2.dB = nObj.dB;
//             // obj2.dIW = nObj.dIW;
//             // obj2.pFN = nObj.pFN;
//             // obj2.bS = nObj.bS;
//             // obj2.o = nObj.o;
//             // obj2.r = nObj.r;
//             // obj2.i = nObj.i;
//             // obj2.type = nObj.type;
//             obj2.uid = uidOne();
//             // obj2.l = nObj.l; 
//             // obj2.link = nObj.link;
//             // obj2.cONC = nObj.cONC;
//             // if (replace) {
//             //     obj2.itemKey = fPath[fPath.length - 1]
//             //     t = true;
//             //     findPathAndSave(fPath, obj2, 'replace', t);
//             //     t = false;
//             // } else {
//             //     obj2.itemKey = nObj.itemKey;
//             //     findPathAndSave(fPath, obj2, 'option3', t);
//             // }
//         if (sessionStorage.getItem('linkKey') === 'null') {
//               if (fPath.length > 0) {
//                 linkKey = fPath[0];
//             } else {
//                 linkKey = opt;
//                 for (let i = 0; i < obj.link.length; i++) {
//                     obj2.link[i][0] = opt;
//                 }
//             }
//         }
//             fPath = JSON.parse(sessionStorage.getItem('fPath'));
//         }
//     }

//     let counter = 0

//     counter2 = counter2 + 1;
//     for (let key2 in nObj) {
//         nObj2 = nObj[key2];
//         if (typeof nObj2.bS !== 'undefined') {

//             t = false;

//             obj = uidH(false, nObj2, t, arr, objPath);
//             if (t2) {
//             }
//             if (!t) {
//                 t2 = true;
//             }
//         }
//     }
//     if (!t && !replace) {
//         fPath.pop();
//         sessionStorage.setItem('fPath', JSON.stringify(fPath));
//     }
//     return obj
// };



