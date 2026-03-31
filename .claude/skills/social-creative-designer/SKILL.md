# Social Creative Designer Skill

> Designs and generates carousel-style social media slides or single static graphics as PNG images using the Nano Banana MCP image generation tool. All visuals follow GoTravel Adventures brand style directions.

## When to Use

Trigger this skill when users ask for:
- Social media carousel designs (Instagram, LinkedIn, Facebook, etc.)
- Single social media graphics or static posts
- Slide sets for social content (educational, promotional, storytelling)
- Visual content for social platforms mentioning "carousel," "social graphic," "social creative," "slides for social," or similar

## Quick Reference

| Setting | Default | Options |
|---------|---------|---------|
| **Slides per set** | 3 | Any number specified by user |
| **Aspect ratio** | 4:5 (1080x1350) | 1:1, 3:4, 4:5, 1.91:1 (landscape) |
| **Platform** | Instagram | LinkedIn, Facebook, TikTok, YouTube, other |
| **Mode** | Carousel (multi-slide) | Single static image |
| **Output** | PNG files via Nano Banana MCP | — |

---

## Core Visual Principle

**Realistic photography first, design overlay second.**

Every slide must be built on a **real, photorealistic background** — an actual destination photo, not an illustration, cartoon, or digitally painted scene. Text and minimal decorative elements are then overlaid on top of the photo. This matches the GoTravel reference templates where real travel photography is the hero, and design elements (typography, doodles, labels) are layered over it.

**What the output should look like:**
- A stunning real photograph of the destination fills the entire frame
- Bold headline text is overlaid directly on the photo with enough contrast (drop shadow, dark outline, or semi-transparent overlay band) to be legible
- Decorative elements (if any) are sparse and purposeful — a few small white doodles, a subtle label, not a busy collage
- The photo does 80% of the work; text and graphics do 20%

**What the output should NOT look like:**
- Cartoon or illustrated backgrounds
- Digital paintings or AI-art-style renders
- Overly busy designs with too many text boxes, labels, or doodle elements covering the photo
- Flat graphic design with solid color backgrounds

---

## Workflow

### Step 1: Read Brand Style Direction

Before generating any visuals, read the style guide and reference images to understand available style directions:

```
Read _templates/social-creatives/style-guide.md
```

Then review the reference images for visual inspiration:

```
Read _templates/social-creatives/china_town.png
Read _templates/social-creatives/japan.png
Read _templates/social-creatives/trang.png
```

These reference images are **directional inspiration** for layout, typography hierarchy, and visual tone. Key takeaways from the references:
- **china_town.png**: Real street-level photo of Bangkok Yaowarat with warm color wash, bold brush headline overlaid, food cutout photos in lower half
- **japan.png**: Real full-bleed landscape photo of Mt. Fuji, clean centered title stack, minimal decoration — the photo is the star
- **trang.png**: Real beach/ocean photo of Koh Kradan, bold brush headline overlaid directly on photo, a few white hand-drawn doodles (speech bubbles, arrows) as accents

Do NOT replicate them exactly. Adapt and combine elements to best suit the current topic.

Also read the brand voice guide to ensure text content matches brand tone:

```
Read _context/GoTravel_Voice_Guide.md
```

### Step 2: Determine Parameters

Confirm or use defaults for:

| Parameter | How to determine |
|-----------|-----------------|
| **Topic/content** | From user request |
| **Number of slides** | User-specified or default 3 |
| **Aspect ratio** | User-specified or default 4:5 |
| **Platform** | User-specified or default Instagram |
| **Mode** | Carousel (default) or single static if requested |
| **Style direction** | User-specified or select from style guide based on content type (see Style Pattern Selection Guide below) |

### Step 3: Plan the Slide Set

For **carousel mode**, plan each slide with a clear role:

| Slide Position | Purpose | Content Approach |
|----------------|---------|-----------------|
| **Slide 1 (Hook)** | Bold, attention-stopping headline | Minimal text (headline + subtitle only), strong photographic background, large typography. Make viewers stop scrolling. |
| **Middle slides** | Value, education, insights | One hero photo per slide with a short headline and 1-2 lines of supporting text max. One clear idea per slide. Let the photo tell the story. |
| **Final slide (CTA)** | Call to action or key takeaway | Beautiful destination photo with clear CTA text. Keep it simple — one action. |

For **single static mode**, combine hook + value + CTA into one cohesive frame.

**Text minimalism rules:**
- Slide 1 (Hook): Headline + subtitle only (2 text elements max)
- Middle slides: Headline + 1 short supporting line (2-3 text elements max)
- CTA slide: CTA headline + brand name (2 text elements max)
- Never put paragraph-length text on a slide
- If there are activities or tips to list, show ONE per slide with a short label — do not cram multiple info boxes onto one slide

Before generating, outline:
- The text/headline for each slide (keep it SHORT)
- The specific real-world scene for the photo background
- Which style pattern from the style guide best fits (Pattern A, B, or C)

### Step 4: Generate Visuals with Nano Banana MCP

Use `mcp__nanabanana__generate_image` to generate each slide as a PNG.

#### Prompt Construction Guidelines

**CRITICAL: The prompt must explicitly request photorealistic imagery.** Always include phrases like "real photograph", "photorealistic", "editorial travel photography" in the prompt. Never use words like "illustrated", "cartoon", "digital art", "painting", or "graphic design style" when describing the background.

Each image prompt should follow this structure:

1. **Photography first:** Describe the background as a real, high-quality travel photograph. Be specific about the location, lighting, composition, and mood. Example: "A real photograph of Railay Beach at golden hour, turquoise water, dramatic limestone cliffs, warm natural light, editorial travel photography quality"

2. **Text overlay:** Describe the headline text to render on the photo — font style (bold, brush, script), color, placement, and contrast treatment (drop shadow or dark outline). Keep text elements to a minimum (1-2 per slide).

3. **Minimal decorative overlay (optional):** Only if the style direction calls for it, add a FEW small white hand-drawn doodle accents (2-4 small elements max, not covering the photo). For clean/aspirational styles, skip decorative elements entirely.

4. **Brand text:** Small "GoTravel Adventures" text at top or bottom.

**Example prompt structure:**
```
A social media post designed for Instagram in 4:5 portrait format. 
The background is a real, photorealistic travel photograph of [specific scene description — location, lighting, composition, mood]. 
Editorial travel photography quality, vivid natural colors, high detail.
Overlaid on the photo: large bold [font style] headline text reading "[TEXT]" in [color] with [contrast treatment], placed [position]. 
Below/above in smaller [color] text: "[subtitle text]".
Small "GoTravel Adventures" in [color] at the [position].
[Optional: A few small white hand-drawn doodle accents — 2-3 elements only, e.g. small sparkles and an arrow, placed at the edges.]
Clean, minimal design. The photograph is the hero.
```

#### Aspect Ratio Mapping

| Requested Format | Nano Banana `aspect_ratio` | Resolution |
|-----------------|---------------------------|------------|
| 4:5 (default) | `4:5` | high |
| 1:1 (square) | `1:1` | high |
| 3:4 | `3:4` | high |
| 1.91:1 (landscape) | `16:9` | high |

#### Generation Settings

```
Tool: mcp__nanabanana__generate_image
- prompt: [detailed prompt following guidelines above]
- aspect_ratio: [mapped ratio]
- resolution: "high"
- model_tier: "nb2"
- negative_prompt: "illustration, cartoon, digital painting, anime, 3D render, graphic design, flat colors, artificial looking, clipart, blurry, low quality, pixelated, watermark, overly busy, cluttered text"
- output_path: [target directory or file path]
```

**Note:** The negative prompt explicitly blocks illustrated/cartoon styles to ensure photorealistic output.

### Step 5: Output & File Naming

Save generated images following the project naming convention:

```
social/{platform}-{topic}-carousel-{slide-number}-{YYYY-MM}.png
```

Examples:
- `social/instagram-thailand-street-food-carousel-1-2026-03.png`
- `social/instagram-thailand-street-food-carousel-2-2026-03.png`
- `social/instagram-thailand-street-food-carousel-3-2026-03.png`

For single static images:
```
social/{platform}-{topic}-static-{YYYY-MM}.png
```

### Step 6: Present Results

After generating all slides, present them to the user with:
- Each slide image displayed inline
- The slide number, role (hook/value/CTA), and headline text noted
- A summary of the style direction used
- Any suggestions for caption text or hashtags if relevant

---

## Style Pattern Selection Guide

Use this to choose the right visual approach based on content type:

| Content Type | Photo Style | Text Treatment | Decorative |
|---|---|---|---|
| Food tour / street food guide | Real street-level food/market photos, warm color wash | Bold brush headline, small food labels | Minimal — a few cutout food photos if needed |
| Trip announcement / reveal | Full-bleed hero landscape photo | Clean centered title stack, white text | None — let the photo breathe |
| Beach / island spotlight | Real beach/ocean photo, bright natural colors | Bold brush headline on photo, warm yellow or white | A few small white doodles (2-3 max) |
| Activity roundup | Real action/activity photos | Bold headline + short label per slide | Minimal |
| Quick tip / discovery | Real destination photo | Bold headline + one tip line | 1-2 small doodles (arrow, sparkle) |
| Testimonial / quote | Full-bleed atmospheric landscape | Clean white text centered | None |
| Countdown / promo | Real destination hero photo | Bold headline + date/price | Minimal accent |
| Educational / how-to | Real destination/activity photo per point | Headline + one line per slide | None or minimal |
| Destination comparison | Real photos of each destination | Bold location name per slide | None |

---

## Brand Content Rules

When writing text for slides, follow these GoTravel content standards:

- **Voice:** Adventurous, approachable, trustworthy, inclusive, warm
- **Lead with benefits**, not features
- **Clear CTA** on final slide
- **Never use:** "hidden gem", "bucket list", "exotic", "once in a lifetime", "tourist trap"
- **Prefer:** "adventure" over "vacation", "explore" over "visit", "travelers" over "tourists"
- **Keep text minimal** — the photo is the hero, not the copy

---

## Error Handling

If Nano Banana MCP or image generation is unavailable:
1. Flag to the user that MCP-generated images were not available
2. Provide the complete slide plan (text, layout, style direction) as a creative brief that can be used with another design tool
3. Suggest the user check MCP server connection and retry
