# Transfusion Web Scraper
A WebScraper that finds the title's of Dr. Chaffin's BBGuy podcasts, with a link, and allows users to comment.

**Transfusion Web Scraper** scrapes the podcast data from [BBGuy.com](https://www.bbguy.org/) to build an index with single comment/note functionality.

## Motivation

**Transfusion Web Scraper** utlizied Node.js, express, cheerio, and mongodb as it's server-side technologies. Handlebars handled the html production, and CSS3 styled the page. This exercise gave me hands-on practice with these technologies.

## Build Status

Complete

## Code Style

Standard

## Tech/framework Used

Built utilizing Node.js, express, cheerio, handlebars, and mongodb.

## Features

Transfusion Web Scraper features a database that builds an index of BBGuy podasts based on webscraping by cheerio. Furthermore, a single comment can be added to the item as needed. These will all persist due to mongodb hookup.

## Installation

Perform either a clone or a fork by visiting [Transfusion Web Scraper](https://github.com/BrantKeener/TransfusionWebScrape).

The user then needs to install the appropriate npm files, which are included in the package.json as dependencies. Perform an npm install, and you are ready! You may also perform the following installs manually if you choose:
1. express
2. express-handlebars
3. mongoose
4. cheerio
5. axios
6. eslint
7. morgan

## How to Use

The simplest way to use this app is just to visit the heroku-hosted [Transfusion Web Scraper](https://powerful-badlands-62174.herokuapp.com/), and enjoy. Once you navigate to the webpage, you may interact in a variety of ways:
1. Scrape - by adding '/scrape' to your URL, the webapp will run a scrape against bbguy, and this will update the db as necessary.
2. From the homescreen, you can scroll through the index to see details about every episode.
3. Click on a particular episode to find the comment section where you can leave a comment/update the existing comment.

## Credits

Written and maintained by Brant Keener.
