'use strict';

angular.module('moniNodeApp')
  .controller('AskImageCtrl', function ($scope, $http, Upload, Auth, $location) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.$watch('files2', function () {
        $scope.upload2($scope.files2);
    });

    $scope.upload = function (files) {
      $http.get('/api/polls/signature').success(function(data){
        if (files && files.length) {
                var file = files[0];
                Upload.upload({
                  url: 'https://choicetheapp-assets.s3.amazonaws.com/', //S3 upload url including bucket name
                  method: 'POST',
                  fields : {
                    key: data.keyname, // the key to store the file on S3, could be file name or customized
                    AWSAccessKeyId: 'AKIAJDKDAV3D3GPL3N7A',
                    acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
                    policy: data.policy, // base64-encoded json policy (see article below)
                    signature: data.signature, // base64-encoded signature based on policy string (see article below)
                    'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                  },
                  file: file,
                  transformRequest: function (data, headersGetter){
                                          //Headers change here
                                          var headers = headersGetter();
                                          delete headers.Authorization;
                                          return data;
                 }
      }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (dataAmazon, status, headers, config) {
                  console.log(data.keyname);
                  $scope.image1name = data.keyname;
                });
        }
      });

    };

    $scope.upload2 = function (files) {
      $http.get('/api/polls/signature').success(function(data){
        if (files && files.length) {
                var file = files[0];
                Upload.upload({
                  url: 'https://choicetheapp-assets.s3.amazonaws.com/', //S3 upload url including bucket name
                  method: 'POST',
                  fields : {
                    key: data.keyname, // the key to store the file on S3, could be file name or customized
                    AWSAccessKeyId: 'AKIAJDKDAV3D3GPL3N7A',
                    acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
                    policy: data.policy, // base64-encoded json policy (see article below)
                    signature: data.signature, // base64-encoded signature based on policy string (see article below)
                    'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                  },
                  file: file,
                  transformRequest: function (data, headersGetter){
                                          //Headers change here
                                          var headers = headersGetter();
                                          delete headers.Authorization;
                                          return data;
                 }
      }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (dataAmazon, status, headers, config) {
                  $scope.image2name = data.keyname;
                });
        }
      });

    };

    $scope.create = function(question){
      var user = Auth.getCurrentUser();
      if($scope.image1name && $scope.image2name && question){
        var jsonPoll = {
          question: question,
          option1: $scope.image1name,
          option2: $scope.image2name,
          user: user._id,
          username: user.name,
          option1Count: 0,
          option2Count: 0,
          limitType: 'vote',
          limitVotes: 100,
          voteType: 'image',
          usersVoted: []
        };
        $http.post('/api/polls', jsonPoll).success(function(){
          $location.path('/');
        });
      }
    };
  });
