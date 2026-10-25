"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/Button";

type AuthMode = "login" | "register" | "forgot-password" | "reset-password";

const inputClassName =
  "h-12 w-full rounded-[16px] border border-ink/60 bg-transparent px-4 text-[12px] font-medium uppercase tracking-[0.08em] text-ink placeholder:text-ink/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta";

const labelClassName = "sr-only";

export function AuthCard({ mode }: { mode: AuthMode }) {
  const [supabase] = React.useState(() =>
    typeof window !== "undefined" ? createBrowserClient() : null,
  );
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [newsletter, setNewsletter] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const isRegister = mode === "register";
  const isLogin = mode === "login";
  const isForgotPassword = mode === "forgot-password";
  const isResetPassword = mode === "reset-password";
  const title = isLogin
    ? "Sign in"
    : isRegister
      ? "Create account"
      : isForgotPassword
        ? "Recover password"
        : "Set new password";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured for browser authentication.");
      }

      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
        const redirectTo = new URLSearchParams(window.location.search).get(
          "redirectTo",
        );
        const destination =
          redirectTo?.startsWith("/account/") &&
          !redirectTo.startsWith("//")
            ? redirectTo
            : "/account";
        router.push(destination);
        router.refresh();
      } else if (isRegister) {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: fullName,
              phone: phone.trim() || null,
              birth_date: birthDate || null,
              newsletter_opt_in: newsletter,
            },
          },
        });
        if (authError) throw authError;

        if (data.session) {
          router.push("/account");
          router.refresh();
        } else {
          setMessage("Check your email for a confirmation link to finish creating your account.");
        }
      } else if (isForgotPassword) {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${window.location.origin}/account/reset-password`,
          },
        );
        if (authError) throw authError;
        setMessage("If an account exists for that email, a password recovery link is on its way.");
      } else {
        if (password.length < 8) {
          throw new Error("Choose a password with at least 8 characters.");
        }
        if (password !== confirmPassword) {
          throw new Error("The passwords do not match.");
        }
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setMessage("Your password has been updated. You can now sign in.");
        setPassword("");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-white px-5 py-12 pt-28 sm:px-8">
      <section
        aria-labelledby="auth-title"
        className="w-full max-w-[448px] rounded-[40px] bg-cream px-7 py-10 sm:px-11 sm:py-12"
      >
        <h1
          id="auth-title"
          className="mb-9 text-center font-display text-[clamp(2.7rem,8vw,3.7rem)] leading-[1.05] tracking-tight text-ink italic"
        >
          {title}
        </h1>

        {isForgotPassword && (
          <p className="mb-7 text-center text-[14px] leading-6 text-ink/75">
            Please enter your email address and we’ll send you a recovery link.
          </p>
        )}
        {isResetPassword && (
          <p className="mb-7 text-center text-[14px] leading-6 text-ink/75">
            Choose a new password for your account.
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-2xl border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-[13px] leading-5 text-ink"
          >
            {error}
          </p>
        )}
        {message && (
          <p
            role="status"
            className="mb-5 rounded-2xl border border-ink/15 bg-white/50 px-4 py-3 text-[13px] leading-5 text-ink"
          >
            {message}
          </p>
        )}

        {!message ? (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <label className={labelClassName} htmlFor="first-name">
                    First name
                  </label>
                  <input
                    id="first-name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name *"
                    className={inputClassName}
                    required
                  />
                  <label className={labelClassName} htmlFor="last-name">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name *"
                    className={inputClassName}
                    required
                  />
                </div>
                <label className={labelClassName} htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  autoComplete="tel"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone (optional)"
                  className={inputClassName}
                />
                <label className={labelClassName} htmlFor="birth-date">
                  Date of birth
                </label>
                <input
                  id="birth-date"
                  autoComplete="bday"
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  aria-label="Date of birth (optional)"
                  className={`${inputClassName} text-ink/65`}
                />
              </>
            )}

            {!isResetPassword && (
              <>
                <label className={labelClassName} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="E-mail"
                  className={inputClassName}
                  required
                />
              </>
            )}

            {!isForgotPassword && (
              <>
                <label className={labelClassName} htmlFor="password">
                  {isResetPassword ? "New password" : "Password"}
                </label>
                <input
                  id="password"
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : isRegister
                        ? "new-password"
                        : "new-password"
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder={isResetPassword ? "New password" : "Password"}
                  minLength={isLogin ? undefined : 8}
                  className={inputClassName}
                  required
                />
                {isResetPassword && (
                  <>
                    <label className={labelClassName} htmlFor="confirm-password">
                      Confirm new password
                    </label>
                    <input
                      id="confirm-password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      type="password"
                      placeholder="Confirm new password"
                      minLength={8}
                      className={inputClassName}
                      required
                    />
                  </>
                )}
              </>
            )}

            {isLogin && (
              <div className="flex justify-end pb-1">
                <Link
                  href="/account/forgot-password"
                  className="text-[11px] font-medium uppercase tracking-wider text-ink underline underline-offset-4 hover:text-terracotta"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {isRegister && (
              <label className="flex items-start gap-3 px-1 py-2 text-[11px] leading-5 text-ink/80">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(event) => setNewsletter(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-ink"
                />
                <span>I’d like to receive occasional email updates.</span>
              </label>
            )}

            <Button
              variant="primary"
              type="submit"
              className="mt-2 h-12 w-full rounded-none [clip-path:polygon(3%_0,97%_0,100%_50%,97%_100%,3%_100%,0_50%)]"
              disabled={loading}
            >
              {loading
                ? "Please wait…"
                : isLogin
                  ? "Sign in"
                  : isRegister
                    ? "Sign up"
                    : isForgotPassword
                      ? "Recover"
                      : "Update password"}
            </Button>
          </form>
        ) : null}

        {isLogin && (
          <div className="mt-7 flex flex-col items-center gap-3 text-center text-[11px] font-medium uppercase tracking-wider">
            <p className="text-ink/70">
              New to OEA?{" "}
              <Link
                href="/account/register"
                className="text-ink underline underline-offset-4 hover:text-terracotta"
              >
                Sign up
              </Link>
            </p>
            <Link
              href="/account/subscription"
              className="text-ink underline underline-offset-4 hover:text-terracotta"
            >
              Manage my subscription
            </Link>
          </div>
        )}

        {isRegister && (
          <p className="mt-7 text-center text-[11px] font-medium uppercase tracking-wider text-ink/70">
            I already have an account?{" "}
            <Link
              href="/account/login"
              className="text-ink underline underline-offset-4 hover:text-terracotta"
            >
              Sign in
            </Link>
          </p>
        )}

        {(isForgotPassword || isResetPassword) && (
          <p className="mt-7 text-center text-[11px] font-medium uppercase tracking-wider">
            <Link
              href="/account/login"
              className="text-ink underline underline-offset-4 hover:text-terracotta"
            >
              Back to sign in
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
