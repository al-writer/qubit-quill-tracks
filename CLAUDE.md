# Qubit Quill tracks — notes for Claude

Lyric-video projects for Lyric Motion Studio (al-writer/lyric-motion-studio).
Each `tracks/<slug>/` is a project: `project.json`, lyrics, optional
`timing.json`, `components/*.jsx` (import blocks from `lms`), `assets/`
(fonts via `assets/*.css`), `build/` (written by the Prepare workflow — don't
edit by hand), `youtube.md`.

- Tracks never need studio changes. If one seems to, it is a studio feature
  (a general option or block) made in the studio repository and released.
- Songs and footage are not committed: they live in R2 (`r2://…`) and are
  fetched into the git-ignored `.media/`.
- Lyrics text comes from the lyrics file; Whisper only supplies timestamps.
  Timing fixes go into `timing.json`.
- Components follow the studio's render rules: pure functions of `t` or
  Framer Motion, no `Date.now()` / `Math.random()` / CSS animations / timers
  (use `rng` from `lms`), animations settle within 4 s.
- Workflows call the studio at a fixed `@vX.Y.Z`; raise all `uses:` lines
  together.
- Strict Conventional Commits (CI checks): scope = track slug, or the area
  of the repository (`ci`, `docs`, `chore(deps)`); header ≤ 72 characters.

Check a change with a studio clone next to this repository:

```sh
cd ../lyric-motion-studio
LMS_PROJECTS=../qubit-quill-tracks/tracks node tools/check.mjs
LMS_PROJECTS=../qubit-quill-tracks/tracks node tools/render.mjs --track kara-kargam --stills 34,65
```
