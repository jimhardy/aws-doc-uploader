const express = require('express');
const app = express();


app.post('/upload', (req, res) => {
    console.log(req);
  });


  app.post('/proclaimpush' , (req , res) => {
      console.log(req);
  });
  
  // start server
  app.listen(process.env.PORT, process.env.IP, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`server started on ${process.env.PORT}`);
    }
  });
  