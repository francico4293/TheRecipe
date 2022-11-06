const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/ingredientinfo', { target: 'http://localhost:6000/' }));
  app.use(createProxyMiddleware('/api/users', { target: 'http://localhost:4000/' }));
}