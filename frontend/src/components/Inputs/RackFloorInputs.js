import React from "react";

export default function RackFloorInputs({ rackSerial, floor, onChange}) {
  return (
    <>
      <div className="input-field">
        <input
          value={rackSerial}
          onChange={e => onChange("rackSerial", e.target.value)}
        />
        <label className="active">Rack Serial Number *</label>
      </div>

      <div className="input-field">
        <input
          value={floor}
          onChange={e => onChange("floor", e.target.value)}
        />
        <label className="active">Floor *</label>
      </div>
    </>
  );
}
