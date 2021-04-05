var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { initialize } = require("express-openapi");
var swaggerUi = require("swagger-ui-express");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3030);

initialize({
    app,
    apiDoc: require("./api/api-doc"),
    paths: "./api/paths",
});

app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: "http://localhost:3030/api-docs",
      },
    })
  );
  

module.exports = app;
