require("express-async-errors");
require("dotenv/config");

const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const AppError = require("./utils/AppError");

const allowedOrigins = [process.env.FRONT_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

//Middleware, caso algo de errado na requisição, sera capturado aqui
app.use((error, req, res, next) => {
  //Se for um erro enviado de proposito
  if (error instanceof AppError)
    res.status(error.status).json({ Status: "Error", message: error.message });
  //Se for um erro nao controlado
  else res.status(500).json({ Status: "Server Error", message: error.message });
});

app.listen(PORT, () => console.log("Running on port", PORT));
