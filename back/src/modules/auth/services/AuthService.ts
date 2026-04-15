import { ApplicationException } from "@/modules/util/http/exceptions/ApplicationException";
import { userRepository } from "@/modules/auth/repositories/UserRepository";
import { sessionRepository } from "@/modules/auth/repositories/SessionRepository";
import { sessionTokenService } from "@/modules/auth/services/SessionTokenService";
import { UserModel } from "@/../prisma/generated/models";

class AuthService {
  async register(email: string, password: string, displayName?: string): Promise<{ bearerToken: string; user: UserModel }> {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new ApplicationException("User with this email already exists", null, 409);
    }

    const passwordHash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const token = sessionTokenService.generate();
    //later use prisma.$transaction
    try {
      const user = await userRepository.create({
        email,
        passwordHash,
        displayName: displayName?.trim() || null,
      });
      try {
        await sessionRepository.create(user.id, token);
      } catch (sessionErr) {
        await userRepository.deleteById(user.id).catch(() => {});
        throw new ApplicationException("Registration failed", sessionErr);
      }
      return {
        bearerToken: token,
        user,
      };
    } catch (e) {
      if (e instanceof ApplicationException) {
        throw e;
      }
      throw new ApplicationException("Registration failed", e);
    }
  }

  async login(email: string, password: string): Promise<{ bearerToken: string; user: UserModel }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApplicationException("Invalid email or password", null, 401);
    }

    const ok = await Bun.password.verify(password, user.passwordHash);
    if (!ok) {
      throw new ApplicationException("Invalid email or password", null, 401);
    }

    const token = sessionTokenService.generate();
    await sessionRepository.create(user.id, token);

    return {
      bearerToken: token,
      user,
    };
  }

  async logout(token: string) {
    const deleted = await sessionRepository.deleteByToken(token);
    if (deleted.count === 0) {
      throw new ApplicationException("Session not found or already logged out", null, 404);
    }
  }

  async getProfile(userId: string): Promise<UserModel> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApplicationException("User not found", null, 404);
    }
    return user;
  }
}

export const authService = new AuthService();
