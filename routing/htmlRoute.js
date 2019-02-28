// Router for loading up the page

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });
};