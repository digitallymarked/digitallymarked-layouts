import React, { Component } from 'react'
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
  }

  componentDidMount() {
    // Wait for Replicant to be declared
    NodeCG.waitForReplicants(songRep).then(() => {
      // Load initial state of the items
      nodecg.readReplicant('currentSong', 'ncg-spotify', value => {
        this.setState({
          name: value.name,
          artist: value.artist,
          playing: value.playing,
        })
      })
    })

    // Listen for changes
    songRep.on('change', (newVal, oldVal) => {
      const { name, artist, playing } = newVal

      if (oldVal.playing != playing && playing == true) {
        this.setState({ playing: true })
      }
      if (oldVal.playing != playing && playing == false) {
        this.setState({ playing: false })
      }

      // Don't update if song hasn't changed
      if (oldVal.name == name) {
        // console.log(name)
        // return null
      } else {
        this.setState({
          name,
          artist,
          // playing,
        })
      }
    })
  }

  render() {
    return (
      <div id="currentSong" ref={div => (this.myWrapper = div)}>
        <OmniPill icon={music} show={this.state.playing}>
          {this.state.artist}: <span>{this.state.name}</span>
        </OmniPill>
      </div>
    )
  }
}

export default CurrentSong
