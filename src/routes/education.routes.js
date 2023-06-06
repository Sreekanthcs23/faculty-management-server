const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const controller = require('../controllers/education.controller');
const verifyJWT = require("../controllers/login.controller").verifyJWT;
const express = require("express");

const router = express.Router();

router.get("/select",verifyJWT,controller.select);

router.post("/insert",verifyJWT, multer.single("pdffile"),controller.insert);

module.exports = router;