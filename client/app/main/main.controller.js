'use strict';

angular.module('moniNodeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.polls = [];
    $http.get('/api/polls').success(function(polls) {
      $scope.polls = polls;
    });

    $scope.voteOption1=function(index){
      var id = $scope.polls[index]._id;
      $http.post('/api/polls/' + id + '/voteOption1').success(function(poll) {
        $scope.polls[index] = poll;
      });
    };

    $scope.voteOption2=function(index){
      var id = $scope.polls[index]._id;
      $http.post('/api/polls/' + id + '/voteOption2').success(function(poll) {
        $scope.polls[index] = poll;
      });
    };
  });
