angular.module('servicehorario',[])

	.factory('Sch',function($http){
		var horariofactory={};

		horariofactory.show=function(){
			return $http.get('/newsch');
		}

	return horariofactory;

});