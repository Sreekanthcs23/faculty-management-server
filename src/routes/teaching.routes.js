const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const controller = require('../controllers/teaching.controller');
const verifyJWT = require("../controllers/login.controller").verifyJWT;
const express = require("express");
const router = express.Router();

router.get("/select",verifyJWT,controller.select);
router.post("/delete",verifyJWT,controller.delete);

router.post("/insert",verifyJWT, multer.single("tutorial"),controller.insert);
router.post("/insert2",verifyJWT, multer.single("internal"),controller.insert2);
router.post("/insert3",verifyJWT, multer.single("attendance"),controller.insert3);
router.post("/insert4",verifyJWT, multer.single("feedback"),controller.insert4);
router.post("/insert5",verifyJWT, multer.single("timetable"),controller.insert5);
router.post("/insert6",verifyJWT, multer.single("result"),controller.insert6);
router.post("/insert7",verifyJWT, multer.single("achievement"),controller.insert7);

module.exports = router;




