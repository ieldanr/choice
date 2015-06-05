'use strict';

angular.module('moniNodeApp')
  .controller('AskTextCtrl', function ($scope, $http, $location) {
    $scope.message = 'Hello';
    $scope.create = function(poll) {
        var json_poll = {
          question: poll.question,
          option1: poll.option1,
          option2: poll.option2,
          user: "anon",
          option1Count: 0,
          option2Count: 0,
          limitType: "vote",
          limitVotes: 100,
          voteType: "text"
        };
        $http.post('/api/polls', json_poll).success(function(data){
          $location.path("/");
        })
      };
  });
