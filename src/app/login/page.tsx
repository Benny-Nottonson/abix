import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { createClient } from "../../lib/supabase/server";
import styles from "./login.module.css";

type SearchParams = {
  message?: string;
  kind?: string;
};

async function signIn(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect(`/login?message=${encodeURIComponent("Email and password are required.")}&kind=error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}&kind=error`);
  }

  redirect("/");
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/");

  const message = await searchParams.message;
  const kind = searchParams.kind === "error" ? "error" : message ? "success" : "idle";

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Login</h1>

          <form className={styles.card} action={signIn}>
            <label className={styles.label}>
              <span>Email</span>
              <input
                className={styles.input}
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className={styles.label}>
              <span>Password</span>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </label>

            <div className={styles.actions}>
              <button className={styles.primaryButton} type="submit">
                Login
              </button>
            </div>

            {message && (
              <p className={`${styles.message} ${kind === "error" ? styles.error : styles.success}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
