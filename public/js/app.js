var app = angular.module('gasApp', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
	
	$scope.gotPrice = false;
	$scope.lastPrice = 0;
	$scope.lastPriceTime = null;
	$scope.currentPrice = 0;
	$scope.updating = false;
	
	$scope.refreshPrice = function() {
		$scope.updating = true;
		$http.get('/api/price')
		.then(function(response) {
			$scope.gotPrice = true;
			$scope.lastPrice = response.data.last_price / 100;
			$scope.lastPriceTime = new Date(response.data.date).toLocaleString();
			$scope.currentPrice = $scope.lastPrice;
			$scope.updating = false;
		});
	}
	
	$scope.updatePrice = function() {
		
		var parsedPrice = parseFloat($scope.currentPrice) * 100;
		
		$scope.updating = true;
		
		$http({
			url: '/api/price',
			method: 'POST',
			data: {
				price: parsedPrice
			}
		})
		.then(function(response) {
			console.log('success');
			$scope.lastPrice = parsedPrice / 100;
			$scope.lastPriceTime = new Date().toLocaleString();
			$scope.updating = false;
		});
	}
	
	
	$scope.refreshPrice();
	
}]);