const msalConfig = {
    auth: {
      clientId: 'cbd4ec69-c747-4592-ae78-7d8d680d0428',
      redirectUri: 'http://localhost:8080'
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