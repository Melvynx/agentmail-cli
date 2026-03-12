# agentmail-cli

CLI for the agentmail API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install <user>/agentmail-cli
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Install AgentSkill only

```bash
npx skills add <user>/agentmail-cli
```

## Usage

```bash
agentmail-cli auth set "your-token"
agentmail-cli auth test
agentmail-cli --help
```

## Resources

### inboxes
```
inboxes list [--limit N] [--page-token TOKEN]
inboxes get <inbox_id>
inboxes create [--username] [--domain] [--display-name] [--client-id]
inboxes update <inbox_id> [--display-name]
inboxes delete <inbox_id>
```

### messages
```
messages list <inbox_id> [--limit] [--page-token] [--labels]
messages get <inbox_id> <message_id>
messages send <inbox_id> --to --subject [--text] [--html] [--cc] [--bcc] [--reply-to] [--labels JSON]
messages reply <inbox_id> <message_id> [--text] [--html] [--cc] [--bcc]
messages reply-all <inbox_id> <message_id> [--text] [--html] [--cc] [--bcc]
messages forward <inbox_id> <message_id> --to [--text] [--html]
messages update <inbox_id> <message_id> [--labels JSON] [--add-labels] [--remove-labels]
messages get-raw <inbox_id> <message_id>
messages get-attachment <inbox_id> <message_id> <attachment_id>
```

### threads
```
threads list <inbox_id> [--limit] [--page-token]
threads get <inbox_id> <thread_id>
threads delete <inbox_id> <thread_id>
threads list-all [--limit] [--page-token]
threads get-all <thread_id>
threads delete-all <thread_id>
threads get-attachment <inbox_id> <thread_id> <attachment_id>
threads get-attachment-all <thread_id> <attachment_id>
```

### drafts
```
drafts list <inbox_id> [--limit] [--page-token]
drafts get <inbox_id> <draft_id>
drafts create <inbox_id> [--to] [--subject] [--text] [--html] [--cc] [--bcc]
drafts update <inbox_id> <draft_id> [--to] [--subject] [--text] [--html]
drafts delete <inbox_id> <draft_id>
drafts send <inbox_id> <draft_id>
drafts get-attachment <inbox_id> <draft_id> <attachment_id>
drafts list-all [--limit] [--page-token]
drafts get-all <draft_id>
drafts get-attachment-all <draft_id> <attachment_id>
```

### webhooks
```
webhooks list [--limit] [--page-token]
webhooks get <webhook_id>
webhooks create --url [--events JSON] [--pod-ids JSON] [--inbox-ids JSON]
webhooks update <webhook_id> [--url] [--events JSON] [--pod-ids JSON] [--inbox-ids JSON]
webhooks delete <webhook_id>
```

### domains
```
domains list [--limit] [--page-token]
domains get <domain_id>
domains create --domain [--feedback-enabled]
domains update <domain_id> [--feedback-enabled | --no-feedback-enabled]
domains delete <domain_id>
domains verify <domain_id>
domains zone-file <domain_id>
```

### lists
```
lists list [--limit] [--page-token] [--list-type] [--pattern]
lists get <list_id>
lists create [--list-type] [--pattern] [--description]
lists delete <list_id>
```

### pods
```
pods list [--limit] [--page-token]
pods get <pod_id>
pods create [--name]
pods delete <pod_id>
```

### api-keys
```
api-keys list
api-keys create [--name] [--pod-id] [--scopes JSON]
api-keys delete <key_id>
```

### metrics
```
metrics query [--start-date] [--end-date] [--inbox-id] [--pod-id] [--event-type]
metrics query-inbox <inbox_id> [--start-date] [--end-date]
```

### pod-inboxes
```
pod-inboxes list <pod_id> [--limit] [--page-token]
pod-inboxes get <pod_id> <inbox_id>
pod-inboxes create <pod_id> [--username] [--domain] [--display-name] [--client-id]
pod-inboxes update <pod_id> <inbox_id> [--display-name]
pod-inboxes delete <pod_id> <inbox_id>
```

### pod-threads
```
pod-threads list <pod_id> [--limit] [--page-token]
pod-threads get <pod_id> <thread_id>
pod-threads get-attachment <pod_id> <thread_id> <attachment_id>
pod-threads delete <pod_id> <thread_id>
```

### pod-drafts
```
pod-drafts list <pod_id> [--limit] [--page-token]
pod-drafts get <pod_id> <draft_id>
pod-drafts get-attachment <pod_id> <draft_id> <attachment_id>
```

### pod-domains
```
pod-domains list <pod_id> [--limit] [--page-token]
pod-domains get <pod_id> <domain_id>
pod-domains zone-file <pod_id> <domain_id>
pod-domains create <pod_id> --domain [--feedback-enabled]
pod-domains update <pod_id> <domain_id> [--feedback-enabled | --no-feedback-enabled]
pod-domains delete <pod_id> <domain_id>
pod-domains verify <pod_id> <domain_id>
```

### pod-lists
```
pod-lists list <pod_id> [--limit] [--page-token] [--list-type] [--pattern]
pod-lists get <pod_id> <list_id>
pod-lists create <pod_id> [--list-type] [--pattern] [--description]
pod-lists delete <pod_id> <list_id>
```

### pod-metrics
```
pod-metrics query <pod_id> [--start-date] [--end-date] [--event-type]
```

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
