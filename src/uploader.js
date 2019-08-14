
import React, { Component } from 'react';
import { API_URL} from './config';
import UploaderButton from './uploader-button';
import Loading from './loading';
import axios from 'axios';
const imageRegex = /\.(jpe?g|png|gif|bmp|tiff)$/i;

class Uploader extends Component {
    state = { uploading: false,
    files: null }
    onChange = e => {
        const errs = [];
        const files = Array.from(e.target.files);
    
        if (files.length > 10) {
          const msg = 'Only 10 files can be uploaded at a time';
          console.log(msg);
        }
    
        const formData = new FormData();
    
        files.forEach((file, i) => {
          if(imageRegex.test(file)) {
            errs.push(`'${file.type}' is not a supported format`);
          } else {
            console.log('adding files to formData');
            formData.append(i, file);
          }
          // if (file.size > 150000) {
          //   errs.push(`'${file.name}' is too large, please pick a smaller file`);
          // }
        });
    
        if (errs.length) {
          return errs.forEach(err => console.log(err));
        }
    
        this.setState({ 
          uploading: true, 
          files: formData })
        

        axios.post(`${API_URL}/upload`, formData, {
          data: formData
        })
          .then(res => {
            console.log(res);
            if (!res.ok) {
              this.setState({
                uploading: false,
                files
              });
              throw res;
            }
            return res.json();
          })
          .then(files => {
            this.setState({
              uploading: false,
              files
            });
          })
          .catch(err => {
              this.setState({ uploading: false });
          });
      };

      content = () => {

        switch (true) {
          case this.state.uploading:
            return <Loading />;
          default:
            return <UploaderButton onChange={this.onChange}/>;
        }
      };
  
    render() { 
        return ( 
            <div>
                <h1>aws uploader</h1>
               <div>{this.content()}</div>
            </div>
         );
    }
}
 
export default Uploader;