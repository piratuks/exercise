let proxy = [
    {
        context: ['/api/**'],
        target: 'http://localhost:10000',
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api' },
    },
];

module.exports = proxy;
