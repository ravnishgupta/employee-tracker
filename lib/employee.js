const db = require('../db/connection');

const getAllEmployees = (callback) => {
    const sql = `SELECT e.first_name as FIRST_NAME, 
                e.last_name as LAST_NAME, 
                r.title as TITLE, 
                d.name as DEPARTMENT, 
                r.salary as SALARY, 
                concat_ws(' ', e1.first_name, e1.last_name) as MANAGER 
                FROM 
                employee e 
                LEFT JOIN role r ON e.role_id = r.id
                INNER JOIN department d ON r.department_id = d.id
                LEFT JOIN employee e1 on e.manager_id = e1.id;`
    db.query(sql, (err, res) => {
      if (err) {
          return callback(err.message)
      }
          return callback(res)
    })
  }

  module.exports = {getAllEmployees};