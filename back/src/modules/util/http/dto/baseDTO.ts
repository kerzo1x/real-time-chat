import { t } from "elysia";
import { TObject } from "@sinclair/typebox";

export abstract class BaseDTO<RESOURCE, RESPONSE> {
  abstract schema: TObject;

  static async makeToResponse(resource: unknown, message: string | null = null) {
    const instance = new (this as any)();
    const data = await instance.convert(resource);
    return this.wrapData(data, message);
  }

  static async make(resource: unknown) {
    const instance = new (this as any)();
    return await instance.convert(resource);
  }

  static async collectToResponse(resources: unknown[], message: string | null) {
    const data = await Promise.all(
      resources.map(async (resource) => {
        const instance = new (this as any)();
        return await instance.convert(resource);
      }),
    );
    return this.wrapData(data, message);
  }

  static type() {
    const instance = new (this as any)();
    return instance.getType();
  }

  static types() {
    const instance = new (this as any)();
    return instance.getTypes();
  }

  static wrapData(data: unknown, message: string | null) {
    return {
      status: "SUCCESS",
      message: message ?? "Operation successful",
      data,
    };
  }

  abstract convert(resource: RESOURCE): Promise<RESPONSE>;

  getType() {
    return t.Object({
      status: t.String(),
      message: t.String(),
      data: this.schema,
    });
  }

  getTypes() {
    return t.Object({
      status: t.String(),
      message: t.String(),
      data: t.Array(this.schema),
    });
  }
}
