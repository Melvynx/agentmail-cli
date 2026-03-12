import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const listsResource = new Command("lists")
  .description("Manage allow/block lists");

listsResource
  .command("list")
  .description("List all lists")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--list-type <type>", "Filter by list type")
  .option("--pattern <pattern>", "Filter by pattern")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      if (opts.listType) params.list_type = opts.listType;
      if (opts.pattern) params.pattern = opts.pattern;
      const data = await client.get("/lists", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

listsResource
  .command("get")
  .description("Get a list by ID")
  .argument("<list_id>", "List ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (listId: string, opts: any) => {
    try {
      const data = await client.get(`/lists/${listId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

listsResource
  .command("create")
  .description("Create a new list entry")
  .option("--list-type <type>", "List type (e.g. allow, block)")
  .option("--pattern <pattern>", "Pattern to match")
  .option("--description <desc>", "Description")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.listType) body.list_type = opts.listType;
      if (opts.pattern) body.pattern = opts.pattern;
      if (opts.description) body.description = opts.description;
      const data = await client.post("/lists", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

listsResource
  .command("delete")
  .description("Delete a list entry")
  .argument("<list_id>", "List ID")
  .option("--json", "Output as JSON")
  .action(async (listId: string, opts: any) => {
    try {
      await client.delete(`/lists/${listId}`);
      output({ deleted: true, id: listId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
