---
title: "The Document Object Model, visualized."
teaser: " "
date: " "
tags: #draft
---

# The Document Object Model, visualized.

In the same way that I sometimes find that I understand what a word means in context without being able to define it exactly, I realized that while I understood what the DOM was, I couldn't really define it. In other words, I didn't actually understand it.

To get to the bottom of it, I decided to make a visualization of what it looks like in practice. That led me to making a utility that walked the DOM and printed out the name, type, parent, and sibling of each and every node in the tree. There may not be a lot of practical value in being able to access text nodes that only have whitespace, but I wanted to see everything.

As is so often the case, once I built something that did what I wanted it to do, I discovered that JavaScript has a built-in method for doing what I needed, the `createTreeWalker()` method of the [[fill-in]]. 