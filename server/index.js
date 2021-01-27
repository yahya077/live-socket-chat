const http = require('http');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// mongo connection
require('../config/database');


// routes
const indexRouter = require('../routes/client/index');
const userRouter = require('../routes/client/user');
const chatRoomRouter = require('../routes/client/chatRoom');
const deleteRouter = require('../routes/client/delete');

// middlewares
const { decode } = require('../app/http/middlewares/jwt');


const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});