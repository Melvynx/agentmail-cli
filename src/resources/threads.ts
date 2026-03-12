import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const threadsResource = new Command("threads")
  .description("Manage threads");

threadsResource
  .command("list")
  .description("List threads in an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get(`/inboxes/${inboxId}/threads`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

threadsResource
  .command("get")
  .description("Get a thread in an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, threadId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/threads/${threadId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

threadsResource
  .command("delete")
  .description("Delete a thread in an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, threadId: string, opts: any) => {
    try {
      await client.delete(`/inboxes/${inboxId}/threads/${threadId}`);
      output({ deleted: true, id: threadId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

threadsResource
  .command("list-all")
  .description("List all threads (org-wide)")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/threads", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

threadsResource
  .command("get-all")
  .description("Get a thread (org-wide)")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (threadId: string, opts: any) => {
    try {
      const data = await client.get(`/threads/${threadId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

threadsResource
  .command("delete-all")
  .description("Delete a thread (org-wide)")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .action(async (threadId: string, opts: any) => {
    try {
      await client.delete(`/threads/${threadId}`);
      output({ deleted: true, id: threadId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
