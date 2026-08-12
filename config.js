/* ============================================================================
   SIR MEHBOOB KHAN — physicswithsmk.com
   THE ONLY FILE YOU EDIT WHEN THE SUPABASE PROJECT CHANGES.

   Put a copy of this file next to index.html in the website repo, and another
   next to admin.html in the admin repo. Both read the same two values.

   Where to find them:
     Supabase → your project → Project Settings → API
       · Project URL           → SUPABASE_URL
       · anon / publishable key → SUPABASE_ANON_KEY

   The anon key is meant to be public. It is safe in a file anyone can read
   because Row Level Security is on for every table — a signed-out browser
   holding this key can read the topics list and nothing else. Never put the
   service_role key in here, or in any file that reaches a browser.
   ============================================================================ */

window.SMK_CONFIG = {
  SUPABASE_URL:      'https://YOUR-PROJECT-REF.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-ANON-KEY',

  /* the table the sign-up and request-access forms write to */
  TABLE: 'registrations',

  /* ---------- contact, used across the site ---------- */
  wa:            '923433713772',
  phoneDisplay:  '0343 3713772',
  email:         'physicswithsmk@gmail.com',

  /* ---------- optional ---------- */
  /* the course introduction video. Leave blank to use the file in the repo. */
  INTRO_VIDEO: '',

  /* the syllabus PDF for each level, shown in the syllabus dialog */
  SYLLABUS_PDF: { O: '', AS: '', A2: '' }
};

/* these two are read directly by the pages, so mirror them out */
if (window.SMK_CONFIG.INTRO_VIDEO)  window.INTRO_VIDEO  = window.SMK_CONFIG.INTRO_VIDEO;
if (window.SMK_CONFIG.SYLLABUS_PDF) window.SYLLABUS_PDF = window.SMK_CONFIG.SYLLABUS_PDF;

/* A loud warning in the console if the placeholders were never replaced —
   otherwise the only symptom is sign-in silently failing. */
(function () {
  var C = window.SMK_CONFIG;
  if (/YOUR-PROJECT-REF|YOUR-ANON-KEY/.test(C.SUPABASE_URL + C.SUPABASE_ANON_KEY)) {
    console.error('[SMK] config.js still holds the placeholder Supabase details. ' +
      'Sign-in and lectures will not work until you paste the real Project URL ' +
      'and anon key from Supabase → Project Settings → API.');
  }
})();
