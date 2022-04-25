const db = require('../db/connection');

const addDepartment = (dept_name, callback) => {
    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query(sql, dept_name.toUpperCase(), (err, res) => {
        if (err) {
            console.log(err);
            return callback(false);
        }
        else {
            return callback(true);
        }
    })
}

// const addDepartment = (dept_name) => {
//     const sql = `INSERT INTO department (name) VALUES (?)`
//     db.query(sql, dept_name.toUpperCase(), (err, res) => {
//         if (err) {
//             console.log(err);
//             return false;
//         }
//         else {
//             return true;
//         }
//     })
// }


// const addDepartment = (dept_name) => {
//     return new Promise(function(resolve, reject){
//         const sql = `INSERT INTO department (name) VALUES (?)`
//         db.query(sql, dept_name.toUpperCase(), (err, res) => {
//             if (err) {
//                 console.log(err);
//                 reject(new Error('Unable to add department. Please try again.,'));
//             }
//             else {
//                 //console.log(err.code);
//                 resolve(true);
//             }
//         })
//     })
//}


async function returnAllDepartments() {
    const sql = `SELECT name FROM department ORDER BY name`
     db.promise().query(sql, (error, results, fields) => {
                 return results;
             })
}


 
module.exports = {addDepartment, returnAllDepartments}
