# Marketing Workspace — GoTravel Adventures

This is a marketing content workspace for **GoTravel Adventures**, a small-group tour operator in Southeast Asia. Before writing any content, always read the relevant context files in `_context/` to understand the brand, audience, and goals.

## Context Files

Read these before producing any content:

| File | When to read |
|---|---|
| `_context/GoTravel_Brand_Context.md` | Always — company overview, values, differentiators |
| `_context/GoTravel_Voice_Guide.md` | Always — voice, tone, writing rules, word choices |
| `_context/GoTravel_Brand_Style_Guide.md` | When creating visuals, formatting content, or referencing brand colors/fonts |
| `_context/GoTravel_Product_Offerings.md` | When writing about specific trips, pricing, or inclusions |
| `_context/GoTravel_Growth_Marketing_Context.md` | When planning campaigns, choosing channels, or setting targets |

## SOPs (Standard Operating Procedures)

Follow these step-by-step workflows for recurring tasks:

| SOP | Use when |
|---|---|
| `_sop/SOP_Campaign_Performance_Reporting.md` | Compiling weekly or monthly marketing reports |
| `_sop/SOP_Blog_Post_Creation.md` | Writing and publishing a blog post |
| `_sop/SOP_New_Trip_Launch.md` | Launching a new trip across all channels |
| `_sop/SOP_Social_Media_Weekly_Workflow.md` | Planning, creating, and scheduling weekly social content |
| `_sop/SOP_Email_Campaign_Creation.md` | Writing email broadcasts, newsletters, or automated sequences |
| `_sop/SOP_Paid_Ads_Management.md` | Running and optimizing Meta and Google Ads |

## Templates

Use these reusable structures for consistent output:

| Template | Purpose |
|---|---|
| `_templates/Template_Blog_Post.md` | Blog post structure with SEO checklist |
| `_templates/Template_Email_Broadcast.md` | Email campaign brief and checklist |
| `_templates/Template_Social_Post.md` | Social media post brief — caption, visuals, hashtags |
| `_templates/Template_Ad_Creative_Brief.md` | Ad creative brief for Meta, Google, and TikTok |
| `_templates/deck_template.pptx` | PowerPoint deck template (10-slide travel/tour format) — use as visual reference |

## Content Standards

- Write for the target audience, not for ourselves
- Lead with benefits, not features
- Use clear, concise language — avoid filler words
- Every piece of content needs a clear call to action
- Back up claims with data or social proof when possible
- Match the GoTravel voice: adventurous, approachable, trustworthy, inclusive, warm
- Never use: "hidden gem", "bucket list", "exotic", "once in a lifetime", "tourist trap"
- Prefer: "adventure" over "vacation", "explore" over "visit", "travelers" over "tourists"

## Folder Structure

| Folder | Content |
|---|---|
| `ads/` | Ad copy and creative briefs (Meta, Google, TikTok) |
| `pages/` | Landing pages and website copy |
| `social/` | Social media posts, captions, Reels/TikTok concepts, email campaigns |
| `seo/` | Blog posts, keyword research, SEO content |
| `reports/` | Weekly/monthly marketing performance reports |
| `research/` | Market research, competitor analysis, audience insights |
| `presentations/` | Pitch decks, strategy presentations |
| `_context/` | Brand and marketing context files (read-only reference) |
| `_sop/` | Standard operating procedures |
| `_templates/` | Reusable templates and deck template |

## File Naming Convention

```
{type}-{topic}-{platform}-{YYYY-MM}.md
```

Examples:
- `blog-vietnam-itinerary-2-weeks-2026-03.md`
- `meta-ad-vietnam-prospecting-2026-04.md`
- `instagram-vietnam-trip-carousel-2026-03.md`

Prefix drafts with `draft-`.

## Agent Routing

This workspace has two specialized sub-agents in `.claude/agents/`. Use them when the task is open-ended, spans multiple formats, or requires the agent to synthesize and make decisions across steps. **Do not** delegate single, specific actions that you can handle directly with a skill or tool.

### `content-creator` (Sonnet)

**Delegate when the user:**
- Asks for content across **multiple formats** from one brief (e.g., "blog post + social posts + landing page for the Vietnam trip launch")
- Provides a **campaign brief or marketing goal** and expects a full content suite
- Wants content **adapted across channels** (e.g., "write a blog post and matching social posts to promote it")
- Requests a **lead magnet, landing page, or blog post** as part of a broader content effort

**Do NOT delegate when:**
- The user asks for a **single blog post**, one social caption, or one email — handle it directly using the relevant SOP and template
- The task is a **quick edit or revision** to existing content
- The user asks you to **generate an image**, create a **PDF**, build a **presentation**, or produce a **spreadsheet** — use the appropriate skill (`/pdf`, `/pptx`, `/xlsx`, `nanobanana`) directly
- The user wants a **single-format output** with a clear, specific brief — just write it

### `data-analyst` (Sonnet)

**Delegate when the user:**
- Provides **raw campaign data** (CSV, pasted tables, screenshots) and asks for analysis
- Requests a **weekly or monthly marketing performance report**
- Wants to **investigate an anomaly** in ad spend, CPC, CTR, ROAS, or conversions
- Asks to **compare channel or campaign performance** across time periods
- Needs **trends identified** or **benchmarks established** from marketing data

**Do NOT delegate when:**
- The user asks a **single factual question** about a metric you can answer by reading a report file in `reports/`
- The task is **creating** a report template or SOP — that's content work, not analysis
- The user wants a **chart or visualization** without underlying data analysis — use a skill directly

### General Routing Principles

- **One skill, one action = handle directly.** If the request maps cleanly to a single skill (e.g., "create a PDF", "make a presentation", "generate an image"), use that skill without spinning up an agent.
- **Open-ended or multi-step = delegate.** If the user gives a goal or brief that requires reading context, making judgment calls, and producing multiple outputs, use the appropriate agent.
- **When in doubt, start direct.** You can always escalate to an agent if the task turns out to be more complex than expected. Don't over-delegate.
