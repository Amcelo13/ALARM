const express = require("express");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth.route");
const connectDatabase = require("./connectDatabase")
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

const server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDatabase()


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
    credentials: true,
  }
})

io.on("connection", (socket) => {
  console.log("New client connected🔗");
  socket.on("disconnect", () => {
    console.log("Client disconnected❌");
  });
});

app.use((req, res, next) => {
  req.io = io
  return next()
})

const alarmRoute = require("./routes/alarm.route")




app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.use("/", alarmRoute);
app.use("/", authRoute);


server.listen(4000, () => console.log("Server is running on port 4000 🚀"));
