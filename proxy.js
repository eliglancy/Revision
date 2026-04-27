const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Proxy routes
app.use('/weather', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: true,
    pathRewrite: { '^/weather': '/data/2.5' }
}));

app.use('/github', createProxyMiddleware({
    target: 'https://api.github.com',
    changeOrigin: true,
    pathRewrite: { '^/github': '' }
}));

app.use('/json', createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/json': '' }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Proxy running on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Weather: http://localhost:${PORT}/weather/weather?q=London`);
    console.log(`GitHub: http://localhost:${PORT}/github/users/github`);
    console.log(`JSON: http://localhost:${PORT}/json/posts/1`);
});
