import database from "@/db";
import { UserWhereInput } from "@/../prisma/generated/models";

export class UserRepository {
  async create(data: { email: string; passwordHash: string; displayName?: string | null }) {
    return database.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        displayName: data.displayName ?? null,
      },
    });
  }

  async deleteById(id: string) {
    return database.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return database.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return database.user.findUnique({ where: { id } });
  }

  async search(excludeUserId: string, query: string, take: number) {
    const q = query.trim();
    const where: UserWhereInput = {
      id: { not: excludeUserId },
    };
    if (q) {
      where.OR = [
        { email: { contains: q, mode: "insensitive" } },
        { displayName: { contains: q, mode: "insensitive" } },
      ];
    }
    
    return database.user.findMany({
      where,
      take,
      orderBy: { email: "asc" },
      select: { id: true, email: true, displayName: true },
    });
  }
}

export const userRepository = new UserRepository();
