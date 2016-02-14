angular.module('controller1',[])

.controller('crearreserva', function(reserva, $location) {

	var vm = this;

	vm.create = function() {
		vm.message = '';

		reserva.create(vm.reservadatos)
			.then(function(response) {
				vm.reservadatos = {};
				vm.message = response.data.message;
				$location.path('/');
			})
	}

})