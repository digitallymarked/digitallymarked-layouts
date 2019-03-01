import React, { Component } from 'react';
import { TimelineMax, Power2 } from 'gsap/all';
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

    // reference to the DOM node
    this.myWrapper = null;

    // reference to the animation
    this.myTween = new TimelineMax();
  }

  componentDidMount() {
    //Wait for Replicant to be declared
    NodeCG.waitForReplicants(songRep).then(() => {
      //Load initial state of the items
      nodecg.readReplicant('currentSong', 'ncg-spotify', value => {
        this.setState({
          name: value.name,
          artist: value.artist,
          playing: value.playing,
        });
      });
    });

    //Listen for changes
    songRep.on('change', (newVal, oldVal) => {
      //Check if song is playing or paused
      if (oldVal.playing == newVal.playing) {
        //Don't update if song hasn't changed
        if (oldVal.name == newVal.name) {
          return;
        }

        this.setState({
          name: newVal.name,
          artist: newVal.artist,
        });
      } else {
        this.setState({
          playing: newVal.playing,
          name: newVal.name,
          artist: newVal.artist,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { playing } = this.state;

    if (!prevState.playing && playing) { //If unpaused, show component
      this.myTween
        .set(this.myWrapper, { y: 15 })
        .to(this.myWrapper, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut });
    } else if (prevState.playing && !playing) { //If paused, hide component
      this.myTween.to(this.myWrapper, 0.3, { y: 15, opacity: 0, ease: Power2.easeIn });
    }
  }

  render() {
    return (
      <div id="currentSong" ref={div => (this.myWrapper = div)}>
        <OmniPill icon={music}>
          {this.state.artist}: <span>{this.state.name}</span>
        </OmniPill>
      </div>
    );
  }
}

export default CurrentSong;
