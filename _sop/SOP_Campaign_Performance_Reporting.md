# SOP: Campaign Performance Reporting

## Purpose
Generate a weekly and monthly marketing performance report that tracks key metrics across all channels, identifies what's working, and recommends next actions.

## Frequency
- **Weekly summary:** Every Monday morning
- **Full monthly report:** First Monday of each month

## Tools Required
- Google Analytics 4
- Meta Business Suite
- Google Ads Dashboard
- ConvertKit
- Ahrefs
- Later (social media analytics)
- Google Sheets (reporting template)

---

## Weekly Summary (Every Monday)

### Step 1: Pull Traffic Data (Google Analytics 4)
1. Open GA4 → Reports → Acquisition → Traffic Acquisition
2. Set date range: Previous 7 days
3. Record:
   - Total website sessions
   - Sessions by channel (Organic, Paid, Social, Email, Direct)
   - Top 5 landing pages by sessions
   - Bounce rate by channel
   - Average session duration

### Step 2: Pull Paid Ads Data
**Meta Ads (Instagram + Facebook):**
1. Open Meta Business Suite → Ads Manager
2. Set date range: Previous 7 days
3. Record per campaign:
   - Spend
   - Impressions
   - Clicks / CTR
   - Cost per click (CPC)
   - Conversions (bookings + email signups)
   - Cost per acquisition (CPA)
   - ROAS (return on ad spend)

**Google Ads:**
1. Open Google Ads → Campaigns
2. Set date range: Previous 7 days
3. Record per campaign:
   - Spend
   - Impressions / Clicks / CTR
   - CPC
   - Conversions
   - CPA

### Step 3: Pull Email Data (ConvertKit)
1. Open ConvertKit → Broadcasts (for newsletters sent that week)
2. Record:
   - Emails sent
   - Open rate
   - Click rate
   - Unsubscribes
   - New subscribers (total for the week)
   - Top clicked links
3. Check automated sequences:
   - Welcome series performance
   - Abandoned checkout recovery rate

### Step 4: Pull Social Media Data (Later + native analytics)
1. Open Later → Analytics → Previous 7 days
2. Record per platform (Instagram, TikTok, Facebook):
   - Posts published
   - Total reach / impressions
   - Engagement rate
   - Follower growth (net new)
   - Top performing post (by engagement)
   - Reels/video views

### Step 5: Check SEO Performance (Ahrefs + Google Search Console)
1. Open Ahrefs → Site Explorer → Organic Keywords
2. Note any significant keyword ranking changes (up or down 5+ positions)
3. Open Google Search Console → Performance → Previous 7 days
4. Record:
   - Total clicks from search
   - Average position
   - Top 5 queries by clicks

### Step 6: Compile Weekly Summary
Use this format:

```
## Weekly Marketing Summary: [Date Range]

### Headlines
- [1-2 sentence summary of the biggest win this week]
- [1-2 sentence summary of the biggest concern or drop]

### Key Numbers
| Metric | This Week | Last Week | Change |
|---|---|---|---|
| Website sessions | | | |
| New email subscribers | | | |
| Total ad spend | | | |
| Bookings from marketing | | | |
| Blended CPA | | | |

### What Worked
- [Specific tactic/content/ad that performed well and why]

### What Didn't
- [Specific tactic/content/ad that underperformed and why]

### Actions for This Week
- [ ] [Specific action item]
- [ ] [Specific action item]
- [ ] [Specific action item]
```

### Step 7: Save & Share
1. Save report to `reports/weekly/weekly-summary-YYYY-MM-DD.md`
2. Share with team via Notion or email

---

## Monthly Report (First Monday of Each Month)

### Everything in the Weekly Summary, PLUS:

### Step 8: Month-over-Month Comparison
1. Pull all metrics for the full previous month
2. Compare against the month before and same month last year
3. Calculate:
   - Total bookings attributed to marketing
   - Total revenue attributed to marketing
   - Overall CPA and ROAS
   - Email list growth rate
   - Social audience growth rate

### Step 9: Funnel Analysis
1. Map the full funnel for the month:
   - Visitors → Email signups (conversion rate)
   - Email signups → Trip page views (click-through rate)
   - Trip page views → Bookings (conversion rate)
2. Identify the weakest stage of the funnel
3. Compare to previous month

### Step 10: Budget Review
1. Compare actual spend vs. planned budget per channel
2. Calculate cost per booking by channel
3. Identify most and least efficient channels
4. Recommend budget reallocation if needed

### Step 11: Content Performance Review
1. List all content published that month (blog posts, social, email, video)
2. Rank by performance (traffic, engagement, conversions)
3. Identify content themes/formats that performed best
4. Recommend next month's content focus based on data

### Step 12: Competitive Check
1. Quick scan of top 3 competitors' recent activity:
   - New trips or offers launched?
   - Notable social media content?
   - New blog posts ranking for our target keywords?
2. Note any threats or opportunities

### Step 13: Compile Monthly Report
Use this format:

```
## Monthly Marketing Report: [Month Year]

### Executive Summary
[3-5 sentences: what happened, what worked, what needs attention]

### Key Metrics vs. Targets
| Metric | Target | Actual | Status |
|---|---|---|---|
| Monthly bookings | | | 🟢/🟡/🔴 |
| Website traffic | | | |
| Email subscribers | | | |
| Total ad spend | | | |
| Blended CPA | | | |
| ROAS | | | |

### Channel Breakdown
[Table with metrics per channel]

### Funnel Performance
[Funnel stage conversion rates]

### Top Performers
[Best content, best ad, best email — with numbers]

### Underperformers
[What flopped and hypothesis on why]

### Budget Utilization
[Spend vs plan, efficiency by channel]

### Recommendations for Next Month
1. [Priority action with expected impact]
2. [Priority action with expected impact]
3. [Priority action with expected impact]
```

### Step 14: Save & Share
1. Save report to `reports/monthly/monthly-report-YYYY-MM.md`
2. Present findings in team meeting or send via email

---

## Notes
- If a metric moves more than 20% in either direction week-over-week, flag it immediately — don't wait for the report
- Screenshot any notable wins (high-performing ads, viral posts) and save to `reports/screenshots/` for future reference
- Keep raw data in Google Sheets; reports in markdown are for narrative and action items
