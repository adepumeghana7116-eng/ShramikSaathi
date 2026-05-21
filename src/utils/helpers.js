export function calcAge(dob) {
  const parts = dob.split("/");
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);

  if (!day || !month || !year) return null;

  const birth = new Date(year, month - 1, day);
  const today = new Date(2026, 4, 17);

  let age = today.getFullYear() - birth.getFullYear();

  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function maskAadhaar(num) {
  const digits = num.replace(/\D/g, "");
  return "•••• •••• " + digits.slice(-4).padEnd(4, "•");
}

export function buildWhatsApp(phone, user, catName, jobLocation) {
  const msg = encodeURIComponent(
    `Application Notification via Shramik Saathi:
Name: ${user.name}
Phone: ${user.phone}
Job Selected: ${catName} at ${jobLocation}
[Identity Status: Authenticated on Device]`
  );

  return `https://wa.me/91${phone}?text=${msg}`;
}

export function loadLocal(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}

export function saveLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}