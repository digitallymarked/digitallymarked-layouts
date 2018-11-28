import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Checkbox } from "semantic-ui-react";

import "normalize.css";
import "semantic-ui-css/semantic.min.css";

const streamTopic = nodecg.Replicant("streamTopic");
const toggleCheck = nodecg.Replicant('toggleCheck')

class TopicPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopic: '',
      toggle: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  componentDidMount() {
    NodeCG.waitForReplicants(streamTopic,toggleCheck).then(() => {
      // Listen for changes and update when the Replicant value changes
      streamTopic.on("change", newValue => {
        this.setState({ currentTopic: newValue });
      });
      toggleCheck.on('change', newValue => {
        this.setState({toggle: newValue})
      })
    });
  }

  // Getting the value of the input field
  handleChange(event) {
    this.setState({ currentTopic: event.target.value });
  }

  // Sending the value to the replicant
  handleSubmit(event) {
    event.preventDefault();
    streamTopic.value = this.state.currentTopic;
  }

  toggleChange(event,data) {
    event.preventDefault();
    this.setState({ toggle: data.checked });
    toggleCheck.value = data.checked
  }
  render() {
    return (
      <div className="topic">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              placeholder="Set the streams toic"
              value={this.state.currentTopic}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Show Topic"
              onChange={this.toggleChange}
              checked={this.state.toggle}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <TopicPanel />
  </div>,
  document.getElementById("root")
);
