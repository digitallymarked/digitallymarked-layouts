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


  render() {
    return (
      <div className="pillWrapper" ref={div => (this.myWrapper = div)}>
        <div ref={div => (this.myElement = div)}>
          <img className="icon" src={this.props.icon} /> {this.props.children}
        </div>
      </div>
    )
  }
}

export default OmniPill
