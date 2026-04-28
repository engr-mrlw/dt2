import React from "react";

export default function ActionButtons({ onDisplay, onExport, onClear }) {
  return (
    <div className="button-row">
      <button className="btn green" onClick={onDisplay}>Display</button>
      <button className="btn orange" onClick={onExport}>Export</button>
      <button className="btn red" onClick={onClear}>Clear</button>
    </div>
  );
}
