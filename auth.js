
// Create the main MSAL instance
// configuration parameters are located in config.js
const msalClient = new msal.PublicClientApplication(msalConfig);  //sign in details is here along with app details in azure

async function signIn() {
    // Login
    try {
      // Use MSAL to login
      const authResult = await msalClient.loginPopup(msalRequest);  //mslRequest in config where scopes are provided
      // here we are siging in with msalClient (line 4) deatils which is client id or app details and then using scopes wh which are picked from config.js

      console.log('id_token acquired at: ' + new Date().toString());
  
      // Initialize the Graph client
      initializeGraphClient(msalClient, authResult.account, msalRequest.scopes);  //implementation in graph.js 
     
      // Get the user's profile from Graph
      user = await getUser();
      // Save the profile in session
      sessionStorage.setItem('graphUser', JSON.stringify(user));  // graphuser is variable where user details are kept
      updatePage(Views.home);
    } catch (error) {
      console.log(error);
      updatePage(Views.error, {
        message: 'Error logging in',
        debug: error
      });
    }
  }
  
  function signOut() {
    sessionStorage.removeItem('graphUser');
    msalClient.logout();
  }