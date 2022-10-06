require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5500;
const router = require("./routes");
const DbConnect = require('./database')

app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000']
}
app.use(cors(corsOption))
app.use(express.json({ limit: "8mb" }));
app.use(router)

DbConnect();

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
