"use client";

import { useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField } from "@/components/shared/form-field";
import { validateEventForm, validateField } from "@/lib/validate-event-form";

// Bentuk data event, mengikuti tabel Events di dokumen "Penjelasan Proyek"
// (nama, waktu, lokasi). Form ini hanya butuh id, name, dan time.
export type EventOption = {
  id: string;
  name: string;
  time: string;
  location?: string;
};

// Data pendaftar, untuk tabel Event_Registrations (eventId mengacu ke Events.id).
export type RegistrationValues = {
  name: string;
  nim: string;
  email: string;
  eventId: string;
};

type FieldName = keyof RegistrationValues;
type FieldErrors = Record<FieldName, string>;

const EMPTY_ERRORS: FieldErrors = { name: "", nim: "", email: "", eventId: "" };

type DialogProps = {
  events: EventOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Event yang sudah terpilih saat tombol "Daftar Event" pada kartu event ditekan. */
  defaultEventId?: string;
  /** Dipanggil setelah form lolos validasi. */
  onSubmitted?: (values: RegistrationValues) => void;
};

export default function EventRegistrationDialog({
  events,
  open,
  onOpenChange,
  defaultEventId = "",
  onSubmitted,
}: DialogProps) {
  // Dialog ini dibuka dari tombol biasa (bukan DialogTrigger), jadi Radix tidak
  // mengembalikan fokus sendiri. Kita simpan elemen yang fokus sebelum dialog
  // terbuka, lalu fokuskan lagi saat dialog ditutup.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={() => {
          returnFocusRef.current = document.activeElement as HTMLElement | null;
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusRef.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Daftar Event</DialogTitle>
          <DialogDescription>
            Isi data diri kamu untuk mendaftar ke event pilihan.
          </DialogDescription>
        </DialogHeader>
        {/* Form hanya dirender saat dialog terbuka, jadi state otomatis ter-reset. */}
        <RegistrationForm
          events={events}
          defaultEventId={defaultEventId}
          onCancel={() => onOpenChange(false)}
          onDone={(values) => {
            onSubmitted?.(values);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

type FormProps = {
  events: EventOption[];
  defaultEventId: string;
  onCancel: () => void;
  onDone: (values: RegistrationValues) => void;
};

function RegistrationForm({ events, defaultEventId, onCancel, onDone }: FormProps) {
  const uid = useId();
  const ids: Record<FieldName, string> = {
    name: `${uid}-name`,
    nim: `${uid}-nim`,
    email: `${uid}-email`,
    eventId: `${uid}-event`,
  };

  const validEventIds = events.map((event) => event.id);
  const initialEventId = validEventIds.includes(defaultEventId) ? defaultEventId : "";

  const [values, setValues] = useState<RegistrationValues>({
    name: "",
    nim: "",
    email: "",
    eventId: initialEventId,
  });
  const [errors, setErrors] = useState<FieldErrors>(EMPTY_ERRORS);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    nim: false,
    email: false,
    eventId: false,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Setelah field pernah disentuh, error diperbarui langsung saat mengetik.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value, validEventIds) }));
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field], validEventIds),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateEventForm(values, validEventIds);
    setErrors(result.errors);
    setTouched({ name: true, nim: true, email: true, eventId: true });

    if (!result.isValid) {
      const firstInvalid = (Object.keys(result.errors) as FieldName[]).find(
        (field) => result.errors[field] !== ""
      );
      if (firstInvalid) document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setSubmitting(true);
    // Simulasi pengiriman. Ganti dengan request ke backend jika sudah ada.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);

    const chosen = events.find((event) => event.id === values.eventId);
    toast.success("Pendaftaran berhasil", {
      description: chosen ? `Kamu terdaftar di ${chosen.name}.` : undefined,
    });
    onDone({
      ...values,
      name: values.name.trim(),
      nim: values.nim.trim(),
      email: values.email.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField label="Nama Lengkap" htmlFor={ids.name} error={errors.name}>
        <Input
          id={ids.name}
          placeholder="Nama sesuai KTM"
          value={values.name}
          aria-invalid={errors.name !== ""}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />
      </FormField>

      <FormField label="NIM" htmlFor={ids.nim} error={errors.nim}>
        <Input
          id={ids.nim}
          inputMode="numeric"
          maxLength={12}
          placeholder="Contoh: 251401136"
          value={values.nim}
          aria-invalid={errors.nim !== ""}
          onChange={(e) => handleChange("nim", e.target.value)}
          onBlur={() => handleBlur("nim")}
        />
      </FormField>

      <FormField label="Email" htmlFor={ids.email} error={errors.email}>
        <Input
          id={ids.email}
          type="email"
          placeholder="nama@students.usu.ac.id"
          value={values.email}
          aria-invalid={errors.email !== ""}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
      </FormField>

      <FormField label="Event" htmlFor={ids.eventId} error={errors.eventId}>
        <select
          id={ids.eventId}
          value={values.eventId}
          aria-invalid={errors.eventId !== ""}
          onChange={(e) => handleChange("eventId", e.target.value)}
          onBlur={() => handleBlur("eventId")}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
        >
          <option value="" className="bg-popover text-popover-foreground">
            Pilih event
          </option>
          {events.map((event) => (
            <option
              key={event.id}
              value={event.id}
              className="bg-popover text-popover-foreground"
            >
              {event.name} ({event.time})
            </option>
          ))}
        </select>
      </FormField>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Batal
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Memproses..." : "Daftar Event"}
        </Button>
      </DialogFooter>
    </form>
  );
}
