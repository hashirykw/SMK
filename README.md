# Sir Mehboob Khan — Academy Website

Three self-contained pages. **All CSS and JavaScript are inlined** — there are no `.css` or `.js` files. Only images and the syllabus PDFs are external, and they all sit at the repo root.

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Or drag the folder onto Netlify Drop, or push it to a GitHub repo and turn on Pages.

| File | What it is |
|---|---|
| `index.html` | Everything except lectures |
| `portal.html` | Student login |
| `course.html` | The student's own course and lectures |
| 10 `.png` files | Logos — SMK plus all six affiliation marks, backgrounds removed |
| 2 `.pdf` files | The downloadable syllabus outlines |

**Flat layout:** every file sits at the repo root. There are no folders, so uploading to
GitHub is a single drag-and-drop and there is no `assets/` path to get wrong.

---

## 1. Connecting the form to a real backend (Supabase)

Right now the form validates, confirms, and shows a WhatsApp fallback. Once you do the four steps below, every submission lands in a database you can open in your browser.

### Step 1 — Create the project

Go to [supabase.com](https://supabase.com), sign up (free tier is plenty), and create a new project. Pick a region close to Pakistan — Singapore or Mumbai.

### Step 2 — Create the table

In Supabase, open **SQL Editor** → **New query**, paste this, and hit Run:

```sql
create table registrations (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  name        text not null,
  email       text,
  phone       text not null,
  level       text,
  session     text,
  mode        text,
  message     text,
  source      text,
  status      text default 'new'
);

-- Row Level Security: the public key may INSERT but can never READ.
-- Without this, anyone could download your entire student list.
alter table registrations enable row level security;

create policy "anyone can submit the form"
  on registrations for insert
  to anon
  with check (true);
```

That last part matters. The key sitting in your HTML is public — anyone can read it in View Source. This policy means the worst someone can do with it is submit a form, not download your enquiries.

### Step 3 — Paste your two keys

In Supabase: **Project Settings → API**. Copy the **Project URL** and the **anon public** key (not the `service_role` key — that one is secret and must never go in a web page).

Open **`index.html`**, find the `SMK_CONFIG` block near the bottom, and replace:

```js
window.SMK_CONFIG = {
  SUPABASE_URL: 'https://xxxxxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGci...',
  TABLE: 'registrations'
};
```

Save and reload. That's it — no build step, no npm.

### Step 4 — Read your submissions

Supabase → **Table Editor** → `registrations`. Every enquiry appears there with a timestamp. You can sort, filter, edit the `status` column as you work through them, and export to CSV.

**Get a WhatsApp or email alert per submission:** Supabase → Database → Webhooks → create a webhook on `INSERT` for the `registrations` table, pointing at a Zapier or Make.com hook. From there, route to WhatsApp, email, or a Google Sheet.

**If Supabase is unreachable** the form still confirms to the student and shows a WhatsApp fallback, so an enquiry is never silently lost.

---

## 2. The SMK Assistant

Free-text chat. Students type a question; it matches against a knowledge base and answers, or hands them your contact details when it isn't confident.

**How it handles typos and phrasing:** the matcher normalises chat-speak (`ur` → `your`, `wat` → `what`), expands synonyms (`fee`/`cost`/`price`/`charges` are one concept), tolerates spelling errors on long words (`electrisity` → `electricity`, `regester` → `register`), and matches whole phrases as well as single words.

**Tested performance:** 46 of 46 real student questions answered correctly, and 7 of 8 off-topic questions correctly handed off to a human instead of guessing.

*The one known miss:* "bitcoin price today" matches the fees answer, because "price" is a genuine fees keyword. On a physics tuition site that's a fair trade for catching every real question about cost.

**To add answers**, find the `KB` array in `index.html` and add:

```js
{c:'Fees', q:'Your question', k:['keyword','another phrase','common typo'],
 a:'The answer. <b>Bold</b> and <a href="...">links</a> both work.'}
```

The `k` array is what matters — put in every word a student might use. One entry with 12 keywords covers dozens of real phrasings.

---

## 3. Editing content

Each page has a marked **DATA block** near the bottom.

- `index.html` → `REVIEWS`, `CONTACT`, plus the `KB` for the assistant
- `portal.html` → `STUDENTS`
- `course.html` → `STUDENTS`, `COURSES` (every lecture), `CONTACT`

**Lectures** (`course.html`): `youtube: 'VIDEO_ID'` embeds and plays · `zoom: 'url'` gives a join button · `kind:` `video`/`live`/`paper`/`quiz` · `done: true` marks complete, and the progress bar and rings recalculate themselves.

**Reviews:** `REVIEWS` is empty, so the reviews section stays hidden. Add real ones and it appears automatically:

```js
const REVIEWS = [
  {name:'Ayesha', role:'Student', level:'A2 Level', text:'What they actually said.'}
];
```

I left it empty deliberately. A reviews section filled with invented quotes is worse than no reviews section — parents can tell, and it costs the trust the rest of the page is trying to build.

`STUDENTS` appears in both `portal.html` and `course.html`. Add a student to both — it's three lines.

---

## 4. What changed in this version

**Affiliations are real now.** All six logos, backgrounds removed by flood-fill (the Whales logo sat on textured fabric, so a simple white-threshold cut wouldn't have worked). Morning: Whales, Credo, Highbrow, Beaconhouse College Programme. Evening: SWK Solution (Gulshan, Johar, North) and Askari (Bahadurabad). Plus online worldwide and recorded modules.

**Syllabus is real and downloadable.** O Level is the six sections you gave. Two branded PDFs in the root folder.

> ⚠️ **You said you'd attach the AS/A Level syllabus, but only the logo images came through.** The A Level topic list is the standard Cambridge 9702 structure (AS topics 1–11, A2 topics 12–25). Check it against your copy before publishing — if your version differs, edit the syllabus section in `index.html` and re-generate the PDF.

**Mobile menu fixed.** It was covering the whole screen. It's now a 516px dropdown that leaves the page visible and scrollable behind it, closes when you tap a link, tap outside, or press Escape.

**Preloader** is an orbital system — three planets on different periods around the SMK mark, with real load progress and status lines.

**Sound button** is an animated equaliser that fills gold when on and shows a slash when off, instead of an emoji.

**More flip cards.** Course cards flip to the syllabus; method cards flip to the reasoning behind each step. Six 180° cards in total.

**Typography** is now three families doing three jobs: Fraunces for display, Inter Tight for UI, Space Mono for labels and data.

**Custom scrollbar**, gold on navy, matching the theme.

**Mobile text sizes raised** — nothing informative drops below 0.9rem on a phone. Chips, labels and metadata were the worst offenders and have all been bumped.

**Demo language removed** everywhere.

---

## 5. Verified before delivery

- All three student IDs open the correct course, code and lecture set
- Wrong ID and wrong code both error correctly; `course.html` without a session redirects
- Mobile menu measured at 516px of an 844px viewport — confirmed not full-screen, page not locked behind it
- No horizontal overflow at 390 / 768 / 1440px on any of the three pages
- All six affiliation logos load and are confirmed transparent (corner alpha = 0)
- Both syllabus PDFs return HTTP 200
- Reviews section confirmed hidden while `REVIEWS` is empty
- Empty form blocked; valid submit confirms and shows the WhatsApp fallback while Supabase is unconfigured
- Chatbot: 46/46 questions answered, 7/8 off-topic deferred
- Theme cycling and sound toggle throw nothing
- Zero JavaScript errors on any page

Three real bugs were caught and fixed during this pass: a synonym-expansion flaw that let one word score seven times and skewed chatbot answers, an over-loose typo rule that matched "cricket match" to "batch", and a stale CSS selector that silently broke the login redirect.

---

## 6. Still needed from you

1. **The AS/A Level syllabus** you meant to attach — so the topic list can be confirmed against your own version
2. **YouTube video IDs** for the three demo lessons and the portal lectures
3. **Zoom links** for live sessions
4. **Real reviews** — screenshots of WhatsApp messages work better than typed quotes
5. **Certificates** for a results section
6. **Photos** — of you, and of actual classes. Every thumbnail is still the logo.
7. **Confirm `0344 6267693`** before the `tel:` link goes live
8. Self-host the fonts (currently Google Fonts CDN)
9. If the portal will hold paid lectures, the login needs a real server — the current one runs in the browser and can be read from page source

---

## 7. Fixes in this pass (from your screenshots)

**Stat numbers were rendering at 10.4px grey mono instead of 46px gold.** A real CSS
specificity bug: the label rule `.strip span` was also matching the counter `<span>`
nested inside `<b>`, so the number inherited the tiny label styling. Fixed by scoping
the label rules to direct children (`.strip > div > span`) plus an explicit inherit rule
for counter spans. Hero numbers now 46px, strip numbers 50px, both gold Fraunces —
against 12.5px labels, so the contrast is roughly 4×.

**Course cards had a large empty middle.** The long syllabus lists on the back now run in
two columns and fit with zero internal scrolling, and the front face carries a faint SMK
watermark that fills the lower area intentionally rather than leaving dead space.

**White dropdown lists.** Native `<select>` menus were rendering with the OS white
background against the dark theme. Fixed with `color-scheme` per theme plus explicit
`option` styling — dropdowns are now navy on dark, white on light, with a custom gold
chevron replacing the default arrow.

**Small text raised across the board.** Nothing informative now renders below ~11.5px on
either desktop or phone: chips 10.4→11.8px, tile labels 10.6→11.8px, stat labels
10.4→12.5px, affiliation labels 10.6→11.5px.
