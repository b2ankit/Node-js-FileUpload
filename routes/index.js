//Require express dependencies
var express = require('express');

//Require multer middleware
var multer = require('multer');

//require upload module
var uploadModel = require('../modules/upload');


//query for find result from collection
var imageData=uploadModel.find({});

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
  imageData.exec(function(err,data){

    res.render('index', { title: 'Upload File',records:'', success:''}); //render data for ejs page
        
    });
  });
  




router.post('/',upload, function(req, res, next) {
  var uploadfilename = req.file.filename;
  var success=req.file.filename+ " uploaded successfully";

  var imageDetails=new uploadModel({
    imagename:uploadfilename
  });

  imageDetails.save(function(err,doc){
    if(err) throw err;

    imageData.exec(function(err,data){
      res.render('index', { title: 'Upload File', records:data, success:success}); //render data for ejs page
    })

    
  })

        
    });
    



//Export route module
module.exports = router;
