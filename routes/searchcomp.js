var express = require('express');
var router = express.Router();

var url = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "equip"

});
con.connect(function (err) {
    if (err) throw err;
    console.log('conected');

});
/* GET users listing. */
router.get('/', function(req, res, next) {

	var sql="select * from  complaint_master where STATUS='pending'";
	con.query(sql, function (err,result) {
		 if(err){
            res.end(err);}
        else{
			console.log('result');
			 var len = Object.keys(result).length;
		     if(len>0)
			 res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"" });
			else
			res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"NOT FOUND" });
		}
     
	});
   

});
router.post('/', function(req, res, next) {
	var x=req.body.submit;
	console.log(x);
    if(x=='search'){
    	 var fd=req.body.fdate; 
    var td=req.body.tdate;
    var status=req.body.state;

        var sql="SELECT * From complaint_master  WHERE COMPLAIN_DATE BETWEEN '"+fd+"' AND '"+td+"'";
       con.query(sql, function (err, result) {
            if (err) {console.log(sql);
                
            }
            else {var len = Object.keys(result).length;
		     if(len>0)
			 res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:result[0].PERSON_WHO_MADE_THE_COMPLAIN });
			else
			res.render('searchcomp', { title:'SEARCH COMPLAINT',data:result,status:"NOT FOUND" });
                
            }
          
        });


    }

    else
        res.render('err',{err:'ERROR'});

});

module.exports = router;