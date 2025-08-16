export function parseCookieConsent(raw) {
  if (!raw) return null;

  try {
    const decoded = decodeURIComponent(raw);

    const getBool = (key) => {
      const m = decoded.match(new RegExp(`${key}\\s*:\\s*(true|false)`));
      return m ? m[1] === "true" : undefined;
    };

    const stampMatch = decoded.match(/stamp\s*:\s*'([^']+)'/);
    const utcMatch = decoded.match(/utc\s*:\s*(\d{10,})/);

    return {
      stamp: stampMatch ? stampMatch[1] : undefined,
      necessary: getBool("necessary"),
      preferences: getBool("preferences"),
      statistics: getBool("statistics"),
      marketing: getBool("marketing"),
      utc: utcMatch ? Number(utcMatch[1]) : undefined,
      raw: decoded,
    };
  } catch {
    return null;
  }
}