import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const domainsResource = new Command("domains")
  .description("Manage custom domains");

domainsResource
  .command("list")
  .description("List all domains")
  .option("--limit <n>", "Max results to return")
  .option("--page-token <token>", "Pagination token")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: any) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.pageToken) params.page_token = opts.pageToken;
      const data = await client.get("/domains", params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("get")
  .description("Get a domain by ID")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (domainId: string, opts: any) => {
    try {
      const data = await client.get(`/domains/${domainId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("create")
  .description("Add a custom domain")
  .requiredOption("--domain <domain>", "Domain name")
  .option("--feedback-enabled", "Enable feedback")
  .option("--no-feedback-enabled", "Disable feedback")
  .option("--json", "Output as JSON")
  .action(async (opts: any) => {
    try {
      const body: Record<string, unknown> = { domain: opts.domain };
      if (opts.feedbackEnabled !== undefined) body.feedback_enabled = opts.feedbackEnabled;
      const data = await client.post("/domains", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("update")
  .description("Update a domain")
  .argument("<domain_id>", "Domain ID")
  .option("--feedback-enabled", "Enable feedback")
  .option("--no-feedback-enabled", "Disable feedback")
  .option("--json", "Output as JSON")
  .action(async (domainId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.feedbackEnabled !== undefined) body.feedback_enabled = opts.feedbackEnabled;
      const data = await client.patch(`/domains/${domainId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("delete")
  .description("Delete a domain")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .action(async (domainId: string, opts: any) => {
    try {
      await client.delete(`/domains/${domainId}`);
      output({ deleted: true, id: domainId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("verify")
  .description("Verify a domain")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .action(async (domainId: string, opts: any) => {
    try {
      const data = await client.post(`/domains/${domainId}/verify`, {});
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

domainsResource
  .command("zone-file")
  .description("Get DNS zone file for a domain")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (domainId: string, opts: any) => {
    try {
      const data = await client.get(`/domains/${domainId}/zone-file`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
