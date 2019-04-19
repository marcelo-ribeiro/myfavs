// Initialize Firebase
var config = {
  apiKey: "AIzaSyBF9Udh3_AnnvdKFevTdMmv5ydRb3t_EWA",
  authDomain: "myfavs-c347e.firebaseapp.com",
  databaseURL: "https://myfavs-c347e.firebaseio.com",
  storageBucket: "myfavs-c347e.appspot.com",
  messagingSenderId: "1060763384211"
};
firebase.initializeApp(config);


// Initialize Angular
var app = angular.module('app', ['ui.router', 'firebase']);

app.constant('Constant', {
  'logo': 'myfavs'
});


app.controller('ApplicationController', function($rootScope, $scope, $firebaseAuth, $state, Constant){
  $scope.auth = $firebaseAuth();
  var provider = new firebase.auth.GoogleAuthProvider();
  
  $scope.constant = Constant;
  
  $scope.signIn = function(){
    $scope.auth.$signInWithPopup("google").then(function(result) {
      console.log("Signed in as:", result.user.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };
  
  $scope.signOut = function(){
    $scope.auth.$signOut();
  };
  
  $scope.auth.$onAuthStateChanged(function(user) {
    if (user) {
      console.log("Signed in:", user);
      $rootScope.user = user;
      $state.go('app.home');
    } else {
      console.log("Signed out");
      $state.go('app.login');
    }
  });
});


app.controller('LoginController', function($scope) {
  console.log('LoginController');
});


app.controller('HomeController', function($rootScope, $scope, $http, $firebaseArray){
  
  var ref = firebase.database().ref().child($rootScope.user.uid);
  
  $scope.favPrefix = 'http://www.google.com/s2/favicons?domain=';
  // $scope.favPrefix = 'http://s2.googleusercontent.com/s2/favicons?domain_url=';
  
  $scope.sites = $firebaseArray(ref);
  $scope.site = {};
  
  $scope.addSite = addSite;
  $scope.openSite = openSite;
  $scope.removeSite = removeSite;
  
    // $http.get('http://github.com')
    //   .then(
    //     function(success){console.log(success)}, 
    //     function(error){console.log(error)}
    // );
    
  $scope.getDomain = function(url) {
    return url.match(/:\/\/(.[^/]+)/)[1];
  }
  
  function addSite(site){
    // site.domain = site.url.replace(/.*?:\/\//g, '');
    // site.domain = site.url.hostname;
    // console.log($scope.domain);
    site.clicks = 0;
    $scope.sites.$add(site);
    // $scope.sites.push(site);
    // saveSites();
    $scope.site = {};
  }
  
  function openSite(site) {
    site.clicks += 1;
    $scope.sites.$save(site);
    // saveSites();
    window.open(site.url);
  }
  
  function removeSite(site) {
    $scope.sites.$remove(site);
    // $scope.sites.splice($scope.sites.indexOf(site), 1);
    // saveSites();
  }
  
  // function saveSites() {
  //   localStorage.sites = JSON.stringify($scope.sites);
  // }
});


