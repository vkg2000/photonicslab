$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

var allSheet = undefined;

// Select DOM elements to work with
const authenticatedNav = document.getElementById('authenticated-nav');
const accountNav = document.getElementById('account-nav');
const mainContainer = document.getElementById('main-container');
const homeBar = document.getElementById('loadHome');

const Views = { error: 1, home: 2, excel: 3, insight: 4};
const color = ['primary','secondary','success','danger','warning','info','light','dark'];
const method = ['Not Selected' ,'Bending','Heart Rate','Stretching','Temperature'];
const methodApiCall = ['Not Selected' ,'Bending','HeartRate','Stretching','Temperature']
var pt1 =0;
var pt2=0;
var currentMethod = 0;





//creating image for graph

function visualizeGraph(id,response){
  //Modal
  var alertModal = createElement('div',"modal fade");
  alertModal.setAttribute("id","id"+id );
  alertModal.setAttribute("tabindex",-1 );
  alertModal.setAttribute("role","dialog" );
  alertModal.setAttribute("aria-labelledby","exampleModalLongTitle" );
  alertModal.setAttribute("aria-hidden","true" );

  var alertModal_a =createElement('div','modal-dialog modal-lg');
  alertModal_a.setAttribute('role','document');
  var alertModal_b = createElement('div','modal-content');

  //modal-header
  var alertModal_c = createElement('div','modal-header graphModalHeader'+id);
  var title = '#Row Count: '+response.cellCount/response.columnCount +'  #Column Count: '+response.columnCount;
  var alertModal_c_a = createElement('p','modal-title ',title);
  alertModal_c_a.setAttribute('id','exampleModalLongTitle');
  alertModal_c.appendChild(alertModal_c_a);
  //modal-header end


  //modal body start
  var alertModal_d = createElement('div','modal-body graphFinal');
  var modalGraph = createElement('div');
  modalGraph.setAttribute('id','myChart'+id);
  modalGraph.setAttribute('style',"width:100%;max-width:900px");
  alertModal_d.appendChild(modalGraph);
  var startIndex = 36;
  drawChartMain('myChart'+id,response,startIndex);
  //modal body end


  //modal footer
  var alertModal_e =  createElement('div','modal-footer');
  var alertModal_e_a = createElement('button','btn btn-secondary','Close');
  alertModal_e_a.setAttribute('data-dismiss','modal');
  alertModal_e.appendChild(alertModal_e_a);
  //modal footer end

  //ading all to modal-content
  alertModal_b.appendChild(alertModal_c);
  alertModal_b.appendChild(alertModal_d);
  alertModal_b.appendChild(alertModal_e);

  //adding further b to a and then a to main
  alertModal_a.appendChild(alertModal_b);
  alertModal.appendChild(alertModal_a);

  return alertModal;
}


function drawChartMain(idGraph,response,startIndex){
  var xUnit = response.values[startIndex+1][0],yUnit = response.values[startIndex+1][1];
  var xAxis = response.values[startIndex+2][0],yAxis = response.values[startIndex+2][1];
  var value = [];
  var xs = response.values;
  for (var i = startIndex+2; i < xs.length; i++) value.push(xs[i]);
  google.charts.load('current', {
    callback: function () {
      drawChart();
      $(window).resize(drawChart);
    },
    packages:['corechart']
  });


  function drawChart() {
    // Set Data
    var data = google.visualization.arrayToDataTable(value);
    // Set Options
    var options = {
      title:  xAxis+' vs.'+yAxis,
      hAxis: {title: xAxis+' ('+xUnit+' )'},
      vAxis: {title: yAxis+' ('+yUnit+' )'},
      legend: 'none',
      height: 400,
      width:700
    };

    // Draw
    var chart = new google.visualization.LineChart(document.getElementById(idGraph));
    chart.draw(data, options);
    }
}



function drawChartMainTogether(idGraph,response1,response2,startIndex){
  var xUnit = response1.values[startIndex+1][0],yUnit = response1.values[startIndex+1][1];
  var xAxis = response1.values[startIndex+2][0],yAxis = response1.values[startIndex+2][1];
  var value = [];
  var xs = response1.values;
  var xs2 = response2.values;
  var headX = [];
  headX.push(xs[startIndex+2][0]);
  headX.push('Reference');
  headX.push('Current');
  value.push(headX);
  for (var i = startIndex+3; i < xs.length; i++) {
    var temp =[];
    temp.push(xs[i][0]);
    temp.push(xs[i][1]);
    temp.push(xs2[i][1]);
    value.push(temp);
  }

  google.charts.load('current', {
    callback: function () {
      drawChart();
      $(window).resize(drawChart);
    },
    packages:['corechart']
  });


  //console.log(value);
  function drawChart() {
    // Set Data
    var data = google.visualization.arrayToDataTable(value);
    // Set Options
    var options = {
      title:  xAxis+' vs.'+yAxis,
      hAxis: {title: xAxis+' ('+xUnit+' )'},
      vAxis: {title: yAxis+' ('+yUnit+' )'},
      curveType: 'function',
      legend: { position: 'bottom' },
      height:500,
      width:1000
    };

    
    // Draw
    var chart = new google.visualization.LineChart(document.getElementById(idGraph));
    function selectHandler() {
      var selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        var topping = data.getValue(selectedItem.row, 0);
        document.getElementById('curr').innerHTML=topping;
        //alert('The user selected ' + topping); //HERE NEED TO BE MODIFIED

      }
    }
    google.visualization.events.addListener(chart, 'select', selectHandler); 
    chart.draw(data, options);
    }
}


function drawCalibration(idGraph,response,startIndex){
  var xUnit = response.values[startIndex+1][0],yUnit = response.values[startIndex+1][1];
  var xAxis = response.values[startIndex+2][0],yAxis = response.values[startIndex+2][1];
  var value = [];
  var xs = response.values;
  for (var i = startIndex+2; i < xs.length; i++) value.push(xs[i]);
  google.charts.load('current', {
    callback: function () {
      drawChart();
      $(window).resize(drawChart);
    },
    packages:['corechart']
  });

  console.log(value);

  function drawChart() {
    // Set Data
    var data = google.visualization.arrayToDataTable(value);
    // Set Options
    var options = {
      title:  xAxis+' vs.'+yAxis,
      hAxis: {title: xAxis+' ('+xUnit+' )'},
      vAxis: {title: yAxis+' ('+yUnit+' )'},
      legend: 'none',
      //height: 400,
    };

    // Draw
    var chart = new google.visualization.LineChart(document.getElementById(idGraph));
    chart.draw(data, options);
    }
}



//helps in creating big card
function createBigCard(color,title,obj1,obj2,deviceNo){
  var textColor = 'white';
  if(color=='info' || color == 'light' || color == 'warning') textColor = 'dark';
  var mainLayout = createElement('div','container');
  var row1 = createElement('div','row');
  var col1 = createElement('div','col-sm');
  var col2 = createElement('div','col-sm');
  var alert1 =  createElement('div','card  text-center text-' + textColor + ' bg-'+ color +' mb-3');
  var insightBtn = createElement('button','btn btn-'+color+' btn-sm','Get Insight');
  //"'javascript:showInsight("+title+","+color+","+obj1+","+obj2+");'"
  insightBtn.setAttribute('onclick', "showInsight1('"+title+"','"+color+"','"+obj1.id+"','"+obj2.id+"',"+deviceNo+")");
 // insightBtn.setAttribute('onclick','showInsight("'+title+'")');
  var alert1_a = createElement('div','card-header',title);
  alert1.appendChild(alert1_a);
  var alert1_b = createElement('div','card-body');
  var cardSecondary = createSmallCard(obj1.name, obj1.id, obj1.lastModifiedDateTime, obj1.webUrl, 'graph',"Reference Reading");
  var cardSecondary1 = createSmallCard(obj2.name,obj2.id,obj2.lastModifiedDateTime,obj2.webUrl,'graph',"Current Reading");
  col1.appendChild(cardSecondary);
  col2.appendChild(cardSecondary1);
  row1.appendChild(col1);
  row1.appendChild(col2);
  mainLayout.appendChild(row1);
  alert1_b.appendChild(mainLayout);
  alert1.appendChild(alert1_b);
  alert1.appendChild(insightBtn);
  

  return alert1;
}


function createSmallCard (name, id, time, viewLink, graphLink,heading){
  var alert1 =  createElement('div','card');
  var alert1_b = createElement('ul','list-group list-group-flush');
  var alert1_b_temp_1 = createElement('li','list-group-item')
  alert1_b_temp_1.innerHTML+='<b>'+heading+'</b>';
  var alert1_b_temp = createElement('li','list-group-item')
  alert1_b_temp.innerHTML+='<b>'+'File Name: '+'</b>'+name;
  var alert1_b_a = createElement('li','list-group-item');
  alert1_b_a.innerHTML+='<b>Excel Sheet Id: </b>'+id;
  var alert1_b_b = createElement('li','list-group-item');
  let timeZoneComputer = moment.utc(time).format('h:mm A DD/MM/YYYY ');
  alert1_b_b.innerHTML+='<b>Last Updated: </b>'+timeZoneComputer;
  var alert1_b_c = createElement('li','list-group-item');
  var alert1_b_c_a = createElement('a','excelLink','View Excel Sheet',viewLink);
  alert1_b_c_a.setAttribute('target','_blank');
  alert1_b_c.appendChild(alert1_b_c_a);
  var alert1_b_d = createElement('li','list-group-item');
  var alertButton = createElement('button','btn viewGraphBtn viewGraphButton'+ id,'View Graph');
  alertButton.setAttribute('data-toggle','modal');
  alertButton.setAttribute('data-target','#id'+id);
  alert1_b_d.appendChild(alertButton);
  alert1_b.appendChild(alert1_b_temp_1);
  alert1_b.appendChild(alert1_b_temp);
  alert1_b.appendChild(alert1_b_a);
  alert1_b.appendChild(alert1_b_b);
  alert1_b.appendChild(alert1_b_c);
  alert1_b.appendChild(alert1_b_d);
  alert1.appendChild(alert1_b);
  return alert1;
}


//helping in creating html elements
//no need to update
function createElement(type, className, text, link) {
  var element = document.createElement(type);
  element.className = className;

  if (text) {
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  if(link){
    element.setAttribute('href',link);
  }

  return element;
}


//need to be updated
function showAuthenticatedNav(user, view) {
  authenticatedNav.innerHTML = '';

  if (user) {
    var excelLink = createElement('button',
      `btn btn-link nav-link${view == Views.excel ? ' active' : '' }`,
      'ExcelSheet');
    excelLink.setAttribute('onclick', 'getEvents();');
    authenticatedNav.appendChild(excelLink);
  }

}

function showHomeBar(view){
  homeBar.innerHTML='';
  var homeLink = createElement('button',
  `btn btn-link nav-link navbar-brand${view === Views.home ? ' active' : '' }`,
  'Photonics Lab');
  homeLink.setAttribute('onclick', 'updatePage(Views.home);');
  homeBar.appendChild(homeLink);
}


function showInsight1(title,color,id1,id2,deviceNo) {
   mainContainer.innerHTML = "";


var spinner = createElement('div','d-flex justify-content-center mt-5');

var spinner1 = createElement('div','spinner-border');
spinner1.setAttribute('role','status');
var spinner2 = createElement('span','visually-hidden','Loading....');
spinner1.appendChild(spinner2);
spinner.appendChild(spinner1);
mainContainer.appendChild(spinner);
  getExcelInsight(title,deviceNo,id1,id2);
}

function createDropdown(arr,RefOrCurr){
let titleForm = "Not Decided";
if(RefOrCurr =="Ref") titleForm = "Reference";
else titleForm ="Current";

  var drop = createElement('div','input-group mb-3 mt-2');
  var drop_input = createElement('input','form-control');
  drop_input.setAttribute('aria-label','Text input with dropdown button');
  drop_input.setAttribute('id',RefOrCurr);
  drop.appendChild(drop_input);

  var buttonX = createElement('button','btn btn-outline-secondary dropdown-toggle',titleForm);
  buttonX.setAttribute('type','button');
  buttonX.setAttribute('data-bs-toggle','dropdown');
  buttonX.setAttribute('aria-expanded','false');
  drop.appendChild(buttonX);

  var drop_ul = createElement('ul','dropdown-menu dropdown-menu-end');
  for(let i=0;i<arr[0].length;i++){
    let menu1 = createElement('li');
    let menu_item = createElement('a','dropdown-item',arr[0][i]);
    menu1.appendChild(menu_item);
    drop_ul.appendChild(menu1);
  }

  drop.appendChild(drop_ul);
  return drop;


}

function createDropDownForm(arr,RefOrCurr){
  var drop = createElement('div',"input-group mb-3");
  let titleForm = "NaN";
  if(RefOrCurr =="Ref") titleForm = "Reference";
  else titleForm ="Current";
  var drop_1 = createElement('label',"input-group-text",titleForm);
  drop_1.setAttribute( 'for',RefOrCurr);
  drop.appendChild(drop_1);
  var selectX = createElement('select','form-select');
  selectX.setAttribute('id',RefOrCurr);
  var op1 = createElement('option','op','Choose....');
  selectX.appendChild(op1);

  for(let i=0;i<arr[0].length;i++){
    let menu1 = createElement('option','op',arr[0][i]);
    menu1.setAttribute("value",arr[0][i]);
    selectX.appendChild(menu1);
  }
  drop.appendChild(selectX);
  return drop;
}

function createDataList(arr,RefOrCurr){
var drop = createElement('div');
  var selectX_input = createElement('input');
  selectX_input.setAttribute('list',RefOrCurr);
  selectX_input.setAttribute('name','Enter Value');
  drop.appendChild(selectX_input);
  var dataList1 = createElement('datalist');
  dataList1.setAttribute('id',RefOrCurr);
  for(let i=0;i<arr[0].length;i++){
    let menu1 = createElement('option','op',arr[0][i]);
    dataList1.appendChild(menu1);
  }
  drop.appendChild(dataList1);
  return drop;

}

function showInsight2(response1,response2,response3,title,response1a,response1b,deviceNo){
  console.log(response1);
  console.log(response2);
  console.log(response3);
  console.log(title);
  console.log(response1a);
  console.log(response1b);
  mainContainer.innerHTML = "";
  var alert = createElement('div','container');
  var alertRowUp = createElement('div','row mainRow');
  var alertColUp1 = createElement('div','col mainCurveCol');
  var alertColUp2 = createElement('div','col calibrationPlusMin mt-5');


  //alertColUp1 -------------------------
  var chart1 = createElement('div','mt-3');chart1.setAttribute('id','chart1');alertColUp1.appendChild(chart1);
  alertRowUp.appendChild(alertColUp1);


  //-----------------------------------------------------------


  //alertColUp2 ------------------------------------------------

  //Making dropdown1
  //Making dropdown2

  //alertRowUpLeft1 - CALIBRATION CURVE
  var alertRowUpLeft1 = createElement('div','row calibrationCurveRow mt-5');
  var chart2 =createElement('div');chart2.setAttribute('id','chart2');
  alertRowUpLeft1.appendChild(chart2);
  alertColUp2.appendChild(alertRowUpLeft1);
  
  //ROW to hold both dropdown #######
  var alertRowUpLeft2 = createElement('div','row minRow');

  //alertRowUpLeft2_1 - DROPDOWN2


  var alertRowUpLeft2_1 = createDropDownForm(response1a,"Ref");
  alertRowUpLeft2.appendChild(alertRowUpLeft2_1);

  //alertRowUpLeft2_2 - DROPDOWN1
  var alertRowUpLeft2_2 = createDropDownForm(response1b,"Curr");
  alertRowUpLeft2.appendChild(alertRowUpLeft2_2);

  //adding both dropdown
  alertColUp2.appendChild(alertRowUpLeft2);

  //##########

  //alertRowUpLeft3 - calculate Button
  var alertRowUpLeft3 = createElement('button','btn btn-primary btn-sm m-1 mt-2','Calculate');
  let m =response3.values[0][0];
  let c = response3.values[0][1];
console.log(m);
console.log(c);
  alertRowUpLeft3.setAttribute('onclick',"calculate("+m+","+c+")");
  alertColUp2.appendChild(alertRowUpLeft3);

  //alertRowUpLeft4 - VALUES SHOWS HERE
  var alertRowUpLeft4 = createElement('ul','list-group m-1 mt-2');
  var alertRowUpLeft4_1 = createElement('li','list-group-item m-1','########');
  alertRowUpLeft4_1.setAttribute('id','val');
  alertRowUpLeft4.appendChild(alertRowUpLeft4_1);
  alertColUp2.appendChild(alertRowUpLeft4);

  //Appending col2
  alertRowUp.appendChild(alertColUp2);

  //-------------------------------------------------------------

  //google chart section added - end

  alert.appendChild(alertRowUp);
  mainContainer.append(alert);
  console.log(title);
  drawChartMainTogether('chart1',response1,response2,36);
  drawCalibration('chart2',response3,1);
}


function makept1(){
  document.getElementById('ppp1').innerHTML = document.getElementById('curr').innerHTML; 
  pt1= document.getElementById('ppp1').innerHTML;
}

function makept2(){
  document.getElementById('ppp2').innerHTML = document.getElementById('curr').innerHTML; 
  pt2= document.getElementById('ppp2').innerHTML;
}



function calculate(m,c){

  //alert(document.getElementById("Ref").value);
  //alert(document.getElementById("Curr").value);
  var pt1 = document.getElementById("Ref").value;
  var pt2 = document.getElementById("Curr").value;
  console.log(pt1-pt2);
  console.log("m value is: "+m);
  console.log("c value is: "+c);
  console.log("diff value is: "+diff);
  var diff = pt2-pt1;
  document.getElementById("val").innerHTML = m*diff+c;
  
}

function viewCalibration(deviceNo){
  window.open("http://localhost:8080/calib?deviceNoValue="+ deviceNo ,'_blank');
}

// after sign in nav bar shows user details
// no need to update

function showAccountNav(user) {
  accountNav.innerHTML = '';

  if (user) {
    // Show the "signed-in" nav
    accountNav.className = 'nav-item dropdown';

    var dropdown = createElement('a', 'nav-link dropdown-toggle');
    dropdown.setAttribute('data-bs-toggle', 'dropdown');
    dropdown.setAttribute('role', 'button');
    accountNav.appendChild(dropdown);

    let userIcon = createElement('img', 'rounded-circle align-self-center me-2');
    userIcon.style.width = '32px';
    userIcon.src = 'g-raph.png';
    userIcon.alt = 'user';
    dropdown.appendChild(userIcon);

    var menu = createElement('div', 'dropdown-menu dropdown-menu-end');
    accountNav.appendChild(menu);

    var userName = createElement('h5', 'dropdown-item-text mb-0', user.displayName);
    menu.appendChild(userName);

    var userEmail = createElement('p', 'dropdown-item-text text-muted mb-0', user.mail || user.userPrincipalName);
    menu.appendChild(userEmail);

    var divider = createElement('hr', 'dropdown-divider');
    menu.appendChild(divider);

    var signOutButton = createElement('button', 'dropdown-item', 'Sign out');
    signOutButton.setAttribute('onclick', 'signOut();');
    menu.appendChild(signOutButton);
  } else {
    // Show a "sign in" button
    accountNav.className = 'nav-item';

    var signInButton = createElement('button', 'btn btn-link nav-link', 'Sign in');
    signInButton.setAttribute('onclick', 'signIn();');
    accountNav.appendChild(signInButton);
  }
}


//message shows and if user argument passes then shows details about user otherwise sign in option comes
//no neee to update
function showWelcomeMessage(user) {
  // Create jumbotron
  let jumbotron = createElement('div', 'p-5 mb-4 bg-light rounded-3');

  let container = createElement('div', 'container-fluid py-5');
  jumbotron.appendChild(container);

  let heading = createElement('h1', null, 'Javascript SPA Graph');
  container.appendChild(heading);

  let lead = createElement('p', 'lead',
    'This sample app using the Microsoft Graph API to access' +
    ' a user\'s data from JavaScript.');
    container.appendChild(lead);

  if (user) {
    // Welcome the user by name
    let welcomeMessage = createElement('h4', null, `Welcome ${user.displayName}!`);
    container.appendChild(welcomeMessage);

    let callToAction = createElement('p', null,
      'Use the navigation bar at the top of the page to get started.');
    container.appendChild(callToAction);

    let dd = createElement('div','btn-group');
    dd.setAttribute('role','group');
    dd.setAttribute('aria-label','MethodX');
    let b1 = createElement('button','btn btn-primary btnBending','Bending');
    b1.setAttribute('onclick', 'setMethod('+1+');');
    let b2 = createElement('button','btn btn-primary btnHeartRate','Heart Rate');
    b2.setAttribute('onclick', 'setMethod('+2+');');
    let b3 = createElement('button','btn btn-primary btnStretching','Stretching');
    b3.setAttribute('onclick', 'setMethod('+3+');');
    let b4 = createElement('button','btn btn-primary btnTemperature','Temperature');
    b4.setAttribute('onclick', 'setMethod('+4+');');
    dd.appendChild(b1);
    dd.appendChild(b2);
    dd.appendChild(b3);
    dd.appendChild(b4);
    container.appendChild(dd);
    var alertRowUpLeft4 = createElement('ul','list-group m-1');
    var alertRowUpLeft4_1 = createElement('li','list-group-item list-group-item-warning m-1',method[currentMethod]);
    alertRowUpLeft4_1.setAttribute('id','selectMethod');
    alertRowUpLeft4.appendChild(alertRowUpLeft4_1);
    container.appendChild(alertRowUpLeft4);



  } else {
    // Show a sign in button in the jumbotron
    let signInButton = createElement('button', 'btn btn-primary btn-large',
      'Click here to sign in');
    signInButton.setAttribute('onclick', 'signIn();')
    container.appendChild(signInButton);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(jumbotron);
}

function setMethod(x){
currentMethod =x;
document.getElementById('selectMethod').innerHTML = method[currentMethod];
}

function showGraphInModal(mainContainer,response,obj,id){
  mainContainer.appendChild(visualizeGraph(id,response));
}


function showError(error) {
  var alert = createElement('div', 'alert alert-danger');

  var message = createElement('p', 'mb-3', error.message);
  alert.appendChild(message);

  if (error.debug)
  {
    var pre = createElement('pre', 'alert-pre border bg-light p-2');
    alert.appendChild(pre);

    var code = createElement('code', 'text-break text-wrap',
      JSON.stringify(error.debug, null, 2));
    pre.appendChild(code);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(alert);
}


// to show excel sheets

function showExcel(json) {
  mainContainer.innerHTML = '';
  var responseArray = json['value'];
  var responseSize = responseArray.length;
  if(responseSize>=2 && currentMethod!=0){
  for (let i=0;i<responseSize && i+1<responseSize;i+=2) {
    var obj1 = responseArray[i];
    var obj2 = responseArray[i+1];
    var randomColor = Math.floor(Math.random() *8);
    var cardTemp = createBigCard(color[randomColor],'Device '+(i/2+1),obj1,obj2,(i/2+1));
    mainContainer.appendChild(cardTemp);
    getExcel(mainContainer,obj1.id,obj1);
    getExcel(mainContainer,obj2.id,obj2);
  }
}else if(currentMethod!=0) {

  var hh2 = createElement('h2','hehe','No record found');
  mainContainer.appendChild(hh2);
  console.log("f1");
}else {
  var hh2 = createElement('h2','hehe','Select Method First');
  mainContainer.appendChild(hh2);
  console.log("f2");
}
}


function updatePage(view, data) {
  if (!view) {
    view = Views.home;
  }
  const user = JSON.parse(sessionStorage.getItem('graphUser')); // graph user is varable where user detals kept, see auth.js line 22
  showAccountNav(user);
  showAuthenticatedNav(user, view);
  showHomeBar(view);
  switch (view) {
    case Views.error:
      showError(data);
      break;
    case Views.home:
      showWelcomeMessage(user);
      break;
    case Views.excel:
      showExcel(data);
      break;
  }
}

updatePage(Views.home);