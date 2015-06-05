'use strict';

angular.module('moniNodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('askText', {
        url: '/askText',
        templateUrl: 'app/askText/askText.html',
        controller: 'AskTextCtrl'
      });
  });