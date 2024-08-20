const express = require("express");
const clothesController = require("../controllers/clothesController");

const router = express.Router();

//Route
router.get("/", clothesController.index);
router.get("/:clothesId", clothesController.show);
router.post("/", clothesController.store);
router.patch("/:clothesId", clothesController.update);

module.exports = router;
