import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podThreadsResource = new Command("pod-threads")
  .description("Manage threads within a pod");

podThreadsResource
  .command("list")
  .description("List threads in a pod")
  .argument("<pod_id>", "Pod ID")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get(`/pods/${podId}/threads`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podThreadsResource
  .command("get")
  .description("Get a thread in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, threadId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/threads/${threadId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podThreadsResource
  .command("get-attachment")
  .description("Get a thread attachment in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<thread_id>", "Thread ID")
  .argument("<attachment_id>", "Attachment ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, threadId: string, attachmentId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/threads/${threadId}/attachments/${attachmentId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podThreadsResource
  .command("delete")
  .description("Delete a thread in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<thread_id>", "Thread ID")
  .option("--json", "Output as JSON")
  .action(async (podId: string, threadId: string, opts: any) => {
    try {
      await client.delete(`/pods/${podId}/threads/${threadId}`);
      output({ deleted: true, id: threadId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
