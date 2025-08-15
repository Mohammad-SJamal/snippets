#!/bin/node
const express = require("express");
const { Snippet } = require("./../models/index");
const app = express();

const snippetRouter = require("./../routes/snippet");
const userRouter = require("./../routes/user");

app.use("/snippet", snippetRouter);
app.use("/user", userRouter);

module.exports = app;