import QRCode from "qrcode";

import styles from "./QRCode.module.scss";

import { useEffect, useRef } from "react";

function AppQRCode(props: { address: string }) {
  const qrcode = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    QRCode.toCanvas(
      qrcode.current,
      props.address,
      {
        width: 450,
      },
      (error) => {
        if (error) console.error(error);
        console.log("Create QRCode:", props.address);
      }
    );
  }, [props.address]);

  return (
    <div className={styles.qrwrapper}>
      <canvas className={styles.qrcode} ref={qrcode}></canvas>
    </div>
  );
}

export default AppQRCode;
