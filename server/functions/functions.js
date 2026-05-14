

let insertIndividualUser = async (user, pass, email) => {
    let conn;
    let sql = `INSERT INTO users (username, password, email, created, failed_attempts) `;
        sql += ` VALUES ('${user}', '${pass}', '${email}', ${Date.now()}, 0);`;
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

export default {insertIndividualUser, insertIndexModule, searchStringAndField}