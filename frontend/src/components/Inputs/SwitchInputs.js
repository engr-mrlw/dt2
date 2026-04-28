import React from "react";

export default function SwitchInputs({ switches, update, add, ruOptions, onScan }) {
  return (
    <>
      {switches.map((sw, i) => (
        <div key={i}>
          <div className="input-field">
            <input
              placeholder="Switch Serial Number"
              value={sw.serial}
              data-scan={`switches-${i}-serial`}
              onChange={e => update(i, "serial", e.target.value)}
              onKeyDown={e => onScan(e, "switches", i, "serial")}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="Switch MAC Address"
              value={sw.mac}
              data-scan={`switches-${i}-mac`}
              onChange={e => update(i, "mac", e.target.value)}
              onKeyDown={e => onScan(e, "switches", i, "mac")}
            />
          </div>

          <div className="input-field">
            <select
              className="browser-default"
              value={sw.ru}
              data-scan={`switches-${i}-ru`}
              onChange={e => update(i, "ru", e.target.value)}
              onKeyDown={e => onScan(e, "switches", i, "ru")}
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
        Add Switch
      </button>
    </>
  );
}
