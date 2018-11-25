import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { TimelineLite, Power2 } from 'gsap/all'
import 'normalize.css'
import './omnibar.scss'

const streamTopic = nodecg.Replicant('streamTopic')

class Omnibar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: 'Just starting!',
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

  componentWillUnmount() {
    // ? Unlisten so that updates don't trigger alerts
    nodecg.unlisten('streamTopic')
  }

  render() {
    return (
      <div id="omnibar">
        <p ref={p => (this.myElement = p)}>{this.state.topic}</p>
        <div className="background" />
      </div>
    )
  }
}

ReactDOM.render(<Omnibar />, document.getElementById('root'))
