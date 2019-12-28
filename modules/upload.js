// require mongoose dependecies
var mongoose = require('mongoose');         

//connect mongoose data base using connect('url',{useNewUrlParser}) method
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true,useUnifiedTopology: true});  

//creating a object of connection
var conn = mongoose.connection;


//creating Schema for file Upload

var uploadSchema = new mongoose.Schema({
    imagename:String,
});
var uploadModel = mongoose.model('uploadedfile',uploadSchema);
module.exports=uploadModel;