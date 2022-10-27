import React from "react";
import "./progressBar.css";

const ProgressBar = ({volume}) => {
  return (
    <div className = "progressContainer" >
      <div className = "filler" >
        <span className = "label" style={{width: `${volume}%`}}></span>
      </div>
    </div>
  );
};

export default ProgressBar;