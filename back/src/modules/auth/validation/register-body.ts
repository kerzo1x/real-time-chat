import { t } from "elysia";
import { AUTH_LIMITS } from "./limits";

export const registerBody = t.Object({
  email: t.String({
    format: 'email',
    maxLength: AUTH_LIMITS.EMAIL_MAX,
    description: "Unique user email"
  }),
  
  password: t.String({
    minLength: AUTH_LIMITS.PASS_MIN,
    maxLength: AUTH_LIMITS.PASS_MAX,
    pattern: AUTH_LIMITS.PASS_PATTERN,
    description: `Password (${AUTH_LIMITS.PASS_MIN}-${AUTH_LIMITS.PASS_MAX} chars, must include A, a, 1)`
  }),
  
  displayName: t.Optional(
    t.String({
      minLength: AUTH_LIMITS.NAME_MIN,
      maxLength: AUTH_LIMITS.NAME_MAX,
      description: "Public chat name"
    })
  ),
});

export type RegisterBody = typeof registerBody.static;