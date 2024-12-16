---
title: 'Case study - Human Service Forum'
teaser: 'Improving the performance of a WordPress site'
date: 2024-03-12
published: true
---

## The problem.
The Human Service Forum is a small non-profit located in central Massachusetts. Hoping to expand their reach, they needed a website that could more reliably meet their members’ needs. After a recent redesign, they found the website’s performance disappointing (page load times were around 12 seconds) and needed help diagnosing the cause.

## The diagnosis.
At our initial meeting, we discussed the possible causes of the site’s issues. I proposed creating a local copy of their site to run tests measuring the effect of disabling various plugins. There were a few that were no longer needed, but disabling them had a minimal impact on page load times.The only one that did have a significant impact was related to a site builder ([_Avada_](https://avada.com/)) that had been used in the site’s first iteration. Disabling it broke the site, and I realized that the theme currently in use was a child of a child theme of that original theme. This was causing a lot of unfulfilled calls to resources (scripts and stylesheets) that were no longer present or needed. What’s more, much of the site’s content had been written into template files and could not be changed from the dashboard.

With that in mind, I offered to rebuild the theme from scratch, preserving the existing design. In follow-up conversations, we discussed adding a “news” page, and I agreed to do that.
## The process.
My first step was to move the content written into the templates to the dashboard. I created custom blocks and post types using _Advanced Custom Fields_ and _Custom Post Type UI_. I then moved the code defining those into a custom plugin for the site.

Using the existing design as a guide, I then proceeded to rewrite the site’s theme templates. I set up a modern workflow using `gulp` and `webpack`, and set to work creating a new theme. Following best practices, I made the markup more semantic for accessibility and organized the CSS to be more modular and maintainable in the future.
## Deployment.
When I had finished recoding the theme and plugins, I set up a staging site and presented it to the staff. They were delighted with the ease with which they could now edit the site’s content, and approved the changes I had made. I updated the PHP version their site ran on, and the new site went live. Testing showed that page load times had been reduced from 12s to 3s.
## Conclusion.
The work I did on the Human Service Forum’s website had been as a volunteer. They were pleased with the work I did and asked if I would continue working with them as a paid developer. I agreed, and since then have made tweaks to the design, managed updates, and troubleshooted problems as they come up.

> William has been a wonderful asset to HSF. He is a very hard worker and very knowledgeable in the ways of website coding. He has made a HUGE difference on the back end of our website. It is much more user friendly for the staff as well as for people coming to use our site. William is the kind of person who puts his all into the work that he does and we could not be more grateful.

 \- Rebecca Coolong, director, Human Service Forum
