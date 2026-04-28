import React from "react";

export default function PDUInputs({ pdus, update, add, ruOptions, onScan }) {
  return (
    <>
      {pdus.map((p, i) => (
        <div key={i}>
          <div className="input-field">
            <input
              placeholder="PDU Serial Number"
              value={p.serial}
              data-scan={`pdus-${i}-serial`}
              onChange={e => update(i, "serial", e.target.value)}
              onKeyDown={e => onScan(e, "pdus", i, "serial")}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="PDU MAC Address"
              value={p.mac}
              data-scan={`pdus-${i}-mac`}
              onChange={e => update(i, "mac", e.target.value)}
              onKeyDown={e => onScan(e, "pdus", i, "mac")}
            />
          </div>

          <div className="input-field">
            <select
              className="browser-default"
              value={p.ru}
              data-scan={`pdus-${i}-ru`}
              onChange={e => update(i, "ru", e.target.value)}
              onKeyDown={e => onScan(e, "pdus", i, "ru")}
            >
              <option value="">Select RU</option>
              {ruOptions.map(ru => (
                <option key={ru} value={ru}>
                  {ru}
                </option>
              ))}
            </select>
          </div>

          <div className="divider" />
        </div>
      ))}

      <button className="btn blue" onClick={add}>
        Add PDU
      </button>
    </>
  );
}
