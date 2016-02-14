/*var app = angular.module('tabla1', []);
app.controller('contTabla1', function($scope) {
   $scope.myData = {};
   $scope.myData.doClick = function(event) {
                    console.log($scope.myData);
                    alert("clicked: " + event.clientX + ", " + event.clientY);
                }

});*/

var app= angular.module('tabla1', []);

	app.service('servicehorario', function($scope){

	$.getJSON('api/users', function(data){

	$scope.users=data;
	console.log(data);
	$scope.$apply();
    });
});  