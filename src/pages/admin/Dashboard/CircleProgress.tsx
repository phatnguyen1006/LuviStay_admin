import React, { ReactElement } from "react";
import "./styles.scss";

export default function CircleProgress(): ReactElement {
  return (
    <div className="progress-bar-container">
      <div className="progressbar">
        <svg className="progressbar__svg">
          <circle
            cx="80"
            cy="80"
            r="60"
            className="progressbar__svg-circle circle-js shadow-js"
          >
            {" "}
          </circle>
        </svg>
        <span className="progressbar__text shadow-js">SEO</span>
      </div>
      <div className="progressbar">
        <svg className="progressbar__svg">
          <circle
            cx="80"
            cy="80"
            r="60"
            className="progressbar__svg-circle circle-ts shadow-ts"
          >
            {" "}
          </circle>
        </svg>
        <span className="progressbar__text shadow-ts">KPI</span>
      </div>
      {/* <Progress type="circle" percent={100} /> */}
      <div className="progressbar">
        <svg className="progressbar__svg">
          <circle
            cx="80"
            cy="80"
            r="60"
            className="progressbar__svg-circle circle-scss shadow-scss"
          >
            {" "}
          </circle>
        </svg>
        <span className="progressbar__text shadow-scss">Overall</span>
      </div>
    </div>
  );
};