import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { TimelineMax, Power2, Power4 } from 'gsap/all';
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
    };
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
        });
      });
    });

    // Listen for changes
    songRep.on('change', (newVal, oldVal) => {
      const { name, artist, playing } = newVal;

      if (!oldVal.playing && playing) {
        this.setState({ playing });
      } else if (!oldVal.playing && !playing ) {
        this.setState({ playing });
      }

      // Don't update if song hasn't changed
      if (oldVal.name == name) {
        return;
      } else {
        this.setState({
          name,
          artist,
        });

      }

    });
  }

  render() {
    const { name, artist, playing } = this.state;
    const tl = new TimelineMax();
    return (
      <Transition
        // timeout={100}
        mountOnEnter
        unmountOnExit
        in={playing}
        addEndListener={(node, done) => {
          tl.set(node, { y: playing ? 15 : 0 }).to(node, 0.3, {
            y: playing ? 0 : 15,
            autoAlpha: playing ? 1 : 0,
            ease: playing ? Power2.easeOut : Power4.easeIn,
            onComplete: done,
          });
        }}
      >
        <OmniPill icon={music} first={name}>
          <span>{name}</span>- {artist}
        </OmniPill>
      </Transition>
    );
  }
}

export default CurrentSong;
