# Editing the GoTravel Template

Use this workflow when creating presentations by editing the branded template. This is the preferred method as it preserves all decorative elements, SVG icons, and freeform shapes.

## Template-Based Workflow

### Phase 1: Analyze

```bash
python scripts/thumbnail.py assets/deck_template.pptx
python -m markitdown assets/deck_template.pptx
```

Review `thumbnails.jpg` to see all 10 layouts. Read `references/deck_template_analysis.md` for the full breakdown of every element.

### Phase 2: Plan Slide Mapping

For each content section, choose a template slide layout. Match content type to layout:

| Content Type | Best Layout (Template Slide) |
|---|---|
| Title / Opening | Slide 0 (Cover) |
| About / Overview | Slide 1 (Two-Column) |
| Why Us / Benefits | Slide 2 (Split Photo + Text) |
| Features / Services | Slide 3 (Feature Strip + Icons) |
| Pricing / Packages | Slide 4 (Pricing Cards) |
| Preparation / Checklist | Slide 5 (Info Blocks) |
| Testimonials / Results | Slide 6 (Social Proof) |
| CTA / Next Steps | Slide 7 (CTA + Button) |
| Contact / Details | Slide 8 (Contact Grid) |
| Closing / Thank You | Slide 9 (Closing) |

**USE VARIED LAYOUTS** — monotonous presentations are a common failure mode. Actively mix:
- Two-column layouts
- Image + text combinations
- Full-bleed photo slides
- Feature/icon grids
- Data/stat callout slides

### Phase 3: Unpack

```bash
python scripts/office/unpack.py assets/deck_template.pptx unpacked/
```

### Phase 4: Build Structure (do this yourself, not with subagents)

- Delete unwanted slides: remove from `<p:sldIdLst>` in `ppt/presentation.xml`
- Duplicate slides to reuse: `python scripts/add_slide.py unpacked/ slide{N}.xml`
- Reorder slides in `<p:sldIdLst>`
- **Complete ALL structural changes before Phase 5**

### Phase 5: Edit Content

Update text in each `slide{N}.xml`. Use subagents if available — slides are separate XML files and can be edited in parallel.

**In subagent prompts, include:**
- The slide file path(s) to edit
- "Use the Edit tool for all changes"
- The formatting rules and brand standards below

For each slide:
1. Read the slide's XML
2. Identify ALL placeholder content — text, images, charts, icons, captions
3. Replace each placeholder with final content

### Phase 6: Clean

```bash
python scripts/clean.py unpacked/
```

### Phase 7: Pack

```bash
python scripts/office/pack.py unpacked/ output.pptx --original assets/deck_template.pptx
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/office/unpack.py` | Extract and pretty-print PPTX |
| `scripts/add_slide.py` | Duplicate slide or create from layout |
| `scripts/clean.py` | Remove orphaned files |
| `scripts/office/pack.py` | Repack with validation |
| `scripts/thumbnail.py` | Create visual grid of slides |

### unpack.py
```bash
python scripts/office/unpack.py input.pptx unpacked/
```
Extracts PPTX, pretty-prints XML, escapes smart quotes.

### add_slide.py
```bash
python scripts/add_slide.py unpacked/ slide2.xml      # Duplicate slide
python scripts/add_slide.py unpacked/ slideLayout2.xml # From layout
```
Prints `<p:sldId>` to add to `<p:sldIdLst>` at desired position.

### clean.py
```bash
python scripts/clean.py unpacked/
```
Removes slides not in `<p:sldIdLst>`, unreferenced media, orphaned rels.

### pack.py
```bash
python scripts/office/pack.py unpacked/ output.pptx --original input.pptx
```
Validates, repairs, condenses XML, re-encodes smart quotes.

### thumbnail.py
```bash
python scripts/thumbnail.py input.pptx [output_prefix] [--cols N]
```
Creates `thumbnails.jpg` with slide filenames as labels. For visual QA, use `soffice` + `pdftoppm` instead for full-resolution images.

---

## Slide Operations

Slide order is in `ppt/presentation.xml` -> `<p:sldIdLst>`.

- **Reorder**: Rearrange `<p:sldId>` elements
- **Delete**: Remove `<p:sldId>`, then run `clean.py`
- **Add**: Use `add_slide.py` — never manually copy slide files (the script handles notes refs, Content_Types.xml, and relationship IDs)

---

## Content Editing Rules

### Brand Text Standards

When replacing placeholder text, follow these GoTravel brand rules:

- **Banned words:** "hidden gem", "bucket list", "exotic", "once in a lifetime", "tourist trap"
- **Preferred terms:** "adventure" (not "vacation"), "explore" (not "visit"), "travelers" (not "tourists")
- Write for the target audience, not for ourselves
- Lead with benefits, not features
- Every slide needs a clear call to action where appropriate
- Match the GoTravel voice: adventurous, approachable, trustworthy, inclusive, warm

### Formatting Rules

- **Bold all headers, subheadings, and inline labels**: Use `b="1"` on `<a:rPr>`
- **Never use unicode bullets (bullet chars)**: Use proper list formatting with `<a:buChar>` or `<a:buAutoNum>`
- **Bullet consistency**: Let bullets inherit from the layout. Only specify `<a:buChar>` or `<a:buNone>`

### Brand Typography in XML

When editing text runs, preserve these font mappings:

| Element | Font Family | Size (hundredths of pt) | Bold |
|---------|------------|------------------------|------|
| Section titles | Poppins | `5700` | `b="1"` |
| Body text | Roboto | `2000` | — |
| Feature labels | Poppins | `2100` | `b="1"` |
| Company name | DM Sans | `1635` | `b="1"` |
| CTA buttons | Poppins | `2100` | `b="1"` |

### Brand Colors in XML

Use these values in `<a:srgbClr>` elements:

| Color | XML Value |
|-------|-----------|
| Black text | `val="000000"` |
| White text | `val="FFFFFF"` |
| Olive green accent | `val="677A1F"` |
| Dark navy shapes | `val="08172A"` |
| Cream backgrounds | `val="FEF9F1"` |

---

## Common Pitfalls

### Template Adaptation

When source content has fewer items than the template:
- **Remove excess elements entirely** (images, shapes, text boxes) — don't just clear text
- Check for orphaned visuals after clearing text content
- Run visual QA to catch mismatched counts

When replacing text with different length content:
- **Shorter replacements**: Usually safe
- **Longer replacements**: May overflow or wrap unexpectedly — test with visual QA
- Consider truncating or splitting content to fit the template's design constraints

**Template slots != Source items**: If a template section has 4 items but content has 3, delete the 4th item's entire group (image + text boxes), not just the text.

### Multi-Item Content

Create separate `<a:p>` elements for each item — never concatenate into one string.

**Wrong** — all items in one paragraph:
```xml
<a:p>
  <a:r><a:rPr .../><a:t>Step 1: Do this. Step 2: Do that.</a:t></a:r>
</a:p>
```

**Correct** — separate paragraphs:
```xml
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" b="1" .../><a:t>Step 1</a:t></a:r>
</a:p>
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" .../><a:t>Do the first thing.</a:t></a:r>
</a:p>
```

Copy `<a:pPr>` from the original paragraph to preserve line spacing. Use `b="1"` on headers.

### Smart Quotes

Handled automatically by unpack/pack. But the Edit tool converts smart quotes to ASCII. When adding new text with quotes, use XML entities:

```xml
<a:t>the &#x201C;Agreement&#x201D;</a:t>
```

| Character | Unicode | XML Entity |
|-----------|---------|------------|
| Left double quote | U+201C | `&#x201C;` |
| Right double quote | U+201D | `&#x201D;` |
| Left single quote | U+2018 | `&#x2018;` |
| Right single quote | U+2019 | `&#x2019;` |

### Other

- **Whitespace**: Use `xml:space="preserve"` on `<a:t>` with leading/trailing spaces
- **XML parsing**: Use `defusedxml.minidom`, not `xml.etree.ElementTree` (corrupts namespaces)
