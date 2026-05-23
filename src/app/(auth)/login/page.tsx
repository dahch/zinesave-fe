"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  const handleResendVerification = async () => {
    if (!email) return;
    setIsResending(true);
    setResendSuccess("");
    setError("");
    try {
      const res = await api.post("/auth/resend-verification", { email });
      setResendSuccess(res.data.message || "Verification email sent");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error resending verification");
    } finally {
      setIsResending(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResendSuccess("");
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.access_token) {
        setToken(res.data.access_token);
        router.push("/dashboard");
      } else {
        setError(t('auth.login.unexpected_response'));
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError(t('auth.login.email_not_verified'));
      } else {
        setError(t('auth.login.invalid_credentials'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data } = await api.get("/auth/google");
      if (data.auth_url) window.location.href = data.auth_url;
    } catch (error) {
      setError(t('auth.google_error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-4">
      <div className="mb-8 flex items-center justify-center">
        <Logo scale="lg" linkToHome={false} />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-brand-orange">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-orange mb-4 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          <span>{t('auth.back')}</span>
        </Link>
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {t('auth.login.title')}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex flex-col items-start gap-2">
            <span>{error}</span>
            {error === t('auth.login.email_not_verified') && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={isResending}
                className="text-brand-orange font-medium hover:underline disabled:opacity-50"
              >
                {isResending ? t('auth.login.resend_sending') : t('auth.login.resend_verification')}
              </button>
            )}
          </div>
        )}

        {resendSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">
            {resendSuccess}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.email')}
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.password')}
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-brand-orange hover:underline"
            >
              {t('auth.login.forgot_password')}
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            {isLoading ? t('auth.login.logging_in') : t('auth.login.submit')}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">
            {t('auth.or_continue_with')}
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          className="gap-3 font-medium text-gray-700"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 4.62c1.61 0 3.1.56 4.28 1.69l3.21-3.21C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {t('auth.google')}
        </Button>

        <p className="mt-6 text-center text-sm text-gray-500">
          {t('auth.login.no_account')}{" "}
          <Link
            href="/register"
            className="text-brand-orange font-medium hover:underline"
          >
            {t('auth.login.register_link')}
          </Link>
        </p>
      </div>
    </div>
  );
}
