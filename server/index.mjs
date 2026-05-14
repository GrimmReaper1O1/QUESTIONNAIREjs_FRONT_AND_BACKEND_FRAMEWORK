import express from 'express';
import fs from 'fs';
import http from 'http';
import cors from 'cors';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host:'localhost',
    user:'wittandrew',
    password: 'Solitude1',
    connectionLimit: 5,
    database: 'pathways',
});
// cange all catch statements from throw error to console.log error and return http_status of 500 later
let insertIndividualUser = async (body) => {
    let conn;
    let user = body.user;
    let pass = body.pass;
    let email = body.email;
    let sql = `INSERT INTO users (username, password, email, created, failed_attempts) `;
        sql += ` VALUES ('${user}', '${pass}', '${email}', ${Date.now()}, 0);`;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows);
        const res =await conn.query(sql,[1,"mariadb"]);
        console.log(res);
    } catch (err) {
        return err;
    } finally {
        if (conn) conn.end();
    }
    return 'success'
};
let insertIndexModule = async (keyName, genre, userId, keywords, description, moduleName, timestampDA, competitionId, author) => {
    let conn;
    let sql = `INSERT INTO module_index_table (key_name, genre, userId, keywords, description, module_name, timestamp_display_after, competitionId, show_module, takedown_notice, timestamp, pen_name) `;
        sql += ` VALUES ('${keyName}', '${genre}', ${userId}, '${keywords}', '${description}', '${moduleName}', '${timestampDA}', ${competitionId}, 0, 0, ${Date.now()}, ${author});`;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows);
        const res =await conn.query(sql,[1,"mariadb"]);
        console.log(res);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
let searchStringAndField = async (stringArr, field ,enabled, numberOfRows, offset) => {
    let conn;
    let result1;
    if (enabled) {
    let sql1 = `select count(*) as count from module_index_table where ${field} like '%${stringArr[0]}%' `
    for (let i = 1; i < stringArr.length; i++) {
        sql1 += `and ${field} like '%${stringArr[i]}%' `;
    }
    sql1 += `;`;
    try {
        conn = await pool.getConnection();
        result1 = await conn.query(sql1);

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }



    }


    let sql = `select u.id as userid, m.id as moduleId, m.key_name as key_name, m.keywords as keywords, m.description as description, m.module_name as module_name, m.genre as genre, u.username as author from users u right join module_index_table m on u.id = m.userId `;
    sql += `where m.${field} like '%${stringArr[0]}%' `;
    for (let i = 1; i < stringArr.length; i++) {
        sql += `and m.${field} like '${stringArr[0]} `;
    }
    sql += `order by m.${field}, m.module_name asc offset ${offset} rows fetch next ${numberOfRows} rows only`;
    sql += ';';

    try {
        conn = await pool.getConnection();
        let rows = await conn.query(sql);
        console.log(rows);
        let res = await conn.query(sql,[1,"mariadb"]);
        console.log(res);
        let resultFinal = {}
        resultFinal.count = result1[0].count;
        resultFinal.rows = rows;
        console.log(resultFinal);
        return resultFinal;
    } catch (err) {
        console.log(err);
        throw Error(err);
    } finally {
        if (conn) conn.end();
    }
};




let app = express();
let router = express.Router();
// prevents cors policy in browser
app.use(cors());
app.use(express.json()); 
console.log(process.cwd());
router.route('/').get( ( req, res ) => res.sendFile('index.html', {root: `${process.cwd()}/server/`}));
router.route('/save').post( ( req, res ) => {
    let body = req.body;
    console.log(req.body);
    fs.writeFile(`${process.cwd()+'/jsonFiles/'+body.key}.json`, body.module, 'utf8', err => {
console.log('writing file')
        if (err) {
            res.status( 500);
            console.log('failed 1')
        }
    });
    
    insertIndexModule(body.key, body.genre, 1, body.keywords, body.description, body.title, Date.now(),  0, body.author)
    
    
    res.end();
});

router.route('/load').post((req, res) => {
    let body = req.body;
    fs.readFile(`${process.cwd()+'/jsonFiles/'+body.name}.json`, 'utf8', (err, data) => {
        console.log('sending file')
        if (err) {
            res.status( 500).end();
            console.log('failed 2');
        }
        res.json(data);
    })
});
router.route('/search').post(async (req, res) => {
   let body = req.body;
   console.log(req.body);
   if (body.enabled) {
    body.offset = 0;
   }
   console.log(body);
   let result = await searchStringAndField(body.searchVal, body.type, body.enabled, body.numOfRows, body.offset);

console.log('144', result);
res.json(JSON.parse(JSON.stringify(result, (key, value) => 
typeof value === 'bigint' ? value.toString() : value)));

    });


app.use('/', router);







// special characters
// page 253 advanced javascript packt book

// error handling page 259 for express asycronous and synchronous handled differently asychronous needs next function

let port = 3000;
let hostname = 'localhost';

app.use('/', router);

app.listen(port, hostname, () => { console.log(`server running at port ${port}`)});

