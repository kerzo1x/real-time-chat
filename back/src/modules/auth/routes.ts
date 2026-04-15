import { Elysia } from "elysia";
import { authService } from "@/modules/auth/services/AuthService";
import { loginBody } from "@/modules/auth/validation/login-body";
import { registerBody } from "@/modules/auth/validation/register-body";
import { AuthTokenDTO } from "@/modules/auth/dto/auth-token-dto";
import { UserPublicDTO } from "@/modules/auth/dto/user-public-dto";
import { SuccessDTO } from "@/modules/util/http/dto/successDTO";
import { authentificate } from "@/modules/auth/middlewares/authentificate";
import { sessionTokenService } from "@/modules/auth/services/SessionTokenService";

export const authModule = new Elysia({ prefix: "/api/auth", detail: { tags: ["Auth"] } })
  .post(
    "/register",
    async ({ body }) => {
      const data = await authService.register(body.email, body.password, body.displayName);
      return AuthTokenDTO.makeToResponse(data, "User registered successfully");
    },
    {
      body: registerBody,
      response: AuthTokenDTO.type(),
      detail: { summary: "Register" },
    },
  )
  .post(
    "/login",
    async ({ body }) => {
      const data = await authService.login(body.email, body.password);
      return AuthTokenDTO.makeToResponse(data, "User logged in successfully");
    },
    {
      body: loginBody,
      response: AuthTokenDTO.type(),
      detail: { summary: "Login" },
    },
  )
  .post(
    "/logout",
    async ({ headers }) => {
      const token = sessionTokenService.parseBearerHeader(headers.authorization);
      await authService.logout(token);
      return SuccessDTO.makeToResponse(null, "User logged out successfully");
    },
    {
      response: SuccessDTO.type(),
      detail: { summary: "Logout (invalidates current bearer token)" },
    },
  )
  .use(authentificate)
  .get(
    "/me",
    async ({ userPayload }) => {
      const profile = await authService.getProfile(userPayload.userId);
      return UserPublicDTO.makeToResponse(profile, "Profile loaded");
    },
    {
      response: UserPublicDTO.type(),
      detail: { summary: "Current user profile" },
    },
  );
