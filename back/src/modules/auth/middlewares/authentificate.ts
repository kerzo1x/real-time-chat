import { Elysia } from "elysia";
import { ApplicationException } from "@/modules/util/http/exceptions/ApplicationException";
import { sessionTokenService } from "@/modules/auth/services/SessionTokenService";
import { sessionRepository } from "@/modules/auth/repositories/SessionRepository";
import type { UserPayload } from "@/modules/auth/types/user-payload";

export const authentificate = new Elysia().derive({ as: "scoped" }, async ({ headers }) => {
  const token = sessionTokenService.parseBearerHeader(headers.authorization);
  const session = await sessionRepository.findByTokenWithUser(token);
  if (!session) {
    throw new ApplicationException("Invalid or expired session", null, 401);
  }
  return {
    userPayload: {
      userId: session.user.id,
      email: session.user.email,
    } as UserPayload,
  };
});
