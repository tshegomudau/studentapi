const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, studentname, dob, score 
    FROM results LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function getStudentResult(id, results){
    const rows = await db.query(
      `SELECT id, studentname, dob, score 
      FROM results WHERE id= ${id} and studentname= '${results.name}'`
    );
    const data = helper.emptyOrRows(rows);

  
    return {
      data
    }
  }

async function create(results) {

    var studentname = 'studentname'
    console.log(results.name)
    const result = await db.query(
      `INSERT INTO results 
      (${studentname}, dob, score) 
      VALUES 
      ('${results.name}', '${results.dob}', ${results.score})`
    );
  
    let message = 'Error in capturing  results';
  
    if (result.affectedRows) {
      message = 'Results captured successfully';
    }
  
    return {message};
  }


  async function update(id, results){
    const result = await db.query(
      `UPDATE results 
      SET score="${results.score}"
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating results';
  
    if (result.affectedRows) {
      message = 'Results updated successfully';
    }
  
    return {message};
  }


  async function remove(id){
    const result = await db.query(
      `DELETE FROM results WHERE id=${id}`
    );
  
    let message = 'Error in deleting results';
  
    if (result.affectedRows) {
      message = 'Results deleted successfully';
    }
  
    return {message};
  }
module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getStudentResult
}
