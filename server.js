var express = require('express')
var ipfsAPI = require('ipfs-api')
var multer=require("multer")
var app = express()
ipfsApi = ipfsAPI('localhost', '5001')

var upload=multer()
app.post('/upload',upload.single('file') , function (req, res) {
   var ipfsId = "";
   var msg = {};
      ipfsApi.add(req.file.buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        msg.status = 200;
        msg.data = "http://localhost:8080/ipfs/"+ipfsId;
        res.send(msg);
      }).catch((err) => {
          msg.status = 400;
          msg.error = err;
          res.send(msg);
        console.error(err)
      })
      
})

app.listen(3000)