const { createProxyMiddleware } = require('http-proxy-middleware');

// ******* BEGIN CODE CITATION **********
// SOURCE: https://stackoverflow.com/questions/61472399/proxying-multiple-api-requests-with-create-react-app-with-react-scripts-version
// AUTHOR: guatamits
module.exports = function(app) {
  app.use(createProxyMiddleware('/ingredientinfo', { target: 'http://localhost:6000/' }));
  app.use(createProxyMiddleware('/api/users', { target: 'http://localhost:4000/' }));
}
// ******* END CODE CITATION **********
