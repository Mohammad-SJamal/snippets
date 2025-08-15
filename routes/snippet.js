const express = require("express");
const { Snippet, User } = require("./../models/index");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const snippetRouter = express.Router();

snippetRouter.use(express.json());
snippetRouter.use(express.urlencoded());

const key = "sample_key" // Replace later in development

snippetRouter.get("/", async (req, res) => {
    snippets = await Snippet.findAll();
    for (let i of snippets) {
        i.code = CryptoJS.AES.decrypt(i.code, key).toString(CryptoJS.enc.Utf8);
    }
    res.send(snippets);
})

snippetRouter.get("/:id", async (req, res) => {
    snippet = await Snippet.findByPk(req.params.id);
    snippet.code = CryptoJS.AES.decrypt(snippet.code, key).toString(CryptoJS.enc.Utf8);
    res.send(snippet);
})

snippetRouter.post("/", async (req, res) => {
    let new_snippet = req.body;
    new_snippet.code = CryptoJS.AES.encrypt(new_snippet.code, key).toString();
    await Snippet.create(new_snippet)
        .then(snippet => {
            res.status(201).send(snippet);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

module.exports = snippetRouter;