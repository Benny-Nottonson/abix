import { NextResponse } from "next/server";

import { createClient } from "../../../lib/supabase/server";

function redirectWithMessage(path: string, params: Record<string, string | undefined>) {
  const url = new URL(path, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;
  const code = searchParams.get("code") || undefined;
  const tokenHash = searchParams.get("token_hash") || undefined;

  const isRecovery = type === "recovery" || Boolean(tokenHash);

  const supabase = await createClient();

  if (isRecovery) {
    if (!tokenHash && !code) {
      return redirectWithMessage("/login", {
        message: "Missing recovery token.",
        mode: "reset",
      });
    }

    const recoveryToken = tokenHash || code!;
    const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash: recoveryToken });

    if (error) {
      return redirectWithMessage("/login", {
        message: error.message || "Could not verify the link.",
        mode: "reset",
      });
    }

    return redirectWithMessage("/login", {
      mode: "updatePassword",
      message: "Enter a new password to finish resetting.",
    });
  }

  if (!code) {
    return redirectWithMessage("/login", {
      message: "Missing authentication code.",
    });
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectWithMessage("/login", {
      message: error.message || "Could not verify the link.",
    });
  }

  if (type === "signup") {
    return redirectWithMessage("/login", {
      message: "Email confirmed. You can log in.",
    });
  }

  return NextResponse.redirect(new URL("/", request.url));
}
