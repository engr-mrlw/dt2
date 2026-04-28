import React from "react";

export default function BarcodeScannerModal() {
  return (
    <div id="barcode-modal" className="modal">
      <div className="modal-content">
        <h5>Scan Barcode</h5>
        <div id="interactive" className="viewport"></div>
      </div>
    </div>
  );
}
