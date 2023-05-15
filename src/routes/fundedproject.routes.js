const controller = require('../controllers/fundedproject.controller');
const express = require("express");

const router = express.Router();

router.get("/select",controller.select);

router.post("/insert",controller.insert);

module.exports = router;