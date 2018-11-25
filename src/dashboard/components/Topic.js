import React, { Component } from 'react'

import './Topic.scss'

const streamTopic = nodecg.Replicant('streamTopic')

export default class Topic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTopic: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // Load initial value and set it's propper state
    nodecg.readReplicant('streamTopic', value => {
      this.setState({ currentTopic: value })
    })

    // Listen for changes and update when the Replicant value changes
    streamTopic.on('change', newValue => {
      this.setState({ currentTopic: newValue })
    })
  }

  // Getting the value of the input field
  handleChange(event) {
    this.setState({ currentTopic: event.target.value })
  }

  // Sending the value to the replicant
  handleSubmit(event) {
    event.preventDefault()
    streamTopic.value = this.state.currentTopic
  }

  render() {
    return (
      <div className="topic">
        <h1>Stream Topic</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.currentTopic} onChange={this.handleChange} />
          <input type="submit" value="Change Topic" />
        </form>
      </div>
    )
  }
}
