//https://developer.okta.com/docs/guides/embedded-siw/main/#create-a-simple-spa
 oktaSignIn = new OktaSignIn({
  logo: '/img/okta.png',
  redirectUri: "http://localhost:8000/ToDoServer-main",
  clientId: '${yourClientID}',
  authParams: {
    issuer: "https://${yourOktaDomain}/oauth2/default"
  },
  language: 'en',// Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'Enter details to login',   // Changes the sign in text
      'primaryauth.submit': 'Log In'  // Changes the sign in button
    }
  },
  features: {
    registration: true,                 // Enable self-service registration flow
    rememberMe: true,                   // Setting to false will remove the checkbox to save username
    showPasswordToggleOnSignInPage: true // Allow end users to check their password before they click Sign In
  }
});

oktaSignIn.authClient.token.getUserInfo().then(function (user){
  document.getElementById("messageBox").innerHTML = `Hello ${user.email}, you are *still* logged in! :)`;
  document.getElementById("logout").style.display = 'block';
}, function (error){
  oktaSignIn.showSignInToGetTokens({
    el: '#okta-login-container'
  }).then(function (tokens){
    oktaSignIn.authClient.tokenManager.setTokens(tokens);
    oktaSignIn.remove();

    const idToken = tokens.idToken;
    document.getElementById("messageBox").innerHTML = `Hello ${idToken.claims.email}, you just logged in! :)`;
    document.getElementById("logout").style.display = 'block';
  }).catch(function (err){
    console.error(err);
  });
});

oktaSignIn.authClient.authStateManager.subscribe(authState =>{
  if (authState.isAuthenticated)
    $(myToDoList).load(`/app/client.html`);
  else
    $(myToDoList).empty();
});

function logout(){
  //signs users out of app. #Sample doesn't include this, results in inconsistent behaviour.
  oktaSignIn.authClient.tokenManager.clear();
  //signs users out of okta
  oktaSignIn.authClient.signOut();
  window.location.href = location.origin;
}

oktaSignIn.authClient.authStateManager.updateAuthState();
