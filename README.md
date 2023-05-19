# wwdev

_This is the portfolio site for William Whitaker._

## 11ty

### [setup](https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/)

1. npm init -y
2. npm install @11ty/eleventy
3. add start script to package.json: npx @11ty/eleventy --serve
4. add build script to same: npx @11ty/eleventy
5. create /src/
6. mv index.md src/
7. create .eleventy.js in project root
8. create /src/\_includes/layout.njk
9. add frontmatter to index.md; state layout and title
10. create /src/style.css and link it in layout.njk
11. passthrough css: eleventyConfig.addPassthroughCopy("src/style.css");

### collections

1. add custom collection to eleventy.js:

```
eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/projects/*.md");
  });
```

2. md foo/
3. touch foo/foo.json
4. add frontmatter to foo.json
5. add content to /foo (.njk or .md)
6.


## current structure

```markdown
.
├── config
│   ├── collections
│   │   └── index.js
│   └── utils
│       └── index.js
└── src
    ├── _data
    │   └── meta.js
    ├── _includes
    │   ├── footer.njk
    │   ├── header.njk
    │   ├── logo.njk
    │   └── sitenav.njk
    ├── _layouts
    │   ├── base.njk
    │   ├── layout.njk
    │   ├── page.njk
    │   ├── post.njk
    │   └── project.njk
    ├── fonts
    │   ├── Alata-Regular.ttf
    │   ├── Quattrocento-Bold.ttf
    │   └── Quattrocento-Regular.ttf
    ├── images
    │   ├── art.png
    │   ├── dog.jpeg
    │   ├── epg.png
    │   ├── first-site.png
    │   ├── hsf.png
    │   ├── pieton.png
    │   ├── pomodoro.png
    │   ├── self.jpg
    │   ├── svg
    │   │   ├── codepen.svg
    │   │   ├── dev.svg
    │   │   ├── github.svg
    │   │   ├── linkedin.svg
    │   │   └── stack-overflow.svg
    │   └── wedding.png
    ├── index.md
    ├── js
    │   ├── index.js
    │   ├── markdownCustom.js
    │   └── shortcodes.js
    ├── pages
    │   ├── blog.njk
    │   ├── contact.njk
    │   ├── pages.json
    │   └── projects.njk
    ├── posts
    │   ├── epg-post.md
    │   └── posts.json
    ├── projects
    │   ├── ephemeral-pattern-generator.md
    │   ├── first-site.md
    │   ├── human-service-forum.md
    │   ├── mote.md
    │   ├── pieton.md
    │   ├── pomodoro-timer.md
    │   ├── projects.json
    │   ├── wedding-site.md
    │   └── william-whitaker-dot-art.md
    ├── scss
    │   ├── _base.scss
    │   ├── _dev.scss
    │   ├── _footer.scss
    │   ├── _header.scss
    │   ├── _images.scss
    │   ├── _layout.scss
    │   ├── _modules.scss
    │   ├── _nav.scss
    │   ├── _prism.scss
    │   ├── _reset.scss
    │   ├── _snippets.scss
    │   ├── _state.scss
    │   ├── _theme.scss
    │   ├── _typography.scss
    │   ├── _utilities.scss
    │   └── style.scss
    └── style.css
```
