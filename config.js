const msalConfig = {
    auth: {
      clientId: 'Zdu7Q~A6BsqcLHIJ5zD7vRbYgLj5eTo_j5.~.',
      redirectUri: 'https://photonicslab.herokuapp.com/',
       navigateToLoginRequestUrl: false
    }
  };
  
  const msalRequest = {
    scopes: [
        'user.read',
      'Files.Read',
       'Files.Read.All',
        'Files.ReadWrite',
         'Files.ReadWrite.All'
    ]
  }
