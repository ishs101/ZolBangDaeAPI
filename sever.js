const mysql = require('mysql2');
const express = require("express");
var cors = require('cors');
const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: '210.114.22.146',
    user: 'root',
    password: 'ishs123!',
    database: 'zolbangdae'
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected!");
        connection.query("SELECT * FROM zol1", function(err, res) {
            if (err) throw err;
            console.log(res);
        })
    }
});

app.get('/check', function (req, res) {
    const q = req.query;
    const id = q.id;
    const _class = q.class;
    console.log(id);
    console.log(_class);

    if(id == "zol1") {
        connection.query('SELECT * FROM zol1 WHERE class='+ _class, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    else if(id == "zol2") {        
        connection.query('SELECT * FROM zol2 WHERE class='+ _class, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    else if(id == "zol3") {
        connection.query('SELECT * FROM zol3 WHERE class='+ _class, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    else if(id == "zol4") {
        connection.query('SELECT * FROM zol4 WHERE class='+ _class, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    else {
        res.json({"id" : "error"});
    }
});

app.get('/register', function (req, res) {
    const q = req.query;
    const id = q.id;
    const stunum = q.stunum;
    const _class = q.class;
    const password = q.password;

    connection.query('UPDATE ' + id + ' SET class='+ _class + ' WHERE stunum=' + stunum, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});

app.get('/remove', function (req, res) {
    const q = req.query;
    const id = q.id;
    const stunum = q.stunum;
    connection.query('UPDATE ' + id + ' SET class=0 WHERE stunum=' + stunum, function (err2, result2) {
        if (err2) throw err2;
        console.log(result2);
        res.json(result2);
    });
});

app.get('/pw', function (req, res) {
    const q = req.query;
    const stunum = q.stunum;
    const password = q.password;

    connection.query('SELECT * FROM user WHERE stunum=' + stunum, function (err, result) {
        if(err) throw err;
        else if(String(password) == result[0].password) {
            res.json('success');
        }
        else if(String(password) != result[0].password) { 
            res.json('incorrect_password');
        }
    });
});

app.listen(3000);