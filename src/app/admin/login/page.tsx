"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message || "Email hoặc mật khẩu không chính xác.");
          setLoading(false);
          return;
        }

        if (data.session) {
          localStorage.setItem("kiho_admin_session", "true");
          router.push("/admin");
          return;
        }
      } else {
        // Mock demo login bypass khi chưa cấu hình Supabase
        if (email && password) {
          localStorage.setItem("kiho_admin_session", "true");
          router.push("/admin");
          return;
        } else {
          setErrorMsg("Vui lòng nhập đầy đủ email và mật khẩu.");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Lỗi đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto shadow-lg">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            KIHO CAMERA ADMIN
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Đăng nhập để quản lý thiết bị, giá và nội dung website
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email quản trị
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kihocamera.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors placeholder:text-slate-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors placeholder:text-slate-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm active:scale-[0.99]"
          >
            <span>{loading ? "Đang xử lý..." : "Đăng nhập hệ thống"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Xác thực an toàn với Supabase Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
