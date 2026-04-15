import { t } from "elysia";
import { AUTH_LIMITS } from "./limits";

export const loginBody = t.Object({
  email: t.String({ 
    format: 'email', 
    maxLength: AUTH_LIMITS.EMAIL_MAX,
    description: "User email" 
  }),
  password: t.String({ 
    maxLength: AUTH_LIMITS.PASS_MAX, 
    description: "User password" 
  }),
});

export type LoginBody = typeof loginBody.static;