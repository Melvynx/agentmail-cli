import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const inboxesResource = new Command("inboxes")
  .description("Manage inboxes");

inboxesResource
  .command("list")
  .description("List all inboxes")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/inboxes", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inboxesResource
  .command("get")
  .description("Get an inbox by ID")
  .argument("<inbox_id>", "Inbox ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inboxesResource
  .command("create")
  .description("Create a new inbox")
  .option("--username <username>", "Username for the inbox")
  .option("--domain <domain>", "Domain for the inbox")
  .option("--display-name <name>", "Display name")
  .option("--client-id <id>", "Client ID")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.username) body.username = opts.username;
      if (opts.domain) body.domain = opts.domain;
      if (opts.displayName) body.display_name = opts.displayName;
      if (opts.clientId) body.client_id = opts.clientId;
      const data = await client.post("/inboxes", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inboxesResource
  .command("update")
  .description("Update an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .option("--display-name <name>", "New display name")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.displayName) body.display_name = opts.displayName;
      const data = await client.patch(`/inboxes/${inboxId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

inboxesResource
  .command("delete")
  .description("Delete an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, opts: any) => {
    try {
      await client.delete(`/inboxes/${inboxId}`);
      output({ deleted: true, id: inboxId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
