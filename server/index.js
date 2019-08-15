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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

const uploadToS3 = (file) => {
let s3bucket = new aws.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  bucket: config.bucketName
}
);
s3bucket.createBucket(() => {
  const params = {
    Bucket: config.bucketName,
    Key: file.name,
    Body: file.data
  };
  s3bucket.upload(params , (err , data) => {
    if(err){
      console.log('error in callback');
      console.log(err);
    }
    console.log('success');
    console.log(data);
  });
});
};

app.post('/upload', (req, res, next) => {
  uploadToS3(req).then(
    res.send(`Successfully uploaded ${req.files}`)
  )

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
  