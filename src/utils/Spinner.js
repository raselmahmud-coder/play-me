import React from "react";

const Spinner = ({ width="3rem", height="3rem" }) => {
  return (
    <div className="spinner-grow" style={{ width, height }} role="status"></div>
  );
};

export default Spinner;
