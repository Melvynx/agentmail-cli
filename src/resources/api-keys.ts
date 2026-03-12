import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const apiKeysResource = new Command("api-keys")
  .description("Manage API keys");

apiKeysResource
  .command("list")
  .description("List all API keys")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const data = await client.get("/api-keys");
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

apiKeysResource
  .command("create")
  .description("Create a new API key")
  .option("--name <name>", "Key name")
  .option("--pod-id <id>", "Pod ID to scope the key to")
  .option("--scopes <json>", "Scopes as JSON array")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      if (opts.podId) body.pod_id = opts.podId;
      if (opts.scopes) body.scopes = JSON.parse(opts.scopes);
      const data = await client.post("/api-keys", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

apiKeysResource
  .command("delete")
  .description("Delete an API key")
  .argument("<key_id>", "API key ID")
  .option("--json", "Output as JSON")
  .action(async (keyId: string, opts: any) => {
    try {
      await client.delete(`/api-keys/${keyId}`);
      output({ deleted: true, id: keyId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
