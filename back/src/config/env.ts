import { cleanEnv, num, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  DATABASE_URL: str(),
  NODE_ENV: str({ default: "production" }),
});
