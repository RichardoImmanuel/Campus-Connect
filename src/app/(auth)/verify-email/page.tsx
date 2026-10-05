"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  async function verify() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Email terverifikasi");
    router.push("/dashboard");
  }

  function resend() {
    toast.info("Kode baru telah dikirim");
    setSeconds(30);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Verifikasi Email</h1>
        <p className="text-sm text-muted-foreground">
          Masukkan 6 digit kode yang kami kirim ke email kamu.
        </p>
      </div>

      <Input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputMode="numeric"
        placeholder="000000"
        className="text-center text-2xl tracking-[0.5em]"
        aria-label="Kode verifikasi"
      />

      <Button className="w-full" disabled={code.length !== 6 || loading} onClick={verify}>
        {loading ? "Memverifikasi..." : "Verifikasi"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {seconds > 0 ? (
          <>Kirim ulang kode dalam {seconds} detik</>
        ) : (
          <button onClick={resend} className="font-medium text-primary hover:underline">
            Kirim ulang kode
          </button>
        )}
      </div>
    </div>
  );
}