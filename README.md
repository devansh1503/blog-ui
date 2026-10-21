# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Home API integration

Set `VITE_API_BASE_URL` in `.env` to the backend origin (optionally ending in `/v1`). The existing `BASE_URL` and `BASE_URL_API` names are also supported. Restart Vite after changing environment variables. Only this API URL is exposed to the client.

Home requests:

- `GET /v1/posts?page=0` for zero-based pagination.
- `GET /v1/posts/search?query=...` when the search form is submitted; Clear returns to page one.
- `GET /v1/posts/featured` for the featured post. This endpoint is assumed; confirm it against the backend.

Post lists can be arrays or objects containing `content`, `posts`, or `items`. Pagination reads `last`, `totalPages` (including `page.totalPages`), or `hasNext`. Without pagination metadata, Next remains available until an empty page is returned. Search displays the returned results without paging because the search helper has no page parameter. Cards use `id`, `title`, `description`, and `imageUrl`; an empty solid color block is displayed when `imageUrl` is missing. The featured endpoint should return a post directly or `{ post: ... }`, with `null` representing no featured post.
# blog-ui
