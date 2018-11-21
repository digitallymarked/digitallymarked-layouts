import React from "react";
import ReactDOM from "react-dom";

import Topic from "./components/Topic";

const Panel = () => (
  <div>
    <Topic />
  </div>
);

ReactDOM.render(<Panel />, document.getElementById("root"));
