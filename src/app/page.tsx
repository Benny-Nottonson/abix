import styles from "./page.module.css";
import Navbar from "./components/Navbar";

const founders = [
  {
    name: "Benjamin Abix",
    avatar: "/benjamin-avatar.jpg",
  },
  {
    name: "Luceille Abix",
    avatar: "/luceille-avatar.jpg",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
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
  title: "ABIX",
  description: "The official website of Abix",
};