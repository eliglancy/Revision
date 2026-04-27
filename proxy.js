const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = http.createServer(createProxyMiddleware({
    target: 'http://example.com', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
