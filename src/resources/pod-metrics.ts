import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podMetricsResource = new Command("pod-metrics")
  .description("Query metrics within a pod");

podMetricsResource
  .command("query")
  .description("Query metrics for a pod")
  .argument("<pod_id>", "Pod ID")
  .option("--start-date <date>", "Start date (ISO 8601)")
  .option("--end-date <date>", "End date (ISO 8601)")
  .option("--event-type <type>", "Filter by event type")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.startDate) params.start_date = opts.startDate;
      if (opts.endDate) params.end_date = opts.endDate;
      if (opts.eventType) params.event_type = opts.eventType;
      const data = await client.get(`/pods/${podId}/metrics`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
