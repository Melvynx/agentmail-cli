---
name: agentmail
description: "Manage agentmail via CLI - inboxes, messages, threads, drafts, webhooks, domains, lists, pods, api-keys, metrics, pod-inboxes, pod-threads, pod-drafts, pod-domains, pod-lists, pod-metrics. Use when user mentions 'agentmail' or wants to interact with the agentmail API."
category: email
---

# agentmail-cli

## Setup

If `agentmail-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle agentmail
npx api2cli link agentmail
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
agentmail-cli auth set "your-token"
agentmail-cli auth test
```

Auth commands: `auth set <token>`, `auth show`, `auth remove`, `auth test`

Token is stored in `~/.config/tokens/agentmail-cli.txt`.

## Resources

### inboxes
```bash
agentmail-cli inboxes list [--limit N] [--page-token TOKEN]
agentmail-cli inboxes get <inbox_id>
agentmail-cli inboxes create [--username USER] [--domain DOMAIN] [--display-name NAME] [--client-id ID]
agentmail-cli inboxes update <inbox_id> [--display-name NAME]
agentmail-cli inboxes delete <inbox_id>
```

### messages
```bash
agentmail-cli messages list <inbox_id> [--limit N] [--page-token TOKEN] [--labels LABELS]
agentmail-cli messages get <inbox_id> <message_id>
agentmail-cli messages send <inbox_id> --to ADDR --subject SUBJ [--text TEXT] [--html HTML] [--cc CC] [--bcc BCC] [--reply-to ADDR] [--labels JSON]
agentmail-cli messages reply <inbox_id> <message_id> [--text TEXT] [--html HTML] [--cc CC] [--bcc BCC]
agentmail-cli messages reply-all <inbox_id> <message_id> [--text TEXT] [--html HTML] [--cc CC] [--bcc BCC]
agentmail-cli messages forward <inbox_id> <message_id> --to ADDR [--text TEXT] [--html HTML]
agentmail-cli messages update <inbox_id> <message_id> [--labels JSON] [--add-labels L1,L2] [--remove-labels L1,L2]
agentmail-cli messages get-raw <inbox_id> <message_id>
agentmail-cli messages get-attachment <inbox_id> <message_id> <attachment_id>
```

### threads
```bash
agentmail-cli threads list <inbox_id> [--limit N] [--page-token TOKEN]
agentmail-cli threads get <inbox_id> <thread_id>
agentmail-cli threads delete <inbox_id> <thread_id>
agentmail-cli threads list-all [--limit N] [--page-token TOKEN]
agentmail-cli threads get-all <thread_id>
agentmail-cli threads delete-all <thread_id>
agentmail-cli threads get-attachment <inbox_id> <thread_id> <attachment_id>
agentmail-cli threads get-attachment-all <thread_id> <attachment_id>
```

### drafts
```bash
agentmail-cli drafts list <inbox_id> [--limit N] [--page-token TOKEN]
agentmail-cli drafts get <inbox_id> <draft_id>
agentmail-cli drafts create <inbox_id> [--to ADDR] [--subject SUBJ] [--text TEXT] [--html HTML] [--cc CC] [--bcc BCC]
agentmail-cli drafts update <inbox_id> <draft_id> [--to ADDR] [--subject SUBJ] [--text TEXT] [--html HTML]
agentmail-cli drafts delete <inbox_id> <draft_id>
agentmail-cli drafts send <inbox_id> <draft_id>
agentmail-cli drafts get-attachment <inbox_id> <draft_id> <attachment_id>
agentmail-cli drafts list-all [--limit N] [--page-token TOKEN]
agentmail-cli drafts get-all <draft_id>
agentmail-cli drafts get-attachment-all <draft_id> <attachment_id>
```

### webhooks
```bash
agentmail-cli webhooks list [--limit N] [--page-token TOKEN]
agentmail-cli webhooks get <webhook_id>
agentmail-cli webhooks create --url URL [--events JSON] [--pod-ids JSON] [--inbox-ids JSON]
agentmail-cli webhooks update <webhook_id> [--url URL] [--events JSON] [--pod-ids JSON] [--inbox-ids JSON]
agentmail-cli webhooks delete <webhook_id>
```

### domains
```bash
agentmail-cli domains list [--limit N] [--page-token TOKEN]
agentmail-cli domains get <domain_id>
agentmail-cli domains create --domain DOMAIN [--feedback-enabled]
agentmail-cli domains update <domain_id> [--feedback-enabled | --no-feedback-enabled]
agentmail-cli domains delete <domain_id>
agentmail-cli domains verify <domain_id>
agentmail-cli domains zone-file <domain_id>
```

### lists
```bash
agentmail-cli lists list [--limit N] [--page-token TOKEN] [--list-type TYPE] [--pattern PAT]
agentmail-cli lists get <list_id>
agentmail-cli lists create [--list-type TYPE] [--pattern PAT] [--description DESC]
agentmail-cli lists delete <list_id>
```

### pods
```bash
agentmail-cli pods list [--limit N] [--page-token TOKEN]
agentmail-cli pods get <pod_id>
agentmail-cli pods create [--name NAME]
agentmail-cli pods delete <pod_id>
```

### api-keys
```bash
agentmail-cli api-keys list
agentmail-cli api-keys create [--name NAME] [--pod-id ID] [--scopes JSON]
agentmail-cli api-keys delete <key_id>
```

### metrics
```bash
agentmail-cli metrics query [--start-date DATE] [--end-date DATE] [--inbox-id ID] [--pod-id ID] [--event-type TYPE]
agentmail-cli metrics query-inbox <inbox_id> [--start-date DATE] [--end-date DATE]
```

### pod-inboxes
```bash
agentmail-cli pod-inboxes list <pod_id> [--limit N] [--page-token TOKEN]
agentmail-cli pod-inboxes get <pod_id> <inbox_id>
agentmail-cli pod-inboxes create <pod_id> [--username USER] [--domain DOMAIN] [--display-name NAME] [--client-id ID]
agentmail-cli pod-inboxes update <pod_id> <inbox_id> [--display-name NAME]
agentmail-cli pod-inboxes delete <pod_id> <inbox_id>
```

### pod-threads
```bash
agentmail-cli pod-threads list <pod_id> [--limit N] [--page-token TOKEN]
agentmail-cli pod-threads get <pod_id> <thread_id>
agentmail-cli pod-threads get-attachment <pod_id> <thread_id> <attachment_id>
agentmail-cli pod-threads delete <pod_id> <thread_id>
```

### pod-drafts
```bash
agentmail-cli pod-drafts list <pod_id> [--limit N] [--page-token TOKEN]
agentmail-cli pod-drafts get <pod_id> <draft_id>
agentmail-cli pod-drafts get-attachment <pod_id> <draft_id> <attachment_id>
```

### pod-domains
```bash
agentmail-cli pod-domains list <pod_id> [--limit N] [--page-token TOKEN]
agentmail-cli pod-domains get <pod_id> <domain_id>
agentmail-cli pod-domains zone-file <pod_id> <domain_id>
agentmail-cli pod-domains create <pod_id> --domain DOMAIN [--feedback-enabled]
agentmail-cli pod-domains update <pod_id> <domain_id> [--feedback-enabled | --no-feedback-enabled]
agentmail-cli pod-domains delete <pod_id> <domain_id>
agentmail-cli pod-domains verify <pod_id> <domain_id>
```

### pod-lists
```bash
agentmail-cli pod-lists list <pod_id> [--limit N] [--page-token TOKEN] [--list-type TYPE] [--pattern PAT]
agentmail-cli pod-lists get <pod_id> <list_id>
agentmail-cli pod-lists create <pod_id> [--list-type TYPE] [--pattern PAT] [--description DESC]
agentmail-cli pod-lists delete <pod_id> <list_id>
```

### pod-metrics
```bash
agentmail-cli pod-metrics query <pod_id> [--start-date DATE] [--end-date DATE] [--event-type TYPE]
```

## Output Format

`--json` returns a standardized envelope:
```json
{ "ok": true, "data": { ... }, "meta": { "total": 42 } }
```

On error: `{ "ok": false, "error": { "message": "...", "status": 401 } }`

## Quick Reference

```bash
agentmail-cli --help                    # List all resources and global flags
agentmail-cli <resource> --help         # List all actions for a resource
agentmail-cli <resource> <action> --help # Show flags for a specific action
```

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`

Exit codes: 0 = success, 1 = API error, 2 = usage error
