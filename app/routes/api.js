var User=require('../models/user');
var Reserva=require('../models/reserva');
var Horario=require('../models/horario');
var Salon=require('../models/salon');
var Prueba=require('../models/prueba');
var config =require('../../config');
var secretKey=config.secretKey;
var jsonwebtoken=require('jsonwebtoken');
var nodemailer=require('nodemailer');

var transporter=nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'usatureserva@gmail.com',
		pass:'usatureserva123'
	}
});

function createToken(user){
	var token=jsonwebtoken.sign({
		id:user._id,
		name:user.name,
		username:user.username
	},secretKey, {
		expirtesInMinute:1440
	});

	return token;
}
module.exports=function(app,express){

	var api=express.Router();

	api.post('/signup',function(req,res){
		var user=new User({
			name:req.body.name,
			username:req.body.username,
			password:req.body.password
		});
		user.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message:'user has been created'});
		});
	});

	api.get('/users',function(req,res){
		User.find({},function(err,users){
			if(err){
				res.send(err)
			}
			res.json(users);
		});
	});

	api.delete('/remove',function(req,res){
		User.findOne({name:req.body.name}).select('name').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({message:'user doesnt exist'});
			}else{
				User.remove({name:req.body.name},function(err){
					if(err) throw err;
					res.json({message:'User has been deleted'});
				});
			}
		});
	});

	api.post('/login',function(req,res){
		User.findOne({username:req.body.username}).select('password').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({message:'User doesnt exist'});
			}else{
				var validPassword=user.comparePassword(req.body.password);
				if(!validPassword){
					res.json({message:'Invalid password'});
				}else{
					var token=createToken(user);
					res.json({message:'Success!!!',token:token});
				}
			}
		});
	});

	/*api.post('/reserva',function(req,res){
		Salon.findOne({nombre:req.body.salon}).select("nombre").exec(function(err,salones){
			if(err) throw err;
			if(salones.capacidad==0){
				res.json({message:"El salon esta lleno"});
			}else{
				var today=new Date();
				var reserva=new Reserva({
					fecha:Date.now(),
					horaInicio:Date.now(),
					horaFin:Date.now(),
					computador:salones.getcapa(),
					correo:req.body.correo,
					salon:req.body.salon
				})
				reserva.save(function(err){
					if(err){
						res.send(err);
					}else{					
							if(err) throw err;
							else{
								res.json({message:'Reserva creada!!'});
								transporter.sendMail({
									from:'usatureserva@gmail.com',
									to:req.body.correo,
									subject:'Confirmación reserva',
									text:'Reserva creada!\n'+
										'La reserva ha sido creada el: '+today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+
										'\nHora de inicio: '+today.getHours()+':'+today.getMinutes()+'\n'+
										'Con el computador asignado: '+salones.getcapa()+'\nEn el salon: '+req.body.salon
								},function(err,info){
									if(err){
										res.send(err);
									}else{
										console.log(info.accepted);
										console.log(info.rejected);
									}
								});

								salones.setcapa();
								//salones.update({nombre:req.body.salon},{$set:{capacidad: salones.capacidad-1 }},{multi:true},function(err, numAffected){
								//	res.send(err);
								//});
						}
					}
				});
			}
		});

		});

								
	});*/

	//---------------------------------> MiddleWare  <------------------------------------------------------------
	
	//--------------------------------->MiddleWare <------------------------------------------------------------

	//---------------------------------> Crear Salones <-----------------------------------------------------
	api.route('/newroom')
		.post(function(req,res){
			var salon=new Salon({
				capacidad:req.body.capacidad,
				nombre:req.body.nombre,
				horasLibre:req.body.horaslibre
			});
			salon.save(function(err){
				if(err){
					res.send(err);
				}else{
					res.json({message:'salon creado'})
				}
			});
		})
		.get(function(req,res){
			Salon.find({},function(err,salones){
				if(err){
					res.send(err);
					return
				}else{
					res.json(salones);
				}
			});
		});
	//--------------------------------> Crear Horarios <-----------------------------------------------------
	api.route('/newsch')
		.post(function(req,res){
			Salon.findOne({nombre:req.body.salon}).select('nombre').exec(function(err,saloon){
				if(err) throw err;
				if(!saloon){
					res.json({message:'El salon no existee'})
				}else{
					var salonid=saloon.getid();
					var horario=new Horario({
						dia:req.body.dia,
						salon:salonid
					});
					horario.save(function(err){
						if(err){
							res.send(err);
							return;
						}else{
							res.json({message:'Horario creado'});
						}
					});
				}
			});			
		})
		.get(function(req,res){
			Horario.find({},function(err,horarios){
				if(err){
					res.send(err);
					return
				}else{
					res.json(horarios);
				}
			});
		});
	//---------------------------------->Ver Reservas <------------------------------------------------------------
	api.route('/view')
		.get(function(req,res){
			Reserva.find({},function(err,reservas){
				if(err){
					res.send(err);
				}else{
					res.json(reservas);
				}
			});
		});
	
	api.get('/me',function(req,res){
		res.json(req.decoded);
	});

return api;
}