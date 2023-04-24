import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import { getLogLevel, getRoom, shareGetRoom } from "./lib/api";
import log, { LogLevelDesc } from "loglevel";
import history from "history/browser";
import Index from "./components/index";
import Header from "./components/Header";
function App() {  
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    log.setLevel(getLogLevel() as LogLevelDesc);

    if (shareGetRoom(window.location.href)) {
      setAddress(window.location.href);
    } else {
      const init = async function () {
        const room = await getRoom();
        if (room) {
          history.push(room);
          setAddress(document.location.origin + "/" + room);
        }
      };

      init();
    }
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.card} >
        {address ? (
          <Index address={address}></Index>
        ) : (
          <div>Not Get Share Link</div>
        )}
      </div>
    </div>
  );
}

export default App;
