import { Elysia, ValidationError } from "elysia";
import { ApplicationException } from "@/modules/util/http/exceptions/ApplicationException";
import { CriticalException } from "@/modules/util/http/exceptions/CriticalException";
import { logger } from "@/modules/util/logger/services/Logger";
import env from "@/config/env";

export const exceptionHandler = new Elysia().onError(
  { as: "scoped" },
  ({ error, code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        status: "ERROR",
        code: "NOT_FOUND",
        message: "Route not found",
      };
    }

    if (error instanceof ApplicationException) {
      set.status = error.statusCode;
      return {
        status: "ERROR",
        code: "APPLICATION_ERROR",
        message: error.message,
      };
    }

    if (error instanceof CriticalException) {
      logger.critical(error.message, {
        type: "CriticalException",
        stack: error.stack,
      });
      set.status = 500;
      return {
        status: "ERROR",
        code: "CRITICAL_ERROR",
        message: "Critical error occurred",
      };
    }

    if (error instanceof ValidationError) {
      set.status = 422;
      return {
        status: "ERROR",
        code: "VALIDATION_ERROR",
        message: "Validation error occurred",
        errors: error.all,
      };
    }

    logger.error("Unknown error occurred", {
      type: "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (env.NODE_ENV !== "development") {
      set.status = 500;
      return {
        status: "ERROR",
        message: "Unknown error occurred",
      };
    }
    throw error;
  },
);