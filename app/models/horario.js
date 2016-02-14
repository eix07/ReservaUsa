var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var horarioSchema=new Schema({
	dia:['lunes','martes','miercoles','jueves','viernes'],
	Salon:{type:Schema.Types.ObjectId, ref:'Salon'}
});


module.exports=mongoose.model('Horario',horarioSchema);