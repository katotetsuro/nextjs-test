---
title: 'next.jsでAPIにproxyしたいときはrewritesでいいはず'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-12-02T15:27:35.432Z'
---

APIサーバをnext.jsアプリとは別で作っていて、ローカルで開発中にproxyしたいときがある。
next.jsは3000番portで立っていて、APIサーバは8000番とか。

ググると公式のcustom server exampleを参考にserver.jsを作って・・みたいな記事もあるが、
rewritesを使ってserverは変にいじらない方が良さそう。

https://github.com/vercel/next.js/discussions/14057#discussioncomment-31884

まだ軽く動作確認したところなので罠があるのかもしれないけど。
ちなみにrewritesはtrailing slashがついていてもマッチできるようだ。

{
    source: /api/:path*/,
    destination: http://localhost:8000/api/:path*/
}
