import React, { Component } from 'react'
import 'bulma'
import Box from '@tds/core-box'

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
      <div className="topic" style={{ backgroundColor: 'white' }}>
        <h3 className="title is-3">Stream Topic</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <Box between={3}>
                <input
                  className="input"
                  type="text"
                  placeholder="Change stream topic"
                  value={this.state.currentTopic}
                  onChange={this.handleChange}
                />
                <button className="button is-primary" type="submit" value="Change Topic">
                  Change Topic
                </button>
              </Box>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
