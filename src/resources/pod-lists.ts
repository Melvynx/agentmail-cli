import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podListsResource = new Command("pod-lists")
  .description("Manage allow/block lists within a pod");

podListsResource
  .command("list")
  .description("List lists in a pod")
  .argument("<pod_id>", "Pod ID")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--list-type <type>", "Filter by list type")
  .option("--pattern <pattern>", "Filter by pattern")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      if (opts.listType) params.list_type = opts.listType;
      if (opts.pattern) params.pattern = opts.pattern;
      const data = await client.get(`/pods/${podId}/lists`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podListsResource
  .command("get")
  .description("Get a list in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<list_id>", "List ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, listId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/lists/${listId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podListsResource
  .command("create")
  .description("Create a list in a pod")
  .argument("<pod_id>", "Pod ID")
  .option("--list-type <type>", "List type (e.g. allow, block)")
  .option("--pattern <pattern>", "Pattern to match")
  .option("--description <desc>", "Description")
  .option("--json", "Output as JSON")
  .action(async (podId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.listType) body.list_type = opts.listType;
      if (opts.pattern) body.pattern = opts.pattern;
      if (opts.description) body.description = opts.description;
      const data = await client.post(`/pods/${podId}/lists`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podListsResource
  .command("delete")
  .description("Delete a list from a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<list_id>", "List ID")
  .option("--json", "Output as JSON")
  .action(async (podId: string, listId: string, opts: any) => {
    try {
      await client.delete(`/pods/${podId}/lists/${listId}`);
      output({ deleted: true, id: listId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
