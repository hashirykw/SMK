# Sir Mehboob Khan — Academy Website

Three self-contained pages. **All CSS and JavaScript inlined** — no `.css` or `.js` files. Only the logo images are external.

```bash
python3 -m http.server 8000     # http://localhost:8000
```

| File | Size |
|---|---|
| `index.html` | 96 kb |
| `portal.html` | 65 kb |
| `course.html` | 73 kb |

**Portal demo:** `st01` (O Level) · `st02` (AS) · `st03` (A2) — code `smk2026`

---

## Every card has its own behaviour

| Card | What it does |
|---|---|
| Course cards | **Real 3D flip** — hover and the card rotates on Y to reveal the full syllabus list and a register CTA. Animated conic border on hover. |
| Method cards | **Depth layers** — inner content sits on its own Z plane, so tilt causes real parallax between layers, not a flat plane rotating |
| The method cube | **A genuine 3D cube**, six faces on separate Z planes, auto-rotating, pauses on hover |
| Syllabus map | **Isometric orbit** — rings tilted 66° in 3D, topics counter-rotated so text stays upright and legible |
| Demo lessons | 3D tilt, scaling play button, level badge, one card per level |
| Stat tiles | Count-up on scroll, cursor-tracking glare, ring motif behind the number |
| Pricing | Hover lift, "most taken" tier highlighted, animated border |
| Lecture cards | **SVG progress ring** that animates on scroll — full arc for completed, partial for not started — plus tilt, glare, and an open affordance that slides in on hover |
| Reviews | 3D tilt on a paused-on-hover marquee |
| Steps | Number badge that scales, rotates and fills gold on hover, connected by a track line |
| Feature rows | Icon tile that rotates and fills on hover |

---

## Sections, and why each exists

Both competitors were read before building this. Gaps they had that are now covered:

| Section | Reasoning |
|---|---|
| Distinctions | Kashan leads with a certificate wall. Yours is built, deliberately empty until real certificates arrive. |
| Where he teaches | Kashan's affiliations grid is his strongest trust signal. Placeholder cards — **needs your real list.** |
| How it works | Kashan has a 4-step flow. Yours puts the free demo before any payment. |
| Demo lessons per level | Kashan has three, one per level. Yours matches, with 3D cards. |
| Open pricing | Nausher hides fees behind pages. Yours shows the number on the page. |
| Free resources | Nausher's "freebies" pull traffic. Same idea, four cards. |
| Student portal | **Neither competitor shows a portal on the marketing site.** This is your differentiator. |
| Syllabus orbit | Nobody in this market has anything like it. |

Also unique to yours: Three.js hero, three themes, sound design, custom cursor, preloader, SMK Assistant chatbot.

---

## Where to edit

Each page has a marked **DATA block** near the bottom.

- `index.html` → `REVIEWS`, `CONTACT`
- `portal.html` → `STUDENTS`
- `course.html` → `STUDENTS`, `COURSES` (every lecture), `CONTACT`

Per lecture: `youtube: 'ID'` embeds and plays · `zoom: 'url'` gives a join button · `kind:` `video`/`live`/`paper`/`quiz` · `done: true` marks complete and the progress bar and rings recalculate themselves.

`STUDENTS` appears in both `portal.html` and `course.html` — add a student to both. Three lines.

---

## ⚠️ The login is a demo

IDs and codes are in the page source. Anyone can read them. Fine for demonstrating the flow; not safe for real paid lectures. That needs a server.

---

## Verified

Every assertion re-run after the upgrade:

- All three IDs open the correct course, code and module count
- Wrong ID / wrong code errors; `course.html` without a session redirects
- No horizontal overflow at 390 / 768 / 1440 px
- Flip cards produce a real `matrix3d` rotation; back faces populated
- Cube renders 6 faces on distinct Z planes under `preserve-3d`
- Depth layers sit on their own Z plane; tilt emits a perspective transform; glare tracks the cursor
- Isometric orbit is 3D-transformed with all 15 nodes placed
- Progress rings animate and differentiate state (4 complete / 12 partial on st01)
- All 12 sections present; every nav and footer anchor resolves to a real target
- Empty form blocked, valid form confirms; chatbot runs to a recommendation
- Zero JavaScript errors on any page

The upgrade pass caught two real bugs: a data dependency that broke the homepage footer, and orbit nodes overflowing the viewport at 390px. Both fixed and re-verified.

---

## Before going live

1. **Add the real affiliations** in `#teaching` — currently placeholders, and it's the strongest trust signal on the page
2. Add real YouTube IDs / Zoom links in `course.html`, and demo video IDs in `index.html`
3. Replace placeholder pricing with real fees
4. Replace the sample reviews, or delete the section
5. Add real certificates to Distinctions
6. Confirm `0344 6267693` before the `tel:` link ships
7. Self-host the fonts
8. If the portal will hold paid content, build the backend first
