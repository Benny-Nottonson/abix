import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";
import styles from "./navbar.module.css";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function Navbar() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isSignedIn = Boolean(data.user);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>
        ABIX
      </Link>
      <div className={styles.actions}>
        {isSignedIn ? (
          <form action={signOut}>
            <button className={styles.authButton} type="submit">
              Logout
            </button>
          </form>
        ) : (
          <Link href="/login" className={styles.authButton}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
