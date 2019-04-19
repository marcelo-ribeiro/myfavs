// app.run(["$rootScope", "$state", 'LoginService', 
//   function($rootScope, $state, LoginService) {

//   $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
//     if (error === "AUTH_REQUIRED") {
//       // console.log('Você precisa estar logado para anunciar');
//       LoginService.signInWithFacebook()
//       .then( function(response){
//         // console.log(response);
//         // if (response)
//         //   $state.go('app.upload');
//         // $state.go('app.home');
//       });
//     }
//   });
  
// }]);


app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('app/login');
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    template: '<ui-view/>',
    controller: 'ApplicationController as appCtrl'
  })
  .state('app.login', {
    url: '/login',
    templateUrl: 'login.html',
    controller: 'LoginController as loginCtrl'
  })
  .state('app.home', {
    url: '/home',
    templateUrl: 'home.html',
    controller: 'HomeController as homeCtrl'
  });
});
