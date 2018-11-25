import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import '../_common.scss'
import './fullGame.scss'

import background from './fullGame-background.png'

ReactDOM.render(
  <div id="fullGame">
    <div className="background" style={{ backgroundImage: `url(${background})` }} />
    <div className="components-wrapper" />
  </div>,
  document.getElementById('root')
)
