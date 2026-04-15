import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

import { exceptionHandler } from "./modules/util/http/middlewares/exception-handler";

const app = new Elysia()
.use(cors())
.use(swagger())
.use(exceptionHandler)
.get("/", () => ({ status: "ok", message: "Questionaire API is running" }))





.listen(3000);
console.log(
  ` \x1b[32m>> 🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}\x1b[0m`
);
