import mysql from 'rx-mysql';
import dotenv from 'dotenv';
dotenv.config({path: './../stuff.env'});
console.log(process.env.DATABASE, 'it got here too');
const db = await mysql({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
});

// for db remove port and add for ssh
// sshTunnel: {
//     sshOptions: {
//         port: 22,
//         username: 'wittandrew',
//         host: '',
//         privateKeyFile: '/path/to/certs/id_rsa'
//     },
//     forwardOptions: {
//         dstAddr: 'localhost',
//         dstPort: 3377,
//     }
//}

const { query, getInstance, dissconnect, beginTransaction } = db;
// eg const nativeResults = await query(
//   'SELECT user_id, user_name FROM users',
//   null,
//   { nativeQuery: true }
// );

// async function main() {
//   const { getInstance, disconnect } = await mysql();
//   const db = getInstance();

//   let transaction;
//   try {
//     transaction = await db.beginTransaction();

//     // Execute queries within the transaction
//     await transaction.query('INSERT INTO users (name) VALUES (:name)', { name: 'John Doe' });
//     await transaction.query('UPDATE products SET stock = stock - 1 WHERE id = :id', { id: 101 });

//     await transaction.commit();
//     console.log('Transaction committed successfully.');
//   } catch (error) {
//     if (transaction) {
//       await transaction.rollback();
//       console.log('Transaction rolled back due to error:', error);
//     } else {
//       console.error('Error starting transaction:', error);
//     }
//   } finally {
//     await disconnect();
//   }
// }




export default { query, getInstance, dissconnect, beginTransaction };
