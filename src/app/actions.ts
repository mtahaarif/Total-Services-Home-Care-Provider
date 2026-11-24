"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[\d\s()+.-]{7,}$/;

function field(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim().slice(0, 2000);
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Sends a submission by email through Resend when configured:
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, (optional) CONTACT_FROM_EMAIL
 * Without configuration it logs the submission in development and reports
 * failure in production, so no lead is silently dropped.
 */
async function deliver(subject: string, rows: [string, string][], replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.info(`[form] ${subject}\n` + rows.map(([k, v]) => `  ${k}: ${v}`).join("\n"));
    return process.env.NODE_ENV !== "production";
  }
  const html = `<h2>${escape(subject)}</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escape(k)}</strong></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Total Services Website <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        ...(replyTo && { reply_to: replyTo }),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const failure: FormState = {
  status: "error",
  message: "Sorry — your message couldn't be sent right now. Please call us at (215) 200-2666.",
};

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (field(fd, "company")) return { status: "success" }; // honeypot

  const name = field(fd, "name");
  const phone = field(fd, "phone");
  const email = field(fd, "email");
  const relationship = field(fd, "relationship");
  const message = field(fd, "message");
  const interests = fd.getAll("services").map(String).join(", ");

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!phone && !email) errors.phone = "Please share a phone number or email so we can reach you.";
  if (phone && !PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (email && !EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const ok = await deliver(
    `New care inquiry from ${name}`,
    [
      ["Name", name],
      ["Phone", phone || "—"],
      ["Email", email || "—"],
      ["Care is for", relationship || "—"],
      ["Interested in", interests || "—"],
      ["Message", message || "—"],
    ],
    email || undefined,
  );
  if (!ok) return failure;
  return { status: "success", message: `Thank you, ${name.split(" ")[0]}! We'll be in touch shortly.` };
}

export async function submitApplication(_prev: FormState, fd: FormData): Promise<FormState> {
  if (field(fd, "company")) return { status: "success" };

  const firstName = field(fd, "firstName");
  const lastName = field(fd, "lastName");
  const phone = field(fd, "phone");
  const email = field(fd, "email");
  const position = field(fd, "position");
  const availability = field(fd, "availability");
  const experience = field(fd, "experience");
  const message = field(fd, "message");

  const errors: Record<string, string> = {};
  if (!firstName) errors.firstName = "Required.";
  if (!lastName) errors.lastName = "Required.";
  if (!PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const ok = await deliver(
    `Caregiver application: ${firstName} ${lastName}`,
    [
      ["Name", `${firstName} ${lastName}`],
      ["Phone", phone],
      ["Email", email],
      ["Position", position || "—"],
      ["Availability", availability || "—"],
      ["Experience", experience || "—"],
      ["About", message || "—"],
    ],
    email,
  );
  if (!ok) return failure;
  return { status: "success", message: `Thanks, ${firstName}! We've received your application and will reach out soon.` };
}
