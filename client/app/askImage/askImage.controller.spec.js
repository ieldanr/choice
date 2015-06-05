'use strict';

describe('Controller: AskImageCtrl', function () {

  // load the controller's module
  beforeEach(module('moniNodeApp'));

  var AskImageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AskImageCtrl = $controller('AskImageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
