const db = require('../db/connection');

const getAllEmployees = (callback) => {
    const sql = `SELECT e.id AS EMPLOYEE_ID,
                e.first_name AS FIRST_NAME, 
                e.last_name AS LAST_NAME, 
                r.title AS TITLE, 
                d.name AS DEPARTMENT, 
                r.salary AS SALARY, 
                concat_ws(' ', e1.first_name, e1.last_name) AS MANAGER 
                FROM 
                employee e 
                LEFT JOIN role r ON e.role_id = r.id
                INNER JOIN department d ON r.department_id = d.id
                LEFT JOIN employee e1 ON e.manager_id = e1.id;`
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      return callback(res)
    })
  }

  module.exports = {getAllEmployees};