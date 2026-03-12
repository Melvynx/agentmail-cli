---
name: agentmail
description: "Give AI agents their own email inboxes. Create inboxes, send/receive/reply to emails, manage threads, drafts, webhooks, domains, and multi-tenant pods via the AgentMail API. Use when: user wants to send email from an agent, create agent email addresses, manage agent email workflows, set up email webhooks, or anything involving agentmail.to."
category: email
---

# agentmail-cli

AgentMail gives AI agents their own email inboxes. Create addresses on the fly, send/receive emails, manage conversations, and build email-driven agent workflows.

## When to use this skill

- **"Send an email from my agent"** : messages send
- **"Create an email inbox for X"** : inboxes create
- **"Check my agent's inbox"** : messages list
- **"Reply to that email"** : messages reply
- **"Set up email notifications"** : webhooks create
- **"Add my custom domain"** : domains create + verify
- **"Forward this email to..."** : messages forward
- **"Draft an email for review"** : drafts create, then drafts send
- **"Create isolated email environments"** : pods create + pod-inboxes create

## When NOT to use this skill

- For Gmail/Google Workspace emails : use the `gws-gmail` skill instead
- For Lumail email marketing : use the `lumail` CLI instead
- For generic SMTP/IMAP : AgentMail has IMAP/SMTP but the CLI uses the REST API

## Setup

If `agentmail-cli` is not found:
```bash
npx api2cli install Melvynx/agentmail-cli
```

Or manually:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle agentmail
npx api2cli link agentmail
```

Always use `--json` flag when calling commands programmatically.

## Authentication

Get your API key from https://console.agentmail.to

```bash
agentmail-cli auth set "am_..."
agentmail-cli auth test
```

Token stored at `~/.config/tokens/agentmail-cli.txt` (chmod 600).

## Common Workflows

### Create an inbox and send an email
```bash
agentmail-cli inboxes create --username myagent --display-name "My Agent"
agentmail-cli messages send "myagent@agentmail.to" --to "user@example.com" --subject "Hello" --text "Hello from my agent!"
```

### Check inbox and reply
```bash
agentmail-cli messages list "myagent@agentmail.to" --json
agentmail-cli messages reply "myagent@agentmail.to" <message_id> --text "Thanks for your email!"
```

### Set up a webhook for incoming emails
```bash
agentmail-cli webhooks create --url "https://myapp.com/webhook" --events '["message.received"]'
```

### Custom domain setup
```bash
agentmail-cli domains create --domain "mail.mycompany.com" --feedback-enabled
agentmail-cli domains zone-file <domain_id>   # Get DNS records to add
agentmail-cli domains verify <domain_id>       # Verify after DNS propagation
```

### Multi-tenant (pods)
```bash
agentmail-cli pods create --name "client-a"
agentmail-cli pod-inboxes create <pod_id> --username support --domain agentmail.to
```

## Resources

### inboxes — Create and manage email addresses

| Command | Description |
|---------|-------------|
| `inboxes list` | List all inboxes |
| `inboxes get <inbox_id>` | Get inbox details |
| `inboxes create [--username USER] [--domain DOMAIN] [--display-name NAME]` | Create inbox (username auto-generated if omitted) |
| `inboxes update <inbox_id> [--display-name NAME]` | Update inbox |
| `inboxes delete <inbox_id>` | Delete inbox |

### messages — Send, receive, reply, forward emails

| Command | Description |
|---------|-------------|
| `messages list <inbox_id> [--labels L]` | List messages (filter by labels) |
| `messages get <inbox_id> <message_id>` | Get full message |
| `messages send <inbox_id> --to ADDR --subject SUBJ [--text T] [--html H] [--cc CC] [--bcc BCC]` | Send email |
| `messages reply <inbox_id> <message_id> [--text T] [--html H]` | Reply to message |
| `messages reply-all <inbox_id> <message_id> [--text T] [--html H]` | Reply all |
| `messages forward <inbox_id> <message_id> --to ADDR [--text T]` | Forward message |
| `messages update <inbox_id> <message_id> [--labels JSON] [--add-labels L] [--remove-labels L]` | Update labels |
| `messages get-raw <inbox_id> <message_id>` | Get raw RFC822 message |
| `messages get-attachment <inbox_id> <message_id> <attachment_id>` | Download attachment |

### threads — Conversation threads

| Command | Description |
|---------|-------------|
| `threads list <inbox_id>` | List threads in inbox |
| `threads get <inbox_id> <thread_id>` | Get thread with messages |
| `threads delete <inbox_id> <thread_id>` | Delete thread |
| `threads list-all` | List threads org-wide |
| `threads get-all <thread_id>` | Get thread org-wide |
| `threads delete-all <thread_id>` | Delete thread org-wide |
| `threads get-attachment <inbox_id> <thread_id> <attachment_id>` | Get attachment |
| `threads get-attachment-all <thread_id> <attachment_id>` | Get attachment org-wide |

### drafts — Create drafts for human-in-the-loop review

| Command | Description |
|---------|-------------|
| `drafts list <inbox_id>` | List drafts |
| `drafts get <inbox_id> <draft_id>` | Get draft |
| `drafts create <inbox_id> [--to ADDR] [--subject S] [--text T] [--html H]` | Create draft |
| `drafts update <inbox_id> <draft_id> [--to ADDR] [--subject S] [--text T]` | Update draft |
| `drafts delete <inbox_id> <draft_id>` | Delete draft |
| `drafts send <inbox_id> <draft_id>` | Send draft |
| `drafts list-all` | List drafts org-wide |
| `drafts get-all <draft_id>` | Get draft org-wide |
| `drafts get-attachment <inbox_id> <draft_id> <attachment_id>` | Get attachment |

### webhooks — Event-driven email notifications

| Command | Description |
|---------|-------------|
| `webhooks list` | List webhooks |
| `webhooks get <webhook_id>` | Get webhook |
| `webhooks create --url URL [--events JSON] [--inbox-ids JSON] [--pod-ids JSON]` | Create webhook |
| `webhooks update <webhook_id> [--url URL] [--events JSON]` | Update webhook |
| `webhooks delete <webhook_id>` | Delete webhook |

Event types: `message.received`, `message.sent`, `message.delivered`, `message.bounced`, `message.complained`, `message.rejected`, `domain.verified`

### domains — Custom domain management

| Command | Description |
|---------|-------------|
| `domains list` | List domains |
| `domains get <domain_id>` | Get domain status |
| `domains create --domain DOMAIN [--feedback-enabled]` | Add custom domain |
| `domains update <domain_id> [--feedback-enabled]` | Update domain |
| `domains delete <domain_id>` | Remove domain |
| `domains verify <domain_id>` | Trigger DNS verification |
| `domains zone-file <domain_id>` | Get required DNS records |

### lists — Allow/block lists for email filtering

| Command | Description |
|---------|-------------|
| `lists list [--list-type TYPE] [--pattern PAT]` | List entries |
| `lists get <list_id>` | Get entry |
| `lists create [--list-type allow\|block] [--pattern PAT] [--description D]` | Create entry |
| `lists delete <list_id>` | Delete entry |

### pods — Multi-tenant email environments

| Command | Description |
|---------|-------------|
| `pods list` | List pods |
| `pods get <pod_id>` | Get pod |
| `pods create [--name NAME]` | Create pod |
| `pods delete <pod_id>` | Delete pod |

Pod sub-resources: `pod-inboxes`, `pod-threads`, `pod-drafts`, `pod-domains`, `pod-lists`, `pod-metrics` — same syntax as top-level but scoped with `<pod_id>` as first argument.

### api-keys — Manage API keys

| Command | Description |
|---------|-------------|
| `api-keys list` | List API keys |
| `api-keys create [--name NAME] [--pod-id ID] [--scopes JSON]` | Create key |
| `api-keys delete <key_id>` | Delete key |

### metrics — Email analytics

| Command | Description |
|---------|-------------|
| `metrics query [--start-date D] [--end-date D] [--inbox-id ID] [--event-type T]` | Query org metrics |
| `metrics query-inbox <inbox_id> [--start-date D] [--end-date D]` | Query inbox metrics |

## Output

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`

`--json` returns: `{ "ok": true, "data": {...}, "meta": {...} }`

Pagination: use `--limit N` and `--page-token TOKEN` on list commands.

Exit codes: 0 = success, 1 = API error, 2 = usage error
