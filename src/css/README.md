# CSS doings

## Introduction.
This site generally follows the CUBE CSS methodology popularized by Andy Bell [(cube.fyi)](https://cube.fyi/). 

## Files.

### `main.css`
Aggregates various CSS files through `@import` statements. This is the file linked to in `<head>`.

### `_global.css`
Custom properties are set here, as well as general styling at the element level. If an element might have different values in different places, it isn't global.
