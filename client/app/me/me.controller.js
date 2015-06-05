'use strict';

angular.module('moniNodeApp')
  .controller('MeCtrl', function ($scope, $http, Auth) {
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
    $scope.currentUser = Auth.getCurrentUser();
    $http.get('/api/polls/mychoices/' + $scope.currentUser._id ).success(function(polls) {
      $scope.polls = polls;
    });
  });
