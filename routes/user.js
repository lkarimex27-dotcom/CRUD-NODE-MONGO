const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

router.post("/users", (req, res) => {
    const user = new userSchema(req.body);
    user
        .save()
        .then((data) => { res.json(data);})
        .catch((error) => {res.status(500).json(error);});
});
router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => {res.json(data);})
        .catch((error) => {res.status(500).json(error);});
});
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id) 
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Usuario no encontrado" });
            res.json(data);
        })
        .catch((error) => { res.status(500).json(error); });
});
//delete user
router.delete("/users/:id", (req, res) => {
    const {id} = req.params
    userSchema
        .deleteOne({_id:id})
        .then((data) => {res.json(data);})
        .catch((error) => {res.status(500).json(error);});
});
//update user
router.put("/users/:id", (req, res) => {
    const {id} = req.params
    const {name, age, email} = req.body
    userSchema
        .updateOne({_id:id}, {$set:{name, age, email}})
        .then((data) => {res.json(data);})
        .catch((error) => {res.status(500).json(error);});
});

module.exports = router;