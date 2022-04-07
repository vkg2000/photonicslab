//npx http-server -c-1
var parsedJson = JSON.parse(sessionStorage.getItem("gr"));
console.log(parsedJson);
let graphClient = undefined;

function initializeGraphClient(msalClient, account, scopes)
{
  // Create an authentication provider
   const authProvider = new MSGraphAuthCodeMSALBrowserAuthProvider
  .AuthCodeMSALBrowserAuthenticationProvider(msalClient, {
    account: account,
    scopes: scopes,
    interactionType: msal.InteractionType.PopUp
  });


  // Initialize the Graph client
  graphClient = MicrosoftGraph.Client.initWithMiddleware({authProvider});

}


//calling api to get user detail , where api is  --- /me

async function getUser() {
    return await graphClient  //sign in is working here
      .api('/me')
      // Only get the fields used by the app
      .select('id,displayName,mail,userPrincipalName')
      .get();
  }


  async function getEvents() {

    if(graphClient==null) {
      alert(parsedJson);
      graphClient = MicrosoftGraph.Client.initWithMiddleware(parsedJson);
    }
      
    const user = JSON.parse(sessionStorage.getItem('graphUser'));
  
    try {
      if(currentMethod==0){
        var re =[];
        re['value']= [];
        updatePage(Views.excel, re);
      }else{
      var url1 = "/me/drive/root:/BTP/"+methodApiCall[currentMethod]+"/Reading:/children";
      let response = await graphClient.api(url1).select('value').select('name,id,lastModifiedDateTime,webUrl').get();
      updatePage(Views.excel, response);
      }
    } catch (error) {
      console.log(error);
      updatePage(Views.error, {
        message: 'Error getting events for user',
        debug: error
      });
    }
  }

  async function getExcel(mainConatiner,itemId,obj1) {
    const user = JSON.parse(sessionStorage.getItem('graphUser'));
    try {
      var userId = 'd6a3e825e5fd3654';
      var sheetId = 'Sheet1';
      var urlExcel = "/users/" + userId + "/drive/items/"+ itemId +"/workbook/worksheets('" + sheetId + "')/usedRange";
      let response = await graphClient.api(urlExcel).select('cellCount','columnCount','values').get();
      showGraphInModal(mainContainer,response,obj1,itemId);
    } catch (error) {
      console.log(error);
      updatePage(Views.error, {
        message: 'Error getting events for plotting all excel',
        debug: error
      });
    }
  }

  async function getExcelInsight(title,deviceNo,itemId1,itemId2) {
    const user = JSON.parse(sessionStorage.getItem('graphUser'));
    try {
      var userId = 'd6a3e825e5fd3654';
      var sheetId = 'Sheet1';
      var urlExcel1 = "/users/" + userId + "/drive/items/"+ itemId1 +"/workbook/worksheets('" + sheetId + "')/usedRange";
      var urlExcel2 = "/users/" + userId + "/drive/items/"+ itemId2 +"/workbook/worksheets('" + sheetId + "')/usedRange";
      let response1 = await graphClient.api(urlExcel1).select('values').get();
      let response2 = await graphClient.api(urlExcel2).select('values').get();


      var urlAllCalibExcel = '/me/drive/root:/BTP/'+methodApiCall[currentMethod]+'/Calibration:/children';
      let allCalibExcelIds = await graphClient.api(urlAllCalibExcel).select('id').get();
      //console.log(allCalibExcelIds);
      var calibId = ((allCalibExcelIds.value)[deviceNo-1]).id;
      var getCalibExcel = "/users/" + userId + "/drive/items/"+ calibId +"/workbook/worksheets('" + sheetId + "')/usedRange";
      let response3 = await graphClient.api(getCalibExcel).select('values').get();
      //console.log(response3);
      callMinApi(response1,response2,response3,title,deviceNo);
    } catch (error) {
      //console.log(error);
      updatePage(Views.error, {
        message: 'Error getting events for plotting all excel',
        debug: error
      });
    }
  }

  async  function callMinApi(response1,response2,response3,title,deviceNo){
    var arr = response1.values.slice(39,response1.values.length);
    var myBodyJson = [];
    for(let i=0;i<arr.length;i++){
      var temp = [];
      temp.push(arr[i][0]);
      temp.push(arr[i][1]);
      myBodyJson.push(temp);
    }

    var myBody = {};
    myBody['arr']=myBodyJson;
    myBody['degree']=50;
    myBody['polyorder']=2;
    myBody['window']=100;
    try{

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify(myBody);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      let response = await fetch("https://btpvishal-s1.herokuapp.com/", requestOptions)
        .then(response => response.text())
        .then(result => { return result })
        .catch(error => console.log('error', error));
        console.log("printing response 1a");
        console.log(JSON.parse(response));
        callMinApi2(response1,response2,response3,title,JSON.parse(response),deviceNo)
      console.log(typeof(response));
      
    }catch(error){
      console.log(error);
  }
}


async  function callMinApi2(response1,response2,response3,title,response1a,deviceNo){
  var arr = response2.values.slice(39,response2.values.length)

  var myBodyJson = [];
  for(let i=0;i<arr.length;i++){
    var temp = [];
    temp.push(arr[i][0]);
    temp.push(arr[i][1]);
    myBodyJson.push(temp);
  }
  var myBody = {};
  myBody['arr']=myBodyJson;
  try{

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(myBody);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    let response1b = await fetch("https://btpvishal.herokuapp.com/", requestOptions)
      .then(response => response.text())
      .then(result => { return result })
      .catch(error => console.log('error', error));

      console.log("printing response 1b");
      console.log(JSON.parse(response1b));
       showInsight2(response1,response2,response3,title,response1a,JSON.parse(response1b),deviceNo);

  }catch(error){
    console.log(error);
}

}




