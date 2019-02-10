import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import './fullGame.scss'

import background from './fullGame-background.png'
import Topic from '../components/Topic'

ReactDOM.render(
  <div id="fullGame">
    <div className="background" style={{ backgroundImage: `url(${background})` }} />
    <div className="components-wrapper">
    </div>
    <div className="gameWindow-wrapper">
      <Topic />
    </div>
  </div>,
  document.getElementById('root')
)
