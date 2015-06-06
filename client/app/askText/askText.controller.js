'use strict';

angular.module('moniNodeApp')
  .controller('AskTextCtrl', function ($scope, $http, $location, Auth) {
    var user = Auth.getCurrentUser();
    $scope.create = function(poll) {
        var jsonPoll = {
          question: poll.question,
          option1: poll.option1,
          option2: poll.option2,
          user: user._id,
          username: user.name,
          option1Count: 0,
          option2Count: 0,
          limitType: 'vote',
          limitVotes: poll.limitVotes,
          voteType: 'text',
          usersVoted: []
        };
        $http.post('/api/polls', jsonPoll).success(function(){
          $location.path('/');
        });
      };
  });
