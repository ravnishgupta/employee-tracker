const db = require('../db/connection');

const getAllRoles = () => {
    const sql = `SELECT r.id AS ROLE_ID, title AS JOB_TITLE, d.name AS DEPT_NAME, r.salary AS SALARY
                FROM role r
                INNER JOIN department d ON d.id = r.department_id 
                ORDER BY r.id;`
    return db.promise().query(sql)
  }

  const addRole = (role_title, salary, department_id, callback) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
      const params = [role_title.toUpperCase(), salary, department_id]
      db.query(sql, params, (err, res) => {
          if (err) {
              throw err;
          }
          return callback(true);

      })
  }
  
module.exports = {getAllRoles, addRole};