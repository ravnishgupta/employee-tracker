const db = require('../db/connection');

const getAllRoles = (callback) => {
    const sql = `SELECT title AS ROLE FROM role ORDER BY title`
    db.query(sql, (err, res) => {
      if (err) {
          return callback(err.message)
      }
          return callback(res)
    })
  }
  
module.exports = {getAllRoles};