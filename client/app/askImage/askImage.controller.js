'use strict';

angular.module('moniNodeApp')
  .controller('AskImageCtrl', function ($scope, $http, Upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
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
                    AWSAccessKeyId: "AKIAJDKDAV3D3GPL3N7A",
                    acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
                    policy: data.policy, // base64-encoded json policy (see article below)
                    signature: data.signature, // base64-encoded signature based on policy string (see article below)
                    "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                  },
                  file: file,
                  transformRequest: function (data, headersGetter){
                                          //Headers change here
                                          var headers = headersGetter();
                                          delete headers['Authorization'];
                                          return data;
                 }
      }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                  $scope.image1name = config.file.name;
                });
        }
      });

    };
  });
