import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './fullCam.scss';

import background from './fullCam-background.png';
import Topic from '../components/Topic';

import { url } from '../../../stream-assets/donationGoal';

const FullCam = () => (
  <div id="fullCam">
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    />
    <div className="components-wrapper">
      <iframe
        src={url}
        referrerPolicy="no-referrer"
        frameborder="0"
        id="donationGoal"
      />
      <Topic />
    </div>
  </div>
);

ReactDOM.render(<FullCam />, document.getElementById('root'));
