import Quagga from "quagga";

export const startBarcodeScanner = (onDetected, onReady) => {
  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        constraints: { facingMode: "environment" }
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader"]
      }
    },
    err => {
      if (err) return;
      Quagga.start();
      if (onReady) onReady();
    }
  );

  Quagga.onDetected(result => {
    const code = result.codeResult.code;
    onDetected(code);
    Quagga.stop();
  });
};
