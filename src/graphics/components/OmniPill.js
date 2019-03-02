import React, { Component } from 'react'
import { TimelineMax, Power2 } from 'gsap/all'

import './OmniPill.scss'

class OmniPill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: null,
    }

    this.myElement = null
    this.myContent = null

    // Reference to the animation
    this.myTween = new TimelineMax()
  }

  componentDidMount() {
    if (this.props.show == false) {
      this.myTween.set(this.myElement, { opacity: 0 })
    }
  }

  componentDidUpdate(oldProps) {
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

    // TODO check why UPDATE is triggering when changin song while paused
    // Show component
    if (!oldProps.show && newProps.show) {
      // If change, update content and then show
      console.log('Running SHOW')
      this.myTween
        .call(changeState)
        .set(this.myElement, { y: 15 })
        .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut })
    } else if (oldProps.show == newProps.show && newProps.show && newProps.children != oldProps.children) {
      console.log('Running UPDATE', oldProps.show, oldProps.children, this.props.show, this.props.children)
      myAnimation(newProps.children)
    }

    // Hide component
    if (oldProps.show && !this.props.show) {
      console.log('Running HIDE')
      this.myTween.to(this.myElement, 0.3, { y: 15, opacity: 0, ease: Power2.easeIn })
    }
  }

  render() {
    return (
      <div className="pillWrapper" ref={div => (this.myElement = div)}>
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
