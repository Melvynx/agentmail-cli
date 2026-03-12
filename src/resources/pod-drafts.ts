import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podDraftsResource = new Command("pod-drafts")
  .description("Manage drafts within a pod");

podDraftsResource
  .command("list")
  .description("List drafts in a pod")
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
      const data = await client.get(`/pods/${podId}/drafts`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDraftsResource
  .command("get")
  .description("Get a draft in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<draft_id>", "Draft ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, draftId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/drafts/${draftId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDraftsResource
  .command("get-attachment")
  .description("Get a draft attachment in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<draft_id>", "Draft ID")
  .argument("<attachment_id>", "Attachment ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, draftId: string, attachmentId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/drafts/${draftId}/attachments/${attachmentId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
