import { t } from "elysia";
import { BaseDTO } from "@/modules/util/http/dto/baseDTO";
import { userPublicSchema } from "@/modules/auth/dto/user-public-dto";
import { UserModel } from "@/../prisma/generated/models/User";
import { UserPublicDTO } from "@/modules/auth/dto/user-public-dto";

export const authTokenSchema = t.Object({
  bearerToken: t.String(),
  user: userPublicSchema,
});

export type AuthTokenData = typeof authTokenSchema.static;

export class AuthTokenDTO extends BaseDTO<{ bearerToken: string; user: UserModel }, AuthTokenData> {
  schema = authTokenSchema;

  async convert(resource: { bearerToken: string; user: UserModel }) {
    return {
      bearerToken: resource.bearerToken,
      user: await UserPublicDTO.make(resource.user),
    };
  }
}
