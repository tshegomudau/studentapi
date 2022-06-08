const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER, 
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

exports.view = (req, res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
       

        connection.query('select * From user where status = "active"',(err,rows) => {
            connection.release();
            if(!err){
                res.render('home',{rows: rows})
            } else{
                console.log(err);
            }
            

        });
    });
}
exports.find = (req, res) => {
    
    pool.getConnection((err,connection) => {
        if(err) throw err;
       

        let searchterm = req.body.search;
        console.log(searchterm);

        connection.query('select * From user where first_name like ?',['%' + searchterm +'%'] ,(err,rows) => {
            connection.release();
            if(!err){
                res.render('home',{rows: rows})
            } else{
                console.log(err);
            }
            

        });
    });
}