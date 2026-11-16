# CloudSim Landing Page: Specification (draft 2, for discussion)

Status: **discussion draft. No implementation has started.** Sections marked **[Decision]** are my recommendation and are meant to be argued with. Section 12 lists the questions I need answered.

**Draft 2 folds in your direction:** a hero with large copy and a **Start Now** button on the left and the *real, draggable canvas* on the right; use cases directly beneath it; and **hand-built animated SVG walkthroughs with a big cursor** instead of video. Sections 5 to 12 were rewritten around that; section 7 is new and holds the one big engineering consequence (sharing the app's renderer).

---

## 1. Purpose and goals

The landing page has one job: make a visitor understand, within seconds, **why an architecture holds up or falls over**, and get them into the simulator.

The app is the product. The page is its front door, and it is judged the same way the spec judges the app: *a first-time visitor understands what it does within seconds, and it looks like something made by people who care.*

| Goal | How we know |
| --- | --- |
| **Instant comprehension.** The hero shows the product doing its thing: traffic flowing, a component failing, the explanation. No stock imagery, no abstract hero art. | A cold visitor can say what it is after 5 seconds on the hero. |
| **Convert to the app.** One primary action: **Start Now**. | Click-through rate from the hero and the final CTA. |
| **Earn credibility with engineers.** Show the model's assumptions, link the write-up, never overclaim. | Technical readers find the "How honest is it?" section and trust it. |
| **Serve the portfolio purpose.** It must be impressive and shareable on its own. | Gets shared. A clean link preview (OG image) works everywhere. |
| **Stay consistent with the app.** Visitors should feel the same product on both sides of the "Start Now" click. | Side-by-side, indistinguishable design language. |

**Non-goals:** not a documentation site, not a blog, no pricing page (the project is free and open by default; see question 6), no account system, no cookie banner (no tracking that would need one).

---

## 2. Audience

Straight from the product spec, in priority order:

| Audience | What they want from the page | What convinces them |
| --- | --- | --- |
| **Students and interview candidates** (primary) | Build intuition for why designs fail. | The "break it" moment, the plain-language explanation, the starter designs. |
| **Early and mid-level engineers** (primary) | Sanity-check a design, explain tradeoffs. | Suggested fixes with measured results, compare mode, capacity finder. |
| **Senior engineers and architects** (secondary) | Compare options and show a change's effect in reviews. | Before/after charts, SLO and error budget, the honest model write-up. |
| **Hiring managers and recruiters** (portfolio) | See at a glance that the builder understands real systems and ships polish. | The overall quality, the depth of the feature list, the model documentation. |
| **Educators** (new, cheap to serve) | A visual aid for teaching system design. | Starter designs, shareable files, no login. |

---

## 3. Positioning and messaging

**One-line pitch (from the product spec):** *See your architecture breathe, then break it on purpose before production does.*

**Core message hierarchy**
1. Diagrams show what is connected, not how it **behaves**. CloudSim shows behaviour: traffic, saturation, failure and cost on one canvas.
2. Every service is an object that shows its own state, so the picture explains the problem before any panel does.
3. It doesn't just break things. It tells you **why**, proposes a fix, **tests the fix**, and shows the before and after.
4. It is honest: simplified on purpose, assumptions visible, never a substitute for real load testing.

**Tone:** an engineer explaining something to a colleague they respect. Precise, calm, a little dry. Short sentences. No hype words ("revolutionary", "supercharge", "10x"), no AI-gloss, no exclamation marks. Numbers and nouns instead of adjectives.

**Naming:** the product name is **CloudSim**. The tagline below is a working choice and part of question 1.

**Headline candidates** (hero H1)

| # | Headline | Note |
| --- | --- | --- |
| A | **See your architecture breathe.** | Poetic, short, distinctive. Needs the subhead to carry meaning. |
| B | **Break your architecture before production does.** | Direct, a little provocative, says the value. |
| C | **System design you can watch fail.** | Concrete, memorable, speaks to learners. |

**[Decision]** Headline **B**, with A as the visual tagline under the logo. Subhead: *"Build a design, push traffic through it, then take parts down on purpose. CloudSim shows what saturates, explains why, and tests the fix."*

---

## 4. Design system: one system, two surfaces

The page must feel like the same product as the app. **Reuse the app's tokens verbatim**; do not invent a marketing palette.

### 4.1 Tokens (copied from `app/src/styles/tokens.css`)

| Token | Value | Role on the landing page |
| --- | --- | --- |
| `--bp-bg` | `#f2f6fb` | Page background ("drafting paper") |
| `--bp-surface` | `#ffffff` | Cards, nav, device frames |
| `--bp-grid` | `#3a7bd5` | The isometric grid (hero background, section dividers), at 10 to 30% alpha |
| `--bp-line` | `#1f4f8a` | Ink: linework, borders at 15% alpha, illustrations |
| `--bp-text` | `#10243e` | Primary text |
| `--bp-text-dim` | `#5a7089` | Secondary text, labels, captions |
| `--bp-accent` | `#0b7fd1` | Primary action, links, focus ring |
| `--status-healthy` | `#12a36a` | Only for "healthy" state |
| `--status-strained` | `#d98a0b` | Only for "strained" state |
| `--status-failed` | `#d93b3b` | Only for "failed" state |
| `--radius-control` / `--radius-panel` | `6px` / `10px` | Buttons and inputs / cards |
| `--dur-fast/base/slow` | `120 / 200 / 320 ms` | Motion timing |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default easing |

**The status colours keep their meaning on the page.** Green, amber and red appear only to show healthy, strained and failed, exactly as in the app. They are never decoration. This is the strongest single piece of consistency, and it makes the screenshots read correctly.

**How to share them [Decision]:** copy `tokens.css` into the landing repo for v1, with a header comment pointing at the source and a note to keep them in sync. When there are two consumers and the tokens change, extract a tiny shared package (`@cloudsim/tokens`). Not before; two repos plus a package is overhead for ~25 lines of CSS.

### 4.2 Typography

Same families as the app: **IBM Plex Sans** (UI and body) and **IBM Plex Mono** (numbers, labels, annotations), self-hosted via `@fontsource`.

The app is dense (13px body). The page needs room, so it scales up while keeping the same hierarchy and treatment:

| Style | Font | Size / weight | Use |
| --- | --- | --- | --- |
| Display | Plex Sans | 56 to 64 / 600, tight tracking | Hero H1 |
| H2 | Plex Sans | 36 to 40 / 600 | Section titles |
| H3 | Plex Sans | 20 / 600 | Card and feature titles |
| Body | Plex Sans | 17 to 18 / 400, 1.6 line height | Paragraphs |
| Label | Plex Sans | 12 / 500, uppercase, +0.06em | Section eyebrows ("HOW IT WORKS") |
| Data | Plex Mono | 14 to 16 / 500, tabular | Numbers in callouts, the "p99 13.3 s" style readouts |
| Annotation | Plex Mono | 11 / 400 | Dimension-mark captions on illustrations |

### 4.3 The visual language ("blueprint")

- **The isometric grid** is the signature background, faint, with major lines every fifth cell, exactly like the canvas. Fade it out toward the edges so text stays clean.
- **Technical linework**: 1px ink lines, dimension ticks, small monospace annotations. Used sparingly as framing devices, never as clutter.
- **Frosted panels** (`.panel`: 80% surface, 12px blur, 1px ink border at 15%) for every card, so the page and the app share the same surface.
- **The real thing, not a mock-up.** Product visuals come from the actual app (recorded or rendered), never from invented illustrations. The components (the stacked servers, the hub, the crates) are the page's illustration style.
- **Restraint.** White space, one accent colour, thin lines. The polish comes from alignment, rhythm and motion, not from decoration.

### 4.4 Motion and micro-interactions

Same timing tokens and easing as the app. The page should feel alive but never busy:

| Moment | Interaction |
| --- | --- |
| Hero | Traffic particles flow along connections in the demo; the failing component's ring pulses; the explanation card slides up. |
| Scroll | Sections fade and rise 12px on entry (200 to 320ms, ease-out), once. Product visuals start playing when they enter view. |
| Buttons | Press scales to 0.97; primary button has a subtle accent glow on hover. |
| Feature tabs | Selecting a feature cross-fades the demo clip and animates the underline. |
| Numbers | Count up once when scrolled into view (the capacity-finder and SLO readouts), using tabular figures so nothing jitters. |
| Nav | Gains a frosted background after the first scroll. |

**Respect `prefers-reduced-motion`:** clips become static posters, counters show final values, no entrance animation. Required, not optional.

### 4.5 Iconography and components

`lucide-react` / `lucide` icons, thin stroke, matching the app. Buttons, chips and cards reuse the app's shapes: 6px controls, 10px panels, chips like `SLO met` / `Fails` styled identically to the app's.

### 4.6 Theme

The app is light-only today, so the page is **light-only for v1**. The token setup makes a dark "midnight blueprint" theme cheap later. Not planned yet; see question 7.

---

## 5. Page structure (revised after your input)

A single long page with anchored sections and a sticky nav. Order: **hero (play with it), use cases (what it is for), animated walkthrough (how it is used), capabilities, credibility, FAQ, call to action.**

```
┌─────────────────────────────────────────────────────────────────────┐
│ ◇ CloudSim        Use cases  How it works  Features  Model  [Start Now]│  Nav (sticky, frosted)
├───────────────────────────────┬─────────────────────────────────────┤
│  CLOUD ARCHITECTURE SIMULATOR │   ┌─────────────────────────────┐   │
│                               │   │  the real canvas, live       │   │
│  Break your architecture      │   │  packets flowing             │   │
│  before production does.      │   │  drag any component          │   │  1. Hero
│                               │   │  ↺ reset      600 rps        │   │
│  description (2 to 3 lines)   │   └─────────────────────────────┘   │
│  [ Start Now ]  See how it works                                    │
│  Free · No sign-up · Runs in your browser                           │
├───────────────────────────────┴─────────────────────────────────────┤
│  What is it for?  six use-case cards                                │  2. Use cases
├─────────────────────────────────────────────────────────────────────┤
│  See it in use:  [ app window, big cursor, captions ]  ① ② ③ ④ ⑤ ⑥ │  3. Animated walkthrough
├─────────────────────────────────────────────────────────────────────┤
│  What you can do: 8 to 10 small animated cards                      │  4. Capabilities
├─────────────────────────────────────────────────────────────────────┤
│  Four starter designs (deep links into the app)                     │  5. Starter designs
├─────────────────────────────────────────────────────────────────────┤
│  How honest is it? Model, assumptions, limits                       │  6. Credibility
├─────────────────────────────────────────────────────────────────────┤
│  FAQ                                                                │  7. FAQ
├─────────────────────────────────────────────────────────────────────┤
│  Ready to break something?   [ Start Now ]                          │  8. Final CTA, footer
└─────────────────────────────────────────────────────────────────────┘
```

### 5.1 Nav
Logo mark and wordmark; anchors (**Use cases, How it works, Features, The model**); a primary **Start Now** button that is always visible, including on mobile; a GitHub icon if the repo is public. Frosted background appears after the first scroll.

### 5.2 Hero: copy on the left, the product on the right
**Left:** small eyebrow (`CLOUD ARCHITECTURE SIMULATOR`), large H1, a short description, the primary button **Start Now** (opens the app), a quiet secondary link **See how it works** (scrolls to the walkthrough), and one reassurance line: *Free. No sign-up. Runs in your browser.*

**Right: the real canvas, live.** The same isometric blueprint ground, the same component objects (the stacked servers, the hub, the database tower, the crates) and the same traffic particles as the app, running the Link Shortener design. Interaction is deliberately tiny:

| Allowed | Not allowed |
| --- | --- |
| Pan and zoom are off. The view is fixed and framed. | Adding or removing components. |
| **Drag any component** to move it; it snaps to the grid, and cannot overlap another. Connections follow it live. | Adding, removing or editing connections. |
| Hover: soft footprint highlight and the component's name. | The inspector, the palette, the dock, the top bar, any dialogs. |
| A small **reset** (↺) button restores the layout. | Selecting, deleting, undo/redo. |

Behaviour:
- **Ambient life.** Traffic flows continuously. A small monospace readout in the corner (`600 rps`, with the live load on the busiest component) ties the picture to the idea.
- **A hint that disappears.** A subtle animated "drag me" cue on one component for the first few seconds, gone after the first drag.
- **Optional ambient spike** (question 3): a very short load spike every ~30 seconds, so a visitor sees a component turn amber and recover without doing anything.
- **No layout shift.** An SVG poster of exactly the same composition paints first; the live canvas is loaded after the page is idle and cross-fades in.
- **Fallbacks.** `prefers-reduced-motion`: static poster only. Phones: the canvas plays but is not draggable by default (see question 5), so scrolling is never hijacked.

### 5.3 Use cases (directly beneath the hero)
Six cards. Each is a one-line title, a short story, and a tiny SVG glyph. Hovering a card highlights the matching scene in the walkthrough below, and clicking it jumps to that scene.

| Use case | The story |
| --- | --- |
| **Prepare for system-design interviews** | *Open the chat-app design, run the traffic spike, see why the queue backs up. Fix it and prove it worked.* |
| **Sanity-check a design before review** | *Find the single points of failure, the load where it breaks, and the change that buys the most headroom.* |
| **Show the effect of a change** | *Pin the current design, apply a fix, and put before and after in the same chart.* |
| **Teach system design** | *Start from a design with a weak point. Students predict what breaks, then run it. Share a design as one file.* |
| **Learn why things fail** | *Retry storms, exhausted connection pools, slow dependencies: watch each one happen, then read the explanation.* |
| **Plan capacity and targets** | *Set an availability target, watch the error budget burn, and find the load at which the design stops meeting it.* |

### 5.4 See it in use: animated walkthrough with a big cursor
Your idea, made concrete. Instead of video, **hand-built SVG scenes** that re-enact real use of the app: a large friendly cursor glides in, hovers, clicks (with a click ripple), and the interface reacts. It is light, crisp at any size, easy to re-time, and it can use the exact tokens and labels of the app.

- **Frame.** A simplified app window (top bar, canvas, dock) drawn with the real tokens and the frosted panel style. The look is unmistakably the same UI, with fewer details.
- **The cursor.** About 28px, accent-tinted with a soft shadow, easing with a slight overshoot, a ripple ring on click. Hovered targets get the same highlight as in the app.
- **Captions.** A short monospace chip at the bottom of the frame names each step: `1  Open a starter design`.
- **Stepper.** Numbered steps under the frame. Autoplays when scrolled into view, loops, pauses when off-screen or when the tab is hidden, and any step can be clicked to jump to it. Keyboard accessible.
- **Reduced motion.** Static key frames with captions.

Proposed scenes (each 8 to 12 s). The numbers shown are the ones the app really produces:

| # | Scene | What the cursor does | What happens on screen |
| --- | --- | --- | --- |
| 1 | **Open a design** | Opens **Designs**, picks *Chat App*. | The canvas builds in; packets start to flow. |
| 2 | **Break it** | **Scenarios** → *Traffic spike*. | Metrics turn red (`ERR 78.4%`), the SLO meter fills, the **BOTTLENECK** tag appears. |
| 3 | **Understand it** | Clicks **Why? and what to try**. | The card expands: *"It is receiving 4,621 rps but can only handle about 1,000 rps."* |
| 4 | **Fix it** | **Review** → **Apply** on the top fix. | `Traffic spike: 78% → 5%`, cost `+$0.34/hr`. |
| 5 | **Compare** | Opens **Compare**. | Dashed A line spikes, solid B stays low. |
| 6 | **Find the limit** | Opens **Capacity**. | Headroom bars fill; the curve shows the knee at `1,000 rps`. |
| 7 (optional) | **Follow a request** | Clicks **Trace**. | A dot rides the connections; the waterfall fills. |
| 8 (optional) | **Rewind** | Drags the timeline back. | The canvas returns to before it broke. |

**How it is built.** A small data-driven timeline (`{ time, target, action }` per step) drives every scene, so a scene is a script, not hand-keyed animation. All scenes draw from one **mini UI kit** of SVG primitives (panel, chip, button, bar, sparkline, menu) built on the tokens, so a design change updates every scene at once. Motion (the library the app already uses) runs the timelines, so no heavy dependency is added.

**The honest trade-off:** these are *re-creations*, not recordings, so they can drift from the real UI. Mitigation: a short "walkthrough check" in the app's release checklist, and the shared mini UI kit.

### 5.5 What you can do (capabilities)
A grid of 8 to 10 small cards, each with a looping vignette (the same SVG approach, 3 to 5 seconds), a one-line claim and one real number or example.

| Capability | Claim |
| --- | --- |
| **State on the object** | Every service shows its own state, and its level: stacked servers, a taller database, more cache shelves, more crates. |
| **Break it on purpose** | Kill, slow, or lose an instance. Or run a one-click scenario: traffic spike, node failure, slow database. |
| **It tells you why** | A plain-language card names the bottleneck and the cause. |
| **Fixes found by experiment** | It tries changes, re-runs the stress test, and ranks them by measured improvement. |
| **Compare designs** | Pin a design as A, change something, and see both on the same scenario. |
| **Capacity finder** | Turn the traffic up until it breaks: where, and what gives out first. |
| **SLOs and error budget** | Set a target and watch the budget burn. |
| **Autoscaling, honestly** | New instances start after a delay, so a spike still hurts. |
| **Trace one request** | Follow a single request hop by hop. |
| **Rewind** | Drag the timeline back to the moment it broke. |

### 5.6 Starter designs
The four presets as a row of cards rendered from the app, each with its **weak point in one sentence** (the same text as the app's Designs menu). Each has **Open this design**, which deep-links into the app with that preset loaded.

### 5.7 How honest is it? (credibility)
Where engineers decide to trust it. Plain statements: it is a simplified model, not a load tester or a clone of any cloud service; every formula and default is written down (**link to `docs/MODEL.md`**) and assumed values are marked in the app; costs are estimates; the model is deterministic and unit-tested (we state the real test count at build time); what it deliberately does not do yet. Includes one small "how a number is computed" card in monospace (latency under load, the error-budget formula).

### 5.8 FAQ
Is it free? Does it need an account? Does it connect to my cloud account? (No.) How accurate is it? How is it different from a load tester or a diagram tool? Where is my data stored? (In your browser.) Can I share a design? Which clouds does it model? (Generic components.) Is it open source? (question 6.)

### 5.9 Final CTA and footer
A repeat of the hero call to action over the grid. Footer: product links, docs, GitHub, contact. No newsletter form in v1.

---

## 6. Content inventory (what we must produce)

| Asset | Count | Notes |
| --- | --- | --- |
| **Walkthrough scripts + mini UI kit (SVG)** | 6 scenes (+2 optional), 1 kit | Replaces video entirely. Data-driven, re-timable. |
| **Capability vignettes (SVG)** | 8 to 10 | Reuse kit primitives. |
| **Hero poster (SVG)** | 1 | Exactly the first live frame, for instant paint and fallbacks. |
| **Use-case glyphs** | 6 | Small linework icons in the app's style. |
| **Starter design renders** | 4 | Static, 2× resolution, from the real app. |
| **Open Graph / Twitter card** | 1 (+ variants later) | 1200×630, built from the hero poster and headline. |
| **Logo mark, wordmark, favicon, touch icon** | 1 set | The ◇ glyph in the app is a placeholder; needs a proper mark. |
| **Screenshot set** | ~6 | Also reusable in the app's README. |

There is **no video** to record, store or re-record. Everything is code, so it versions with the repo and scales to any display.

---

## 7. The interactive hero canvas: the big engineering decision

The hero needs the app's **real renderer**, not an imitation. That is the right call for polish (it *is* the product), and it has a cost: two repos need the same canvas code.

### What the hero needs
The drawing of every component kind at every level, the packet particles, the isometric grid, the simulation that decides how busy things are, and a drag-to-move interaction. It does **not** need the inspector, palette, dialogs, saving, scenarios or tracing.

### Options
| Option | How | Pros | Cons |
| --- | --- | --- | --- |
| **1. Shared package (recommended)** | Extract the engine and the canvas scene into `@cloudsim/core`, published from the app repo (a small pnpm workspace inside it: `app` + `packages/core`). Both the app and the landing page depend on it. | One source of truth; the hero can never drift from the app; clean boundary. | Real refactor: the scene currently imports the app's state stores. Needs versioning and publishing. |
| **2. Vendored copy** | Copy the relevant files into the landing repo with a sync script. | Fastest to start. | Drift, double maintenance, the exact thing we want to avoid. |
| **3. Git submodule** | Landing repo includes the app repo. | No publishing. | Clunky, pulls in everything, awkward builds. |
| **4. One monorepo** | Merge the repos. | Simplest sharing. | Contradicts the two-repo decision you just made. |

**[Decision]** Option 1. The engine is already pure TypeScript with no UI imports, which makes it the easy half. The scene needs a modest refactor: take the architecture and a small `interactions` option (`{ move: true }`) as inputs instead of reading global stores, so the same scene runs as the full editor in the app and as a constrained "showcase" on the landing page.

### Budget and performance
PixiJS dominates the app's bundle (roughly 235 KB gzipped for the whole app today). On the landing page it must not hurt the first paint:
- The poster (SVG) is the Largest Contentful Paint element; the canvas loads after idle and fades in.
- Import only the Pixi modules the scene uses (tree-shaking), cap the particle count, drop to a lower frame rate when the tab is not visible, and stop entirely when scrolled off-screen.
- Target: no effect on LCP, first-load JavaScript for the page itself well under 60 KB, canvas chunk loaded lazily.

### Interaction details that matter
- **Dragging uses pointer capture only while a component is held.** Page scrolling is never blocked by the canvas, on mouse or touch.
- Drop outside the frame or onto another component snaps back with a small animation, the same as the app.
- Moving a component re-routes its connections live, so the packet paths follow.

---

## 8. Technical approach

**Stack [Decision]:** **Astro** (static output) with a React island for the hero canvas, **Tailwind v4**, **TypeScript**, `@fontsource` for Plex, **Motion** for the walkthrough timelines and micro-interactions, `lucide` icons. The walkthrough scenes are plain SVG and ship almost no JavaScript beyond Motion.

*Why not Next.js:* no server logic is needed; static output is faster and cheaper. *Why not plain Vite/React:* Astro ships near-zero JavaScript for the static parts, which matters when the hero canvas is the heavy part.

| Concern | Plan |
| --- | --- |
| Hosting | Static host with a CDN (Vercel, Cloudflare Pages or Netlify). Landing at the root domain, the app at `app.<domain>` or `/app`. Two repos, two deploys. |
| Performance | LCP under 2.0 s on a mid-range phone, CLS = 0, the canvas lazy and idle-loaded, animations paused off-screen. |
| Accessibility | WCAG AA. Correct heading order, visible accent focus rings, text equivalents for every animation, keyboard-operable stepper, `prefers-reduced-motion` honoured. The draggable canvas has a keyboard-accessible alternative or is marked decorative with a clear label. |
| Responsive | Mobile-first. The hero stacks (copy, then canvas). The walkthrough keeps its aspect ratio and scales. The capability grid reflows. No horizontal scroll, 16 px gutters. |
| SEO | Semantic HTML, one H1, title and description, canonical, OG/Twitter cards, `sitemap.xml`, JSON-LD (`SoftwareApplication`). |
| Analytics | Cookieless (Plausible, Umami or Cloudflare), so no consent banner. Track: Start Now clicks by section, hero drags (did anyone play with it?), walkthrough steps viewed, scroll depth to the credibility section. |
| Content | Section copy and walkthrough scripts as typed content files, so wording changes never touch layout code. |
| Quality gates | Lighthouse CI (performance, accessibility, SEO at least 95), screenshot checks at key breakpoints, link check. |

---

## 9. Integration with the app

The two repos stay independent. They touch in these places only:

1. **`@cloudsim/core`** (section 7): the shared engine and scene. The main new piece of work.
2. **Launch URL:** the **Start Now** button points at the deployed app, set by one environment variable.
3. **Deep links to starter designs:** `app/?design=chat` opens that preset directly. Small app change.
4. **Tokens:** copied for v1 with a "keep in sync" header. When there are two consumers and they change, they move into `@cloudsim/core` (or a sibling `@cloudsim/tokens`).
5. **Docs:** the page links to `docs/MODEL.md` on GitHub rather than keeping a copy.

---

## 10. Phasing

| Phase | Scope | Gate |
| --- | --- | --- |
| **L0: Extract the core** (in the app repo) | Make the scene and engine usable without the app's stores, publish `@cloudsim/core`, keep the app working on top of it. | App behaves identically; tests pass; a tiny demo page renders the hero scene. |
| **L1: The page** | Hero with the live canvas, use cases, the walkthrough (6 scenes), capabilities, starter designs, credibility, FAQ, final CTA. Analytics, OG cards, deployed on a real domain. | A cold visitor understands it in 5 seconds; Lighthouse at least 95; reads well on phone and desktop. |
| **L2: Depth** | A rendered "The model" page, changelog, per-starter pages with their own OG images, a few short "Learn" pages (retry storms, error budgets, capacity). | Docs are findable; learn pages get organic traffic. |
| **L3: Extras** | Optional walkthrough scenes, a dark theme, scripted hero scenarios (a "Break it" toggle), gallery of shared designs if the app ever supports sharing. | Hero interaction rate. |

L0 is the one real prerequisite. If you would rather start the page sooner, the fallback is a vendored copy for the hero only (option 2), with extraction later. I would not recommend it, but it is possible.

---

## 11. Risks

| Risk | Mitigation |
| --- | --- |
| **Heavy hero** (a full renderer on a marketing page). | SVG poster first, lazy and idle loading, tree-shaken Pixi, particles capped, paused off-screen; budget enforced in CI. |
| **Mobile performance and battery.** | Lower frame rate and particle cap on small screens; non-interactive by default on phones. |
| **Scroll hijacking.** | Pointer capture only while dragging a component; the rest of the canvas never blocks scroll. |
| **The playful hero distracts from the call to action.** | Fixed, restrained interaction; the button and headline stay dominant; measure drag rate against Start Now clicks. |
| **Walkthrough scenes drift from the real UI.** | Shared mini UI kit, data-driven scripts, a release-checklist item. |
| **The shared package slows development.** | Keep it small (engine and scene only), version it, and keep the app and landing page on the same version. |
| **Looks generic.** | The page is built from the real product visuals; no stock art, no gradient blobs. |
| **Over-claiming.** | The credibility section is mandatory; copy says "estimate" and "simplified" wherever it applies. |
| **Fake social proof temptation.** | None. Real signals only, or none. |

---

## 12. Open questions

New or changed after your input:

1. **Where do the use cases go?** I read "at the bottom" as *below the hero*, so they sit directly under it and the walkthrough follows. Did you mean the very bottom of the page instead? It is a one-line reorder.
2. **Walkthrough scenes.** Are these the right six (open, break, understand, fix, compare, find the limit)? Anything you want added or cut? Should a scene also show *dragging the `+` to connect*, since that is a signature interaction?
3. **Ambient hero behaviour.** Just steady flowing traffic, or also a very short spike every ~30 s so a component visibly strains and recovers on its own?
4. **Extra hero controls.** Keep it strictly drag-only, or allow one more small affordance such as a **Spike** chip for visitors who want to see something break? (My lean: drag-only first, a Spike chip as a later experiment.)
5. **Phones.** The canvas animates but is not draggable by default so scrolling is never hijacked. Okay, or do you want touch dragging with a long-press?
6. **Shared core.** Comfortable with the `@cloudsim/core` extraction (section 7, option 1) as a prerequisite, accepting that it delays the page, versus a vendored copy to start sooner?
7. **Cursor style.** A classic arrow, or something more distinctive and branded? Should clicks show a ripple, a pulse, or a tooltip-style label?

Still open from before:

8. **Name and tagline.** Is "CloudSim" final? Headline A, B or C? Do you want a proper logo mark designed?
9. **Domain and hosting.** Do you have a domain? `app.` subdomain or `/app` path?
10. **Open source and pricing.** Will the repo be public and the product free? That settles the nav, FAQ and any pricing text.
11. **Dark theme.** Light-only for v1, or also a dark page?
12. **Real signals.** Any real proof to show (users, a quote, stars)? If not, we leave it out.
13. **Analytics, contact and credit.** Cookieless analytics only? An "about / built by" line or socials in the footer?

---

## 13. Suggested next step

Settle questions 1, 2, 6 and 8 first. Then, with your go-ahead, I would make **one throwaway prototype to judge the feel**, before any real build: a single static HTML file with the hero layout and **one** walkthrough scene (the big cursor opening the Scenarios menu and the metrics turning red), using the real tokens. It answers "does this look and feel right?" cheaply. Nothing is built until you say so.
