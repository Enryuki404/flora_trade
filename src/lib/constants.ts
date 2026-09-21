export const WA_NUMBER = "6281234567890";

export const WA_DEFAULT_MESSAGE = "Halo FloraTrade saya mau konsultasi ekspor flora 🌿";

export function waLink(message?: string): string {
  const msg = message ?? WA_DEFAULT_MESSAGE;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const WA_LINK = waLink();
