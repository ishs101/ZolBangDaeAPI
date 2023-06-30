const mysql = require('mysql2');
const express = require("express");
var cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(cookieParser());


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
        for(let i=1; i<=4; i++) {
            connection.query("SELECT * FROM zol" + i, function(err, res) {
                if (err) throw err;
                console.log('zol' + i);
                console.log(res);
            })
        }
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

    connection.query('UPDATE ' + id + ' SET class='+ _class + ' WHERE stunum=' + stunum, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json('success');
    });
});

app.get('/remove', function (req, res) {
    const q = req.query;
    const id = q.id;
    const stunum = q.stunum;
    connection.query('UPDATE ' + id + ' SET class=0 WHERE stunum=' + stunum, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json('success');
    });
});

app.get('/pw', function (req, res) {
    const q = req.query;
    const stunum = q.stunum;
    const password = q.password;

    connection.query('SELECT * FROM user WHERE stunum=' + stunum, function (err, result) {
        if(err) throw err;
        else if(String(password) == result[0].password) {
            res.cookie('loginID', stunum);
            console.log('success make cookie');
        }
        else if(String(password) != result[0].password) { 
            res.json('incorrect_password');
        }
        else {
            res.json('error');
        }
    });
});

app.get('/reset', function (req, res) {
    const bool = req.query.bool;
    if(bool == 'true') {
        var time = new Date();
        var hours = ('0' + time.getHours()).slice(-2);
        var minutes = ('0' + time.getMinutes()).slice(-2);
        var seconds = ('0' + time.getSeconds()).slice(-2);

        var timeString = hours + ':' + minutes + ':' + seconds;
        console.log(timeString);
        if(timeString == '0:0:0') { 
            for(let i=1; i<=4; i++) {
                connection.query('UPDATE zol' + i + ' SET class=0', function (err, result) {
                    if(err) throw err;
                    console.log(result);
                    res.json('success');
                })
            }
        }
        else {
            console.log('fail because of time')
            res.json('fail because it doesn\'t not in time')
        }

    }
    else {
        res.json('fail');
    }
})

app.listen(3000);