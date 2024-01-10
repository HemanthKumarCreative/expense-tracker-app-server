const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");

const dbConnection = require("./database/connection");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotEnv.config();

const app = express();
dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/download", downloadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
