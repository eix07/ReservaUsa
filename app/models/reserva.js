var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ReservasSchema= new Schema({
	fecha: {type:Date ,requiered:true},
	horaInicio: {type:Date,requiered:true},
	horaFin:{type:Date, required:true},
	computador:String,
	correo:{type: String,required:true},
	cancelar:Boolean,
	salon:String
});

module.exports=mongoose.model('Reserva',ReservasSchema);