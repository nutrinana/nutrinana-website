export function formatConsentDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    const month = d.toLocaleString("default", { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();
    let time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    // Ensure AM/PM is uppercase
    time = time.replace(/\s?(am|pm)$/i, (m) => m.toUpperCase());
    // Local time only, no GMT offset
    return `${month} ${day}, ${year} at ${time}`;
  } catch {
    return null;
  }
}
