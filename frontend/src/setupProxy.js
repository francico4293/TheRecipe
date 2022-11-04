const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/ingredientinfo', { target: 'http://localhost:6000/' }));
}