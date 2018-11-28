import React, { Component } from "react";
import { TimelineLite, Power2 } from "gsap/all";

import "./Topic.module.scss";

const streamTopic = nodecg.Replicant("streamTopic");

export default class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: streamTopic.value
    };
    // reference to the DOM node
    this.myElement = null;
    this.myWrapper = null;
    // reference to the animation
    this.myTween = new TimelineLite();
  }

  componentDidMount() {
    // Listen for changes and update when the Replicant value changes
    streamTopic.on("change", (newValue, oldValue) => {

      if (newValue == "" || newValue == undefined) {
        //If input is empty, animate the component out
        this.myTween.to(this.myWrapper, 0.3, {
          opacity: 0,
          y: 10,
          ease: Power2.easeIn
        });
      } else if (oldValue == "" || oldValue == undefined) {
        //If input WAS empty and there is a new topic, animate the component in
        const changeState = () => {
          this.setState({ topic: newValue });
        };
        this.myTween
          .call(changeState)
          .fromTo(
            this.myWrapper,
            0.3,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, ease: Power2.easeOut }
          )
          .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut });
      } else {
        //If the component is rendered and there is a change, play the normal animation
        const changeState = () => {
          this.setState({ topic: newValue });
        };
        this.myTween
          .to(this.myElement, 0.3, { y: -15, opacity: 0, ease: Power2.easeIn })
          .call(changeState)
          .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut });
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
