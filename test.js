import test from "ava";
import path from "node:path";
import { stat } from "node:fs/promises";

import metadata from "./_data/metadata.js";
import links from "./_data/links.cjs";

// tests for _data
//
// has metadata been set properly?
test("Title is set.", (t) => {
	t.truthy(metadata.title);
});
test("Language is set.", (t) => {
	t.truthy(metadata.language);
});
test("Description is set.", (t) => {
	t.truthy(metadata.description);
});
const author = metadata.author;
for (const property in author) {
	test(`Author ${property} is set.`, (t) => {
		t.truthy(author[property]);
	});
}
test("Author name is correct.", (t) => {
	t.assert(author.name === "William Whitaker");
});
test("Author email is correct.", (t) => {
	t.assert(author.email === "william@williamwhitaker.dev");
});
test("Author url is correct.", (t) => {
	t.assert(author.url === "https://williamwhitaker.dev/about-me/");
});
