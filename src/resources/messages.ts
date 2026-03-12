import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const messagesResource = new Command("messages")
  .description("Manage messages in an inbox");

messagesResource
  .command("list")
  .description("List messages in an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--labels <labels>", "Filter by labels")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      if (opts.labels) params.labels = opts.labels;
      const data = await client.get(`/inboxes/${inboxId}/messages`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("get")
  .description("Get a specific message")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/messages/${messageId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("send")
  .description("Send a message from an inbox")
  .argument("<inbox_id>", "Inbox ID")
  .requiredOption("--to <addresses>", "Recipient email addresses (comma-separated)")
  .requiredOption("--subject <subject>", "Email subject")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--cc <addresses>", "CC addresses (comma-separated)")
  .option("--bcc <addresses>", "BCC addresses (comma-separated)")
  .option("--reply-to <address>", "Reply-to address")
  .option("--labels <json>", "Labels as JSON array")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {
        to: opts.to.split(",").map((s: string) => s.trim()),
        subject: opts.subject,
      };
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      if (opts.cc) body.cc = opts.cc.split(",").map((s: string) => s.trim());
      if (opts.bcc) body.bcc = opts.bcc.split(",").map((s: string) => s.trim());
      if (opts.replyTo) body.reply_to = opts.replyTo;
      if (opts.labels) body.labels = JSON.parse(opts.labels);
      const data = await client.post(`/inboxes/${inboxId}/messages/send`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("reply")
  .description("Reply to a message")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--cc <addresses>", "CC addresses (comma-separated)")
  .option("--bcc <addresses>", "BCC addresses (comma-separated)")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      if (opts.cc) body.cc = opts.cc.split(",").map((s: string) => s.trim());
      if (opts.bcc) body.bcc = opts.bcc.split(",").map((s: string) => s.trim());
      const data = await client.post(`/inboxes/${inboxId}/messages/${messageId}/reply`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("reply-all")
  .description("Reply-all to a message")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--cc <addresses>", "CC addresses (comma-separated)")
  .option("--bcc <addresses>", "BCC addresses (comma-separated)")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      if (opts.cc) body.cc = opts.cc.split(",").map((s: string) => s.trim());
      if (opts.bcc) body.bcc = opts.bcc.split(",").map((s: string) => s.trim());
      const data = await client.post(`/inboxes/${inboxId}/messages/${messageId}/reply-all`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("forward")
  .description("Forward a message")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .requiredOption("--to <addresses>", "Recipient email addresses (comma-separated)")
  .option("--text <text>", "Plain text body")
  .option("--html <html>", "HTML body")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {
        to: opts.to.split(",").map((s: string) => s.trim()),
      };
      if (opts.text) body.text = opts.text;
      if (opts.html) body.html = opts.html;
      const data = await client.post(`/inboxes/${inboxId}/messages/${messageId}/forward`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("update")
  .description("Update message labels")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .option("--labels <json>", "Set labels (JSON array)")
  .option("--add-labels <labels>", "Add labels (comma-separated)")
  .option("--remove-labels <labels>", "Remove labels (comma-separated)")
  .option("--json", "Output as JSON")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.labels) body.labels = JSON.parse(opts.labels);
      if (opts.addLabels) body.add_labels = opts.addLabels.split(",").map((s: string) => s.trim());
      if (opts.removeLabels) body.remove_labels = opts.removeLabels.split(",").map((s: string) => s.trim());
      const data = await client.patch(`/inboxes/${inboxId}/messages/${messageId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("get-raw")
  .description("Get raw message content")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, messageId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/messages/${messageId}/raw`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

messagesResource
  .command("get-attachment")
  .description("Get a message attachment")
  .argument("<inbox_id>", "Inbox ID")
  .argument("<message_id>", "Message ID")
  .argument("<attachment_id>", "Attachment ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (inboxId: string, messageId: string, attachmentId: string, opts: any) => {
    try {
      const data = await client.get(`/inboxes/${inboxId}/messages/${messageId}/attachments/${attachmentId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
