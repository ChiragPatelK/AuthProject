const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminUserRoutes = require("./routes/adminUser.routes");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api/admin", adminUserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;