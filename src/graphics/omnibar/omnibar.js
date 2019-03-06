import React from 'react'
import ReactDOM from 'react-dom'
import CurrentSong from './CurrentSong'
import NewestFollower from './NewestFollower'

import 'normalize.css'
import '../_styles/_common.scss'
import './omnibar.scss'

import background from './omnibar-background.png'

const Omnibar = () => (
  <div id="omnibar">
    <div className="background" style={{ backgroundImage: `url(${background})` }} />
    <div className="componentsWrapper">
      <NewestFollower />
      <CurrentSong />
    </div>
  </div>
)


ReactDOM.render(
  <Omnibar />,
  document.getElementById('root')
)
