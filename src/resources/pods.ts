import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podsResource = new Command("pods")
  .description("Manage pods");

podsResource
  .command("list")
  .description("List all pods")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/pods", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podsResource
  .command("get")
  .description("Get a pod by ID")
  .argument("<pod_id>", "Pod ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podsResource
  .command("create")
  .description("Create a new pod")
  .option("--name <name>", "Pod name")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.name) body.name = opts.name;
      const data = await client.post("/pods", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podsResource
  .command("delete")
  .description("Delete a pod")
  .argument("<pod_id>", "Pod ID")
  .option("--json", "Output as JSON")
  .action(async (podId: string, opts: any) => {
    try {
      await client.delete(`/pods/${podId}`);
      output({ deleted: true, id: podId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
