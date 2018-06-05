var express = require('express');
var router = express.Router();

var url = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "experimental"

});
con.connect(function (err) {
    if (err) throw err;
    console.log('conected');

});

/* GET home page. */
router.get('/', function(req, res, next) {


    var sql2 = "SELECT * FROM customer where action='unchecked'";
    con.query(sql2, function (err, result) {
        if (err) {
            throw err;
            res.end('error');
        }
        else {
            console.log('result');
        }
        var len = Object.keys(result).length;
        res.render('index', {title: 'Equipshare',result:result,len:len});
    });
});
module.exports = router;
