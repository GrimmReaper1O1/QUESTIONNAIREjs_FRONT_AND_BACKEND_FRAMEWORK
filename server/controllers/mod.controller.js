import fs from 'fs';
import querys from './../querys/querys.js';
const {insertIntoModuleIndexTable, searchModuleIndexTableViaStringAndField} = querys;


async function writeModule( req, res )  {
    let unixTimestamp = Date.now();
    console.log('got here');
    
   console.log(req.body);
  const {key, genre, keywords, description, title, author, module, userId} = req.body;
    fs.writeFile(`${process.cwd()+'/../jsonFiles/'+key}.json`, module, 'utf8', err => {
    console.log('writing file')
        if (err) {
            res.status(500);
            console.log('failed 1', err)
            }
        }
    );
    let result = await insertIntoModuleIndexTable(key, genre, userId, keywords, description, title, unixTimestamp, 0, author)
    if (result.affectedRows > 0) {
    res.status(200);
    } else {
        res.status(500);
    }
}


async function readModule(req, res)  {
        const {name} = req.params;
       fs.readFile(`${process.cwd()+'/../jsonFiles/'+name}.json`, 'utf8', (err, data) => {
            console.log('sending file')
            if (err) {
                res.status(500).end();
                console.log('failed 2');
            }
            res.json(data);
        })

    };

async function searchForModule(req, res)  {
   const {searchVal, type, enabled, numOfRows, offset} = req.params;
   
   if (body.enabled) {
    offset = 0;
   }
   
   let result = await searchModuleIndexTableViaStringAndField(searchVal, type, enabled, numOfRows, offset);


res.json(JSON.parse(JSON.stringify(result, (key, value) => 
typeof value === 'bigint' ? value.toString() : value)));

    };

export default {writeModule, readModule, searchForModule}