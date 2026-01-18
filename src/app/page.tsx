import styles from "./page.module.css";

const founders = [
  {
    name: "Benjamin Abix",
    avatar: "/benjamin-avatar.jpg",
  },
  {
    name: "Lucielle Abix",
    avatar: "/lucielle-avatar.jpg",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Abix</h1>
        <div className={styles.founders}>
          {founders.map((founder) => (  
            <div key={founder.name} className={styles.person}>
              <img
                src={founder.avatar}
                alt={founder.name}
                className={styles.avatar}
              />
              <span className={styles.name}>{founder.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: "Abix",
  description: "Abix",
};