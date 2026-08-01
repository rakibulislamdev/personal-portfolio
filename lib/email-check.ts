import disposableDomains from "disposable-email-domains";

/**
 * Checks if an email belongs to a disposable or temporary email provider.
 * Uses a local static list first, then falls back to a live free API (Debounce)
 * to catch newly created temporary domains (like bejum.com).
 */
export async function isDisposableEmail(email: string): Promise<boolean> {
  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (!emailDomain) return false;

  // 1. Offline Check (Fastest)
  if ((disposableDomains as string[]).includes(emailDomain)) {
    return true;
  }

  // 2. Online Check (Fallback for newer domains)
  try {
    // Limit wait time to 3 seconds so we don't slow down the user response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://disposable.debounce.io/?email=${encodeURIComponent(email)}`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return data.disposable === "true" || data.disposable === true;
    }
  } catch (err) {
    console.error("Disposable email API fallback check failed:", err);
  }

  return false;
}
