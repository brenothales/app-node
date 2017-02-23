angular.module('todoService', [])

.factory('Todos', function($http, $q) {
    return {
        get : function() {
            return $http.get('/api/todos');
        },
        create : function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id);
        },

        fetch : function(){
            $http.get("https://www.omdbapi.com/?t=" + $q.search + "&tomatoes=true&plot=full")
                .then(function(response) {
                    $q.details = response.data;
                 });

            $http.get("https://www.omdbapi.com/?s=" + $q.search)
                .then(function(response) {
                    $q.related = response.data;
                });
        },

        getData : function(languages) {
            var  promises;
            promises = $q.all([
                $http.get('https://api.github.com/search/repositories?q=tetris+language:Ruby&sort=stars&order=desc'),
                $http.get('https://api.github.com/search/repositories?q=tetris+language:ruby&sort=stars&order=desc')
            ]);
            return promises.then(function (allDatas) {
                var result = [];
                angular.forEach(allDatas, function(allData) {
                result = result.concat(allData.result);
              });
                return result;
            });
        }

    }
});
