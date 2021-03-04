---
title: 'next.js x scss modules x storybook'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2021-03-04T00:28:35.432Z'
---

next.jsでcss modulesを使っていて、しかもそのcssはscssで記述されているときに、storybookでビルドするための設定を探していた。

https://gist.github.com/justincy/b8805ae2b333ac98d5a3bd9f431e8f70

上記gistはかなり参考になったが、結果的にはコメントにある `@storybook/preset-scss` を使うのが簡単だった。


.storybook/main.jsにて以下のようにオプション付きで設定する

```
module.exports = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true
          }
        }
      }
    },
  ],
};

```
