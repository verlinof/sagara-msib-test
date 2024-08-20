const models = require("../models");
const bcryptjs = require("bcryptjs");
const Validator = require("fastest-validator");

async function store(req, res) {
  try {
    const { clothesId, size, stock } = req.body;
    const inventoryData = {
      clothesId,
      size,
      stock,
    };

    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(inventoryData, {
      clothesId: { type: "number", optional: false },
      size: { type: "string", optional: false },
      stock: { type: "number", optional: false },
    });

    if (validationResponse !== true) {
      return res.status(400).send({
        message: validationResponse,
      });
    }

    //Storing data
    const inventory = await models.Inventory.create({
      clothesId: inventoryData.clothesId,
      size: inventoryData.size,
      stock: inventoryData.stock,
    });

    return res.status(201).send({
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function tambahStock(req, res) {
  try {
    const { stock } = req.body;

    const inventoryData = {
      stock,
    };

    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(inventoryData, {
      stock: { type: "number", optional: false, min: 1 },
    });

    if (validationResponse !== true) {
      return res.status(400).send({
        message: validationResponse,
      });
    }

    const inventory = await models.Inventory.findByPk(req.params.inventoryId);
    if (!inventory) {
      return res.status(404).send({
        message: "Inventory not found",
      });
    }

    //Update Data
    const updatedCloth = await inventory.update({
      stock: inventory.stock + inventoryData.stock,
    });

    return res.status(200).send({
      message: "Stock berhasil ditambahkan",
      data: updatedCloth,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function kurangStock(req, res) {
  try {
    const { stock } = req.body;

    const inventoryData = {
      stock,
    };

    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(inventoryData, {
      stock: { type: "number", optional: false, min: 1 },
    });

    if (validationResponse !== true) {
      return res.status(400).send({
        message: validationResponse,
      });
    }

    const inventory = await models.Inventory.findByPk(req.params.inventoryId);
    if (!inventory) {
      return res.status(404).send({
        message: "Inventory not found",
      });
    }

    //Update Data
    const updatedCloth = await inventory.update({
      stock: inventory.stock - inventoryData.stock,
    });

    return res.status(200).send({
      message: "Stock berhasil dikurangi",
      data: updatedCloth,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { size, stock } = req.body;

    const clothesData = {
      size,
      stock,
    };

    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(clothesData, {
      name: { type: "string", optional: false },
      color: { type: "string", optional: false },
      price: { type: "number", optional: false },
    });

    if (validationResponse !== true) {
      return res.status(400).send({
        message: validationResponse,
      });
    }

    const cloth = await models.Clothes.findByPk(req.params.clothesId);
    if (!cloth) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }

    //Storing data
    const updatedCloth = await cloth.update({
      name: clothesData.name,
      color: clothesData.color,
      price: clothesData.price,
    });

    return res.status(200).send({
      message: "Clothes updated successfully",
      data: updatedCloth,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  store,
  update,
  tambahStock,
  kurangStock,
};
