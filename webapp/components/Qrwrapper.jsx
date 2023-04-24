import React from "react";
import Address from "./Address";
import Qrcode from "./QRCode";

const styles = {
  width: 256,
  height: 256,
};

const Qrwrapper = ({ address }) => {
  return (
    <>
      <Qrcode address={address} />
      <Address address={address} className="address" />
    </>
  );
};

export default Qrwrapper;
