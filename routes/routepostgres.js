const express = require('express');
const router = express.Router();
const pg =  require('pg');
const connectionString = 'postgres://root:root@localhost:5432/nodedb';

router.post('/nodeins',(req,res,next) => {
    const results = [];
    const data = {text: req.body.text, complete: false};
    pg.connect(connectionString, (err,client,done)=>{
        if(err){
            done();
            console.log(err);
            return res.status(500).json({sucess:false,data:err});
        }

        client.query('INSERT INTO items(text, complete) values($1, $2)',
            [data.text, data.complete]);
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM items ORDER BY id ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
            results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
            done();
            return res.json(results);
            });
    });
});

module.exports = router;