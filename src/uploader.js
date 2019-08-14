
import React, { Component } from 'react';
import ReactS3 from 'react-s3';
import { uploadFile } from 'react-s3';
import AWSconfig from './config';

const imageRegex = /\.(jpe?g|png|gif|bmp|tiff)$/i;

class Uploader extends Component {
    state = { files: null }
    upload = e => {
        console.log(AWSconfig);
        if(imageRegex.test(e.target.files[0].name)) {
            console.log('file is an image');
        };
       
        const file = e.target.files[0];
        uploadFile(file , AWSconfig)
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