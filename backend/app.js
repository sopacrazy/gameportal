require("dotenv").config();

const express = require("express");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem nao permitida pelo CORS."));
    }
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Game Portal API" });
});

app.use("/api", gameRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota nao encontrada." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Erro interno do servidor." });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}

module.exports = app;
