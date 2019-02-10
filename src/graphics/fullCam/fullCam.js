import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import './fullCam.scss'

import background from './fullCam-background.png'
import Topic from '../components/Topic'

const FullCam = () => (
  <div id="fullCam">
  <div className="background" style={{ backgroundImage: `url(${background})` }} />
  <div className="components-wrapper">
    <Topic/>
  </div>
</div>
)

ReactDOM.render(
 <FullCam/>,
  document.getElementById('root')
)
