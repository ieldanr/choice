'use strict';

angular.module('moniNodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
