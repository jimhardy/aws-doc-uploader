import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarCrash } from '@fortawesome/free-solid-svg-icons';

export default () => (
  <div className="Loading">
    <div className="Loading-icon">
      <FontAwesomeIcon icon={faCarCrash} size="10x" color="#1D3C4C" />
    </div>
  </div>
);
