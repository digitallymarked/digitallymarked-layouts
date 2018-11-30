import React, { Component } from "react";
import { TimelineMax, Power2 } from "gsap/all";

import "./Topic.module.scss";

const streamTopic = nodecg.Replicant("streamTopic");
const toggleCheck = nodecg.Replicant("toggleCheck");

export default class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: ""
    };

    // reference to the DOM node
    this.myElement = null;
    this.myWrapper = null;

    // reference to the animation
    this.myTween = new TimelineMax();
  }

  componentDidMount() {
    // Listen for changes and update when the Replicant value changes
    streamTopic.on("change", newValue => {
      const changeState = () => {
        this.setState({ topic: newValue });
      };
      this.myTween
        .to(this.myElement, 0.3, {
          y: -15,
          opacity: 0,
          ease: Power2.easeIn
        })
        .call(changeState)
        .set(this.myElement, { y: 15 })
        .to(this.myElement, 0.3, {
          y: 0,
          opacity: 1,
          ease: Power2.easeOut
        });
    });

    // Listen if toggle is on or not
    toggleCheck.on("change", newValue => {
      this.setState({ topic: streamTopic.value });
      if (newValue) {
        this.myTween
          .set(this.myWrapper, { y: 15 })
          .to(this.myWrapper, 0.3, { y: 0, opacity: 1 });
      } else {
        this.myTween.to(this.myWrapper, 0.3, { y: 15, opacity: 0 });
      }
    });
  }

  render() {
    return (
      <div id="topic" ref={div => (this.myWrapper = div)}>
        <div className="label">
          <span>#</span> Topic:
        </div>
        <div className="value" ref={div => (this.myElement = div)}>
          {this.state.topic}
        </div>
      </div>
    );
  }
}
