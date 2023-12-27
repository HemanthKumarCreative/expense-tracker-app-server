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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/download", downloadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
