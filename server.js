const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const compression = require("compression");
// Global error handlers
const errorHandler = require("./middleware/error");
const { cloudinaryConfig } = require("./config/cloudinary.config");
const node_media_server = require("./media_server");
const thumbnail_generator = require("./cron/thumbnails");
const cron = require("./cron/event.cron");

const app = express();

// node_media_server.run();
// thumbnail_generator.start();
cron.start();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cloudinaryConfig);
app.use(compression());
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

const port = process.env.PORT || 3100;

if (require.main === module) {
  //   console.log("this is not it");
  const server = app.listen(port, () =>
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
  process.exit(1);
});
// :::::::::::::::::::::::::::::::::::::::::::::::::::::streaming:::::::::::::::::::::::::::::::::::::::::
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
};

var nms = new NodeMediaServer(config);
nms.run();
