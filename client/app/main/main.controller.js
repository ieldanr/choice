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
      $scope.votedOnPoll = new Array($scope.polls.length);
    });

    $scope.voteOption1=function(poll){
       var id = poll._id;
       $http.post('/api/polls/' + id + '/voteOption1', { user: Auth.getCurrentUser()._id }).success(function(result) {
       console.log(merge(poll, result));
       //poll = result;
       }).error(function(res){
       if(res === 'user already voted'){
       console.log('Already voted!');
       }
       });
     };

     $scope.voteOption2=function(poll){
        var id = poll._id;
        $http.post('/api/polls/' + id + '/voteOption2', { user: Auth.getCurrentUser()._id }).success(function(result) {
        console.log(merge(poll, result));
        //poll = result;
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

  function merge(dst){
  var slice = [].slice;
  var isArray = Array.isArray;
  function baseExtend(dst, objs, deep) {
    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!angular.isObject(obj) && !angular.isFunction(obj)) continue;
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];
        if (deep && angular.isObject(src)) {
          if (!angular.isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        } else {
          dst[key] = src;
        }
      }
    }

    return dst;
  }
  return baseExtend(dst, slice.call(arguments, 1), true);
}
  });
