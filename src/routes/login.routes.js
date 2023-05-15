
const controller = require('../controllers/login.controller');
const express = require("express");

const router = express.Router();

router.get("/",controller.getLogin);

router.post("/",controller.postLogin);

module.exports = router;