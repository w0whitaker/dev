---
title: Flex is complex.
teaser: Solving a weird problem involving flexbox.
date: 2023-11-05
---
## The setup.
An unordered list (`<ul>`) is given:
```css
ul {
    display: inline-flex;
    block-size: auto;
    overflow-x: auto;
}
/* https://every-layout.dev/ */
```
The goal is to have the list items displayed horizontally and have the 
overflow in a scrolling container.

Worth noting is that this `<ul>` is itself within a flexbox container.

## The problem.
The `<ul>` element hides the overflow and scrolls as expected, but is itself 
too wide and overflows. The surrounding elements do as well.  
Removing the `flex` property from the parent element solves the issue, but 
that parent element needs to remain a flexbox container for the layout.  
