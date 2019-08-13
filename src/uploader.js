import React, { Component } from 'react';
import ReactS3 from 'react-s3';

require('dotenv').config();


 
const config = {
    bucketName: 'a365-doc-import-poc',
    dirName: 'docs', 
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
}

class Uploader extends Component {
    state = { files: null }
    upload = e => {
        console.log(e.target.files[0]);
        ReactS3.uploadFile(e.target.files[0] , config)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    render() { 
        return ( 
            <div>
                <h1>aws uploader</h1>
                <input type="file" onChange={this.upload}></input>
            </div>
         );
    }
}
 
export default Uploader;