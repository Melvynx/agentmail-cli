import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const webhooksResource = new Command("webhooks")
  .description("Manage webhooks");

webhooksResource
  .command("list")
  .description("List all webhooks")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/webhooks", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

webhooksResource
  .command("get")
  .description("Get a webhook by ID")
  .argument("<webhook_id>", "Webhook ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (webhookId: string, opts: any) => {
    try {
      const data = await client.get(`/webhooks/${webhookId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

webhooksResource
  .command("create")
  .description("Create a new webhook")
  .requiredOption("--url <url>", "Webhook URL")
  .option("--events <json>", "Events to subscribe to (JSON array)")
  .option("--pod-ids <json>", "Pod IDs to filter (JSON array)")
  .option("--inbox-ids <json>", "Inbox IDs to filter (JSON array)")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = { url: opts.url };
      if (opts.events) body.events = JSON.parse(opts.events);
      if (opts.podIds) body.pod_ids = JSON.parse(opts.podIds);
      if (opts.inboxIds) body.inbox_ids = JSON.parse(opts.inboxIds);
      const data = await client.post("/webhooks", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

webhooksResource
  .command("update")
  .description("Update a webhook")
  .argument("<webhook_id>", "Webhook ID")
  .option("--url <url>", "New webhook URL")
  .option("--events <json>", "Events to subscribe to (JSON array)")
  .option("--pod-ids <json>", "Pod IDs to filter (JSON array)")
  .option("--inbox-ids <json>", "Inbox IDs to filter (JSON array)")
  .option("--json", "Output as JSON")
  .action(async (webhookId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.url) body.url = opts.url;
      if (opts.events) body.events = JSON.parse(opts.events);
      if (opts.podIds) body.pod_ids = JSON.parse(opts.podIds);
      if (opts.inboxIds) body.inbox_ids = JSON.parse(opts.inboxIds);
      const data = await client.patch(`/webhooks/${webhookId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

webhooksResource
  .command("delete")
  .description("Delete a webhook")
  .argument("<webhook_id>", "Webhook ID")
  .option("--json", "Output as JSON")
  .action(async (webhookId: string, opts: any) => {
    try {
      await client.delete(`/webhooks/${webhookId}`);
      output({ deleted: true, id: webhookId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
