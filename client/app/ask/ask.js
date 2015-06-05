'use strict';

angular.module('moniNodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ask', {
        url: '/ask',
        templateUrl: 'app/ask/ask.html',
        controller: 'AskCtrl'
      });
  });