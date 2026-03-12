import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const metricsResource = new Command("metrics")
  .description("Query metrics");

metricsResource
  .command("query")
  .description("Query org-wide metrics")
  .option("--start-date <date>", "Start date (ISO 8601)")
  .option("--end-date <date>", "End date (ISO 8601)")
  .option("--inbox-id <id>", "Filter by inbox ID")
  .option("--pod-id <id>", "Filter by pod ID")
  .option("--event-type <type>", "Filter by event type")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.startDate) params.start_date = opts.startDate;
      if (opts.endDate) params.end_date = opts.endDate;
      if (opts.inboxId) params.inbox_id = opts.inboxId;
      if (opts.podId) params.pod_id = opts.podId;
      if (opts.eventType) params.event_type = opts.eventType;
      const data = await client.get("/metrics", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

metricsResource
  .command("query-inbox")
  .description("Query metrics for a specific inbox")
  .argument("<inbox_id>", "Inbox ID")
  .option("--start-date <date>", "Start date (ISO 8601)")
  .option("--end-date <date>", "End date (ISO 8601)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.startDate) params.start_date = opts.startDate;
      if (opts.endDate) params.end_date = opts.endDate;
      const data = await client.get(`/inboxes/${inboxId}/metrics`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
