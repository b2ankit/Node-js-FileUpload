//Require express dependencies
var express = require('express');

//Require multer middleware
var multer = require('multer');

//Define path for file
var path = require('path');

//creat a object of route
var router = express.Router();


//define statics path
router.use(express.static(__dirname + "./public/"));

var Storage = multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb) =>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});


var upload = multer({
storage:Storage

}).single('file');

// start routing.... 

router.get('/', function(req, res, next) {
        res.render('index', { title: 'Upload File',success:''}); //render data for ejs page
  });
  


//Creating route for upload
router.get('/', function(req, res, next) {

  res.render('upload-file', { title: 'Upload File', success:''}); //render data for ejs page
      
  });
  

router.post('/',upload, function(req, res, next) {
  var success=req.file.filename+ " uploaded successfully"

    res.render('index', { title: 'Upload File', success:success}); //render data for ejs page
        
    });
    



//Export route module
module.exports = router;
