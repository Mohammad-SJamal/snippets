#!/bin/node
const express = require("express");
const app = express();
let snippets = [];

app.get("/snippets", (req, res) => {
    res.send(snippets);
})

app.get("/snippets/:id", (req, res) => {
    if (req.body.userId){
        res.send(snippets[req.body.userId][req.params.id]);
    }
})

//Limitation: There must already be a user registered
app.post("/snippets", (req, res) => {
    if (req.body.userId){
        snippets[userId].push(req.body);
        res.sendStatus(200);
    }
})