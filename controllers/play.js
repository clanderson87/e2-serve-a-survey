app.directive('thermoColor', function(){

  return {
    restrict: 'A',
    templateUrl: 'partials/play.html'
    link: function(scope, element, attrs){
      attrs.$set("class", "red");
    }
  }
})

app.service('weatherService', function($http){
  var url = 'http://api.wunderground.com/api/{key}/{state}/{location}.json';

  $http.get(url).then(function(response){

  }, function (err){
    console.log(err.message);
  })
})
