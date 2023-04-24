import styles from "./card.module.scss";
import moment from "moment";

function Card(props: {
  name: string;
  type: string;
  size: number;
  remain?: number;
  expire?: string;
}) {
  function trim(str: string) {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    } else {
      return str;
    }
  }
  
  function formatBytes(a: number, b = 2) {
    if (!+a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
    }`;
  }

  return (
    <>
      <div
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "#333",
          marginTop: "80px",
          textAlign: "center",
        }}
      >
        File Info
      </div>
      <div className={styles.card}>
        <div className={styles.item}>
          <p className={`${styles.tag} ${styles.link}`}>Name</p>
          <p className={`${styles.tag} ${styles.primary}`}>
            {trim(props.name)}
          </p>
        </div>
        <div className={styles.item}>
          <p className={`${styles.tag} ${styles.warning}`}>Type</p>
          <p className={`${styles.tag} ${styles.danger}`}>{props.type}</p>
        </div>
        <div className={styles.item}>
          <p className={`${styles.tag} ${styles.success}`}>Size</p>
          <p className={`${styles.tag} ${styles.info}`}> {formatBytes(props.size)}</p>
        </div>
        {props.remain && props.expire ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p>Remain: </p>
              <p>{props.remain}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p>Expire: </p>
              <p>
                {moment
                  .duration(moment(props.expire).valueOf() - moment().valueOf())
                  .humanize()}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Card;
