'use strict';

angular.module('moniNodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('askImage', {
        url: '/askImage',
        templateUrl: 'app/askImage/askImage.html',
        controller: 'AskImageCtrl'
      });
  });