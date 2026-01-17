import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Abix</h1>
        <div className={styles.founders}>
          <div className={styles.person}>
            <div className={styles.avatar} />
            <span className={styles.name}>Benjamin Nottonson-Abix</span>
          </div>
          <div className={styles.person}>
            <div className={styles.avatar} />
            <span className={styles.name}>Lucy Nottonson-Abix</span>
          </div>
        </div>
      </main>
    </div>
  );
}
