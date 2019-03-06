import React, { Component } from 'react'
import { TimelineMax, Power2 } from 'gsap/all'

import './OmniPill.scss'

class OmniPill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: null,
    }

    this.myContent = null

    // Reference to the animation
    this.myTween = new TimelineMax()
  }

  componentWillMount() {
    this.setState({content: this.props.children})
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props
    const changeState = () => {
      this.setState({ content: newProps.children })
    }
    const myAnimation = () => {
      this.myTween
        .to(this.myContent, 0.2, {
          y: -15,
          opacity: 0,
          ease: Power2.easeIn,
        })
        .call(changeState)
        .set(this.myContent, { y: 15, opacity: 0 })
        .to(this.myContent, 0.2, {
          y: 0,
          opacity: 1,
          ease: Power2.easeOut,
        })
    }

    // Only change if there is a new song
    if (prevProps.first != newProps.first) {
      myAnimation()
    }
  }

  render() {
    return (
      <div className="pillWrapper">
        <div>
          <img className="icon" src={this.props.icon} />
          <div className="content" ref={div => (this.myContent = div)}>
            {this.state.content}
          </div>
        </div>
      </div>
    )
  }
}

export default OmniPill
