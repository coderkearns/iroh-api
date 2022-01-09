const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
    console.log(`Server listening at http://${HOST}:${PORT}/`);
});

process.on("exit", () => {
    console.log("Closing server...");
    server.close();
});
