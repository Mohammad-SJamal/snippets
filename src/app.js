#!/bin/node
const express = require("express");
const { Snippet } = require("./../models/index");
const app = express();

let snippets = [];

app.get("/snippets", async (req, res) => {
    res.send(await Snippet.findAll());
})

app.get("/snippets/:id", async (req, res) => {
    res.send(await Snippet.findByPk(req.params.id));
})

app.post("/snippets", async (req, res) => {
    let new_snippet = req.body.snippet;
    await Snippet.create(new_snippet)
        .then(snippet => {
            res.status(201).send(snippet);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

module.exports = app;