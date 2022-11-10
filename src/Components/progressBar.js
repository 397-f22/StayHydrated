import React from "react";
import "./progressBar.css";

const ProgressBar = ({volume , user, total_volume, goal} ) => {
  volume = Math.min(100, volume);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="progressContainer" >
        <div className="filler" style={{ width: `calc(${volume}% + 10px)` }}>
          <span className="label" >{volume}%</span>
        </div>
      </div>
      {user ? <h1 className="text-align-center">{total_volume.toFixed(1)} / {goal.toFixed(1)} L</h1> : ""}
    </div>
  );
};

export default ProgressBar;