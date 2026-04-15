import { PrismaClient } from "../node_modules/.prisma/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import env from "@/config/env";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;