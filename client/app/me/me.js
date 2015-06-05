'use strict';

angular.module('moniNodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('me', {
        url: '/me',
        templateUrl: 'app/me/me.html',
        controller: 'MeCtrl'
      });
  });
