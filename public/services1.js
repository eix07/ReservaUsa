angular.module('servicereserva',[])

	.factory('reserva',function($http){
		var reservafactory={};

		reservafactory.create=function(reservadatos){
			$.post('/api/reserva',reservadatos);
		}

	return reservafactory;
	});