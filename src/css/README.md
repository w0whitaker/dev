# CSS doings

## Introduction.
This site generally follows the CUBE CSS methodology popularized by Andy Bell [(cube.fyi)](https://cube.fyi/). 

## Files.

### `main.css`
Aggregates various CSS files through `@import` statements. This is the file linked to in `<head>`.

### `_global.css`
Custom properties are set here, as well as general styling at the element level. If an element might have different values in different places, it isn't global.

For example, an `<article>` element might be expected to have spacing and font sizing rules that are pretty consistent across the site. Ditto for `<a>` elements. These are good candidates for global styling rules.

Headers and footers might not be good candidates because a page header will likely be styled quite differently than an article header. They might be better in `_block.css`.

### `_composition.css`
How things relate to one another. Think of this as rules for negative space.
