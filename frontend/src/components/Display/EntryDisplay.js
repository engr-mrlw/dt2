import React from "react";

export default function EntryDisplay({ entries }) {
  return (
    <>
      {entries.map((entry, index) => (
        <div key={index} className="card-panel grey lighten-3">
          <strong>Entry {index + 1}</strong> — {entry.timestamp}
          <div>Rack Serial: {entry.rackSerial}</div>
          <div>Floor: {entry.floor}</div>

          {entry.servers.map((s, i) => (
            <div key={i}>Server {i + 1}: {s.serial}</div>
          ))}

          {entry.pdus.map((p, i) => (
            <div key={i}>PDU {i + 1}: {p.serial} | {p.mac} | {p.ru}</div>
          ))}

          {entry.switches.map((sw, i) => (
            <div key={i}>Switch {i + 1}: {sw.serial} | {sw.mac} | {sw.ru}</div>
          ))}

          {entry.jbogs.map((j, i) => (
            <div key={i}>JBOG {i + 1}: {j.serial}</div>
          ))}
        </div>
      ))}
    </>
  );
}
