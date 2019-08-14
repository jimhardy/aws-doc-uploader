import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

export default props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="multi">
        <FontAwesomeIcon icon={faFileUpload} className="Upload-icon" />
      </label>
      <input type="file" id="multi" onChange={props.onChange} multiple />
    </div>
  </div>
)
