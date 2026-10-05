"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";

const schema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    setSentTo(data.email);
  }

  if (sentTo) {
    return (
      <div className="space-y-6 text-center">
        <MailCheck className="mx-auto h-12 w-12 text-primary" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Cek email kamu</h1>
          <p className="text-sm text-muted-foreground">
            Kami mengirim tautan reset password ke <b>{sentTo}</b>.
          </p>
        </div>
        <Button variant="outline" className="w-full" onClick={() => setSentTo(null)}>
          Kirim ulang
        </Button>
        <Link href="/login" className="block text-sm text-primary hover:underline">
          Kembali ke login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Lupa Password</h1>
        <p className="text-sm text-muted-foreground">
          Masukkan email dan kami kirim tautan untuk mengatur ulang password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" placeholder="nama@kampus.ac.id" {...register("email")} />
        </FormField>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke login
      </Link>
    </div>
  );
}