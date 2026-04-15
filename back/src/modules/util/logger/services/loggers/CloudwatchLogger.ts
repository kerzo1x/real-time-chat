import { LogEntry } from "@/modules/util/logger/types/LogEntry";

/** No-op stub — console-only deployment. */
class CloudwatchLogger {
  async log(_entry: LogEntry): Promise<void> {
    return;
  }
}

export const cloudwatchLogger = new CloudwatchLogger();
