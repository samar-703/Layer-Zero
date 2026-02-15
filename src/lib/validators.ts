import type { ValidationResult } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitize(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

export function validateEmail(email: unknown): ValidationResult {
  if (typeof email !== "string" || !email) {
    return { valid: false, error: "Email is required." };
  }

  const cleaned = sanitize(email);

  if (!EMAIL_REGEX.test(cleaned)) {
    return { valid: false, error: "Invalid email format." };
  }

  return { valid: true };
}

export function validateWaitlistForm(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required." };
  }

  const { email } = body as Record<string, unknown>;
  return validateEmail(email);
}

export function validateContactForm(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required." };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return { valid: false, error: "Name is required." };
  }

  if (name.trim().length > 200) {
    return { valid: false, error: "Name must be under 200 characters." };
  }

  const emailResult = validateEmail(email);
  if (!emailResult.valid) {
    return emailResult;
  }

  if (typeof message !== "string" || !message.trim()) {
    return { valid: false, error: "Message is required." };
  }

  if (message.trim().length > 2000) {
    return { valid: false, error: "Message must be under 2000 characters." };
  }

  return { valid: true };
}
