import { useRef, useState, ChangeEvent } from "react";
import styles from "./File.module.scss";
import { putBoxFile, getBoxFile, delBoxFile } from "../lib/api";
import relay from "/relay.png";
let tmp: File | undefined;

function File(props: {
  recver: boolean;
  isBox: boolean;
  reLoad: () => void;
  percent: number;
  handleFile: (files: FileList | null) => void;
  getFile: () => void;
}) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (props.recver) {
      if (props.isBox) {
        getBoxFile();
      } else {
        props.getFile();
      }
    } else {
      hiddenFileInput.current?.click?.();
    }
  };
  const trim = (f: string) => {
    if (f.length > 20) {
      return f.slice(0, 10) + "..." + f.slice(-10);
    }
    return f;
  };

  const [remain, setRemain] = useState<number>(1);
  const [expire, setExpire] = useState<string>("5m");

  const [filename, setFilename] = useState("Select File");

  const handleFile = (files: FileList | null) => {
    props.handleFile(files);
    const file = files?.[0];
    if (file) setFilename(file.name);
  };

  return (
    <>
      {!props.recver ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label className={styles.label} htmlFor="remain">
              Downloads:{" "}
            </label>
            <select
              value={remain}
              onChange={(e) => setRemain(Number(e.target.value))}
              className={styles.select}
              id="remain"
            >
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label className={styles.label} htmlFor="expire">
              Expire:{" "}
            </label>
            <select
              value={expire}
              onChange={(e) => setExpire(e.target.value)}
              className={styles.select}
              id="expire"
            >
              <option value="5m">5m</option>
              <option value="30m">30m</option>
              <option value="1h">1h</option>
              <option value="24h">24h</option>
            </select>
          </div>
        </div>
      ) : null}

      <label
        className={styles.button}
        style={{
          backgroundColor: "#f2effb",
          color: "#552fbc",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        onClick={handleClick}
      >
        {props.percent === 0
          ? props.recver
            ? "Download"
            : trim(filename)
          : props.percent.toFixed(1) + "%"}
      </label>
      <input
        className={styles.input}
        id="upload"
        type="file"
        ref={hiddenFileInput}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          handleFile(ev.target.files);
          tmp = ev.target.files?.[0];
        }}
      />
      {props.recver ? (
        <button
          className={styles.button}
          style={{ backgroundColor: "red" }}
          onClick={async () => {
            await delBoxFile();
            props.reLoad();
          }}
        >
          Clear
        </button>
      ) : (
        <button
          className={styles.button}
          style={{ backgroundColor: "deepskyblue" }}
          onClick={async () => {
            if (tmp) {
              await putBoxFile(tmp, remain, expire);
              props.reLoad();
            }
          }}
        >
          <img src={relay} alt="relay" width="60px" height="60px" />
        </button>
      )}
    </>
  );
}

export default File;
