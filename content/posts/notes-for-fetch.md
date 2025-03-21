---
title: 'eleventy-fetchity'
teaser: 'this is what the post is about'
date: 2024-12-29
published: false
draft: true
---

# Using the Eleventy Fetch plugin and Raindrop to display recently saved links.

## Acknowledgements
A lot of inspiration and useful code came from the following sources:

- Rob O'Leary's [post](https://www.roboleary.net/webdev/2024/02/07/eleventy-fetch.html) about using eleventy-fetch and github.

- Sophie Koonin's [post](https://localghost.dev/blog/automated-weekly-links-posts-with-raindrop-io-and-eleventy/) about using eleventy-fetch and raindrop.

- Both of which I found by way of [11tybundle.dev](11tybundle.dev), which is always a good place to start.

- And of course, the [docs](https://www.11ty.dev/docs/). In particular: {% longUrl "https://www.11ty.dev/docs/quicktips/cache-api-requests/" %}.

The following tools were used in this project:
- [raindrop.io](https://raindrop.io)
- [postman](https://web.postman.co/)
- [11ty](https://www.11ty.dev/)
- [eleventy-fetch](https://github.com/11ty/eleventy-fetch)
- [https://www.arraybuilder.com/](https://www.arraybuilder.com/#)

## The API.
Raindrop.io is a bookmarking service with an API that allows developers to access and manipulate the data stored there. In my case, all I needed was to [retrieve](https://httpwg.org/specs/rfc9110.html#GET) the bookmarks that I have saved with certain tags ('#publish' and '#development'). There is a lot more one could do with the API, but for now, I just want to read the data.

### Authentication.
The first step is to generate a token that will allow to access a user's data. Again, mine is a pretty simple use-case, and the Raindrop [docs](https://developer.raindrop.io/v1/authentication) cover that process well, so I won't go into it here.
One thing worth mentioning is that the token must be sent in the request [headers]( https://httpwg.org/specs/rfc9110.html#rfc.section.6.3) in the following format:

```markup
Authorization: Bearer actual-token-goes-here
```

How to add that to the request will be covered below, in the section on 'eleventy-fetch'.

### The endpoint.
The API [endpoint](https://developer.raindrop.io/v1/raindrops/multiple#get-raindrops) that has the data I want is:

```markup
https://api.raindrop.io/rest/v1/raindrops/0
```

The 'raindrops' after `/rest/v1/` indicates that we are requesting individual bookmarks (not collections, etc.), and the '0' at the very end tells the API that we are looking for 'raindrops' (aka bookmarks) from _all_ collections.

### The parameters.
In order to limit the results to just those tags I want to include on my site, a couple of parameters need to be added to the end of the request. I'm not very experienced with APIs and HTTP requests, but [Postman](https://web.postman.co/) is a big help in forming and testing API requests. It will even generate code to use in various languages. Even though 'eleventy-fetch' has its own syntax and I couldn't directly use the generated code, it was helpful to see how the headers could be included in the request.

The Raindrop API has a search parameter that can specify what kind of bookmarks should be returned. To use it, `?search=` is added to the endpoint address, followed by the search terms. (The `%23` before 'publish' and 'development' represents the `#` character.)

This was the end result:

```markup
https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development
```



## Making fetch happen.
The vanilla JS way to make HTTP requests is to use the `fetch()` [method](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch). Building off of this, Eleventy has the [eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) plugin, which adds the ability to cache the response. Install the plugin with your package manager of choice, e.g. `npm install @11ty/eleventy-fetch`.

The plugin allows you to configure, among other things, the duration of the cache (i.e, how long before it is refreshed) and the type of the response. To use the cached data to populate templates, `json` is probably the most convenient type to use. 

Additionally, it is possible to pass options to the underlying `fetch()` method. This is where things like the authentication token can be added to the headers. It is a good idea to keep the token out of files that might be under version control and thus made public; using a `.env` file is a common [way](https://www.npmjs.com/package/dotenv) to do this. 

I put the code for the fetch logic in a file in the global data directory. What is exported from this file will be available in Eleventy's data cascade. (In truth, there is really only one template that will ever access this data, so maybe it doesn't need to be in the global data directory, but that's where it is for now.) 

Here's what the code looks like:
```javascript
// src/_data/links.cjs
const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
    // the API endpoint 
	let url = 'https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development';
	
	// the authentication token is stored in .env
	let token = process.env.RAINDROP_TOKEN;
	
	try {
		let json = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		});
		// reformatting the response to simplify its use in the template.
		let links = json.items.map((elem) => {
			return {
				title: elem.title,
				url: elem.link,
				excerpt: elem.excerpt,
				cover: elem.cover,
			};
		});
    
    // 'links' will be used in the template as the identifier of the returned data object.
		return links;
	} catch (e) {
		console.error('fetch failed, returning 0');
		return{
			links: 0,
		};
	}
};
```

The use of `.map()` to reformat the JSON fetched from the API is optional. The JSON response is structured in such a way that the info about the links themselves is an array, and in order to use it in the template, I had to do `{% raw %}{% for link in link.items %}{% endraw %}`, not the worst thing, but it seemed cleaner to reformat it. 

1. bit about being a green cowhand as analogy for how I deal with apis
2. raindrop api
3. using postman to find the endpoint I needed
4. learning about 11ty data files and how to use the info they produce
5. using `log` filter
1. `npm install @11ty/eleventy-fetch`
2. in the `_data` directory, create a file named `links.cjs`.
    3. n.b., the `cjs` marks it as a CommonJS file. I needed to do this b/c I'm in the process of converting to Eleventy 3, and have specified `type: module` in my `package.json`.
4. at the top of `links.cjs`, import eleventy-fetch.
5. then, export an async function that:
    6. calls eleventy-fetch with the authorization token from raindrop.io (note options)
    7. takes the json response from the api and `.map`s it to a more succinct format, then caches it as `links`.
    8. the `links` object is now available to all templates.
9. create a page called `links.njk`. 
    10. my setup also required adding that page to the navigation menu
11. in that page, make a loop of `link in links`, and output the result
12. style!

# A simple page to display recently saved links.
***
__Tools used:__ raindrop.io, [postman](https://web.postman.co/), 11ty, eleventy-fetch, and [https://www.arraybuilder.com/#](https://www.arraybuilder.com/#).
***


## Background.
I'm trying (and failing miserably) to get out of the habit of keeping a million tabs open, so I've started using raindrop.io to save my bookmarks. I've got a system of keyboard shortcuts down so I can save them pretty easily, adding tags and whatnot. I thought it might be nice to have a page on my website that displayed a rotating list of my most recently saved links.

## Getting started.
I bookmark pretty much every website I might want to come back to, including a lot of things that wouldn't be relevant here, so I add tags to the bookmarks I want to add to this site. The first thought I had was to put all those links into a collection in Raindrop, then export it and use that data to populate a list in 11ty. But Raindrop also has an API, and through that, it's possible to get a nice JSON object of all the links that meet certain criteria.
To use the Raindrop API, you first have to generate a unique authentication token. (The [docs](https://developer.raindrop.io/v1/authentication/token) explain how to do this.) The first thing I got hung up on was how to include that token in the request headers, but luckily the ever-handy [Postman](https://web.postman.co/) makes assembling the request more intuitive. The request ended up looking like this:
```markup
https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development
```
The '0' right after 'raindrops' tells the API to return results from all collections, and the search parameters are the tags I want to include, 'publish' and 'development'. 
Once I had the `GET` request providing the response I was hoping for, it was time to head over to 11ty.
## Using the eleventy-fetch plugin.
After installing the plugin, I put a JS file in the global `_data` directory. Because it's only really one template that will be using this data, I could have put it other places



## The Raindrop.io API

In order to interact with the Raindrop API, an authentication token is required. The [docs](https://developer.raindrop.io/v1/authentication/token) explain how to generate one.

The data I needed from Raindrop was a list of links with certain tags; in my case, I'm marking links I want to show up on my site with the tags 'publish' and 'development'.

In order to get that data, a `GET` request has to be sent to the proper endpoint with: a) the authentication token, and b) the search parameters.

The ever-handy [Postman](https://web.postman.co/) was a big help in putting together and testing the HTTP request, which ended up looking like this:
```markup
https://api.raindrop.io/rest/v1/raindrops/0/?search=%23publish %23development
```

The '0' right after 'raindrops' tells the API to return results from all collections, and the search parameters are the tags I want to include, 'publish' and 'development'. The authentication token is sent in the request  headers as `Bearer *****`.

## Eleventy-fetch

The `eleventy-fetch` plugin ([documentation](https://www.11ty.dev/docs/plugins/fetch/)) caches the response from an API as a JSON object that is then available to templates via Eleventy's data cascade. It can be installed with your package manager of choice from `@11ty/eleventy-fetch`.

```markup
npm install @11/eleventy-fetch
```

I opted to put the fetching logic in a dedicated file: `src/_data/links.cjs`. (I'm in the process of switching over to ES6 modules so my `package.json` is set to "type":"module", hence the CommonJS extension.) At the top of this file, I import the plugin.

```javascript
const EleventyFetch = require('@11ty/eleventy-fetch');
```

`EleventyFetch` takes a URL (the API endpoint + parameters) as its first argument, and an options object as its second. The options for `duration` and `type` are mostly straightforward, but I got a little turned around when it came to including the authentication token in the headers. This can be done by adding the following to `headers` in the `fetchOptions`: 