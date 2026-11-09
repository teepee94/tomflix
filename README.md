# Tomflix

A Netflix-style streaming homepage built with React, using live data from [The Movie Database (TMDB) API](https://www.themoviedb.org/).

Built by [Tommy Parkinson](https://tommyparkinson.com) as a front-end showcase.

## Tech stack

- **React 18** with function components and hooks, in `StrictMode`
- **React Router 7** for routing
- **Axios** for a shared, pre-configured TMDB client
- **GSAP + ScrollTrigger** for the masthead parallax and scroll-in effects
- **SCSS** in an ITCSS structure (settings → tools → generic → elements → components) with BEM class naming
- **Jest + React Testing Library** for tests

## Getting started

1. Get a free v3 API key from [TMDB](https://www.themoviedb.org/settings/api).
2. Copy the example env file and add your key:

   ```bash
   cp .env.example .env
   ```

3. Install and run:

   ```bash
   npm install
   npm start
   ```

   The app runs at http://localhost:3000.

| Script          | What it does                         |
| --------------- | ------------------------------------ |
| `npm start`     | Start the dev server                 |
| `npm test`      | Run tests in watch mode              |
| `npm run build` | Create a production build in `build/` |

## Notable decisions

- **`useTmdb` hook** (`src/hooks/useTmdb.js`). All data fetching goes through one hook that returns `{ data, loading, error }`. A module-level cache shares in-flight requests, so components asking for the same endpoint (the masthead and the "Netflix Originals" row) make one network call. Results are reused on remount. The effect ignores stale responses on cleanup, so it's safe under StrictMode's double-invoke in development.
- **Image sizing.** TMDB's sized renditions (`w342`, `w780`, `w1280`) are used instead of `original`, with native `loading="lazy"` for rows below the fold.
- **Animation cleanup.** GSAP tweens and ScrollTriggers are created per component (`gsap.context` / per-item triggers) and torn down on unmount.
- **API key.** The key lives in `.env` (gitignored) as `REACT_APP_TMDB_KEY`. In a client-only app the key is still visible in browser network requests. Hiding it fully would need a small server-side proxy.

## Project structure

```
src/
  hooks/                 useTmdb data-fetching hook
  html/components/       Navbar, Masthead, Listing, ListingItem, Footer
  html/pages/templates/  Page templates
  resources/js/TMDB/     Axios client, endpoint paths, image/title helpers
  resources/sass/        ITCSS SCSS
```

## Notes

`npm audit` reports advisories in Create React App's build tooling (`react-scripts`, a dev dependency). They don't ship to the browser; `npm audit --omit=dev` is clean.

This is a non-commercial portfolio project and isn't affiliated with Netflix. Film and TV data and images are provided by TMDB.
