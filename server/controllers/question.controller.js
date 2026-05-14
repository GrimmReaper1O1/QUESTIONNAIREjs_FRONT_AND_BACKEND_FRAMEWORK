import querys from '../querys/querys.js';

async function insertSubject(req, res) {
console.log('got here!');
console.log(req);
try {
let result = await querys.insertSubject(req.body);
res.status(200).json({messsage:'went through!', insertId: result.insertId});
} catch {
res.status(500).json({message:'There was an error!'});
}
}

async function insertQuestionIds(req, res) {
console.log(req);
try {
    let result = await querys.insertQuestionIds(req.body);
    console.log(req.body.subject, "hello");
    querys.incrementVersionViaSubjectId(req.body.subject);
    res.status(200).json({message:'went through!', insertId: result.insertId});
 } catch {
    res.status(500).json({message:'There was an error!'})
}
}

async function insertQuestionInformation(req, res) {
   console.log('got here');
    try {
    let result = await querys.insertQuestionInformation(req.body);
    console.log(result);
    querys.incrementVersionViaSubjectId(req.body.subjectId);
    res.status(200).json({message:'went Through!', })
    } catch {
    res.status(500).json({message:'There was an error!'})
}
};

async function updateSubject(req, res) {

   console.log('got here');
   console.log(req.body);
    let result = await querys.updateSubjectViaId(req.body);
    console.log(result.changedRows > 0);
    console.log(result);
    querys.incrementVersionViaSubjectId(req.body.subjectId);
    if (result.affectedRows > 0) {
    res.status(200).json({message:'went Through!', result: result})
} else {
    res.status(500).json({message:'There was an error!'})
}

}

async function updateQuestionIds(req, res) {

  console.log('got here');
   console.log(req.body);
    let result = await querys.updateQuestionIds(req.body);
    console.log(result);
    querys.incrementVersionViaSubjectId(req.body.subjectId);
    if (result[1].affectedRows > 0) {
    res.status(200).json({message:'went Through!', result: result})
} else {
    res.status(500).json({message:'There was an error!'})
}

}

async function updateQuestionInformation(req, res) {

 console.log('got here1');
   console.log(req.body);
    let result = await querys.updateQuestionInformation(req.body);
    console.log(result.affectedRows);
      querys.incrementVersionViaSubjectId(req.body.subjectId);
    if (result.affectedRows > 0) {
    res.status(200).json({message:'went Through!', result: result})
} else {
    res.status(500).json({message:'There was an error!'})
}

}

async function inputSubject(req, res) {

 console.log('got here1');
   console.log(req.body);
    let result = await querys.inputSubjectEntire(req.body);
    // console.log(result.affectedRows);
    if (result.affectedRows > 0) {
    res.status(200).json({message:'went Through!', result: result})
} else {
    res.status(500).json({message:'There was an error!'})
}

}
async function inputQuestionJSON(req, res) {

 console.log('got here1');
   console.log(req.body);
    let result = await querys.inputQuestions(req.body);
    console.log(result.affectedRows);
    // if (result.affectedRows > 0) {
    res.status(200).json({message:'went Through!', result: result})
// } else {
//     res.status(500).json({message:'There was an error!'})
// }

}

async function deleteSubject(req, res) {

    

}

async function deleteQuestionIds(req, res) {



}


async function deleteQuestionInformation(req, res) {




}

async function selectSubject(req, res) {



}

async function selectQuesitonIds(req, res) {
    
    
    
}

async function selectIdsByIdWithIdsAndDescription(req, res) {



}




async function postGetInformationGrouped(req, res) {
        console.log(req.body);
        let result = await querys.selectGroupedQuestionInformaitonById(req.body);
            console.log(result);
        if (result) {
            res.status(200).json({message: 'The request was successfull!', result: result});
        } else {
                res.status(404);
             }
};

async function acquireQuestionIds(req, res) {

    const {option, subjectId, offset, limit, questionId} = req.query;
    console.log(req.query);
    let result;

    switch (option) {
        case 'position':
             result = await querys.getLastPositionOfQuestionIds(subjectId);

             if (result) {
                res.status(200).json({message: 'The request was successfull!', result: result})
             } else {
                res.status(404);
             }
            break;
        case 'count':
            
            result = await querys.getCountOfQuestionIds(subjectId);
        if (result) {       
            res.status(200).json({message: 'The request was successfull!', result: result});
        } else {
                res.status(404);
             }
            break;
        case 'acquire':
             console.log(subjectId);
            result = await querys.aquireQuestionIds(subjectId, offset, limit)
        if (result) {
            res.status(200).json({message: 'The request was successfull!', result: result});
        } else {
                res.status(404);
             }

            break;

        case 'id':
 console.log(questionId);
            result = await querys.selectIndividualQuestionIds(questionId)
             console.log(result);
            if (result) {
            res.status(200).json({message: 'The request was successfull!', result: result});
        } else {
                res.status(404);
             }
            
        break;
                case 'table':
             
            result = await querys.aquireQuestionIdsTable(subjectId)
            console.log(result);
        if (result) {
            res.status(200).json({message: 'The request was successfull!', result: result});
        } else {
                res.status(404);
             }
        break;

        default:
        console.log('invalid option in switch statement.');
        break;

    }
}

const acquireSubjects = async (req, res) => {
    console.log(req.query);
  const {option, offset, limit, letter, id, searchInfo, get} = req.query;
    let result, arr;
    console.log(req.query);
    switch (option) {
       
        case 'letterOffset':

            result = await querys.selectSubjectViaLetterPagination(limit, offset, letter);
            arr  = result;
            
            
            if (arr[0]) {
            res.status(200).json({message: 'success!', result: arr})
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'normalOffset':
            result = await querys.selectAlphaSubjectViaPagination(limit, offset);        
            arr = [];
            arr.push(result);      
            
            if (arr[0]) {
            res.status(200).json({message: 'success!', result: arr})
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'count':
            // the below returns the first few entries dependent on the limit
            console.log('what the two');
            result = await querys.countOfSubjectsAndInitEntries(limit);
            console.log(result);
                        if (result) {
            res.status(200).json({message: 'success!', result: result})
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'countLetter':
            // the below returns the first few entries dependent on the limit
            console.log('it really got here');
            result = await querys.countOfSubjectViaLetterAndInitEntries(letter, limit);
            console.log(result);
                        if (result) {
            res.status(200).json({message: 'success!', result: result})
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'id':
            if (get === 'subjectList') {
                result = await querys.selectSubjectViaIdWithFiles(id);
            } else {
            result = await querys.selectSubjectViaId(id);
            }
            if (result) {
                res.status(200).json({message: 'success!', result: result});
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'search':
        let  result2;    
        if (offset === 'false') {
            result2 = await querys.selectViaSearch(searchInfo, limit, false, true);
                result = await querys.selectViaSearch(searchInfo, limit, offset, false);
            } else {
            result2 = await querys.selectViaSearch(searchInfo, limit, offset, true);
                
            }
             arr = [];
            arr.push(result2);
            arr.push(result);
            console.log(arr);
            if (arr) {
            
                res.status(200).json({message: 'success!', result: arr});
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        default:

        break;
        
    }
}

// acquire question information is under construction
const acquireQuestionInformation = async (req, res) => {
    
  const {option, offset, limit, questionId, informationId} = req.query;
   console.log(informationId);
    let result;
    switch (option) {
        case 'count':
            result = await querys.selectQuestionInformationCountViaQuesitonId(questionId);
            if (result) {
                res.status(200).json({message: 'success', result: result});
            } else {
                res.status(404).json({message: '404'});
            }
        break;
        case 'normalOffset':
            result = await querys.selectQuestionInformationViaQuestionIdPagination(questionId, limit, offset);        
            if (result) {
                res.status(200).json({message: 'success!', result: result});
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        
        case 'informationId':
            result = await querys.selectIndividualQuesitonInformation(informationId);

            if (result) {
                res.status(200).json({message: 'success!', result: result});
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        case 'grouped':
            result = await querys.selectQuesitonInformationIdsViaSubjectId(id);

            if (result) {
                res.status(200).json({message: 'success!', result: result});
            } else {
                res.status(404).json({message: 'Not found.'});
            }
        break;
        default:

        break;
        
    }
}


// figure out what happens when something is 404 probably false

export default {
inputQuestionJSON,
inputSubject,
insertSubject, 
insertQuestionIds, 
insertQuestionInformation, 
updateSubject, 
updateQuestionIds,
insertQuestionInformation,
deleteSubject,
deleteQuestionIds, 
deleteQuestionInformation,
selectSubject,
selectQuesitonIds,
postGetInformationGrouped,
selectIdsByIdWithIdsAndDescription,
acquireQuestionIds,
acquireSubjects,
updateQuestionInformation,
acquireQuestionInformation,

}