const db = require('../db/connection');

const addDepartment = (dept_name, callback) => {
    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query(sql, dept_name.toUpperCase(), (err) => {
        if (err) {
            return callback(false);
        }
        else {
            return callback(true);
        }
    })
}


const getAllDepartments = (callback) => {
  const sql = `SELECT name AS DEPARTMENT_NAME FROM department ORDER BY name`
  db.query(sql, (err, res) => {
    if (err) {
        return callback(err.message)
    }
        return callback(res)
  })
}


 
module.exports = {addDepartment, getAllDepartments}
