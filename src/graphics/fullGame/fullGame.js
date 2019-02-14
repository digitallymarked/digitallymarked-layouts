import React, { Component } from 'react'
import { TimelineMax } from 'gsap/all'
import ReactDOM from 'react-dom'
import Iframe from 'react-iframe'


import 'normalize.css'
import './fullGame.scss'

import background from './fullGame-background.png'
import Topic from '../components/Topic'
import { url } from '../../../stream-assets/donationGoal'

const gameShowCheck = nodecg.Replicant('gameShowCheck')

class FullGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // reference to the DOM node
    this.myWrapper = null;

    // reference to the animation
    this.myTween = new TimelineMax();
  }

  componentDidMount() {
    gameShowCheck.on('change', newValue => {
      if (newValue) {
        this.myTween
          .set(this.myWrapper, { y: 15 })
          .to(this.myWrapper, 0.3, { y: 0, opacity: 1 });
      } else {
        this.myTween.to(this.myWrapper, 0.3, { y: 15, opacity: 0 });
      }
    })
  }

  render() {
    return (
      <div id="fullGame">
        <div className="background" style={{ backgroundImage: `url(${background})` }} />
        <div className="components-wrapper">
          <iframe src={url} width="100%" referrerPolicy="no-referrer" frameborder="0" id="donationGoal"></iframe>
        </div>
        <div className="gameWindow-wrapper">
          <div ref={div => (this.myWrapper = div)}>
            <Topic />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <FullGame />,
  document.getElementById('root')
)
