export const AUTH_LIMITS = {
  EMAIL_MAX: 255,
  PASS_MIN: 8,
  PASS_MAX: 72,
  NAME_MIN: 2,
  NAME_MAX: 50,
  PASS_PATTERN: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'
} as const;