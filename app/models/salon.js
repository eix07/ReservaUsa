var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var salonesSchema=new Schema({
	capacidad:Number,
	nombre:String,
	horasLibre:['7-9','9-11','11-13','13-15','15-17','17-19','19-21']
});

salonesSchema.methods.getid=function(){
	var salon=this;
	return salon._id;
}

salonesSchema.methods.getcapa=function(){
	
	return this.capacidad;
}

salonesSchema.methods.setcapa=function(){
	var s=this;
	this.capacidad=this.capacidad-1;
}

salonesSchema.methods.getnom=function(){

	return this.nombre;
}

module.exports=mongoose.model('Salon',salonesSchema);