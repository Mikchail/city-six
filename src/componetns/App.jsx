import React from "react";
import PropTypes from "prop-types";
import Main from "./Main.jsx";

const App = (props) => {
  return (
    <div>
      App
      <Main data={props.data} />
    </div>
  );
};
App.propTypes = {
  data: PropTypes.array
};

export default App;
