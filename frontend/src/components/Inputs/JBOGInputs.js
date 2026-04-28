import React from "react";

export default function JBOGInputs({ jbogs, update, add, onScan }) {
  return (
    <>
      {jbogs.map((j, i) => (
        <div className="input-field" key={i}>
          <input
            placeholder="JBOG Serial Number"
            value={j.serial}
            data-scan={`jbogs-${i}`}
            onChange={e => update(i, "serial", e.target.value)}
            onKeyDown={e => onScan(e, "jbogs", i, "serial")}
          />
        </div>
      ))}

      <button className="btn blue" onClick={add}>
        Add JBOG
      </button>
    </>
  );
}
