import React, { Component } from 'react'
import { TimelineLite, Power2 } from 'gsap/all'

import './Topic.module.scss'

const streamTopic = nodecg.Replicant('streamTopic')

export default class Topic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: streamTopic.value,
    }
    // reference to the DOM node
    this.myElement = null
    // reference to the animation
    this.myTween = new TimelineLite()
  }

  componentDidMount() {
    // Listen for changes and update when the Replicant value changes
    streamTopic.on('change', newValue => {
      // use the node ref to create the animation
      const changeState = () => {
        this.setState({ topic: newValue })
      }
      this.myTween
        .to(this.myElement, 0.3, { y: -15, opacity: 0, ease: Power2.easeIn })
        .call(changeState)
        .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut })
    })
  }

  render() {
    return (
      <div id="topic">
        <div className="label">
          <span>#</span> Topic:
        </div>
        <div className="value" ref={div => (this.myElement = div)}>
          {this.state.topic}
        </div>
      </div>
    )
  }
}
