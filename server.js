const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
 
app.use("/static", express.static('./static/'));

app.get('/', (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname+'/index.html'));
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });


// //add the router
// app.use('/', router);
// app.listen(process.env.port || 8080);

// console.log('Running at Port 3000');