import { ApplicationException } from "@/modules/util/http/exceptions/ApplicationException";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

class SessionTokenService {
  generate(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(30));
    let out = "";
    for (let i = 0; i < 30; i++) {
      out += ALPHABET[bytes[i]! % ALPHABET.length];
    }
    return out;
  }

  parseBearerHeader(authorization: string | undefined): string {
    if (!authorization) {
      throw new ApplicationException("Authorization header is required", null, 401);
    }
    if (!authorization.startsWith("Bearer ")) {
      throw new ApplicationException("Expected Bearer token", null, 401);
    }
    const token = authorization.slice(7).trim();
    if (!token) {
      throw new ApplicationException("Bearer token is empty", null, 401);
    }
    return token;
  }
}

export const sessionTokenService = new SessionTokenService();
