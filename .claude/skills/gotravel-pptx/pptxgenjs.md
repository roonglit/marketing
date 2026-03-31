# PptxGenJS — GoTravel Branded Creation

Use PptxGenJS when creating presentations from scratch (no template editing). All brand constants are pre-defined below — use them exactly.

## Setup with GoTravel Brand

```javascript
const pptxgen = require("pptxgenjs");

let pres = new pptxgen();

// GoTravel custom slide dimensions (20" x 11.2")
pres.defineLayout({ name: "GOTRAVEL", width: 20, height: 11.2 });
pres.layout = "GOTRAVEL";
pres.author = "GoTravel Adventures";
pres.title = "PRESENTATION_TITLE_HERE";
```

---

## Brand Constants

```javascript
// === COLORS (no # prefix — PptxGenJS requirement) ===
const COLORS = {
  black: "000000",       // Primary text
  white: "FFFFFF",       // Text on dark/photo backgrounds
  olive: "677A1F",       // Accent — labels, lines, buttons, icons
  navy: "08172A",        // Cover/closing decorative shapes only
  cream: "FEF9F1",       // Subtle accent panels (sparingly)
};

// === FONTS ===
const FONTS = {
  heading: "Poppins",    // Titles, labels, CTAs — always Bold
  body: "Roboto",        // Body paragraphs
  nav: "DM Sans",        // Company name bar, category labels — always Bold
};

// === TEXT STYLES (factory functions to avoid object reuse bugs) ===
const makeHeroTitle = () => ({
  fontFace: FONTS.heading, fontSize: 120, bold: true, color: COLORS.white,
});
const makeHeroSubtitle = () => ({
  fontFace: FONTS.heading, fontSize: 74, color: COLORS.white,
});
const makeSectionTitle = () => ({
  fontFace: FONTS.heading, fontSize: 57, bold: true, color: COLORS.black,
});
const makeSubHeading = () => ({
  fontFace: FONTS.body, fontSize: 25, bold: true, color: COLORS.black,
});
const makeFeatureLabel = () => ({
  fontFace: FONTS.heading, fontSize: 21, bold: true, color: COLORS.black,
  // Apply UPPERCASE in the text string itself
});
const makeBodyText = () => ({
  fontFace: FONTS.body, fontSize: 20, color: COLORS.black, lineSpacingMultiple: 1.7,
});
const makeBodyTextAlt = () => ({
  fontFace: FONTS.heading, fontSize: 18, color: COLORS.black,
});
const makeCompanyName = (onDark = false) => ({
  fontFace: FONTS.nav, fontSize: 16.35, bold: true,
  color: onDark ? COLORS.white : COLORS.black, align: "center",
});
const makeCTAButton = () => ({
  fontFace: FONTS.heading, fontSize: 21, bold: true, color: COLORS.black,
  // Apply UPPERCASE in the text string itself
});
const makeSmallLabel = () => ({
  fontFace: FONTS.heading, fontSize: 12, bold: true, color: COLORS.black,
});
const makeBulletItem = () => ({
  fontFace: FONTS.heading, fontSize: 12, color: COLORS.black,
});
const makeCategoryLabel = () => ({
  fontFace: FONTS.nav, fontSize: 16.35, bold: true, color: COLORS.olive,
});
const makeContactInfo = () => ({
  fontFace: FONTS.heading, fontSize: 24, color: COLORS.black,
});

// === DECORATIVE ELEMENTS ===
const makeThinLineBlack = () => ({
  line: { color: COLORS.black, width: 1.5 },
});
const makeThinLineOlive = () => ({
  line: { color: COLORS.olive, width: 0.75 },
});
const makeCreamPanel = () => ({
  fill: { color: COLORS.cream },
});
const makeOliveButton = () => ({
  fill: { color: COLORS.olive },
  // Text inside should be white, Roboto Bold 25pt
});
```

**CRITICAL: Never reuse option objects across calls.** PptxGenJS mutates objects in-place. Always call the factory function for each use:
```javascript
// CORRECT
slide.addText("Title 1", { ...makeSectionTitle(), x: 1, y: 1, w: 8, h: 1.5 });
slide.addText("Title 2", { ...makeSectionTitle(), x: 1, y: 3, w: 8, h: 1.5 });
```

---

## Company Name Bar (Every Slide)

Add this to every slide:

```javascript
function addCompanyNameBar(slide, onDark = false) {
  slide.addText("GoTravel Adventures", {
    ...makeCompanyName(onDark),
    x: 8.05, y: 1.12, w: 3.9, h: 0.3,
    margin: 0,
  });
}
```

---

## Layout Recipes

### Cover Slide (Full-Bleed Photo)

```javascript
let cover = pres.addSlide();
cover.background = { path: "path/to/hero-photo.jpg" };

addCompanyNameBar(cover, true);

// Hero title stack
cover.addText([
  { text: "Travel and Tour", options: { ...makeHeroSubtitle(), breakLine: true } },
  { text: "Presentation Title", options: makeHeroTitle() },
], { x: 1.5, y: 3.5, w: 12, h: 4, margin: 0 });

// CTA button
cover.addText("EXPLORE NOW", {
  ...makeCTAButton(),
  x: 15, y: 9, w: 3.5, h: 0.8,
  align: "center", valign: "middle",
});
```

### Two-Column (Text + Photo)

```javascript
let slide = pres.addSlide();
slide.background = { color: COLORS.white };

addCompanyNameBar(slide);

// Section title (left column)
slide.addText("Learn About\nOur Travel Agency", {
  ...makeSectionTitle(),
  x: 1.5, y: 2.5, w: 9, h: 3, margin: 0,
});

// Body text (right column)
slide.addText("Description paragraph here...", {
  ...makeBodyText(),
  x: 11, y: 2.5, w: 7.5, h: 2, margin: 0,
});

// Photo (right column, below body)
slide.addImage({
  path: "path/to/photo.jpg",
  x: 11, y: 5, w: 7.5, h: 4.5,
  rounding: false,
});

// Category label (bottom-left, olive green)
slide.addText("Company History & Background", {
  ...makeCategoryLabel(),
  x: 1.5, y: 9.5, w: 8, h: 0.5, margin: 0,
});

// Decorative line
slide.addShape(pres.shapes.LINE, {
  x: 10.5, y: 2.5, w: 0, h: 7,
  ...makeThinLineBlack(),
});
```

### Feature Strip (Photo + Icon Row)

```javascript
let slide = pres.addSlide();
slide.background = { color: COLORS.white };

addCompanyNameBar(slide);

// Photo left
slide.addImage({ path: "photo.jpg", x: 1.5, y: 1.5, w: 9, h: 6 });

// Title + body right
slide.addText("Exciting Travel\nPackages Offered", {
  ...makeSectionTitle(),
  x: 11, y: 2, w: 7.5, h: 2.5, margin: 0,
});
slide.addText("Description...", {
  ...makeBodyText(),
  x: 11, y: 4.5, w: 7.5, h: 2, margin: 0,
});

// Bottom feature strip — 3 columns
const features = [
  { label: "CUSTOMIZED ITINERARIES", desc: "Feature description..." },
  { label: "LOCAL TOUR GUIDES", desc: "Feature description..." },
  { label: "HASSLE-FREE PLANNING", desc: "Feature description..." },
];

features.forEach((f, i) => {
  const xPos = 1.5 + (i * 6);

  slide.addText(f.label, {
    ...makeFeatureLabel(),
    x: xPos + 0.8, y: 8.2, w: 4.5, h: 0.5, margin: 0,
  });
  slide.addText(f.desc, {
    ...makeBodyTextAlt(),
    x: xPos + 0.8, y: 8.7, w: 4.5, h: 1.2, margin: 0,
  });
});
```

### Pricing Cards

```javascript
let slide = pres.addSlide();
slide.background = { color: COLORS.white };

addCompanyNameBar(slide);

slide.addText("Exciting Travel\nPackages Offered", {
  ...makeSectionTitle(),
  x: 1.5, y: 2, w: 9, h: 2.5, margin: 0,
});

// Cream panel behind photo
slide.addShape(pres.shapes.RECTANGLE, {
  x: 12, y: 1.5, w: 7, h: 5,
  ...makeCreamPanel(),
});

// Photo on cream panel
slide.addImage({ path: "photo.jpg", x: 12.5, y: 2, w: 6, h: 4 });

// Three pricing cards
const packages = [
  { price: "$1,200", tier: "CLASSIC EXPERIENCE", duration: "5 Days / 4 Nights", items: ["Flight", "Hotel", "Tours", "Meals"] },
  { price: "$1,600", tier: "PREMIUM ADVENTURE", duration: "7 Days / 6 Nights", items: ["Flight", "Hotel", "Tours", "Meals", "Guide"] },
  { price: "$1,000", tier: "BUDGET EXPLORER", duration: "4 Days / 3 Nights", items: ["Flight", "Hostel", "Tours"] },
];

packages.forEach((pkg, i) => {
  const xPos = 1.5 + (i * 3.5);

  slide.addText(pkg.price, {
    fontFace: FONTS.heading, fontSize: 43, bold: true, color: COLORS.black,
    x: xPos, y: 5.5, w: 3, h: 1, margin: 0,
  });
  slide.addText("PER PERSON", {
    fontFace: FONTS.heading, fontSize: 14, color: COLORS.black,
    x: xPos, y: 6.3, w: 3, h: 0.4, margin: 0,
  });
  slide.addText(pkg.tier, {
    ...makeSmallLabel(),
    x: xPos, y: 6.7, w: 3, h: 0.4, margin: 0,
  });
  slide.addText(pkg.duration, {
    fontFace: FONTS.heading, fontSize: 19, bold: true, color: COLORS.black,
    x: xPos, y: 7.1, w: 3, h: 0.5, margin: 0,
  });

  const bulletItems = pkg.items.map((item, j) => ({
    text: item,
    options: { ...makeBulletItem(), bullet: true, breakLine: j < pkg.items.length - 1 },
  }));
  slide.addText(bulletItems, { x: xPos, y: 7.6, w: 3, h: 2.5 });
});
```

### CTA / Action Slide

```javascript
let slide = pres.addSlide();
slide.background = { color: COLORS.white };

addCompanyNameBar(slide);

// Photo left
slide.addImage({ path: "photo.jpg", x: 1.5, y: 1.5, w: 9, h: 7 });

// Title + body right
slide.addText("Travel Responsibly\nwith Our Group", {
  ...makeSectionTitle(),
  x: 11, y: 2, w: 7.5, h: 2.5, margin: 0,
});
slide.addText("Body paragraph...", {
  ...makeBodyText(),
  x: 11, y: 4.5, w: 7.5, h: 2.5, margin: 0,
});

// Olive green "More Info" button
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 11, y: 7.5, w: 3, h: 0.8,
  fill: { color: COLORS.olive }, rectRadius: 0.1,
});
slide.addText("More Info", {
  fontFace: FONTS.body, fontSize: 25, bold: true, color: COLORS.white,
  x: 11, y: 7.5, w: 3, h: 0.8,
  align: "center", valign: "middle", margin: 0,
});

// Olive decorative line
slide.addShape(pres.shapes.LINE, {
  x: 11, y: 8.8, w: 7.5, h: 0,
  ...makeThinLineOlive(),
});
```

### Closing Slide

```javascript
let closing = pres.addSlide();
closing.background = { path: "path/to/closing-photo.jpg" };

addCompanyNameBar(closing, true);

// Centered title
closing.addText([
  { text: "Travel and Tour", options: { ...makeHeroSubtitle(), breakLine: true } },
  { text: "Thank You", options: makeHeroTitle() },
], { x: 4, y: 3, w: 12, h: 4, align: "center", margin: 0 });

// CTA button
closing.addText("BOOK NOW", {
  ...makeCTAButton(),
  color: COLORS.white,
  x: 8.25, y: 8.5, w: 3.5, h: 0.8,
  align: "center", valign: "middle",
});
```

---

## Text & Formatting

```javascript
// Rich text arrays (multiple styles in one text box)
slide.addText([
  { text: "Bold Part ", options: { bold: true } },
  { text: "Regular Part", options: {} },
], { x: 1, y: 1, w: 8, h: 1 });

// Multi-line text (requires breakLine: true)
slide.addText([
  { text: "Line 1", options: { breakLine: true } },
  { text: "Line 2", options: { breakLine: true } },
  { text: "Line 3" },
], { x: 0.5, y: 0.5, w: 8, h: 2 });

// Character spacing
slide.addText("SPACED TEXT", { x: 1, y: 1, w: 8, h: 1, charSpacing: 6 });
```

**Tip:** Text boxes have internal margin by default. Set `margin: 0` when aligning text precisely with shapes, lines, or icons.

---

## Lists & Bullets

```javascript
// Correct: Multiple bullets
slide.addText([
  { text: "First item", options: { bullet: true, breakLine: true } },
  { text: "Second item", options: { bullet: true, breakLine: true } },
  { text: "Third item", options: { bullet: true } },
], { x: 0.5, y: 0.5, w: 8, h: 3 });

// NEVER use unicode bullet characters like bullet chars
// Sub-items
{ text: "Sub-item", options: { bullet: true, indentLevel: 1 } }
```

---

## Shapes

```javascript
// Rectangle
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 0.8, w: 1.5, h: 3.0,
  fill: { color: COLORS.olive }, line: { color: COLORS.black, width: 2 },
});

// Line
slide.addShape(pres.shapes.LINE, {
  x: 1, y: 3, w: 5, h: 0,
  line: { color: COLORS.olive, width: 1.5 },
});

// Rounded rectangle
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: COLORS.white }, rectRadius: 0.1,
});

// With transparency
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: COLORS.navy, transparency: 50 },
});
```

---

## Images

```javascript
// From file path
slide.addImage({ path: "images/photo.jpg", x: 1, y: 1, w: 5, h: 3 });

// From base64
slide.addImage({ data: "image/png;base64,iVBORw0KGgo...", x: 1, y: 1, w: 5, h: 3 });

// Cover sizing (fill area, may crop)
slide.addImage({
  path: "photo.jpg", x: 0, y: 0, w: 20, h: 11.2,
  sizing: { type: "cover", w: 20, h: 11.2 },
});
```

---

## Icons

Use react-icons to generate SVG icons, then rasterize to PNG:

```javascript
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Use with GoTravel olive green accent
const { FaMapMarkerAlt } = require("react-icons/fa");
const iconData = await iconToBase64Png(FaMapMarkerAlt, "#677A1F", 256);
slide.addImage({ data: iconData, x: 1, y: 1, w: 0.5, h: 0.5 });
```

Install: `npm install -g react-icons react react-dom sharp`

---

## Charts

```javascript
// Bar chart with brand colors
slide.addChart(pres.charts.BAR, chartData, {
  x: 0.5, y: 1, w: 9, h: 4, barDir: "col",
  chartColors: [COLORS.olive, "8B9B3A", "B4C45A"],  // Olive green shades
  chartArea: { fill: { color: COLORS.white }, roundedCorners: true },
  catAxisLabelColor: COLORS.black,
  valAxisLabelColor: COLORS.black,
  valGridLine: { color: "E2E8F0", size: 0.5 },
  catGridLine: { style: "none" },
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: COLORS.black,
  showLegend: false,
});
```

---

## Slide Backgrounds

```javascript
// White (default for content slides)
slide.background = { color: COLORS.white };

// Full-bleed photo (cover/closing slides)
slide.background = { path: "path/to/photo.jpg" };

// Cream accent (use sparingly)
slide.background = { color: COLORS.cream };
```

---

## Tables

```javascript
slide.addTable([
  [
    { text: "Header 1", options: { fill: { color: COLORS.olive }, color: COLORS.white, bold: true, fontFace: FONTS.heading } },
    { text: "Header 2", options: { fill: { color: COLORS.olive }, color: COLORS.white, bold: true, fontFace: FONTS.heading } },
  ],
  [
    { text: "Cell 1", options: { fontFace: FONTS.body } },
    { text: "Cell 2", options: { fontFace: FONTS.body } },
  ],
], {
  x: 1, y: 2, w: 18, h: 3,
  border: { pt: 0.5, color: "E2E8F0" },
  colW: [9, 9],
});
```

---

## Common Pitfalls

1. **NEVER use "#" with hex colors** — causes file corruption
   ```javascript
   color: "677A1F"      // CORRECT
   color: "#677A1F"     // WRONG — corrupts file
   ```

2. **NEVER encode opacity in hex color strings** — 8-char colors corrupt the file
   ```javascript
   shadow: { color: "00000020" }                    // WRONG
   shadow: { color: "000000", opacity: 0.12 }       // CORRECT
   ```

3. **Use `bullet: true`** — NEVER unicode bullet symbols

4. **Use `breakLine: true`** between array items

5. **Avoid `lineSpacing` with bullets** — use `paraSpaceAfter` instead

6. **Each presentation needs a fresh `pptxgen()` instance**

7. **NEVER reuse option objects** — always use factory functions (see Brand Constants section)

8. **Don't use `ROUNDED_RECTANGLE` with accent borders** — rectangular overlays won't cover rounded corners

9. **Shadow offset must be non-negative** — negative values corrupt the file

10. **Gradient fills not supported** — use a gradient image as background instead
