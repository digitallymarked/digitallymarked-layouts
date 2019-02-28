import React, { Component } from "react";
import { TimelineMax, Power2 } from "gsap/all";
import ReactDOM from 'react-dom'

import 'normalize.css'
import '../_styles/_common.scss'

import background from './omnibar-background.png'

//NodeCG replicant for connecting to Spotify api - https://github.com/EwanLyon/ncg-spotify
const songRep = nodecg.Replicant('currentSong', 'ncg-spotify');

class CurrentSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      artist: '',
      playing: false
    }

    // reference to the DOM node
    this.myElement = null;
    this.myWrapper = null;

    // reference to the animation
    this.myTween = new TimelineMax();
  }

  componentDidMount() {
    songRep.on('change', newVal => {
      this.setState({
        name: newVal.name,
        artist: newVal.artist,
        playing: newVal.playing
      })
    });
  }
  render() {
    return (
      <div id="currentSong" ref={div => (this.myWrapper = div)}>
        <div className="value" ref={div => (this.myElement = div)}>
        {this.state.artist}: {this.state.name}
        </div>
      </div>
    )
  }
}


const Omnibar = () => (
  <div id="omnibar">
    <div className="background" style={{ backgroundImage: `url(${background})` }} />
    <CurrentSong/>
  </div>
)
// class Omnibar extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//     // reference to the DOM node
//     this.myElement = null
//     // reference to the animation
//     this.myTween = new TimelineLite()
//   }

//   componentDidMount() {
//     // Listen for changes and update when the Replicant value changes
//     streamTopic.on('change', newValue => {
//       // use the node ref to create the animation
//       const changeState = () => {
//         this.setState({ topic: newValue })
//       }
//       this.myTween
//         .to(this.myElement, 0.3, { y: -15, opacity: 0, ease: Power2.easeIn })
//         .call(changeState)
//         .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut })
//     })
//   }

//   render() {
//     return (
//       <div id="omnibar">
//         <div className="background" />
//       </div>
//     )
//   }
// }

ReactDOM.render(
  <Omnibar/>,
  document.getElementById('root')
)
