import React from "react";

export default function ServerInputs({ servers, update, add, onScan }) {
  return (
    <>
      {servers.map((s, i) => (
        <div className="row" key={i}>
          <div className="input-field col s12">
            <input
              placeholder="Server Serial Number"
              value={s.serial}
              data-scan={`servers-${i}`}
              onChange={e => update(i, "serial", e.target.value)}
              onKeyDown={e => onScan(e, "servers", i, "serial")}
            />
          </div>
        </div>
      ))}

      <button className="btn blue" onClick={add}>
        Add Server
      </button>
    </>
  );
}

