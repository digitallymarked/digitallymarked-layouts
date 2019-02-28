import React, { Component } from 'react'
import { TimelineMax, Power2 } from 'gsap/all'
import OmniPill from '../components/OmniPill'

// NodeCG replicant for connecting to Spotify api - https://github.com/EwanLyon/ncg-spotify
const songRep = nodecg.Replicant('currentSong', 'ncg-spotify')

import music from './icons/music.svg'

class CurrentSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      artist: '',
      playing: false,
    }

    // reference to the DOM node
    this.myWrapper = null

    // reference to the animation
    this.myTween = new TimelineMax()
  }

  componentDidMount() {
    if(!this.state.playing) {
      this.myTween.set(this.myWrapper, { y: 15, opacity:0 })
    }

    songRep.on('change', newVal => {
      const {name, artist, playing} = newVal;

      this.setState({
        name: name,
        artist: artist,
        playing: playing,
      })

      if(playing) {
        this.myTween.set(this.myWrapper, { y: 15 }).to(this.myWrapper, 0.3, { y: 0, opacity: 1 })
      } else if(!playing) {
        this.myTween.to(this.myWrapper, 0.3, { y: 15, opacity: 0 })
      } else {
        return
      }
    })
  }

  handleUpdate() {
    console.log('Called update')
  };

  render() {
    return <div ref={div => (this.myWrapper = div)}><OmniPill id="currentSong" icon={music} onUpdate={this.handleUpdate}>{this.state.artist}: <span>{this.state.name}</span></OmniPill></div>
  }
}

export default CurrentSong
