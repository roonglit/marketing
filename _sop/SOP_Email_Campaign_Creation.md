# SOP: Email Campaign Creation

## Purpose
Create and send email campaigns — including newsletters, promotions, and automated sequences — that drive engagement and bookings.

## Tools Required
- ConvertKit (email platform)
- Canva Pro (email graphics)
- Google Analytics 4 (tracking)

---

## Part A: One-Off Email Campaigns (Newsletters, Announcements, Promos)

### Step 1: Define the Email

Before writing anything, answer:
- **Goal:** What should the reader do after reading? (click, book, reply, share)
- **Audience:** Full list or a segment? (new subscribers, past travelers, country interest)
- **Type:** Newsletter / Trip announcement / Promotion / Re-engagement
- **Send date & time:** Best times: Tuesday-Thursday, 9-11am in the audience's primary timezone

### Step 2: Write the Subject Line

The subject line determines whether anyone reads the email. Write 5 options and pick the best.

**Rules:**
- Under 50 characters (mobile-friendly)
- Create curiosity, offer a benefit, or imply urgency
- No ALL CAPS, no excessive punctuation (!!!)
- Use the recipient's name sparingly — only when it feels natural
- A/B test the top 2 subject lines (ConvertKit supports this)

**Formulas that work for GoTravel:**
| Formula | Example |
|---|---|
| Curiosity gap | "The one mistake most Vietnam travelers make" |
| Destination + emotion | "Why Luang Prabang made me cry" |
| Benefit-driven | "Your 7-day Thailand itinerary, sorted" |
| Urgency (real, not fake) | "3 spots left on the October departure" |
| Question | "Ready for your first Southeast Asia trip?" |
| POV / Story | "I just got back from Cambodia. Here's what surprised me." |

**Preview text:** The line that shows after the subject in the inbox. Use it to complement (not repeat) the subject line. Keep under 90 characters.

### Step 3: Write the Email Body

Follow `_context/GoTravel_Voice_Guide.md` — emails should feel personal, like a message from a friend.

**Structure:**
1. **Opening line (1-2 sentences):** Personal, warm, hooks the reader. No "Hope this finds you well."
   - Good: "I'll keep this short because I have news."
   - Good: "Remember that secret beach I mentioned? We just added it to a trip."
2. **Body (3-5 short paragraphs):** One main topic. Don't cram multiple things in.
   - Use short paragraphs (2-3 sentences max)
   - Bold key phrases for scanners
   - Include 1-2 images (trip photos, not stock)
3. **CTA (1 clear action):** One primary CTA, repeated at most twice.
   - Button style for primary CTA (teal background, white text)
   - Text link for secondary CTA
   - Never more than 2 different CTAs in one email
4. **Sign-off:** Warm and personal.
   - "Happy travels, Nate & Ploy" (founders)
   - Or the team member's name if relevant

**Email writing rules:**
- Max 300 words for promos and announcements
- Max 500 words for newsletters
- Write at a Grade 8 reading level — clear, simple, no jargon
- One topic per email — don't combine a trip launch with a blog roundup
- Mobile-first: preview on mobile before sending (60%+ of opens are mobile)
- Use alt text on all images (many email clients block images by default)

### Step 4: Design the Email

In ConvertKit:
- Use the GoTravel email template (clean, single-column, branded header)
- Header image: 600x300, relevant photo with warm edit
- Body: Plain text with occasional bold — avoid heavy HTML formatting
- CTA button: Teal (#0D9488), white text, rounded corners, centered
- Footer: Unsubscribe link, GoTravel address, social icons

**Design rules:**
- No more than 3 images per email (load time + clipping risk)
- No background images (poor email client support)
- No fancy fonts — stick to system fonts (Arial, Helvetica, Georgia)
- Minimum 14px font size for body text

### Step 5: Test Before Sending

- [ ] Send a test email to yourself and check on desktop + mobile
- [ ] All links work and go to the right pages
- [ ] Images load and have alt text
- [ ] Subject line and preview text display correctly
- [ ] Personalization tokens work (e.g., {first_name} doesn't show as literal text)
- [ ] Unsubscribe link works
- [ ] UTM parameters are on all links: `?utm_source=email&utm_medium=campaign&utm_campaign={campaign-name}`
- [ ] No typos or broken formatting

### Step 6: Send & Monitor

1. Send the email (or schedule it)
2. Monitor for the first 2 hours:
   - Open rate (target: 28%+ for broadcasts)
   - Click rate (target: 3.5%+)
   - Unsubscribes (flag if > 0.5%)
   - Any replies (respond within 24 hours)
3. Log results in the content tracker

---

## Part B: Automated Email Sequences

### Welcome Series (Triggered: New Subscriber)

**Goal:** Introduce GoTravel, build trust, get the first click to a trip page.

| Email | Timing | Subject | Content | CTA |
|---|---|---|---|---|
| 1 | Immediately | "Welcome — here's your [lead magnet]" | Deliver the lead magnet + brief intro to GoTravel (who we are, what we do) | "Download your guide" |
| 2 | Day 2 | "Why we started GoTravel" | Brand story — Nate & Ploy's origin story, values, what makes us different | "See our trips" |
| 3 | Day 4 | "Our most popular trip (and why)" | Feature the Vietnam Explorer — highlights, traveler quote, photos | "Explore the itinerary" |
| 4 | Day 7 | "Real talk: is Southeast Asia safe?" | Address common concerns — safety, solo travel, budget, planning | "Read our SE Asia guide" |
| 5 | Day 10 | "A little help planning your trip" | Offer a free 15-min call or quiz ("Which SE Asia trip is right for you?") | "Take the quiz" / "Book a call" |

### Abandoned Checkout (Triggered: Started Checkout, Didn't Complete)

| Email | Timing | Subject | Content | CTA |
|---|---|---|---|---|
| 1 | 1 hour | "You left something behind" | Reminder of the trip they were booking + key highlights | "Complete your booking" |
| 2 | 24 hours | "Quick question about [Trip Name]" | Address likely objections — cancellation policy, what's included, ask if they have questions | "Reply to this email" or "Finish booking" |
| 3 | 72 hours | "Spots are filling up for [Date]" | Urgency (only if real) + social proof (review or booking count) | "Grab your spot" |

### Post-Trip Follow-Up (Triggered: Trip End Date + 3 Days)

| Email | Timing | Subject | Content | CTA |
|---|---|---|---|---|
| 1 | Day 3 | "How was your trip?" | Warm check-in, ask for feedback, link to review form | "Leave a review" |
| 2 | Day 10 | "Share your adventure" | Encourage social sharing (tag us for a repost), mention referral program | "Share on Instagram" |
| 3 | Day 30 | "Ready for the next one?" | Show 2-3 recommended trips based on what they did, offer $50 loyalty discount | "Browse trips" |

---

## Part C: Weekly Newsletter — "The Travel Dispatch"

**Send day:** Every Saturday, 9am EST

**Structure:**
1. **Personal opener (2-3 sentences):** What's new at GoTravel this week, or a travel thought/observation
2. **Featured story:** The week's best blog post or a destination spotlight (3-4 sentences + photo + link)
3. **Quick hits (3 bullet points):**
   - A travel tip
   - A new trip or date announcement
   - A question or poll (encourages replies)
4. **Photo of the week:** One stunning traveler photo with a caption
5. **CTA:** Soft — "Explore our trips" or "Reply and tell us your dream destination"

**Newsletter rules:**
- Keep total length under 500 words
- Readers should be able to scan it in under 2 minutes
- Rotate featured destinations — don't always push the same trip
- Include at least one item that's purely valuable (tip, story) and not promotional

---

## Metrics & Benchmarks

| Metric | Broadcast Target | Sequence Target |
|---|---|---|
| Open rate | 28%+ | 40%+ (welcome series) |
| Click rate | 3.5%+ | 5%+ |
| Unsubscribe rate | < 0.3% | < 0.2% |
| Abandoned cart recovery | n/a | 8%+ |

## List Hygiene (Quarterly)

1. Identify subscribers with no opens in 6+ months
2. Send a re-engagement email ("Still want to hear from us?")
3. Wait 14 days
4. Remove anyone who didn't open the re-engagement email
5. This keeps the list healthy and improves deliverability
