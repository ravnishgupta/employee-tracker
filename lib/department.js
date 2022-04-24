const db = require('../db/connection');

const addDepartment = (dept_name) => {
    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query(sql, dept_name.toUpperCase(), (err, res) => {
        //return res.send(res.affectedRows);
        //console.log(result);
        // var finalData = data.toString()
        // res.send(finalData);
        // if (err) {
        //     res.status(400).json({ error: err.message });
        //     return;
        // }
        // return (res.json({
        //     message: 'success'
        //     }));
    })
    
}

// const returnAllDepartments = () => {
//     const sql = `SELECT name FROM department ORDER BY name`
//     db.query(sql, (error, results, fields) => {
//         return JSON.stringify(results);
//     })
    
// }

async function returnAllDepartments() {
    const sql = `SELECT name FROM department ORDER BY name`
     db.promise().query(sql, (error, results, fields) => {
                 return results;
             })
}


 
module.exports = {addDepartment, returnAllDepartments}
