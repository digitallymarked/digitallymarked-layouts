import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { TimelineLite, Power2 } from 'gsap/all'
import 'normalize.css'
import './omnibar.scss'

class Omnibar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // reference to the DOM node
    this.myElement = null
    // reference to the animation
    this.myTween = new TimelineLite()
  }

  componentDidMount() {
    // // Listen for changes and update when the Replicant value changes
    // streamTopic.on('change', newValue => {
    //   // use the node ref to create the animation
    //   const changeState = () => {
    //     this.setState({ topic: newValue })
    //   }
    //   this.myTween
    //     .to(this.myElement, 0.3, { y: -15, opacity: 0, ease: Power2.easeIn })
    //     .call(changeState)
    //     .to(this.myElement, 0.3, { y: 0, opacity: 1, ease: Power2.easeOut })
    // })
  }

  render() {
    return (
      <div id="omnibar">
        <div className="background" />
      </div>
    )
  }
}

ReactDOM.render(<Omnibar />, document.getElementById('root'))
