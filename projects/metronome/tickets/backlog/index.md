# Backlog

[Tickets](../index.md) · [Workflow](../workflow.md#holding-lists)

- **What:** work that is definitely wanted but not yet placed in an initiative and milestone.
- **Add when:** the work is wanted, is not required for the current milestone's acceptance, and has no ticket yet.
- **Remove when:** it becomes a ticket, or is rejected.
- **Last groomed:** never.

Entry format:

```markdown
## <one line naming the work>

- Added: <date>
- Type: feature | bug | idea | chore
- Likely home: <initiative/milestone guess, or "future initiative">

<Two or three lines: what it is, and why it is wanted.>
```

## Entries

## Verify metronomnom.com in Google Search Console and submit the sitemap

- Added: 2026-11-11 (groomed from pre-migration; old ID SEO-12)
- Type: chore
- Likely home: future initiative (launch / traffic measurement)

Verify the domain (DNS or HTML tag/file) and submit `https://metronomnom.com/sitemap.xml` to get organic impressions, clicks and queries. As of 2026-11-11 the site is live, `public/sitemap.xml` and `public/robots.txt` exist, and nothing in the repo shows verification (no `google-site-verification` tag or file). The playbook step is in `knowledge/launch.md` (Measure and decide).
