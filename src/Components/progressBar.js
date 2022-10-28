import React from "react";
import "./progressBar.css";

const ProgressBar = ({ volume }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="progressContainer" >
        <div className="filler" style={{ width: `calc(${volume}% + 10px)` }}>
          <span className="label" >{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;