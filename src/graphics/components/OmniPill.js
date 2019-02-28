import React, { Component } from 'react'
import { TimelineMax } from 'gsap/all'

import './OmniPill.scss'

class OmniPill extends Component {
  constructor(props) {
    super(props)
    

    this.myElement = null

    // Reference to the animation
    this.myTween = new TimelineMax()
  }

  componentDidMount() {
    const changeState = () => {
      this.setState({ topic: newValue })
    }
    this.myTween
      .to(this.myElement, 0.2, {
        y: -15,
        opacity: 0,
        ease: Power2.easeIn,
      })
      .call(changeState)
      .set(this.myElement, { y: 15 })
      .to(this.myElement, 0.2, {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut,
      })
  }

  render() {
    return (
      <div className="pillWrapper" id={this.props.id} ref={div => (this.myWrapper = div)}>
      <div ref={div => (this.myElement = div)}>
        <img className="icon" src={this.props.icon} /> {this.props.children}
        </div>
      </div>
    )
  }
}

export default OmniPill
