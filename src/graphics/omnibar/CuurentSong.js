import React, { Component } from 'react'
import { TimelineMax, Power2 } from 'gsap/all'
import OmniPill from '../components/OmniPill'

import music from './icons/music.svg'

// NodeCG replicant for connecting to Spotify api - https://github.com/EwanLyon/ncg-spotify
const songRep = nodecg.Replicant('currentSong', 'ncg-spotify')

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
    songRep.on('change', newVal => {
      const { name, artist, playing } = newVal

      if (playing && this.state.name == name) {
        this.myTween.set(this.myWrapper, { y: 15 }).to(this.myWrapper, 0.3, { y: 0, opacity: 1 })
      } else if (!playing && this.state.name == name) {
        this.myTween.to(this.myWrapper, 0.3, { y: 15, opacity: 0 })
      } else {
        if (playing) {
          this.myTween.set(this.myWrapper, { opacity: 1 })
        }

        this.setState({
          name,
          artist,
          playing,
        })
      }
    })
  }

  render() {
    return (
      <div id="currentSong" ref={div => (this.myWrapper = div)}>
        <OmniPill icon={music}>
          {this.state.artist}: <span>{this.state.name}</span>
        </OmniPill>
      </div>
    )
  }
}

export default CurrentSong
