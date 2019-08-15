import React, { Component } from 'react'
import { API_URL } from './config'
import UploaderButton from './uploader-button'
import Loading from './loading'
import axios from 'axios'
// const imageRegex = /\.(jpe?g|png|gif|bmp|tiff)$/i

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false, files: null }
this.onChange = this.onChange.bind(this);
  }
  async onChange(e) {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      const msg = 'Only 10 images can be uploaded at a time';
      errs.push(msg);
    }

    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      if (file.size > 2000000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
    }

    this.setState({ uploading: true });

    // fetch(`${API_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // })
    await axios
      .post(`${API_URL}/upload`, {
        data: this.state.files
      })
      .then(res => {
        console.log(res)
        if (!res.ok) {
          this.setState({
            uploading: false,
            files
          })
          throw res
        }
        return res.json()
      })
      .then(files => {
        this.setState({
          uploading: false,
          files
        })
      })
      .catch(err => {
        this.setState({ uploading: false })
      })
  }

  content = () => {
    switch (true) {
      case this.state.uploading:
        return <Loading />
      default:
        return <UploaderButton onChange={this.onChange} />
    }
  }

  render() {
    return (
      <div>
        <h1>aws uploader</h1>
        <div>{this.content()}</div>
      </div>
    )
  }
}

export default Uploader
