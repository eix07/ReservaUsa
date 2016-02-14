angular.module("controller",[])

	.controller('controlhorarios',function(Sch){
		var vm=this;
		vm.show().succes(function(data){
			vm=data
		});
})