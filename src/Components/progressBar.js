import React from "react";
import "./progressBar.css";

const ProgressBar = ({ volume }) => {
  return (
    <div className="progressContainer" >
      <div className="filler" style={{ width: `${volume}%` }}>
        <span className="label" >{volume}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;