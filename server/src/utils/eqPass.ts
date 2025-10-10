const encoder = new TextEncoder;

export const isEqualHash = (hash1: string | null, hash2: string | null): boolean => {
  if (!hash1 || !hash2)
    return false;
  const buf1 = encoder.encode(hash1);
  const buf2 = encoder.encode(hash2);

  if (buf1.length !== buf2.length) {
    return false;
  }

  return crypto.subtle.timingSafeEqual(buf1, buf2);
}
