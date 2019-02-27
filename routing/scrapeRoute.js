// Build the route for scraping

// npm packages
const axios = require('axios');
const cheerio = require('cheerio');

// GET route for our scraping
module.exports = (app) => {
  app.get('/scrape', (req, res) => {
    axios.get('https://www.bbguy.org/podcast/').then( (response) => {
      var $ = cheerio.load(response.data);
      $('div.post-content').each(function(i, element) {
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
        result.title = title;
        // This will grab the same data as above, but builds an array split by with
        // Then, it splices out the last element which is the interviewee
        if(title.includes('with')) {
          result.interviewee = $(this)
            .children('.entry-title')
            .children('a')
            .text()
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
        console.log(result);
      });
    });
  });
};