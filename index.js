const app = require('./app');

const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
    console.log(`Server listening at http://${HOST}:${PORT}/`);
});

process.on("SIGINT", () => {
    console.log("Closing server...");
    server.close();
});
