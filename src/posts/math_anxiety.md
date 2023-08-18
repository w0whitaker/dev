---
title: Math Anxiety (working title)
excerpt: I'm not good with the math things
---

Math doesn't come naturally to me. Conceptualizing the problem and how to solve it is a challenge. I've come to rely on writing out the problem in plain language to help me sort through a problem. Sass can really help with this, because by using a combination of variables and functions, I can translate the problem into a form that makes sense to me, and plug in the values later.

For example, I recently ran into an issue where I had an outer container with some boxes inside it, laid out in a row, with a gap of 10px between each box. I wanted those boxes to resize along with the outer container, but I wanted to keep the gaps at 10px. I knew that I wanted the width of each inner box to be a percentage of the whole, minus some amount in pixels to accommodate the gaps, and that I could use `calc()` to do this. What I had trouble with was figuring out how much (in pixels) to remove from each box.

I decided to try writing a blog post while I was figuring all this out as a way to put it all in front of me so I could see the problem more clearly. It ended up being a _very_ long post, and not terribly interesting. But it did help me! So here is a much edited version of that post, and it starts with the answer!

### tl;dr

The goal is to be able to do something like: `calc(width of one box as a percentage of the whole container - an amount to remove from each box in pixels to accommodate the gaps between boxes)`.

The formula to figure out how many pixels to remove looks like this:  
x = (w \* (b - 1)) / b

<!-- wolfram alpha says: x=w-w/b -->

Where:  
w = the width of one gap  
b = the number of boxes  
x = the amount, in pixels, that needs to be removed from each box

Let's see how this will play out; if we have two boxes, and a 10px gap:

x = (10 \* (2 - 1)) / 2

which gives us 5px. The box width can now be calculated like this:
`calc(50% - 5px)`.

If our outer container is 100px wide, then we will have two boxes at 45px each, for a total of 90px. There will be just one gap of 10px, and that gives us 100px.

Great!

Let's try eight boxes, with a 12px gap:

x = (12 \* (8 - 1)) / 8

which gives us 10.5px. In a container that was 580px wide, each box would be 72.5px wide. If we take 10.5px off of each of the eight boxes, the total width of our boxes would be 496px. The total size of the gaps would be 84px.

496 + 84 = 580

Yay!

### Let's get Sassy

What would be really great is if there were one place in a stylesheet where the two basic values (the width of one gap and the number of boxes) could be changed, and all sorts of distressing calculating could be avoided. Turns out there is, with the help of Sass. Let's get started.

The formula above has two variables, the width of one gap and the number of boxes.

```scss
$numberOfBoxes: x;
$widthOfOneGap: x;
```

Remembering that in the end, `calc()` will need two values, a percentage of the total width and a number of pixels, the first step is to figure out that percentage using `$numberOfBoxes`. This can be done with a Sass function that will return a value to be used later.

```scss
@function nominalBoxWidth($numberOfBoxes) {
  @return math.div(100, $numberOfBoxes);
}
```

<aside>Dart Sass will throw a warning if you try to use '/' to do division. Eventually it will be deprecated, so it's better to use the 'sass:math' module and its 'div' function. Just put <code>@use sass:math;</code> at the top of your stylesheet, and 'div' will be available for use.</aside>

Now that we have `nominalBoxWidth()`, we can pass in the number of boxes and get a percentage. If `$numberOfBoxes` is 2, 100 / 2 = 50%. If want to change that to 15.375 boxes, no problem: 100 / 15.375 = 6.50406504%.

Next, we need a function to figure out the amount to adjust the box width. Taking the formula from above:

```scss
@function adjBoxWidth($numberOfBoxes, $widthOfGap) {
  @return math.div($widthOfGap * ($numberOfBoxes - 1), $numberOfBoxes);
}
```

Between these two functions, we should be able to populate the `calc()` statement with something like this:

```scss
calc($nominalBoxWidth($numberOfBoxes) - $adjBoxWidth($numberOfBoxes, $widthOfGap));
```

But there's a bit of hitch. Sass functions return a value, but not a _unit_. So `$nominalBoxWidth` is just going to spit out the number part, not the '%' part. There is probably a more elegant way to do this, but the way I got around this was to use interpolation.

```scss
calc(#{$nominalBoxWidth($numberOfBoxes)}% - #{$adjBoxWidth($numberOfBoxes, $widthOfGap)}px);
```
