require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer')

app.use(cors());

app.post('/upload', (req, res) => {
  //  need to use multer
   console.log('file received by server');
   console.log(req.body);
   const values = Object.values(req);
   console.log(values);
});


  app.post('/proclaimpush' , (req , res) => {
      console.log(req);
  });
  
  // start server
  app.listen(8000, 'localhost', err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`server started on 8000`);
    }
  });
  