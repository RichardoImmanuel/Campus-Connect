// Validasi form pendaftaran event (Poin 11).
// Ditulis dengan JavaScript biasa, tanpa library validasi.
// Setiap fungsi mengembalikan string pesan error, atau "" jika input valid.

export const NIM_PATTERN = /^\d{8,12}$/;
export const NAME_PATTERN = /^[A-Za-z .,'-]+$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} value
 * @returns {string}
 */
export function validateName(value) {
  const name = value.trim();
  if (name === "") return "Nama wajib diisi";
  if (name.length < 3) return "Nama minimal 3 karakter";
  if (name.length > 100) return "Nama maksimal 100 karakter";
  if (!NAME_PATTERN.test(name)) return "Nama hanya boleh berisi huruf dan spasi";
  return "";
}

/**
 * @param {string} value
 * @returns {string}
 */
export function validateNim(value) {
  const nim = value.trim();
  if (nim === "") return "NIM wajib diisi";
  if (!/^\d+$/.test(nim)) return "NIM hanya boleh berisi angka";
  if (!NIM_PATTERN.test(nim)) return "NIM harus 8-12 digit";
  return "";
}

/**
 * @param {string} value
 * @returns {string}
 */
export function validateEmail(value) {
  const email = value.trim();
  if (email === "") return "Email wajib diisi";
  if (email.length > 254) return "Email terlalu panjang";
  if (!EMAIL_PATTERN.test(email)) return "Format email tidak valid";
  return "";
}

/**
 * @param {string} value id event yang dipilih
 * @param {string[]} validEventIds daftar id event yang tersedia
 * @returns {string}
 */
export function validateEventChoice(value, validEventIds) {
  if (value === "") return "Pilih salah satu event";
  if (!validEventIds.includes(value)) return "Event yang dipilih tidak tersedia";
  return "";
}

/**
 * Validasi satu field (dipakai saat blur / mengetik).
 * @param {"name" | "nim" | "email" | "eventId"} field
 * @param {string} value
 * @param {string[]} validEventIds
 * @returns {string}
 */
export function validateField(field, value, validEventIds) {
  switch (field) {
    case "name":
      return validateName(value);
    case "nim":
      return validateNim(value);
    case "email":
      return validateEmail(value);
    case "eventId":
      return validateEventChoice(value, validEventIds);
    default:
      return "";
  }
}

/**
 * Validasi seluruh form (dipakai saat submit).
 * @param {{ name: string, nim: string, email: string, eventId: string }} values
 * @param {string[]} validEventIds
 * @returns {{ errors: { name: string, nim: string, email: string, eventId: string }, isValid: boolean }}
 */
export function validateEventForm(values, validEventIds) {
  const errors = {
    name: validateName(values.name),
    nim: validateNim(values.nim),
    email: validateEmail(values.email),
    eventId: validateEventChoice(values.eventId, validEventIds),
  };
  const isValid = Object.values(errors).every((message) => message === "");
  return { errors, isValid };
}
