'use strict';

describe('Controller: AskTextCtrl', function () {

  // load the controller's module
  beforeEach(module('moniNodeApp'));

  var AskTextCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AskTextCtrl = $controller('AskTextCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
