import Link from "next/link";

import styles from "./page.module.css";

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
      <nav className={styles.navbar}>
        <Link href="/" className={styles.brand}>
          ABIX
        </Link>
      </nav>
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