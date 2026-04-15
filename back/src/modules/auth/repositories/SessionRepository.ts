import database from "@/db";

export class SessionRepository {
  async create(userId: string, token: string) {
    return database.session.create({
      data: { userId, token },
      include: { user: true },
    });
  }

  async deleteByToken(token: string) {
    return database.session.deleteMany({ where: { token } });
  }

  async findByTokenWithUser(token: string) {
    return database.session.findUnique({
      where: { token },
      include: { user: true },
    });
  }
}

export const sessionRepository = new SessionRepository();
