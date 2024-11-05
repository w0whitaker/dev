# config/

## Purpose.
Keep the eleventy config file neat and tidy by putting most of it here, then importing it.

## Acknowledgements.
The idea for this arrangement comes from the excellent [eleventy-excellent](https://github.com/madrilene/eleventy-excellent) starter project by Lene Salie.

## Contents.

1. `filters/` 11ty [filters](https://www.11ty.dev/docs/filters/) extend templating syntax to provide custom formats for outputting data.

2. `helpers/` These are general purpose JS utilities to be used in multiple places.

3. `shortcodes/` 11ty [shortcodes](https://www.11ty.dev/docs/shortcodes/) are customizable snippets of reusable content.

_Note: The individual files in `filters` and `helpers` export to an `index.js` file in each directory. This seemed like a good idea at the time, but I can't remember why. The files in `shortcodes` are exported and imported in `eleventy.config.js` directly. Eventually they all will adopt this behavior._