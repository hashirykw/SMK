/* ============================================================================
   SIR MEHBOOB KHAN — physicswithsmk.com
   THE ONLY FILE YOU EDIT.

   Put an identical copy of this file in BOTH repos:
     · the website repo, beside index.html
     · the admin repo, beside index.html (the renamed admin.html)

   Nothing else in the site holds a URL, a phone number or a key. If something
   needs changing, it is on this page.
   ============================================================================ */

window.SMK_CONFIG = {

  /* ==========================================================================
     1. SUPABASE  —  required
     Supabase → Project Settings → API
     ========================================================================== */
  SUPABASE_URL:      'https://njqoghncbvwlifkvalrk.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_UeenWTUPFDaisGOlxiTDUw__ZRGiGxS',

  /* The publishable key is meant to be public and is safe here, because Row
     Level Security is on for every table — a browser holding it can read the
     topic list and nothing else. NEVER put the service_role / secret key in
     this file, or in any file a browser can load. */

  /* the table the registration and request-access forms write to */
  TABLE: 'registrations',


  /* ==========================================================================
     2. CONTACT  —  shown across the site, used by the WhatsApp buttons
     ========================================================================== */
  wa:           '923433713772',      // international format, digits only
  phoneDisplay: '0343 3713772',      // how it reads on the page
  email:        'physicswithsmk@gmail.com',

  instagram: 'https://instagram.com/sir_mehboob_khan',
  youtube:   'https://youtube.com/@mehboobkhan7260',
  threads:   'https://threads.net/@sir_mehboob_khan',


  /* ==========================================================================
     3. WHERE THE FILES LIVE
     ========================================================================== */

  /* Past papers, topical books, and any notes given as a bare filename are
     resolved against this. It must end with a slash. */
  FILES_BASE: 'https://raw.githubusercontent.com/hashirykw/SMK/main/',

  /* The course introduction on the front page. A YouTube link works and is the
     better choice for anything long — GitHub refuses files over 100 MB and
     does not stream well. Leave blank to use introduction.mp4 in the repo. */
  INTRO_VIDEO: '',

  /* The syllabus PDF offered in the syllabus dialog, per level. Leave a level
     blank and the download politely says it is not ready yet. */
  SYLLABUS_PDF: { O: '', AS: '', A2: '' },


  /* ==========================================================================
     4. HOW THE COURSE WORKS
     ========================================================================== */

  /* How many topics, counted from the top of each level, give their opening
     lecture away free. Change it HERE AND in backend.sql — the view
     preview_lectures and the function get_lecture carry the same number, and
     the database is what actually enforces it. */
  OPEN_TOPICS: 4,

  /* Devices one student may be signed in on. Enforced by student_login. */
  MAX_DEVICES: 2,


  /* ==========================================================================
     5. THE PROMPT THAT INVITES PEOPLE TO ENROL
     ========================================================================== */
  /* Times are in MINUTES. */
  promo: {
    firstDelay:    0.75,    // 45 seconds before the first prompt appears
    reappear:      20,      // minutes before a dismissed prompt returns
    secondAfter:   2,       // if the first is ignored this long, show the other
    maxDismissals: 3,       // stop for the session after this many refusals
                            // set to 0 to keep showing them forever
    mobile:        false    // show them on phones as well
  }
};


/* ============================================================================
   Below here is plumbing. There is nothing to edit.
   ============================================================================ */
(function () {
  var C = window.SMK_CONFIG;

  /* a missing trailing slash on FILES_BASE silently breaks every paper link */
  if (C.FILES_BASE && C.FILES_BASE.slice(-1) !== '/') C.FILES_BASE += '/';

  /* the pages read these directly */
  window.PBASE = C.FILES_BASE;
  if (C.INTRO_VIDEO)  window.INTRO_VIDEO  = C.INTRO_VIDEO;
  if (C.SYLLABUS_PDF) window.SYLLABUS_PDF = C.SYLLABUS_PDF;

  /* Say so loudly if the Supabase details were never filled in. Without this
     the only symptom is sign-in quietly failing, which is a miserable thing
     to debug. */
  if (/YOUR-PROJECT-REF|YOUR-ANON-KEY/.test(C.SUPABASE_URL + C.SUPABASE_ANON_KEY)) {
    console.error('[SMK] config.js still has the placeholder Supabase details. ' +
      'Sign-in, lectures and the admin panel will not work until the real ' +
      'Project URL and publishable key are pasted in.');
  }
  if (/service_role|sb_secret/.test(C.SUPABASE_ANON_KEY)) {
    console.error('[SMK] That looks like a SECRET key. It must never sit in a file ' +
      'a browser can load — it bypasses every security rule in the database. ' +
      'Use the publishable key instead.');
  }
})();
