# Qubit Quill — tracks

Lyric-video projects of Qubit Quill, rendered with
[Lyric Motion Studio](https://github.com/al-writer/lyric-motion-studio).
This repository holds the tracks; the studio (engine, tools, render image)
is used at a fixed version through its reusable workflows, so the videos
of a track keep looking the same until the version is raised on purpose.

| track | template | |
| --- | --- | --- |
| [`orange-ticket-stub`](tracks/orange-ticket-stub) | illustrated | the torn ticket hero (`components/Ticket.jsx`) |
| [`kara-kargam`](tracks/kara-kargam) | illustrated | «Қара, қарғам!»: crows (`Crows.jsx`), night over Karaganda (`Night.jsx`), finale act, Lora/Rubik for Kazakh |
| [`copper-on-the-terrace`](tracks/copper-on-the-terrace) | custom | 70s poster stage (`Poster.jsx`), backing vocals (`AdLibs.jsx`), own covers (`Covers.jsx`) |

## Adding a track

1. Create `tracks/<slug>/` with `lyrics.lrc` or `lyrics.txt` and a
   `project.json` (start from one of the tracks above; the
   [`$schema`](https://github.com/al-writer/lyric-motion-studio/blob/main/schema/project.schema.json)
   gives completion in editors, the
   [studio README](https://github.com/al-writer/lyric-motion-studio#projectjson)
   lists every key, template and block).
2. Put the song in R2 (`"audio": "r2://projects/<slug>/song.flac"`, see
   [docs/r2.md](docs/r2.md)) — songs are not committed here.
3. Push. **Prepare tracks** times every word and commits `build/`. Check the
   timings in `build/lyrics.lrc`; fix single lines or words in
   `timing.json` (pushing it re-applies the fixes without Whisper).
4. Actions → **Render video**: track, formats (16:9, 9:16), resolution
   (HD, FHD, 4K, 8K), fps, quality, an optional range for a draft. The
   videos land in a **draft release** of this repository (and in R2).

Components (`components/*.jsx`) are React + Framer Motion and import the
studio's blocks as `lms`; fonts and images go into `assets/`. Nothing a
track needs goes into the studio.

## Workflows

| workflow | |
| --- | --- |
| Prepare tracks | on pushes to `tracks/*/project.json`, `lyrics.*`, `timing.json`; or by hand |
| Render video | by hand; shards over 20 machines, merges, draft release, removes chunks |
| Deliver video | by hand: a render run's video artifacts into a draft release again |
| Move media to R2 | by hand: songs and footage that are not in R2 yet |
| CI | Conventional Commits and every `project.json` against the schema |

They call `al-writer/lyric-motion-studio/.github/workflows/*.yml@vX.Y.Z`.
Dependabot proposes new studio versions as pull requests; raise the version
in every `uses:` line together.

Secrets: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_BUCKET` ([setup](docs/r2.md)); optional `RCLONE_CONF` (+ variable
`DRIVE_DEST`) for a Google Drive copy.

## Locally

```sh
git clone https://github.com/al-writer/lyric-motion-studio ../lyric-motion-studio
cd ../lyric-motion-studio && git checkout v1.0.0 && npm ci && npx playwright install chromium
export LMS_PROJECTS=$OLDPWD/tracks
node tools/media.mjs fetch --track kara-kargam          # songs from R2 / URLs into .media/
npm run dev                                             # preview: ?track=kara-kargam&format=vertical&debug
node tools/render.mjs --track kara-kargam --stills 34,65
```

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), checked by CI:
`type(scope): description` with the track's slug as the scope
(`feat(kara-kargam): add a snowfall layer`, `fix(copper-on-the-terrace): time line 12`),
or `ci`, `docs`, `chore(deps)` for the repository itself.
