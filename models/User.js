var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//collection name dishes

var userSchema = new Schema({
  username: String,
  img: { data: Buffer, contentType: String }
});
var dishes = mongoose.model('dish', userSchema);


module.exports= dishes;
