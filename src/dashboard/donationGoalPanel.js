import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Checkbox } from "semantic-ui-react";

import "normalize.css";
import "semantic-ui-css/semantic.min.css";

const donationGoal = nodecg.Replicant("donationGoal");

class DonationGoalPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };

    this.toggleChange = this.toggleChange.bind(this);
  }

  componentDidMount() {
    NodeCG.waitForReplicants(donationGoal).then(() => {
      // Listen for changes and update when the Replicant value changes
      donationGoal.on('change', newValue => {
        this.setState({toggle: newValue})
      })
    });
  }


  toggleChange(event,data) {
    event.preventDefault();
    this.setState({ toggle: data.checked });
    donationGoal.value = data.checked
  }


  render() {
    return (
      <div className="Donation Goal">
        <Form>
          <Form.Field>
            <Checkbox
              label="Show Donation Goal"
              toggle
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
    <DonationGoalPanel />
  </div>,
  document.getElementById("root")
);
