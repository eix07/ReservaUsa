var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var pruebaSchema=new Schema({
	nombre: String
});

pruebaSchema.methods.getid=function(){
	var _id=this;
	return _id._id;
}

module.exports=mongoose.model('Prueba',pruebaSchema);