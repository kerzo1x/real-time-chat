import { t } from "elysia";
import { BaseDTO } from "@/modules/util/http/dto/baseDTO";

export const successSchema = t.Object({});
export type SuccessSchema = typeof successSchema.static;

export class SuccessDTO extends BaseDTO<null | undefined, SuccessSchema> {
  schema = successSchema;
  async convert(_resource: null | undefined) {
    return {};
  }
}
