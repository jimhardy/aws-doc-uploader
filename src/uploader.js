import React, { Component } from 'react';
import ReactS3 from 'react-s3';

require('dotenv').config();

const imageRegex = /\.(jpe?g|png|gif|bmp|tiff)$/i;

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
        if(imageRegex.test(e.target.files[0].name)) {
            console.log('file is an image');
        };
        console.log(e.target.files[0]);
        ReactS3.uploadFile(e.target.files[0] , config)
        .then((data) => {
            console.log(data.location);
        })
        .catch((err) => {
            console.log('failed:');
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