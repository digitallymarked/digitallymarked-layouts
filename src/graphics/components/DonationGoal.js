import React, { Component } from 'react';
import { TimelineMax} from 'gsap/all';

import { url } from '../../../stream-assets/donationGoal';
import './DonationGoal.module.scss'

const donationGoal = nodecg.Replicant('donationGoal');

export default class DonationGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // reference to the DOM node
    this.myFrame = null;

    // reference to the animation
    this.myTween = new TimelineMax();
  }

  componentDidMount() {
    // Listen if toggle is on or not
    donationGoal.on('change', newValue => {
      console.log(newValue);
      if (newValue) {
        this.myTween
          .set(this.myFrame, { y: 15 })
          .to(this.myFrame, 0.3, { y: 0, opacity: 1 });
      } else {
        this.myTween.to(this.myFrame, 0.3, { y: 15, opacity: 0 });
      }
    });
  }

  render() {
    return (
      <div id="donationGoal" ref={div => (this.myFrame = div)}>
        <iframe
          src={url}
          referrerPolicy="no-referrer"
          frameBorder="0"
        />
      </div>
    );
  }
}
