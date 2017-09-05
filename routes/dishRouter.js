var express = require('express');
var dishRouter = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var app = express();
var Schema = mongoose.Schema;
var fs = require('fs');

var userSchema = new Schema(
  { 
    username: String,
  	img: 
      { data: Buffer, contentType: String }
  }
);
var User = mongoose.model('User',userSchema);

var newUser = new User;

dishRouter.get('/',function(req, res){
   res.render('form');
});

dishRouter.post('/',multer({ dest: './uploads/'}).single('upl'),function(req,res,next){
  
  console.log(req.body); //form fields

  console.log(req.file);

  newUser.username = req.body.username;

  newUser.img.data = fs.readFileSync(req.file.path);

  newUser.img.contentType = req.file.mimetype;

  newUser.save(function(err, newUser){
    if(err) throw err;
    console.log(newUser);
  });
  res.redirect('/dishes/profile/'+ req.body.username);

});


dishRouter.get('/profile/:userid/picture', function(req,res) {
  User.findById({'_id':req.params.userid},function(err,results) {
      if (err) throw err;
      res.contentType(results.img.contentType);
      res.send(results.img.data);
  });
});

// Get profile
dishRouter.get('/profile/:username', function(req,res) {
  User.findOne(
    {'username': req.params.username},
    function(err, results) {
      if (err) return next(err);
      res.render('show', {
        username: results.username,
        userid: results._id
      });
    });
});


app.use('/dishes',dishRouter);

module.exports = dishRouter;
