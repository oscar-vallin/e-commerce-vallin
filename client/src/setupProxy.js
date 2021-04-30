const createProxyMiddleware  = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/uploads"],
    // ["/api", "/auth/facebook"],
    createProxyMiddleware({
      target: "http://localhost:4000",
    })
  );
};