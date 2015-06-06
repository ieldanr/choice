'use strict';

angular.module('moniNodeApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
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
      $scope.votedOnPoll = Array($scope.polls.length);
    });

    $scope.voteOption1=function(index){
      var id = $scope.polls[index]._id;
      $http.post('/api/polls/' + id + '/voteOption1', { user: Auth.getCurrentUser()._id }).success(function(poll) {
        $scope.polls[index] = poll;
      }).error(function(res){
        if(res === 'user already voted'){
          console.log('Already voted!');
        }
      });
    };

    $scope.voteOption2=function(index){
      var id = $scope.polls[index]._id;
      $http.post('/api/polls/' + id + '/voteOption2', { user: Auth.getCurrentUser()._id }).success(function(poll) {
        $scope.polls[index] = poll;
      }).error(function(res){
        if(res === 'user already voted'){
          console.log('Already voted!');
        }
      });
    };
    $scope.voted = function(index){
      if($scope.votedOnPoll[index]){
        return true;
      }else{
        var poll = $scope.polls[index];
        if(!poll){ return false;}
        var user = Auth.getCurrentUser();
        if(poll.usersVoted.indexOf(user._id) >= 0){
          $scope.votedOnPoll[index] = true;
          return true;
        }else{
          return false;
        }
      }
    };
  });
