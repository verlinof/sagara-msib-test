const models = require("../models");
const bcryptjs = require("bcryptjs");
const Validator = require("fastest-validator");

async function index(req, res) {
  try {
    // const { color, size, stock, isEmpty } = req.query; // Ambil query parameter untuk filter

    // // Buat kondisi tambahan berdasarkan query parameter yang diberikan
    // let whereClause = "";
    // const replacements = {};

    // if (color) {
    //   whereClause += " AND `clothes`.`color` = :color";
    //   replacements.color = color;
    // }

    // if (size) {
    //   whereClause += " AND `Inventories`.`size` = :size";
    //   replacements.size = size;
    // }

    // if (stock) {
    //   whereClause += " AND `Inventories`.`stock` <= :stock";
    //   replacements.stock = stock;
    // }

    // if (isEmpty) {
    //   whereClause += " AND `Inventories`.`stock` = 0";
    // }

    // const [clothes] = await models.sequelize.query(
    //   `SELECT
    //       \`clothes\`.\`id\`,
    //       \`clothes\`.\`name\`,
    //       \`clothes\`.\`color\`,
    //       \`clothes\`.\`price\`,
    //       \`Inventories\`.\`size\`,
    //       \`Inventories\`.\`stock\`
    //   FROM \`Clothes\`
    //   JOIN \`Inventories\` ON \`Clothes\`.\`id\` = \`Inventories\`.\`clothesId\`
    //   WHERE 1=1 ${whereClause};`,
    //   { replacements }
    // );

    // const clothes = await models.Clothes.findAll({
    //   include: ["inventory"],
    // });

    const { color, size, stock, isEmpty } = req.query; // Ambil query parameter untuk filter

    // Buat kondisi tambahan berdasarkan query parameter yang diberikan
    const whereClause = {};
    const inventoryWhereClause = {};

    if (color) {
      whereClause.color = color;
    }

    if (size) {
      inventoryWhereClause.size = size;
    }

    if (stock) {
      inventoryWhereClause.stock = {
        [models.Sequelize.Op.lte]: stock,
      };
    }

    if (isEmpty) {
      inventoryWhereClause.stock = 0;
    }

    const clothes = await models.Clothes.findAll({
      where: whereClause,
      include: [
        {
          model: models.Inventory,
          as: "inventory",
          where: inventoryWhereClause,
        },
      ],
    });

    return res.status(200).send({
      message: "Clothes fetched successfully",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function show(req, res) {
  try {
    const clothes = await models.Clothes.findByPk(req.params.clothesId, {
      include: ["inventory"],
    });
    if (!clothes) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }
    return res.status(200).send({
      message: "Clothes fetched successfully",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function store(req, res) {
  try {
    const { name, color, price, size, stock } = req.body;
    const clothesData = {
      name,
      color,
      price,
      size,
      stock,
    };

    //Validate input
    const validator = new Validator();
    const validationResponse = await validator.validate(clothesData, {
      name: { type: "string", optional: false },
      color: { type: "string", optional: false },
      price: { type: "number", optional: false },
      size: {
        type: "array",
        items: "string",
        optional: true,
        ENUM: ["XS", "S", "M", "L", "XL"],
      },
      stock: { type: "array", items: "number", optional: true },
    });

    console.log(validationResponse);

    if (validationResponse !== true) {
      return res.status(400).send({
        message: validationResponse,
      });
    }

    //Storing data
    const clothes = await models.Clothes.create({
      name: clothesData.name,
      color: clothesData.color,
      price: clothesData.price,
    });
    if (clothesData.size && clothesData.stock) {
      for (let i = 0; i < clothesData.size.length; i++) {
        const inventory = await models.Inventory.create({
          clothesId: clothes.id,
          size: clothesData.size[i],
          stock: clothesData.stock[i],
        });
      }
    }

    return res.status(201).send({
      message: "Clothes created successfully",
      data: clothes,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { name, color, price } = req.body;
    const clothesData = {
      name,
      color,
      price,
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

async function destroy(req, res) {
  try {
    const clothes = await models.Clothes.findByPk(req.params.clothesId);
    if (!clothes) {
      return res.status(404).send({
        message: "Clothes not found",
      });
    }
    await clothes.destroy();

    const inventories = await models.Inventory.findAll({
      where: { clothesId: req.params.clothesId },
    });
    for (let i = 0; i < inventories.length; i++) {
      await inventories[i].destroy();
    }

    return res.status(200).send({
      message: "Clothes deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
