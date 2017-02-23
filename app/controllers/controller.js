'use strict';
angular.module('todoController', [])
.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});


		$scope.createTodo = function() {

			// validate
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				// (returns a promise object)
				Todos.create($scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
		};
}])


.controller('MovieController', function($scope, $http) {
    $scope.$watch('formData', function() {
      fetch();
    });

    $scope.formData = "Game of Thrones";

    function fetch() {
      $http.get("https://www.omdbapi.com/?t=" + $scope.formData + "&tomatoes=true&plot=full")
        .then(function(response) {
          $scope.details = response.data;
        });

      $http.get("https://www.omdbapi.com/?s=" + $scope.formData)
        .then(function(response) {
          $scope.related = response.data;
        });
    }

    $scope.update = function(movie) {
      $scope.formData = movie.Title;
    };

    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }
  });
