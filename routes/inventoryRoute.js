const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

//Route
router.patch("/tambah-stock/:inventoryId", inventoryController.tambahStock);
router.patch("/kurang-stock/:inventoryId", inventoryController.kurangStock);

module.exports = router;
