import React, { Component } from 'react'
import { TimelineMax, Power2 } from 'gsap/all'

import './OmniPill.scss'

class OmniPill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: null
    }

    this.myElement = null
    this.myContent = null

    // Reference to the animation
    this.myTween = new TimelineMax()
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    const changeState = () => {
      this.setState({ content: newProps.children })
      console.log(this.myElement.offsetWidth);
    }

    if(oldProps.children !== newProps.children) {

      console.log(this.myElement.offsetWidth);
      // console.table([oldProps,newProps]);
      const currentWidth = this.myElement.offsetWidth
      this.myTween.timeScale(0.1)
        .to(this.myContent, 0.2, {
          y: -15,
          opacity: 0,
          ease: Power2.easeIn,
        })
        .set(this.myElement, {
          width: currentWidth
        })
        .call(changeState)
        .set(this.myContent, { y: 15,opacity:0})
        .to(this.myElement, 0.5, { width: "100%"} )
        .to(this.myContent, 0.2, {
          y: 0,
          opacity: 1,
          ease: Power2.easeOut,
        })
    }
  }

  render() {
    return (
      <div className="pillWrapper" ref={div => (this.myElement = div)}>
        <div>
          <img className="icon" src={this.props.icon} />
          <div className="content" ref={div => (this.myContent = div)}>{this.state.content}</div>
        </div>
      </div>
    )
  }
}

export default OmniPill
