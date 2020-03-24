import React from "react";
import ReactDOM from "react-dom";

import App from "./componetns/app/app.jsx";
const data = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

ReactDOM.render(<App data={data} />, document.getElementById(`root`));

