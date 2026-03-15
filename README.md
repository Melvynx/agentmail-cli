# agentmail-cli

CLI for the agentmail API. Made with [api2cli.dev](https://api2cli.dev).

## Install

```bash
npx api2cli install Melvynx/agentmail-cli
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Install AgentSkill only

```bash
npx skills add Melvynx/agentmail-cli
```

## Auth

Set your API token before using any commands:

```bash
agentmail-cli auth set "your-token"
agentmail-cli auth test
agentmail-cli auth show         # masked
agentmail-cli auth show --raw   # full token
agentmail-cli auth remove
```

## Global Flags

All commands support:

| Flag | Description |
|------|-------------|
| `--json` | Output as JSON |
| `--format <fmt>` | Output format: `text`, `json`, `csv`, `yaml` |
| `--verbose` | Enable debug logging |
| `--no-color` | Disable colored output |
| `--no-header` | Omit table/csv headers (for piping) |

## Resources

### inboxes

```bash
agentmail-cli inboxes list [--limit <n>] [--page-token <token>] [--ascending]
agentmail-cli inboxes get <inbox-id>
agentmail-cli inboxes create [--username <username>] [--domain <domain>] [--display-name <name>] [--client-id <id>]
```

Examples:

```bash
agentmail-cli inboxes create --username agent1 --display-name 'My Agent'
agentmail-cli inboxes list --limit 10 --json
agentmail-cli inboxes get inbox_abc123
```

### messages

```bash
agentmail-cli messages list <inbox-id> [--limit <n>] [--page-token <token>] [--labels <labels>] [--before <date>] [--after <date>] [--include-spam]
agentmail-cli messages get <inbox-id> <message-id>
agentmail-cli messages send <inbox-id> --to <addresses> [--cc <addresses>] [--bcc <addresses>] [--subject <subject>] [--text <body>] [--html <body>] [--reply-to <address>] [--labels <labels>]
agentmail-cli messages reply <inbox-id> <message-id> [--text <body>] [--html <body>] [--cc <addresses>] [--bcc <addresses>]
```

Examples:

```bash
agentmail-cli messages list inbox_abc123 --labels inbox --limit 10
agentmail-cli messages send inbox_abc123 --to user@example.com --subject 'Hello' --text 'Hi!'
agentmail-cli messages reply inbox_abc123 msg_xyz --text 'Thanks!'
```

### threads

```bash
agentmail-cli threads list <inbox-id> [--limit <n>] [--page-token <token>] [--ascending]
agentmail-cli threads get <inbox-id> <thread-id>
```

Examples:

```bash
agentmail-cli threads list inbox_abc123 --limit 10
agentmail-cli threads get inbox_abc123 thread_xyz --json
```

### webhooks

```bash
agentmail-cli webhooks list
agentmail-cli webhooks create --url <url> [--events <events>]
```

Available events: `message.received`, `message.sent`, `message.delivered`, `message.bounced`, `message.complained`, `message.rejected`, `domain.verified`

Examples:

```bash
agentmail-cli webhooks create --url https://myapp.com/webhook
agentmail-cli webhooks create --url https://myapp.com/webhook --events message.received,message.sent
```

### pods

```bash
agentmail-cli pods list
agentmail-cli pods create --name <name> [--client-id <id>]
```

Examples:

```bash
agentmail-cli pods create --name 'My Pod'
agentmail-cli pods create --name 'My Pod' --client-id client1 --json
```

### api-keys

```bash
agentmail-cli api-keys list
agentmail-cli api-keys create --name <name>
```

Examples:

```bash
agentmail-cli api-keys create --name 'My Key'
agentmail-cli api-keys list --json
```
