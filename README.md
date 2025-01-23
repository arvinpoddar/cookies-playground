# Cookies Playground

A sandbox workspace to test out how cookies are set on `iframes`.

## Packages

- `frame`: NextJS that displays an iframe with a controllable source. Runs on
  `http://localhost:7000` by default.
- `content`: NextJS app that is meant to be displayed within `frame`. Runs on
  `http://localhost:7001` by default.

## Local Setup

The `content` app is set to run on `http://localhost:7001`. To have your iframe
load to the content up by default, you can optionally add an `.env` file to
`packages/frame` with:

```
FRAME_DEFAULT_URL=http://localhost:7001
```

From here, you can run both apps simultaneously by running `p dev` in the
workspace root.

The content app also has a route to enable draft mode (`/api/draft/enable`). To
use this route, you'll need to set a secret in the `.env` of `packages/content`:

```
DRAFT_MODE_SECRET={YOUR TOKEN HERE}
```

Then, access the route via `/api/draft/enable?secret={token}`
