app.service( 'AuthService', [
  '$rootScope', '$http', '$q',
  function ( $rootScope, $http, $q ) {
    return {
      waitForSignIn: waitForSignIn,
      requireSignIn: requireSignIn
    }

    // Retorna o status da auntenticacao
    function waitForSignIn() {
      var hasUser = $rootScope.user || localStorage.getItem( 'user' ) ? true : false;
      if ( hasUser )
        $rootScope.user = JSON.parse( localStorage.getItem( 'user' ) );
      $rootScope.userIsLoggedIn = hasUser;
      return hasUser;
    }

    // Retorna o status da autenticacao e caso nao haja gera um erro de acesso
    function requireSignIn() {
      var hasUser = waitForSignIn();

      if ( !hasUser ) {
        var error = 'AUTH_REQUIRED';
        return $q.reject( error );
      }

      $rootScope.userIsLoggedIn = hasUser;

      return hasUser;
    }
  }
] );