const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const colors = require("colors");
const compression = require("compression");
// Global error handlers
const errorHandler = require("./middleware/error");
const { cloudinaryConfig } = require("./config/cloudinary.config");
const node_media_server = require("./media_server");
const thumbnail_generator = require("./cron/thumbnails");

const app = express();

// Cors config
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://portal.coza.org.ng"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cloudinaryConfig);
app.use(compression()); 

app.use(logger("dev"));
// app.use('/live-stream-cron-job', require("./cron/event.cron"));
// Routes config
const db = require("./config/keys").mongoURL;

mongoose 
  .connect(db, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((conn) =>
    console.log(
      `mongodb connected successfully:${conn.connection.host}`.cyan.underline
        .bold
    )
  )
  .catch((err) => console.log(`Server connection error: ${err.message}`.red));

require("./routers/index.routes")(app);
app.use(errorHandler);

// DB config
// console.log(db);
// connect to mongoDB

const port = process.env.PORT || 4100;
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
io.on("connection", socket => {
  
 }); 


if (require.main === module) {
  //   console.log("this is not it");

  const server = httpServer.listen(port, () =>
    console.log(`server running on port ${port}!!`.yellow.bold)
  );
} else {
  //   console.log("this is it");
  module.exports = app; 
}

//catch any unhandled rejection error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  process.exit(0); 
});
// :::::::::::::::::::::::::::::::::::::::::::::::::::::streaming:::::::::::::::::::::::::::::::::::::::::
const NodeMediaServer = require("node-media-server");


