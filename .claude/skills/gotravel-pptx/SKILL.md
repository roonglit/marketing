# GoTravel Branded Presentation Skill

> Extends the official PPTX skill with GoTravel Adventures brand standards. Use this skill to create strategy decks, campaign presentations, trip launch decks, and marketing reports — all matching the GoTravel branded template exactly.

## When to Use

Trigger this skill when users mention "deck," "slides," "presentation," "pptx," or ask for strategy/campaign presentations.

## Quick Reference

| Task | Method | Guide |
|------|--------|-------|
| **Create branded deck** | Edit the template (preferred) | See [Editing Guide](editing.md) |
| **Create from scratch** | PptxGenJS with brand constants | See [PptxGenJS Guide](pptxgenjs.md) |
| **Read/analyze a deck** | `python -m markitdown file.pptx` | Below |
| **Visual QA** | `python scripts/thumbnail.py file.pptx` | Below |

## Key Assets

| Asset | Path | Purpose |
|-------|------|---------|
| **Branded template** | `assets/deck_template.pptx` | Base template for all presentations — 10 slides, 20"x11.2" |
| **Template analysis** | `references/deck_template_analysis.md` | Full breakdown of colors, fonts, layouts, and decorative elements |

---

## Brand Design System

### Color Palette

Use ONLY these colors. No exceptions.

| Color | Hex (no #) | Usage |
|-------|-----------|-------|
| **Black** | `000000` | Primary text on white backgrounds |
| **White** | `FFFFFF` | Text on photo/dark backgrounds |
| **Olive Green** | `677A1F` | Accent — labels, section markers, buttons, icon fills, line strokes |
| **Dark Navy** | `08172A` | Decorative shapes on cover/closing slides only |
| **Warm Cream** | `FEF9F1` | Subtle background accent panels (sparingly) |

**Rules:**
- Content slides always use white (`FFFFFF`) backgrounds with black text
- Olive green is the ONLY brand accent color — use it selectively for labels, lines, icons, and buttons
- Dark navy appears ONLY on cover/closing decorative shapes
- Cream is used sparingly for accent panels (pricing cards, preparation sections)
- NEVER use teal, blue, red, or any color outside this palette in presentations

### Typography

| Style | Font | Size (pt) | Weight | Case | Color |
|-------|------|----------|--------|------|-------|
| **Hero Title** | Poppins | 120 | Bold | Title Case | White |
| **Hero Subtitle** | Poppins | 74 | Regular | Title Case | White |
| **Section Title** | Poppins | 57 | Bold | Title Case | Black |
| **Price Display** | Poppins | 43 | Bold | — | Black |
| **Sub-heading** | Roboto | 25 | Bold | Title Case | Black |
| **Feature Label** | Poppins | 21 | Bold | UPPERCASE | Black |
| **Body Text** | Roboto | 20 | Regular | Sentence | Black |
| **Body Text (Alt)** | Poppins | 18 | Regular | Sentence | Black |
| **Nav/Company** | DM Sans | 16.35 | Bold | Title Case | Black or White |
| **CTA Button** | Poppins | 21 | Bold | UPPERCASE | Black or White |
| **Small Label** | Poppins | 12 | Bold | UPPERCASE | Black |
| **Bullet Items** | Poppins | 12 | Regular | Sentence | Black |
| **Category Label** | DM Sans | 16.35 | Bold | Title Case | Olive `677A1F` |
| **Contact Info** | Poppins | 24 | Regular | Sentence | Black |

**Font Rules:**
1. **Poppins Bold** for all headings and labels
2. **Roboto** for body paragraphs (20pt, 34pt line spacing = 1.7x)
3. **DM Sans Bold** for company name bar and category labels
4. UPPERCASE is reserved for feature labels, CTAs, and package tier names
5. Line spacing: titles at ~1.07x, body text at 1.4-1.7x
6. No letter-spacing adjustments — standard kerning throughout

### Slide Dimensions

**20.0" x 11.2"** (widescreen, non-standard large format)

When using PptxGenJS, set custom dimensions:
```javascript
pres.defineLayout({ name: 'GOTRAVEL', width: 20, height: 11.2 });
pres.layout = 'GOTRAVEL';
```

---

## Layout Library

Choose from these layout types when building presentations. Mix layouts for visual variety — never repeat the same layout consecutively.

### Layout 1: Cover / Title Slide
- Full-bleed landscape photo background
- Company name top-center (white)
- Large stacked title center-left (Hero Title + Hero Subtitle)
- Three feature badges bottom-left with icons
- CTA button bottom-right
- Dark navy freeform organic shapes framing corners

### Layout 2: Two-Column (Text + Photo)
- White background, company name top-center
- Left column (~55%): Section title (Poppins Bold 57pt)
- Right column (~45%): Body paragraph + large rounded-corner photo below
- Category label bottom-left in olive green
- Thin black line separator

### Layout 3: Split (Photo Cluster + Text)
- Left side (~50%): Two overlapping photos with organic arrangement
- Right side: Title + sub-heading + body paragraph
- Thin black line accent

### Layout 4: Feature Strip (Photo + Icons Row)
- Left (~50%): Large rounded-corner photo
- Right: Title + body paragraph
- Bottom strip: Three columns with olive green SVG icons + UPPERCASE labels + descriptions

### Layout 5: Pricing Cards
- Title top-left
- Right (~40%): Large photo with cream background panel
- Bottom: Three pricing cards side-by-side (price, tier name, duration, bullet inclusions)
- Cream accent panels

### Layout 6: Info Blocks (Photo + Stacked Sections)
- Large photo top-right
- Title right side
- Left side: Two vertically stacked info blocks with UPPERCASE labels + body text
- Olive green line separators, cream accent areas

### Layout 7: Testimonial / Social Proof
- Title left
- Right column: Two sub-headings with body text
- Bottom-left: Large photo area
- Freeform organic shapes, photo frame elements

### Layout 8: CTA / Action (Photo + Button)
- Large photo left (~50%)
- Right: Title + body paragraph + "More Info" button (olive green fill, white text)
- Bottom strip: Additional text spanning width
- Olive green line accents

### Layout 9: Contact / Details
- Title top-left with body text
- Large photo right (~45%)
- Bottom: Three-column grid (e.g., Email, Address, Phone)
- Olive green line separator

### Layout 10: Closing / Thank You
- Full-bleed landscape photo (same treatment as cover)
- Centered title (Hero Title + Hero Subtitle)
- CTA button bottom-center
- Feature badges bottom
- Same dark navy organic shapes as cover

---

## Workflow: Creating a Branded Deck

### Preferred Method: Edit the Template

This produces the highest-fidelity results because it preserves all decorative elements, SVG icons, and freeform shapes from the original.

1. **Read the template analysis:**
   ```
   Read references/deck_template_analysis.md
   ```

2. **Analyze the template visually:**
   ```bash
   python scripts/thumbnail.py assets/deck_template.pptx
   ```

3. **Plan slide mapping:** For each content section, choose a template slide layout from the Layout Library above. Ensure variety — do not repeat the same layout for consecutive slides.

4. **Follow the editing workflow** in [editing.md](editing.md)

### Alternative: Create from Scratch with PptxGenJS

Use when the template layouts don't fit the content structure, or when you need custom layouts not in the template.

Follow the [PptxGenJS Guide](pptxgenjs.md) which includes all brand constants pre-configured.

---

## Recurring Elements (Every Slide)

### Company Name Bar
- **Position:** Top-center of every slide
- **Coordinates:** Left ~8.05", Top ~1.12", Width ~3.9", Height ~0.3"
- **Font:** DM Sans Bold 16.35pt (slides 1-8), Poppins Bold 16.35pt (cover/closing)
- **Color:** Black on white backgrounds, White on photo backgrounds
- **Alignment:** Center

### Decorative Lines
- Content slides: 1.5pt black or 0.75pt olive green lines separating sections
- Cover/closing: 3pt white lines as part of decorative frame
- Present on 8 of 10 slides (not cover or pricing)

---

## Quality Assurance

Every presentation MUST go through QA before delivery.

### Content QA
1. Extract text: `python -m markitdown output.pptx`
2. Check for placeholder text, typos, or brand violations
3. Verify all GoTravel banned words are absent ("hidden gem", "bucket list", "exotic", "once in a lifetime", "tourist trap")
4. Verify preferred terms are used ("adventure" not "vacation", "explore" not "visit", "travelers" not "tourists")

### Visual QA
1. Generate slide images:
   ```bash
   soffice --headless --convert-to pdf output.pptx
   pdftoppm -r 150 -png output.pdf slide
   ```
2. Review each slide image for:
   - Text overflow or overlap
   - Correct brand colors (no off-brand colors)
   - Consistent font usage
   - Proper spacing and alignment
   - Photo placement and sizing
3. Fix issues and re-verify — one fix often creates new problems
4. Complete at least one full QA cycle before delivery

### Brand Compliance Checklist
- [ ] Only palette colors used (Black, White, Olive Green, Dark Navy, Warm Cream)
- [ ] Poppins Bold for headings, Roboto for body, DM Sans Bold for company name
- [ ] Company name bar on every slide
- [ ] Slide dimensions are 20"x11.2"
- [ ] No banned words in content
- [ ] Clear CTA on relevant slides
- [ ] Layout variety — no consecutive identical layouts
