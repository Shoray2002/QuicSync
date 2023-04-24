import copy from "copy-to-clipboard";
import styles from "./Address.module.scss";
import copyicon from "/copy.svg";
function Address(props: { address: string }) {
  return (
    <div className={styles.address}>
      <p className={styles.text}>{props.address}</p>
      <button
        className={`${styles.base} ${styles.button}`}
        onClick={() => {
          copy(props.address);
        }}
      >
        <img src={copyicon} className={styles.icon} />  
      </button>
    </div>
  );
}

export default Address;
