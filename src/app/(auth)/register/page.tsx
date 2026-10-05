"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";

const schema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    nim: z.string().regex(/^\d{8,12}$/, "NIM harus 8-12 digit angka"),
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirm: z.string().min(1, "Konfirmasi password wajib diisi"),
    terms: z.boolean().refine((v) => v === true, {
      message: "Kamu harus menyetujui syarat dan ketentuan",
    }),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Password tidak sama",
    path: ["confirm"],
  });
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Akun berhasil dibuat", {
      description: "Cek email kamu untuk kode verifikasi.",
    });
    router.push("/verify-email");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Buat Akun</h1>
        <p className="text-sm text-muted-foreground">
          Daftar untuk mulai memakai Campus Connect.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField label="Nama Lengkap" htmlFor="name" error={errors.name?.message}>
          <Input id="name" placeholder="Nama sesuai KTM" {...register("name")} />
        </FormField>

        <FormField label="NIM" htmlFor="nim" error={errors.nim?.message}>
          <Input id="nim" inputMode="numeric" placeholder="2305xxxxxx" {...register("nim")} />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" placeholder="nama@kampus.ac.id" {...register("email")} />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password?.message}>
          <PasswordInput id="password" placeholder="Minimal 8 karakter" {...register("password")} />
        </FormField>

        <FormField label="Konfirmasi Password" htmlFor="confirm" error={errors.confirm?.message}>
          <PasswordInput id="confirm" placeholder="Ulangi password" {...register("confirm")} />
        </FormField>

        <div className="space-y-1">
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" {...register("terms")} />
            <span>Saya menyetujui syarat dan ketentuan penggunaan portal.</span>
          </label>
          {errors.terms && (
            <p className="text-sm text-destructive">{errors.terms.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Memproses..." : "Daftar"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}