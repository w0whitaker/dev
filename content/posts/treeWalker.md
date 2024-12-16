---
title: 'The TreeWalker.'
eleventyExcludeFromCollections: false
teaser: 'Exploring DOM nodes from the comfort of home.'
date: 2024-07-09
published: true
---

## Nodes and their types.
The tree-like Document Object Model (DOM) is comprised of nodes whose arrangement describes the structure of the document. There are nine types of nodes; which type a particular node is can be discovered  through its `nodeType` property. This will return a number corresponding to a type as follows{% ftntAnchor 'deprecated' %}:

| Value | Type  |
|:--|:--|
| 1 | Element |
| 2 | Attribute |
| 3 | Text |
| 4 | CDATA Section {% ftntAnchor 'CDATA' %} |
| 7 | Processing Instruction{% ftntAnchor 'processing-instruction' %} |
| 8 | Comment |
| 9 | Document |
| 10 | Document Type |
| 11 | Document Fragment |

Element nodes are the most frequently targeted types in front-end development, but all are part of the DOM. Text nodes are interesting because they can contain not only the text of an element, but also the whitespace in the original HTML file. Although of limited practical value, these whitespace text nodes illustrate the nature of the DOM — it isn't simply an outline of a document, but a true representation of all its constituent parts and their relationship to one another.

## The `TreeWalker`.
JavaScript provides a built-in object that can be used to list all the nodes in a document, the `TreeWalker`, which can be created using the `createTreeWalker()` method on the `Document` interface. This `createTreeWalker()` method takes three parameters: `root`, `whatToShow`, and `filter`. More on these parameters and their use can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker).

To take a look at _every_ node on a page, a function that looks something like the following can be used:

```js
function walk() {
    // create a new instance of the TreeWalker object.
    
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_ALL);
    
    // starting at the root, iterate over each node in the DOM.
    
    do {
        console.log(walker.currentNode.nodeName);
        } while (walker.nextNode());
    }
```

Here, a new instance of `TreeWalker` is created with a `root` of `document`, which is always the first node in a document. It isn't required to start there unless the goal is to capture everything. Substituting another selector works the same way and will capture everything that follows that selector. The second parameter is `whatToShow` and it is set to show every node regardless of its type. This can also be used to only show certain types of nodes, such as element or text nodes, or, if more refined filtering is needed, the `filter` parameter with a callback can be included.

Next, a `do...while` loop is called that prints the `nodeName` of each node to the console. Every node has several properties, such as `nodeType` , `nextSibling`, or `textContent`, that can be returned as well. If a text node only contains whitespace, the `textContent` property will print a blank line to the console. To show the whitespace characters, `String.replaceAll` can be used to substitute text such as "[tab]" or "[newline]" for the various types of whitespace.

Finally, a quick note about using `do...while` to iterate over the `TreeWalker`  as opposed to `while`. Using `while (walker.nextNode())` will skip the `root` node.I found this confusing, because I thought that every node would print so long as that node had a node following it. However, it seems that `while` evaluates the expression and _then_ executes the code, whereas `do...while` executes the code and then evaluates the expression. Subtle!

{% ftntContent 'deprecated' %}Node-types 5, 6, and 12 are deprecated.{% ftntBacklink 'deprecated' %}{% endftntContent %}
{% ftntContent 'CDATA' %}XML only.{% ftntBacklink 'CDATA' %}{% endftntContent %}
{% ftntContent 'processing-instruction' %}XML only.{% ftntBacklink 'processing-instruction' %}{% endftntContent %}