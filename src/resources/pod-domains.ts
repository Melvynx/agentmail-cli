import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

export const podDomainsResource = new Command("pod-domains")
  .description("Manage domains within a pod");

podDomainsResource
  .command("list")
  .description("List domains in a pod")
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
      const data = await client.get(`/pods/${podId}/domains`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("get")
  .description("Get a domain in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, domainId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/domains/${domainId}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("zone-file")
  .description("Get DNS zone file for a domain in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (podId: string, domainId: string, opts: any) => {
    try {
      const data = await client.get(`/pods/${podId}/domains/${domainId}/zone-file`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("create")
  .description("Add a domain to a pod")
  .argument("<pod_id>", "Pod ID")
  .requiredOption("--domain <domain>", "Domain name")
  .option("--feedback-enabled", "Enable feedback")
  .option("--no-feedback-enabled", "Disable feedback")
  .option("--json", "Output as JSON")
  .action(async (podId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = { domain: opts.domain };
      if (opts.feedbackEnabled !== undefined) body.feedback_enabled = opts.feedbackEnabled;
      const data = await client.post(`/pods/${podId}/domains`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("update")
  .description("Update a domain in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<domain_id>", "Domain ID")
  .option("--feedback-enabled", "Enable feedback")
  .option("--no-feedback-enabled", "Disable feedback")
  .option("--json", "Output as JSON")
  .action(async (podId: string, domainId: string, opts: any) => {
    try {
      const body: Record<string, unknown> = {};
      if (opts.feedbackEnabled !== undefined) body.feedback_enabled = opts.feedbackEnabled;
      const data = await client.patch(`/pods/${podId}/domains/${domainId}`, body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("delete")
  .description("Delete a domain from a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .action(async (podId: string, domainId: string, opts: any) => {
    try {
      await client.delete(`/pods/${podId}/domains/${domainId}`);
      output({ deleted: true, id: domainId }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

podDomainsResource
  .command("verify")
  .description("Verify a domain in a pod")
  .argument("<pod_id>", "Pod ID")
  .argument("<domain_id>", "Domain ID")
  .option("--json", "Output as JSON")
  .action(async (podId: string, domainId: string, opts: any) => {
    try {
      const data = await client.post(`/pods/${podId}/domains/${domainId}/verify`, {});
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
