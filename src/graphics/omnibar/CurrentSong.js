import React, { Component } from 'react';
// import { Transition } from 'react-transition-group';
// import { TimelineMax, Power2, Power4 } from 'gsap/all';
import OmniPill from '../components/OmniPill';

import music from './icons/music.svg';

// NodeCG replicant for connecting to Spotify api - https://github.com/EwanLyon/ncg-spotify
const songRep = nodecg.Replicant('currentSong', 'ncg-spotify');

class CurrentSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      artist: '',
      playing: false,
      loaded: false
    };
  }

  componentWillMount() {
    // Wait for replicant to load
    NodeCG.waitForReplicants(songRep).then(() => {
      // Load initial state of the items
      const {name, artist, playing} = songRep.value
        this.setState({
          name,
          artist,
          playing,
          loaded:true
        });

    });
  }

  componentDidMount() {

    // Listen for changes
    songRep.on('change', (newVal, oldVal) => {
      const { name, artist, playing } = newVal;

      if (oldVal == undefined) {
        oldVal = newVal
      }

      if (!oldVal.playing && playing) {
        this.setState({ playing });
      } else if (!oldVal.playing && !playing) {
        this.setState({ playing });
      }

      // Don't update if song hasn't changed
      if (oldVal.name != name) {
        this.setState({
          name,
          artist,
        });
      }
    });
  }


  render() {
    const { name, artist, playing, loaded } = this.state;
    return (
      loaded && <OmniPill icon={music} first={name} show={playing}><span>{name}</span>- {artist}</OmniPill>
    );
  }
}

export default CurrentSong;
