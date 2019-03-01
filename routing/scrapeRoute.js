// Build the route for scraping

// TODO make episode number a different entry so that we can sort during build
// npm packages
const axios = require('axios');
const cheerio = require('cheerio');

// Database Route
const db = require('./databaseRoutes');

// GET function for scraping the web
module.exports = (app) => {
  app.get('/scrape', (req, res) => {
    axios.get('https://www.bbguy.org/podcast/').then( (response) => {
      const resultArray = [];
      var $ = cheerio.load(response.data);
      $('div.post-content').each(function() {
        const result = {};
        const title = $(this)
          .children('.entry-title')
          .children('a')
          .text();
        const dateCheck = $(this)
          .children('.post-meta')
          .children('span')
          .text();   
        // Build the object related to our scrape
        result.episodeNumber = parseInt(title
          .slice(0, 3));
        result.title = title;
        // This will grab the same data as above, but builds an array split by with
        // Then, it splices out the last element which is the interviewee
        if(title.includes('with')) {
          result.interviewee = title
            .split(/with/)
            .slice(-1)[0];
        } else {
          result.interviewee = 'Non-interview episode';
        }
        // BBGuy's website does not have a consistent placement for dateReleased
        // This if/else makes up for the inconcistency
        if(dateCheck !== '') {
          result.dateReleased = $(this)
            .children('.post-meta')
            .children('span')
            .text();
        } else {
          result.dateReleased = $(this)
            .siblings('.post-meta')
            .children('.published')
            .text()
            .substr(1);
        }
        result.URL = $(this)
          .children('.entry-title')
          .children('a')
          .attr('href');
        resultArray.push(result);
        
      });
      db.articleDBUpload(resultArray, res);
    });
  });
};
