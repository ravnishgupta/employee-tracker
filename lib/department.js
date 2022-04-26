const db = require('../db/connection');

const addDepartment = (dept_name, callback) => {
    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query(sql, dept_name.toUpperCase(), (err) => {
        if (err) {
            throw err;
        }
        else {
            return callback(true);
        }
    })
}

const getAllDepartments = (callback) => {
  const sql = `SELECT id AS DEPARTMENT_ID, name AS DEPARTMENT_NAME FROM department ORDER BY id`
  db.query(sql, (err, res) => {
    if (err) {
        throw err;
    }
        return callback(res)
  })
}


 
module.exports = {addDepartment, getAllDepartments}
