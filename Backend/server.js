const http = require("http");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const connectDb = require("./src/config/db");
const app = require("./src/app");

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();

        server.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();