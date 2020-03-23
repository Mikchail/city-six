import React from "react";
import PropTypes from "prop-types";

const Main = ({data}) => {
  return (
    <div>
      Main
      {data.map((item) => {
        return <p key={item}>{item}</p>;
      })}
    </div>
  );
};

Main.propTypes = {
  data: PropTypes.array
};

export default Main;
