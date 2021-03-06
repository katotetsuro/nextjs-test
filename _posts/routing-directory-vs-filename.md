---
title: 'next.jsのroutingで、foo/index.jsと foo.js どちらを使うべきか'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-11-21T08:47:22.237Z'
---


ドキュメントにどっちをオススメするかといった記述はなかった（たぶん）

ためしに `foo/index.tsx` と `foo.tsx` を作ると以下の警告が出た。

```
warn  - Duplicate page detected. pages/foo/index.tsx and pages/foo.ts both resolve to /foo.
```

ちなみに `/foo` にアクセスすると `foo.tsx` が表示された。

`next export` してS3だけで運用したい、みたいなときに影響があるかもしれない？
