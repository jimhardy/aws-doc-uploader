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
    const errs = []
    const files = Array.from(e.target.files)
    if (files.length > 10) {
      const msg = 'Only 10 files can be uploaded at a time'
      console.log(msg)
    }

    const formData = new FormData()

    // append formData with files from file array
    await files.forEach((file, i) => {
        formData.append(i, file)
    })
    if (errs.length) {
      return errs.forEach(err => console.log(err))
    }

    await this.setState({
      uploading: true,
      files: formData
    })

    await axios
      .post(`${API_URL}/upload`,  {
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
