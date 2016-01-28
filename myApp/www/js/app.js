// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic']);
app.constant("ApiEndpoint", {
  url: 'http://localhost:8100/questions'
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider){
     $urlRouterProvider.otherwise('/')
     $stateProvider.state('home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'home.html'
        }
      }
    })

    $stateProvider.state('questions', {
      abstract: true,
      url: '/questions',
      views: {
        questions: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })
     $stateProvider.state('questions.index', {
      url: '',
      templateUrl: 'questions.html',
      controller: 'QCtrl'
    })
    $stateProvider.state('questions.detail', {
      url: '/:question',
      templateUrl: 'question.html',
      controller: 'getQCtrl',
       resolve: {
        question: function($stateParams) {
          return $stateParams.question;
        }
      }
    })
 
     
});
app.controller("QCtrl",["$scope","$http","ApiEndpoint","$log",QCtrl]);
function QCtrl($scope,$http,ApiEndpoint,$log){
      
    $scope.posts=[];
     $http.get(ApiEndpoint.url)
        .success(function(result){
            $scope.posts=result;
            $scope.$broadcast("scroll.refreshComplete");
            //$log.info(JSON.stringify(result));
        });
   
  
}
app.controller("getQCtrl",["$scope","$stateParams","$http","ApiEndpoint","question","$log",getQCtrl]);
function getQCtrl($scope,$stateParams,$http,ApiEndpoint,question,$log){
     $id=question; 
     $id=parseInt($id);
     $http.get(ApiEndpoint.url+"/"+$id)
        .success(function(result){
            $scope.p=result;
            $scope.$broadcast("scroll.refreshComplete");
            $log.info(JSON.stringify(result));
        });
    
}
