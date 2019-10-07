app.config( function ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( 'app/home' );
  $stateProvider
    .state( 'app', {
      url: '/app',
      abstract: true,
      template: '<ui-view class="layout"/>',
      controller: 'ApplicationController as appCtrl'
    } )

    .state( 'app.login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginController as loginCtrl'
    } )

    .state( 'app.home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeController as homeCtrl',
      resolve: {
        'currentAuth': [ 'AuthService', function ( AuthService ) {
          return AuthService.requireSignIn();
        } ]
      }
    } );
} );