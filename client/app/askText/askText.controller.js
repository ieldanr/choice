'use strict';

angular.module('moniNodeApp')
  .controller('AskTextCtrl', function ($scope, $http, $location, Auth) {
    $scope.create = function(poll) {
        var json_poll = {
          question: poll.question,
          option1: poll.option1,
          option2: poll.option2,
          user: Auth.getCurrentUser()._id,
          option1Count: 0,
          option2Count: 0,
          limitType: "vote",
          limitVotes: 100,
          voteType: "text",
          usersVoted: []
        };
        $http.post('/api/polls', json_poll).success(function(data){
          $location.path("/");
        })
      };
  });
