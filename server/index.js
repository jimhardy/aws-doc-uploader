const config = require('./config');
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');

app.use(cors());

const s3 = new aws.S3()

app.use(bodyParser.json());

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    key: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now().toString());
    }
  })
});

app.post('/upload', upload.array('files', 10) , (req, res, next) => {
  console.log(`server side: ${req.body}`);
   res.send(`Successfully uploaded ${req.files}`)
});


  app.get('/proclaimpush' , (req , res) => {
    // push table data to proclaim
  });
  
  // start server
  app.listen(8000, 'localhost', err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`server started on 8000`);
    }
  });
  