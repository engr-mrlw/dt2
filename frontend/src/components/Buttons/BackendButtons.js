import React from "react";

export default function BackendButtons({ onSave, onLoad }) {
  return (
    <div className="button-row backend-row">
      <button className="btn teal" onClick={onSave}>Save to API</button>
      <button className="btn purple" onClick={onLoad}>Load from API</button>
    </div>
  );
}
