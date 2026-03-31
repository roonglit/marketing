const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// react-icons (FA = Font Awesome, Md = Material Design)
const {
  FaBullseye, FaUsers, FaShareAlt, FaDollarSign, FaCalendarAlt,
  FaChartLine, FaMapMarkerAlt, FaInstagram, FaGoogle, FaEnvelope,
  FaVideo, FaTiktok, FaFacebookF, FaPlaneDeparture, FaMountain,
  FaUmbrellaBeach, FaCity, FaHorse, FaGlobeAsia,
} = require("react-icons/fa");
const { MdGroups, MdTrendingUp, MdCampaign } = require("react-icons/md");

// ─── BRAND CONSTANTS ────────────────────────────────────────
const C = {
  black: "000000",
  white: "FFFFFF",
  olive: "677A1F",
  navy: "08172A",
  cream: "FEF9F1",
};

const F = {
  heading: "Poppins",
  body: "Roboto",
  nav: "DM Sans",
};

// ─── ICON HELPER ────────────────────────────────────────────
function renderIconSvg(Icon, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color, size: String(size) })
  );
}
async function iconPng(Icon, color = "#000000", size = 256) {
  const svg = renderIconSvg(Icon, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── REUSABLE LAYOUT HELPERS ────────────────────────────────
function addCompanyBar(slide, dark = false) {
  slide.addText("GoTravel Adventures", {
    fontFace: F.nav, fontSize: 16.35, bold: true,
    color: dark ? C.white : C.black,
    x: 8.05, y: 0.45, w: 3.9, h: 0.3, align: "center", margin: 0,
  });
}

function addPageLabel(slide, text) {
  slide.addText(text, {
    fontFace: F.nav, fontSize: 16.35, bold: true, color: C.olive,
    x: 1.2, y: 10.1, w: 8, h: 0.4, margin: 0,
  });
}

function addSectionTitle(slide, text, opts = {}) {
  slide.addText(text, {
    fontFace: F.heading, fontSize: 57, bold: true, color: C.black,
    margin: 0, ...opts,
  });
}

function addBody(slide, text, opts = {}) {
  slide.addText(text, {
    fontFace: F.body, fontSize: 20, color: C.black, lineSpacingMultiple: 1.7,
    margin: 0, ...opts,
  });
}

function addSubhead(slide, text, opts = {}) {
  slide.addText(text, {
    fontFace: F.body, fontSize: 25, bold: true, color: C.black,
    margin: 0, ...opts,
  });
}

function hLine(slide, x, y, w, color = C.black, width = 1.5) {
  slide.addShape(slide._slideLayout ? "line" : "line", {});
  // Use pptxgen shape reference from the pres object — passed via closure
  slide.addShape("line", { x, y, w, h: 0, line: { color, width } });
}

// ─── MAIN ────────────────────────────────────────────────────
(async () => {
  const pres = new pptxgen();
  pres.defineLayout({ name: "GOTRAVEL", width: 20, height: 11.2 });
  pres.layout = "GOTRAVEL";
  pres.author = "GoTravel Adventures";
  pres.title = "Q3 Summer Asia Campaign Strategy";

  // Pre-render icons
  const icons = {};
  const iconList = [
    ["bullseye", FaBullseye], ["users", FaUsers], ["share", FaShareAlt],
    ["dollar", FaDollarSign], ["calendar", FaCalendarAlt], ["chart", FaChartLine],
    ["pin", FaMapMarkerAlt], ["instagram", FaInstagram], ["google", FaGoogle],
    ["email", FaEnvelope], ["video", FaVideo], ["tiktok", FaTiktok],
    ["facebook", FaFacebookF], ["plane", FaPlaneDeparture], ["mountain", FaMountain],
    ["beach", FaUmbrellaBeach], ["city", FaCity], ["horse", FaHorse],
    ["globe", FaGlobeAsia], ["groups", MdGroups], ["trending", MdTrendingUp],
    ["campaign", MdCampaign],
  ];
  for (const [name, comp] of iconList) {
    icons[name] = {
      olive: await iconPng(comp, "#677A1F"),
      white: await iconPng(comp, "#FFFFFF"),
      black: await iconPng(comp, "#000000"),
      navy: await iconPng(comp, "#08172A"),
    };
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 1 — COVER
  // ════════════════════════════════════════════════════════════
  const s1 = pres.addSlide();
  s1.background = { color: C.navy };

  // Decorative accent blocks
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 0.12, fill: { color: C.olive } });
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.08, w: 20, h: 0.12, fill: { color: C.olive } });

  addCompanyBar(s1, true);

  // Globe icon as hero visual
  s1.addImage({ data: icons.globe.olive, x: 14.5, y: 2, w: 4.5, h: 4.5 });

  s1.addText("Summer Asia", {
    fontFace: F.heading, fontSize: 74, color: C.white,
    x: 1.5, y: 2.5, w: 13, h: 1.5, margin: 0,
  });
  s1.addText("Campaign Strategy", {
    fontFace: F.heading, fontSize: 120, bold: true, color: C.white,
    x: 1.5, y: 3.8, w: 16, h: 2.5, margin: 0,
  });
  s1.addText("Q3 2026  |  Krabi  |  Chongqing  |  Mongolia", {
    fontFace: F.heading, fontSize: 24, color: C.olive,
    x: 1.5, y: 6.5, w: 12, h: 0.7, margin: 0,
  });

  // Three feature badges at bottom
  const badges = [
    { icon: icons.beach.white, label: "Krabi, Thailand" },
    { icon: icons.city.white, label: "Chongqing, China" },
    { icon: icons.mountain.white, label: "Mongolia" },
  ];
  badges.forEach((b, i) => {
    const bx = 1.5 + i * 5.2;
    s1.addImage({ data: b.icon, x: bx, y: 8.8, w: 0.5, h: 0.5 });
    s1.addText(b.label, {
      fontFace: F.heading, fontSize: 18, color: C.white,
      x: bx + 0.7, y: 8.8, w: 4, h: 0.5, margin: 0, valign: "middle",
    });
  });

  s1.addText("EXPLORE THE STRATEGY", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.navy,
    x: 14.8, y: 9, w: 4, h: 0.7, align: "center", valign: "middle",
    fill: { color: C.olive },
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 2 — CAMPAIGN OVERVIEW & GOALS
  // ════════════════════════════════════════════════════════════
  const s2 = pres.addSlide();
  s2.background = { color: C.white };
  addCompanyBar(s2);

  addSectionTitle(s2, "Campaign Overview\n& Goals", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addBody(s2, "GoTravel is expanding beyond Southeast Asia with three unexpected summer destinations — Krabi, Chongqing, and Mongolia. This Q3 campaign targets millennial travelers (25-40) seeking authentic, off-the-beaten-path adventures during the summer travel window (July-September 2026).", {
    x: 1.2, y: 4.2, w: 8.5, h: 2.5,
  });

  addPageLabel(s2, "Campaign Overview");

  // Vertical separator
  s2.addShape(pres.shapes.LINE, { x: 10.2, y: 1.5, w: 0, h: 8.5, line: { color: C.black, width: 1.5 } });

  // Goals column — right side
  s2.addText("CAMPAIGN GOALS", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.olive,
    x: 11, y: 1.2, w: 8, h: 0.6, margin: 0,
  });

  const goals = [
    { icon: icons.plane.olive, title: "350 Total Bookings", desc: "Across all three destinations in 12 weeks" },
    { icon: icons.trending.olive, title: "3.2x ROAS Target", desc: "Return on ad spend across paid channels" },
    { icon: icons.users.olive, title: "8,000 New Leads", desc: "Email subscribers from campaign landing pages" },
    { icon: icons.chart.olive, title: "2M+ Impressions", desc: "Combined social and paid reach" },
    { icon: icons.groups.olive, title: "25% Repeat Travelers", desc: "Re-engage past GoTravel adventurers" },
  ];

  goals.forEach((g, i) => {
    const gy = 2.2 + i * 1.55;
    s2.addImage({ data: g.icon, x: 11, y: gy, w: 0.55, h: 0.55 });
    s2.addText(g.title, {
      fontFace: F.heading, fontSize: 21, bold: true, color: C.black,
      x: 11.8, y: gy - 0.05, w: 7, h: 0.45, margin: 0,
    });
    s2.addText(g.desc, {
      fontFace: F.body, fontSize: 16, color: C.black,
      x: 11.8, y: gy + 0.4, w: 7, h: 0.4, margin: 0,
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 3 — DESTINATION SPOTLIGHT (3 destinations)
  // ════════════════════════════════════════════════════════════
  const s3 = pres.addSlide();
  s3.background = { color: C.white };
  addCompanyBar(s3);

  addSectionTitle(s3, "Destination\nSpotlight", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addBody(s3, "Three distinct adventures designed for millennial travelers who crave authentic experiences beyond the ordinary.", {
    x: 1.2, y: 4, w: 8, h: 1.2,
  });

  addPageLabel(s3, "Destinations");

  // Three destination cards
  const dests = [
    {
      icon: icons.beach.olive, name: "KRABI, THAILAND",
      trip: "Island Explorer — 7 Days", price: "$1,399/person",
      desc: "Limestone cliffs, emerald waters, and jungle trails. Krabi offers the perfect blend of adventure and relaxation — island hopping, rock climbing, and kayaking through mangrove forests.",
      best: "Beach lovers, active travelers, couples",
    },
    {
      icon: icons.city.olive, name: "CHONGQING, CHINA",
      trip: "Urban Adventure — 8 Days", price: "$1,599/person",
      desc: "A sprawling mega-city where ancient meets ultramodern. Explore the Yangtze River, discover hotpot culture at its source, and trek through the Wulong karst landscapes from Transformers fame.",
      best: "Foodies, culture seekers, urban explorers",
    },
    {
      icon: icons.horse.olive, name: "MONGOLIA",
      trip: "Nomad Experience — 10 Days", price: "$2,199/person",
      desc: "Sleep in traditional gers under endless skies, ride horses across the steppe with nomadic families, and experience the Naadam festival. Mongolia is raw, vast, and unforgettable.",
      best: "Adventure seekers, nature lovers, photographers",
    },
  ];

  dests.forEach((d, i) => {
    const dx = 1.2 + i * 6.2;
    const cardW = 5.6;

    // Cream card background
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: dx, y: 5.5, w: cardW, h: 4.8,
      fill: { color: C.cream }, rectRadius: 0.15,
    });

    s3.addImage({ data: d.icon, x: dx + 0.4, y: 5.8, w: 0.5, h: 0.5 });
    s3.addText(d.name, {
      fontFace: F.heading, fontSize: 21, bold: true, color: C.black,
      x: dx + 1.1, y: 5.8, w: 4, h: 0.5, margin: 0, valign: "middle",
    });

    // Olive accent line under title
    s3.addShape(pres.shapes.LINE, { x: dx + 0.4, y: 6.5, w: cardW - 0.8, h: 0, line: { color: C.olive, width: 0.75 } });

    s3.addText(d.trip, {
      fontFace: F.heading, fontSize: 16, bold: true, color: C.olive,
      x: dx + 0.4, y: 6.7, w: cardW - 0.8, h: 0.35, margin: 0,
    });
    s3.addText(d.price, {
      fontFace: F.heading, fontSize: 28, bold: true, color: C.black,
      x: dx + 0.4, y: 7.05, w: cardW - 0.8, h: 0.55, margin: 0,
    });
    s3.addText(d.desc, {
      fontFace: F.body, fontSize: 14, color: C.black, lineSpacingMultiple: 1.5,
      x: dx + 0.4, y: 7.7, w: cardW - 0.8, h: 1.7, margin: 0,
    });
    s3.addText("Best for: " + d.best, {
      fontFace: F.heading, fontSize: 12, bold: true, color: C.olive,
      x: dx + 0.4, y: 9.5, w: cardW - 0.8, h: 0.5, margin: 0,
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 4 — AUDIENCE SEGMENTS + PIE CHART
  // ════════════════════════════════════════════════════════════
  const s4 = pres.addSlide();
  s4.background = { color: C.white };
  addCompanyBar(s4);

  addSectionTitle(s4, "Audience\nSegments", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addPageLabel(s4, "Target Audience");

  // Separator
  s4.addShape(pres.shapes.LINE, { x: 10.2, y: 1.5, w: 0, h: 8.5, line: { color: C.black, width: 1.5 } });

  // Segments — left column
  const segments = [
    { label: "ADVENTURE MILLENNIALS (25-32)", pct: "40%", desc: "First-time Asia travelers looking for Instagram-worthy, active experiences. Respond to Reels, TikTok, and influencer content. Price-conscious but willing to pay for unique experiences.", color: C.olive },
    { label: "EXPERIENCE SEEKERS (30-40)", pct: "30%", desc: "Seasoned travelers who've done the popular routes and want something new. High intent, longer research phase. Respond well to long-form content, email, and blog SEO.", color: C.navy },
    { label: "REPEAT GOTRAVELERS", pct: "20%", desc: "Past GoTravel adventurers ready for the next journey. Already trust the brand — activate with email, early access, and loyalty perks. Highest conversion rate at 8.2%.", color: "8B9B3A" },
    { label: "GROUP & COUPLE TRAVELERS", pct: "10%", desc: "Traveling with a partner or friend group. Interested in private trip options. Higher average order value. Respond to referral incentives and social proof.", color: "B4C45A" },
  ];

  segments.forEach((seg, i) => {
    const sy = 3.8 + i * 1.8;
    s4.addShape(pres.shapes.RECTANGLE, {
      x: 1.2, y: sy, w: 0.12, h: 1.3,
      fill: { color: seg.color },
    });
    s4.addText(seg.label, {
      fontFace: F.heading, fontSize: 16, bold: true, color: C.black,
      x: 1.6, y: sy, w: 6.5, h: 0.35, margin: 0,
    });
    s4.addText(seg.pct, {
      fontFace: F.heading, fontSize: 28, bold: true, color: seg.color,
      x: 8.2, y: sy, w: 1.5, h: 0.5, margin: 0, align: "right",
    });
    s4.addText(seg.desc, {
      fontFace: F.body, fontSize: 13, color: C.black, lineSpacingMultiple: 1.4,
      x: 1.6, y: sy + 0.45, w: 8, h: 0.85, margin: 0,
    });
  });

  // Pie chart — right side (Audience Segment Split)
  s4.addText("AUDIENCE SEGMENT SPLIT", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.olive,
    x: 11, y: 1.2, w: 8, h: 0.6, margin: 0,
  });

  s4.addChart(pres.charts.DOUGHNUT, [{
    name: "Segments",
    labels: ["Adventure Millennials", "Experience Seekers", "Repeat GoTravelers", "Group & Couples"],
    values: [40, 30, 20, 10],
  }], {
    x: 11.5, y: 2.2, w: 7, h: 6.5,
    chartColors: [C.olive, C.navy, "8B9B3A", "B4C45A"],
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    legendFontSize: 14,
    legendColor: C.black,
    dataLabelColor: C.white,
    dataLabelFontSize: 16,
    dataLabelFontBold: true,
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 5 — CHANNEL STRATEGY
  // ════════════════════════════════════════════════════════════
  const s5 = pres.addSlide();
  s5.background = { color: C.white };
  addCompanyBar(s5);

  addSectionTitle(s5, "Channel\nStrategy", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addBody(s5, "A multi-channel approach targeting millennials where they research and book travel — social-first discovery, SEO for high-intent capture, email for nurturing, and paid ads for conversion.", {
    x: 1.2, y: 4, w: 8.5, h: 1.5,
  });

  addPageLabel(s5, "Channels");

  // Separator
  s5.addShape(pres.shapes.LINE, { x: 10.2, y: 1.5, w: 0, h: 8.5, line: { color: C.olive, width: 0.75 } });

  // Channel cards — right column, stacked
  const channels = [
    { icon: icons.instagram.olive, label: "INSTAGRAM & TIKTOK", role: "Discovery & Awareness", desc: "Reels-first strategy: destination teasers, traveler POVs, behind-the-scenes. Target: 1.5M impressions, 50K profile visits." },
    { icon: icons.video.olive, label: "YOUTUBE", role: "Consideration & Trust", desc: "Long-form destination guides and trip vlogs. SEO-optimized titles. Target: 12 videos, 100K views total." },
    { icon: icons.email.olive, label: "EMAIL MARKETING", role: "Nurture & Convert", desc: "Destination-specific drip sequences, early bird offers, countdown timers. Target: 30% open rate, 5% click-to-book." },
    { icon: icons.google.olive, label: "GOOGLE ADS", role: "High-Intent Capture", desc: "Search campaigns for 'Krabi tours,' 'Mongolia travel,' 'Chongqing adventure.' Target: $25 CPA, 3.8% conversion." },
    { icon: icons.facebook.olive, label: "META ADS", role: "Prospecting & Retargeting", desc: "Lookalike audiences from past bookers, retargeting site visitors. Carousel + video creative. Target: $30 CPA, 3.2x ROAS." },
    { icon: icons.share.olive, label: "SEO & BLOG", role: "Organic Long-Term", desc: "Destination guides, itinerary posts, 'best time to visit' content. Target: 15K organic visits from campaign keywords." },
  ];

  channels.forEach((ch, i) => {
    const cy = 1.2 + i * 1.6;
    s5.addImage({ data: ch.icon, x: 10.8, y: cy + 0.05, w: 0.45, h: 0.45 });
    s5.addText(ch.label, {
      fontFace: F.heading, fontSize: 16, bold: true, color: C.black,
      x: 11.5, y: cy, w: 5, h: 0.35, margin: 0,
    });
    s5.addText(ch.role, {
      fontFace: F.heading, fontSize: 12, bold: true, color: C.olive,
      x: 16.5, y: cy, w: 3, h: 0.35, margin: 0, align: "right",
    });
    s5.addText(ch.desc, {
      fontFace: F.body, fontSize: 13, color: C.black, lineSpacingMultiple: 1.35,
      x: 11.5, y: cy + 0.4, w: 8, h: 0.85, margin: 0,
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 6 — BUDGET ALLOCATION + BAR CHART
  // ════════════════════════════════════════════════════════════
  const s6 = pres.addSlide();
  s6.background = { color: C.white };
  addCompanyBar(s6);

  addSectionTitle(s6, "Budget\nAllocation", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addPageLabel(s6, "Budget");

  // Total budget callout
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.2, y: 4.2, w: 4.5, h: 1.5,
    fill: { color: C.cream }, rectRadius: 0.1,
  });
  s6.addText("TOTAL CAMPAIGN BUDGET", {
    fontFace: F.heading, fontSize: 14, bold: true, color: C.olive,
    x: 1.5, y: 4.3, w: 4, h: 0.4, margin: 0,
  });
  s6.addText("$42,000", {
    fontFace: F.heading, fontSize: 43, bold: true, color: C.black,
    x: 1.5, y: 4.7, w: 4, h: 0.9, margin: 0,
  });

  // Budget breakdown table — left side
  const budget = [
    { channel: "Meta Ads (IG + FB)", amount: "$14,000", pct: "33%" },
    { channel: "Google Ads (Search)", amount: "$8,400", pct: "20%" },
    { channel: "Content Production", amount: "$7,500", pct: "18%" },
    { channel: "Influencer Partnerships", amount: "$5,000", pct: "12%" },
    { channel: "Email Marketing", amount: "$3,000", pct: "7%" },
    { channel: "TikTok Ads", amount: "$2,100", pct: "5%" },
    { channel: "SEO & Blog", amount: "$2,000", pct: "5%" },
  ];

  // Table header
  s6.addText("CHANNEL", {
    fontFace: F.heading, fontSize: 14, bold: true, color: C.olive,
    x: 1.2, y: 6.2, w: 4.5, h: 0.35, margin: 0,
  });
  s6.addText("BUDGET", {
    fontFace: F.heading, fontSize: 14, bold: true, color: C.olive,
    x: 5.7, y: 6.2, w: 2, h: 0.35, margin: 0, align: "right",
  });
  s6.addText("SHARE", {
    fontFace: F.heading, fontSize: 14, bold: true, color: C.olive,
    x: 7.8, y: 6.2, w: 1.5, h: 0.35, margin: 0, align: "right",
  });

  s6.addShape(pres.shapes.LINE, { x: 1.2, y: 6.6, w: 8.1, h: 0, line: { color: C.olive, width: 0.75 } });

  budget.forEach((b, i) => {
    const by = 6.75 + i * 0.48;
    s6.addText(b.channel, {
      fontFace: F.body, fontSize: 15, color: C.black,
      x: 1.2, y: by, w: 4.5, h: 0.4, margin: 0,
    });
    s6.addText(b.amount, {
      fontFace: F.heading, fontSize: 15, bold: true, color: C.black,
      x: 5.7, y: by, w: 2, h: 0.4, margin: 0, align: "right",
    });
    s6.addText(b.pct, {
      fontFace: F.heading, fontSize: 15, bold: true, color: C.olive,
      x: 7.8, y: by, w: 1.5, h: 0.4, margin: 0, align: "right",
    });
  });

  // Bar chart — right side (Channel Budget Breakdown)
  s6.addText("CHANNEL BUDGET BREAKDOWN", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.olive,
    x: 10.8, y: 1.2, w: 8, h: 0.6, margin: 0,
  });

  s6.addChart(pres.charts.BAR, [{
    name: "Budget ($)",
    labels: ["Meta Ads", "Google Ads", "Content", "Influencers", "Email", "TikTok", "SEO"],
    values: [14000, 8400, 7500, 5000, 3000, 2100, 2000],
  }], {
    x: 10.5, y: 2, w: 8.5, h: 7.5,
    barDir: "bar",
    chartColors: [C.olive],
    chartArea: { fill: { color: C.white } },
    catAxisLabelColor: C.black,
    catAxisLabelFontSize: 14,
    catAxisLabelFontFace: F.body,
    valAxisLabelColor: "888888",
    valAxisLabelFontSize: 12,
    valGridLine: { color: "E8E8E8", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: C.black,
    dataLabelFontSize: 13,
    dataLabelFontBold: true,
    showLegend: false,
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 7 — 12-WEEK ROLLOUT TIMELINE
  // ════════════════════════════════════════════════════════════
  const s7 = pres.addSlide();
  s7.background = { color: C.white };
  addCompanyBar(s7);

  addSectionTitle(s7, "12-Week Rollout\nTimeline", { x: 1.2, y: 1.2, w: 10, h: 2.8 });

  addPageLabel(s7, "Timeline");

  // Phase blocks
  const phases = [
    {
      phase: "PHASE 1", title: "Pre-Launch & Hype", weeks: "Weeks 1-3  (Jul 1-21)",
      color: C.olive,
      items: [
        "Launch teaser Reels + TikToks for each destination",
        "Publish 3 SEO blog posts (one per destination guide)",
        "Build email hype sequence — 'Something new is coming'",
        "Set up Meta + Google ad campaigns (don't launch yet)",
        "Finalize influencer contracts (2 creators per destination)",
      ],
    },
    {
      phase: "PHASE 2", title: "Full Launch", weeks: "Weeks 4-8  (Jul 22 - Aug 25)",
      color: C.navy,
      items: [
        "Activate all paid channels — Meta, Google, TikTok ads live",
        "Influencer content goes live (trip vlogs, photo series)",
        "Email launch blast to full list + destination-specific sequences",
        "Weekly YouTube destination guides (1 per week)",
        "Launch early bird pricing — 15% off for first 50 bookings",
      ],
    },
    {
      phase: "PHASE 3", title: "Optimize & Close", weeks: "Weeks 9-12  (Aug 26 - Sep 21)",
      color: "8B9B3A",
      items: [
        "Shift budget to highest-performing channels (weekly ROAS review)",
        "Retargeting push — abandoned checkout + site visitors",
        "Urgency messaging: 'Last spots available' on top destinations",
        "Referral push — past travelers get $100 credit",
        "Post-campaign analysis and Q4 planning kickoff",
      ],
    },
  ];

  phases.forEach((p, i) => {
    const px = 1.2 + i * 6.2;
    const cardW = 5.6;

    // Phase accent bar at top
    s7.addShape(pres.shapes.RECTANGLE, {
      x: px, y: 4, w: cardW, h: 0.12,
      fill: { color: p.color },
    });

    s7.addText(p.phase, {
      fontFace: F.heading, fontSize: 14, bold: true, color: p.color,
      x: px, y: 4.3, w: cardW, h: 0.35, margin: 0,
    });
    s7.addText(p.title, {
      fontFace: F.heading, fontSize: 24, bold: true, color: C.black,
      x: px, y: 4.65, w: cardW, h: 0.55, margin: 0,
    });
    s7.addText(p.weeks, {
      fontFace: F.body, fontSize: 14, color: C.olive,
      x: px, y: 5.2, w: cardW, h: 0.35, margin: 0,
    });

    // Olive line separator
    s7.addShape(pres.shapes.LINE, { x: px, y: 5.7, w: cardW, h: 0, line: { color: p.color, width: 0.75 } });

    // Bullet items
    const bulletData = p.items.map((item, j) => ({
      text: item,
      options: {
        bullet: true, breakLine: j < p.items.length - 1,
        fontFace: F.body, fontSize: 14, color: C.black,
      },
    }));
    s7.addText(bulletData, {
      x: px, y: 5.9, w: cardW, h: 4, margin: 0,
      paraSpaceAfter: 8,
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 8 — PROJECTED BOOKINGS (LINE CHART)
  // ════════════════════════════════════════════════════════════
  const s8 = pres.addSlide();
  s8.background = { color: C.white };
  addCompanyBar(s8);

  addSectionTitle(s8, "Projected Bookings\nOver 12 Weeks", { x: 1.2, y: 1.2, w: 10, h: 2.8 });

  addPageLabel(s8, "Projections");

  // Callout stats
  const stats = [
    { value: "350", label: "Total Bookings Target" },
    { value: "29", label: "Avg Bookings/Week" },
    { value: "$525K", label: "Projected Revenue" },
  ];
  stats.forEach((st, i) => {
    const sx = 11 + i * 3;
    s8.addText(st.value, {
      fontFace: F.heading, fontSize: 36, bold: true, color: C.olive,
      x: sx, y: 1.5, w: 2.5, h: 0.8, margin: 0, align: "center",
    });
    s8.addText(st.label, {
      fontFace: F.body, fontSize: 14, color: C.black,
      x: sx, y: 2.3, w: 2.5, h: 0.5, margin: 0, align: "center",
    });
  });

  // Line chart — projected bookings per week
  s8.addChart(pres.charts.LINE, [
    {
      name: "Krabi",
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
      values: [2, 4, 6, 12, 16, 18, 20, 18, 15, 14, 12, 10],
    },
    {
      name: "Chongqing",
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
      values: [1, 2, 4, 8, 10, 12, 14, 13, 11, 10, 9, 7],
    },
    {
      name: "Mongolia",
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
      values: [1, 2, 3, 6, 8, 9, 10, 10, 9, 8, 7, 5],
    },
  ], {
    x: 1, y: 3.5, w: 18, h: 6.5,
    chartColors: [C.olive, C.navy, "8B9B3A"],
    lineSize: 3,
    lineSmooth: true,
    chartArea: { fill: { color: C.white } },
    catAxisLabelColor: C.black,
    catAxisLabelFontSize: 14,
    catAxisLabelFontFace: F.body,
    valAxisLabelColor: "888888",
    valAxisLabelFontSize: 12,
    valGridLine: { color: "E8E8E8", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 14,
    legendColor: C.black,
    showMarker: true,
    markerSize: 8,
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 9 — KEY METRICS & KPIs
  // ════════════════════════════════════════════════════════════
  const s9 = pres.addSlide();
  s9.background = { color: C.white };
  addCompanyBar(s9);

  addSectionTitle(s9, "Key Metrics\n& KPIs", { x: 1.2, y: 1.2, w: 9, h: 2.8 });

  addBody(s9, "Weekly tracking across all channels with bi-weekly optimization reviews. Campaign dashboard in Google Analytics 4 + custom Notion tracker.", {
    x: 1.2, y: 4, w: 8.5, h: 1.2,
  });

  addPageLabel(s9, "Measurement");

  // Separator
  s9.addShape(pres.shapes.LINE, { x: 10.2, y: 1.5, w: 0, h: 8.5, line: { color: C.olive, width: 0.75 } });

  // KPI grid — right side, 2 columns x 4 rows
  const kpis = [
    { metric: "Cost Per Acquisition", target: "$30", current: "$45 (Q2 avg)" },
    { metric: "Return on Ad Spend", target: "3.2x", current: "2.1x (Q2 avg)" },
    { metric: "Email Open Rate", target: "30%", current: "24%" },
    { metric: "Landing Page Conversion", target: "3.5%", current: "2.1%" },
    { metric: "Social Engagement Rate", target: "5%+", current: "4.2%" },
    { metric: "Video View-Through Rate", target: "40%", current: "New channel" },
    { metric: "New Email Subscribers", target: "8,000", current: "N/A" },
    { metric: "Repeat Traveler Bookings", target: "88 (25%)", current: "30% historically" },
  ];

  s9.addText("KPI DASHBOARD", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.olive,
    x: 11, y: 1.2, w: 8, h: 0.6, margin: 0,
  });

  // Header row
  s9.addText("METRIC", {
    fontFace: F.heading, fontSize: 13, bold: true, color: C.olive,
    x: 11, y: 2, w: 4, h: 0.35, margin: 0,
  });
  s9.addText("TARGET", {
    fontFace: F.heading, fontSize: 13, bold: true, color: C.olive,
    x: 15, y: 2, w: 2, h: 0.35, margin: 0, align: "center",
  });
  s9.addText("CURRENT", {
    fontFace: F.heading, fontSize: 13, bold: true, color: C.olive,
    x: 17, y: 2, w: 2.5, h: 0.35, margin: 0, align: "center",
  });

  s9.addShape(pres.shapes.LINE, { x: 11, y: 2.4, w: 8.5, h: 0, line: { color: C.olive, width: 0.75 } });

  kpis.forEach((k, i) => {
    const ky = 2.6 + i * 0.95;

    // Alternate cream background
    if (i % 2 === 0) {
      s9.addShape(pres.shapes.RECTANGLE, {
        x: 10.8, y: ky - 0.05, w: 8.8, h: 0.85,
        fill: { color: C.cream },
      });
    }

    s9.addText(k.metric, {
      fontFace: F.body, fontSize: 15, color: C.black,
      x: 11, y: ky, w: 4, h: 0.4, margin: 0,
    });
    s9.addText(k.target, {
      fontFace: F.heading, fontSize: 18, bold: true, color: C.olive,
      x: 15, y: ky, w: 2, h: 0.4, margin: 0, align: "center",
    });
    s9.addText(k.current, {
      fontFace: F.body, fontSize: 13, color: "888888",
      x: 17, y: ky, w: 2.5, h: 0.4, margin: 0, align: "center",
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 10 — CLOSING
  // ════════════════════════════════════════════════════════════
  const s10 = pres.addSlide();
  s10.background = { color: C.navy };

  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 0.12, fill: { color: C.olive } });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.08, w: 20, h: 0.12, fill: { color: C.olive } });

  addCompanyBar(s10, true);

  s10.addText("Summer Asia", {
    fontFace: F.heading, fontSize: 74, color: C.white,
    x: 3, y: 2.8, w: 14, h: 1.5, align: "center", margin: 0,
  });
  s10.addText("Let's Make It Happen", {
    fontFace: F.heading, fontSize: 120, bold: true, color: C.white,
    x: 1, y: 4.2, w: 18, h: 2.5, align: "center", margin: 0,
  });

  s10.addText("Q3 2026  |  $42K Budget  |  350 Booking Target  |  12-Week Sprint", {
    fontFace: F.heading, fontSize: 21, color: C.olive,
    x: 3, y: 7, w: 14, h: 0.6, align: "center", margin: 0,
  });

  // CTA button
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.75, y: 8.5, w: 4.5, h: 0.9,
    fill: { color: C.olive }, rectRadius: 0.1,
  });
  s10.addText("APPROVE & LAUNCH", {
    fontFace: F.heading, fontSize: 21, bold: true, color: C.white,
    x: 7.75, y: 8.5, w: 4.5, h: 0.9, align: "center", valign: "middle", margin: 0,
  });

  // Bottom badges
  const closingBadges = [
    { icon: icons.beach.white, label: "Krabi" },
    { icon: icons.city.white, label: "Chongqing" },
    { icon: icons.mountain.white, label: "Mongolia" },
  ];
  closingBadges.forEach((b, i) => {
    const bx = 5.5 + i * 3.2;
    s10.addImage({ data: b.icon, x: bx, y: 9.8, w: 0.4, h: 0.4 });
    s10.addText(b.label, {
      fontFace: F.heading, fontSize: 16, color: C.white,
      x: bx + 0.55, y: 9.8, w: 2.5, h: 0.4, margin: 0, valign: "middle",
    });
  });

  // ─── SAVE ──────────────────────────────────────────────────
  const outPath = "presentations/q3-summer-asia-campaign-strategy-2026-07.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log(`Deck saved: ${outPath}`);
  console.log("10 slides generated.");
})();
