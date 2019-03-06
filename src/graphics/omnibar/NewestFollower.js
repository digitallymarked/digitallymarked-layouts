import React, { Component } from 'react';
import OmniPill from '../components/OmniPill';

import twitch from './icons/twitch.svg';

const streamLabsDB = nodecg.Replicant('streamLabsDB')

class NewestFollower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loaded: false,
    };
  }

  componentWillMount() {
    // Wait for replicant to load
    NodeCG.waitForReplicants(streamLabsDB).then(() => {
      // Load initial state of the items
      // const { name, artist, playing } = songRep.value;
      this.setState({
        name: streamLabsDB.value.follow,
        loaded: true,
      });
    });
  }

  componentDidMount() {
    // Listen for changes
    streamLabsDB.on('change', (newVal, oldVal) => {
      if (oldVal == undefined) {
        oldVal = newVal
      }

      if(oldVal.follow != newVal.follow) {
        console.log(newVal.follow);
        this.setState({
          name: newVal.follow
        })
      }
    })
  }

  render() {
    const { name, loaded } = this.state;
    return loaded ? (
      <OmniPill
        icon={twitch}
        first={name}
        show={loaded}
        label="Newest Follower"
      >
        {name}
      </OmniPill>
    ) : (
      <div />
    );
  }
}

export default NewestFollower;
