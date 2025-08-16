export function readCookie(name) {
  const m = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)
  );
  return m ? m[1] : null;
}