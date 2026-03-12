import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const draftsResource = new Command("drafts")
  .description("Manage drafts in an inbox");

draftsResource
  .command("list")
  .description("List drafts in an inbox")
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
      const data = await client.get(`/inboxes/${inboxId}/drafts`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("get")
  .description("Get a specific draft")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<draft_id>", "Draft ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, draftId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/drafts/${draftId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("create")
  .description("Create a new draft")
  .argument("<inbox_id>", "Inbox ID")
  .option("--to <addresses>", "Recipient email addresses (comma-separated)")
  .option("--subject <subject>", "Email subject")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--cc <addresses>", "CC addresses (comma-separated)")
  .option("--bcc <addresses>", "BCC addresses (comma-separated)")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.to) body.to = opts.to.split(",").map((s: string) => s.trim());
      if (opts.subject) body.subject = opts.subject;
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      if (opts.cc) body.cc = opts.cc.split(",").map((s: string) => s.trim());
      if (opts.bcc) body.bcc = opts.bcc.split(",").map((s: string) => s.trim());
      const data = await client.post(`/inboxes/${inboxId}/drafts`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("update")
  .description("Update a draft")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<draft_id>", "Draft ID")
  .option("--to <addresses>", "Recipient email addresses (comma-separated)")
  .option("--subject <subject>", "Email subject")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, draftId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.to) body.to = opts.to.split(",").map((s: string) => s.trim());
      if (opts.subject) body.subject = opts.subject;
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      const data = await client.patch(`/inboxes/${inboxId}/drafts/${draftId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("delete")
  .description("Delete a draft")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<draft_id>", "Draft ID")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, draftId: string, opts: any) => {
    try {
      await client.delete(`/inboxes/${inboxId}/drafts/${draftId}`);
      output({ deleted: true, id: draftId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("send")
  .description("Send a draft")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<draft_id>", "Draft ID")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, draftId: string, opts: any) => {
    try {
      const data = await client.post(`/inboxes/${inboxId}/drafts/${draftId}/send`, {});
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("get-attachment")
  .description("Get a draft attachment")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<draft_id>", "Draft ID")
  .argument("<attachment_id>", "Attachment ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, draftId: string, attachmentId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/drafts/${draftId}/attachments/${attachmentId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("list-all")
  .description("List all drafts (org-wide)")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/drafts", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("get-all")
  .description("Get a draft (org-wide)")
  .argument("<draft_id>", "Draft ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (draftId: string, opts: any) => {
    try {
      const data = await client.get(`/drafts/${draftId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

draftsResource
  .command("get-attachment-all")
  .description("Get a draft attachment (org-wide)")
  .argument("<draft_id>", "Draft ID")
  .argument("<attachment_id>", "Attachment ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (draftId: string, attachmentId: string, opts: any) => {
    try {
      const data = await client.get(`/drafts/${draftId}/attachments/${attachmentId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
