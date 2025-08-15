const express = require("express");
const { Snippet, User } = require("./../models/index");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');


const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded());

userRouter.get("/", async (req, res) => {
    res.send(await User.findAll());
})

userRouter.get("/:id", async (req, res) => {
    res.send(await User.findByPk(req.params.id));
})

userRouter.post("/", async (req, res) => {
    let new_user = req.body.user;
    new_user.password = await bcrypt.hash(new_user.password, 10);
    await User.create(new_user)
        .then(user => {
            res.status(201).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
})

module.exports = userRouter;