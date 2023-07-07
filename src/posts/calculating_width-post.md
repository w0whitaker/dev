---
title: 'CSS widths - a case study'
excerpt: 'I recently had a problem trying to figure out how to calculate a percentage-based width when using flexbox.'
---

### The problem

Suppose you have a container 600px wide. Filling that container will be boxes, equally sized and spaced. You set the padding on the container to be 10px on all sides, and now the width of the space the boxes need to fill is 580px. If you want, say, eight equally sized boxes to fit inside that container with a space between each one of 10px, figuring out the widths is straightforward. Subtract 70px (7 gaps of 10px each between boxes) from the total width of the container (580px) and divide that by 8 (the number of boxes). (580 - 70) / 8 = 63.75px.

What happens, though, if you want that 580px container and all its inner boxes to resize at different screen widths? I used `clamp` to give the outer container a minimum width of 280px, an ideal width of `calc(100vw - 110px)`, and a maximum width of 600px. I used flexbox to handle laying out the inner boxes, and set it to use a `gap` of 10px. Using percentages for the widths of the inner boxes would allow them to resize, but that percentage would have to take into account the gaps in between each box. So, if there were going to be four boxes, each box would be 25% of the total width, minus some amount to accommodate the gaps. Using `calc()` lets us mix units of measurement, so we can tell it to take the width of one box as a percentage, and subtract from that a certain number of pixels to allow for the gaps.

Just to make things more complicated, I wanted to vary the number of inner boxes at different screen widths. So, for example, on small screens there would only two boxes side by side, four boxes on medium width screens, and a maximum of 8.

I install art for a living, and this is how you would lay out a wall of paintiings: take the total width of the wall, subtract from it the total width of the paintings, take the remainder and divide it by the number of gaps. So if you had a wall that was 100" wide and five pictures that were each 15" wide, the formula would be:
(100 - (15 \* 5)) / 6, six being the number of gaps in between pictures. That would leave a gap of 8.33333333" between each picture. So that's the mental model I went into this with.

A lot of times, I learn by trial and error. This isn't the most efficient way to go about it, but sometimes I can read the docs or some blog post over and over and still not get it. I need to _see_ how things change in order to learn _how_ they change. Taking that approach, I started out with what I thought would be the easiest to conceptualize. Two boxes, side by side, with a 10px gap in between. Using `calc()`, I tried giving each box half the width of the container(50%), minus the gap(10px). But this was too much, because I was taking 10px off of each box, which reduced their size by 20px instead of 10.

<aside>This is what that looks like: <code>calc(50% - 10px)</code>. If we had a container of 100px, that would work out to be: <mark>50px - 10px = 40px</mark>. That would give us two boxes with a combined width of 80px, which allows for the 10px, but has an extra 10px left over.</aside>

The 10px needs to be removed from each of the inner boxes _combined_, not individually. This is why I started with two boxes! I can figure this out. If we want each box to be half the width of the container, minus enough space for our gap, we need to say `calc(50% - 5px)`.

Next, I wanted to divide the container up to fit four boxes. I thought: if four boxes is twice as many as two boxes then the number of pixels taken off should be twice as many as well. This was wrong.

<aside>Here is how that would play out: <code>calc(25% - 10px)</code>. With a 100px container, that would be: <mark>25px - 10px = 15px</mark>. This ends up being 60px, plus the three gaps giving us a total of 90px, again short of what we want.</aside>

This is where my tendency to resort to trial and error kicks in. Looking at computed values in my dev tools, and playing around with different values, I eventually figured out that I needed to take 7.5px of each box. Then I went through the same thing with dividing the space up for eight boxes. This time, I thought: if two boxes is <mark>50% - 5px</mark>, and four boxes is <mark>25% - 7.5px</mark>, that's a difference of 2.5px, so clearly, for eight boxes I should add 2.5px to the amount I'm taking off, or 10px. This too, was wrong.

Again, after some trial and error, I figured out that the number I needed was 8.75px. But I couldn't understand why that worked, or why it made sense. After playing around with numbers for a while, it finally came to me that it could be expressed like so: subtract whatever the percentage size of one box was from 100% and divide that number by the size of the gap between each box. That works if the gap is 10px, but would it work if the gap was a different size?

100px - 50% = 50px
50px / 10 = 5px
50px - 5px = 45px
45px \* 2 = 90px
90px + 10px = 100px

Let's say we want a 12px gap:

100px - 50% = 50px
50px / 12 = 4.16666667px
50px - 4.16666667px = 45.83333333px
45.83333333px \* 2 = 91.66666666px
91.66666666 + 12 = 103.66666666px

Uh-oh.

Just out of curiosity:

100px - 50% = 50px <-- the percentage size of one box, subtracted from the total width
12px / 2 = 6px <-- the size of the gap divided by the number of boxes
50px - 6px = 44px <-- the size of one box, minus the size of the gap divided by the number of boxes
44px \* 2 = 88px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes
88px + 12px = 100px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes, plus the width of the gap

Yay!

100px - 25% = 75px <-- the percentage size of one box, subtracted from the total width
12px / 4 = 3 <-- the size of the gap divided by the number of boxes
25px - 3 = 22px <-- the size of one box, minus the size of the gap divided by the number of boxes
22px \* 4 = 88px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes
88px + 36px = 124px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes, plus the total width of the gaps

Uh oh.

But wait, it should be:

100px - 25% = 75px <-- the percentage size of one box, subtracted from the total width
36px / 4 = 9px <-- the size of the gaps(there's three of them) divided by the number of boxes
25px - 9px = 16px <-- the size of one box, minus the size of the gaps(there's three of them) divided by the number of boxes
16px \* 4 = 64px <-- the size of one box, minus the size of the gaps(there's three of them) divided by the number of boxes, multiplied by the number of boxes
64px + 36px = 100px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes, plus the total width of the gaps(there's three of them)

Yay!

Going back to our original example:

(50 - ( 10 / 2)) \* 2 + 10 = 100px <-- the size of one box, minus the size of the gap divided by the number of boxes, multiplied by the number of boxes, plus the total width of the gaps

Yay!

b = the size of one box
g = the size of the gap(s)
n = the number of boxes
x = the size of the container

(b - ( g / n )) \* n + g = x

One more time using our new formula; on a container that is 580px wide, with 8 boxes:
( 72.5 - ( 70/8 )) \* 8 + 70 = 580px

Yay!

But, isn't this telling us what we already know? We know that the container is _x_ wide, we know the number of boxes, and this equation relies on knowing the size of a box _after_ it's had a certain amount removed. We need to find out, in pixels, what that amount is. Because remember, in the CSS, we're going to be sizing the box like so: `calc(percentage size of the box - the number of pixels we need to shave off the box in order to accommodate the gaps)`. Ultimately, our formula needs to give us that number of pixels. Perhaps we'll want eventually want to use this formula to write a function in SASS so that we could put the number of boxes and the size of the gaps in variables, and only have to change them in one place. Back to it!

We know that we need to divide the total width of the gaps, in pixels, by the number of boxes in order to get the amount, in pixels, that each box needs to shrink by. That looks like this:

w = the width of one gap
t = the total size of the gap(s)
g = the number of gaps
b = the number of boxes
x = the amount, in pixels, that needs to be removed from each box

The number of gaps is always going to be <mark>n - 1</mark>, because we're only concerned with the gaps _between_ the boxes. The gaps before the first box and after the last box are taken care of by the parent container's padding. So, <mark>g = b - 1</mark>. The total width of all the gaps, _t_, is going to be: <mark>t = w _ g</mark>, or, <mark>t = w _ (b - 1)</mark>.

Next, to get _x_ we need to divide _t_ by the number of boxes. So, <mark>x = t / b</mark>. Expanded, that's going to be: <mark>x = (w \* (b -1)) / b</mark>.

Let's see how this will play out; if we have two boxes, and a 10px gap:

x = (10 \* (2 - 1)) / 2

which gives us 5px. Great!

Let's try eight boxes, with a 12px gap:

x = (12 \* (8 - 1)) / 8

which gives us 10.5px. In a container that was 580px wide, each box would be 72.5px wide. If we take 10.5px off of each of the eight boxes, the total width of our boxes would be 496px. The total size of the gaps would be 84px.

496 + 84 = 580

Yay!

Let's get SASSy.

Keeping in mind that our goal is to end up with `calc("nominal box width"% - "adjBoxWidth"px)`, and to easily change these values in one place. First, let's write a function that will calculate the nominal width of each box based on how many boxes we want.

```scss
@function nomBoxWidth($numberOfBoxes) {
  @return math.div(100, $numberOfBoxes);
}
```

<aside>If you use a "/" character to do division, Dart Sass will warn you that using "/" for division will be deprecated in Dart Sass 2.0.0. The recommended way to do division is via the "sass:math" module. Put <code>@use 'sass:math';</code> at the top of your file to import the module, then use it like so: <code>math.div($number1, $number2)</code>.
Sass, by the way, has <em>very</em> useful error messages, so many thanks to the them for that!</aside>

Next, we're going to need a function to calculate the amount to remove from each box. Our function will take two arguments, the number of boxes and the width of the gap.

```scss
@function adjBoxWidth($numberOfBoxes, $widthOfGap) {
  @return math.dev($widthOfGap * ($numberOfBoxes - 1), $numberOfBoxes);
}
```

With those two functions in place, we can declare some variables to hold the options we want to pass to the functions. In my case, I was aiming for three different scenarios, a small screen, a medium screen, and a large screen.

```scss
$numberOfBoxesSmall: 2;
$numberOfBoxesMed: 4;
$numberOfBoxesLg: 8;
$widthOfGap: 10;
```

Now we can put it all together. In my case, I was using these values to set `flex-basis`, but they could be used however you want, e.g. `max-width` or `width`.

```scss
flex: 0 calc(#{nomBoxWidth($numberOfBoxesSmall)}% - #{adjBoxWidth(
        $numberOfBoxesSmall,
        $widthOfGap
      )}px);
```

For larger screen sizes, I use `$numbaerOfBoxesMed` and `numberOfBoxesLg`.

With all of that set up, if I want to change the gap size, or the number of boxes, I can do that without too much fussing around.
