import React from "react";

import "./Spinner.scss";

// spinner implementation taken from https://loading.io/css/
export default function Spinner() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
