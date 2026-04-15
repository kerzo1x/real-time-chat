import { t } from "elysia";
import { BaseDTO } from "@/modules/util/http/dto/baseDTO";
import { UserModel } from "@/../prisma/generated/models";

export const userPublicSchema = t.Object({
  id: t.String(),
  email: t.String(),
  displayName: t.Union([t.String(), t.Null()]),
});

export type UserPublicData = typeof userPublicSchema.static;

export class UserPublicDTO extends BaseDTO<UserModel, UserPublicData> {
  schema = userPublicSchema;

  async convert(resource: UserModel) {
    return {
      id: resource.id,
      email: resource.email,
      displayName: resource.displayName,
    };
  }
}
