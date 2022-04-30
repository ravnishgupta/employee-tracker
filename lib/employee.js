const db = require('../db/connection');

 const getAllEmployees = () => {
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
                LEFT JOIN employee e1 ON e.manager_id = e1.id`
    return db.promise().query(sql) 

  }

  const getAllManagers = (callback) => {
    const sql = `SELECT * FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee)`
    db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        return callback(res);
    })
  }

  const addEmployee = (first_name, last_name, role_id, manager_id, callback) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
    const params = [first_name.toUpperCase(), last_name.toUpperCase(), role_id, manager_id]
    db.query(sql, params, (err, res) => {
      if (err) {
        throw err;
      }
      return callback(res);
    })
}

  function getEmp (callback){
    const sql = `SELECT * FROM employee`
    let array = []
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      else
      {
        res.forEach((record) => {array.push(record.first_name)})
        return callback(array);
      }
      
  })
    //return array;
}

  module.exports = {getAllEmployees, getAllManagers, addEmployee, getEmp};