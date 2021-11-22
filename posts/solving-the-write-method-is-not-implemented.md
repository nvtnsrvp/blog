---
title: "Solving 'The _write() method is not implemented'"
excerpt: "Error [ERR_METHOD_NOT_IMPLEMENTED]: The _write() method is not implemented."
date: "2021-11-22"
tags: "software"
---

```
npm audit

                       === npm audit security report ===

# Run  npm install next@12.0.4  to resolve 2 vulnerabilities
SEMVER WARNING: Recommended action is a potentially breaking change
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ XSS in Image Optimization API for Next.js                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://github.com/advisories/GHSA-9gr3-7897-pp7m            │
└───────────────┴──────────────────────────────────────────────────────────────┘


┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Moderate      │ Open Redirect in Next.js                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ next                                                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://github.com/advisories/GHSA-vxf5-wxwp-m7g9            │
└───────────────┴──────────────────────────────────────────────────────────────┘


found 2 vulnerabilities (1 moderate, 1 high) in 284 scanned packages
  2 vulnerabilities require semver-major dependency updates.
```

Next (12) was running on an unsupported version of node (10).

```
> next build

info  - Checking validity of types
warn  - No ESLint configuration detected. Run next lint to begin setup
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
[    ] info  - Generating static pages (0/3)
Error occurred prerendering page "/404". Read more: https://nextjs.org/docs/messages/prerender-error
Error [ERR_METHOD_NOT_IMPLEMENTED]: The _write() method is not implemented
    at Writable._write (_stream_writable.js:569:6)
    at doWrite (_stream_writable.js:428:12)
    at clearBuffer (_stream_writable.js:548:7)
    at Writable.uncork (_stream_writable.js:322:7)
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1126:17
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:47
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1128:9
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1141:9

Error occurred prerendering page "/500". Read more: https://nextjs.org/docs/messages/prerender-error
Error [ERR_METHOD_NOT_IMPLEMENTED]: The _write() method is not implemented
    at Writable._write (_stream_writable.js:569:6)
    at doWrite (_stream_writable.js:428:12)
    at clearBuffer (_stream_writable.js:548:7)
    at Writable.uncork (_stream_writable.js:322:7)
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1126:17
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:47
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1128:9
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1141:9

Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
Error [ERR_METHOD_NOT_IMPLEMENTED]: The _write() method is not implemented
    at Writable._write (_stream_writable.js:569:6)
    at doWrite (_stream_writable.js:428:12)
    at clearBuffer (_stream_writable.js:548:7)
    at Writable.uncork (_stream_writable.js:322:7)
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1126:17
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:47
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1128:9
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1110:13
    at /Users/nvt/workspace/blog/node_modules/next/dist/server/render.js:1141:9
info  - Generating static pages (3/3)

> Build error occurred
Error: Export encountered errors on following paths:
        /
        /404
        /500
    at /Users/nvt/workspace/blog/node_modules/next/dist/export/index.js:493:19
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at async Span.traceAsyncFn (/Users/nvt/workspace/blog/node_modules/next/dist/trace/trace.js:74:20)
    at async /Users/nvt/workspace/blog/node_modules/next/dist/build/index.js:970:17
    at async Span.traceAsyncFn (/Users/nvt/workspace/blog/node_modules/next/dist/trace/trace.js:74:20)
    at async /Users/nvt/workspace/blog/node_modules/next/dist/build/index.js:844:13
    at async Span.traceAsyncFn (/Users/nvt/workspace/blog/node_modules/next/dist/trace/trace.js:74:20)
    at async Object.build [as default] (/Users/nvt/workspace/blog/node_modules/next/dist/build/index.js:82:25)
```

After upgrading next, upgrade your node: `brew upgrade node`.

https://github.com/vercel/next.js/issues/30424.
