import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProduct = async (req, res) => {
  const {
    name,
    quantitySold,
    purchasePrice,
    sellingPrice,
    category,
    margin,
    totalSoldPerUnit,
    quantityInStock,
    criticalStockLevel,
    icon,

    totalMarginPerUnit,
  } = req.body;

  const user = req.user;

  try {
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only Admins can access this route" });
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        icon: icon,
        quantitySold: quantitySold || 0,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        category: category || "BOISSON_CHAUDE",
        margin: margin || 0,
        totalSoldPerUnit: totalSoldPerUnit || 0,
        quantityInStock: quantityInStock || 0,
        criticalStockLevel: criticalStockLevel || 0,

        totalMarginPerUnit: totalMarginPerUnit || 0,
        user: user.id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const get_product = async (req, res) => {
  try {
    const response = await prisma.product.findMany({
      include: {
        User: {
          select: {
            personal_info: true,
          },
        },
      },
    });

    if (!response) {
      return res.status(403).json({ message: "No product found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting to the route",
      success: false,
      error: error.message,
    });
  }
};

export const update_product = async (req, res) => {
  const Category = {
    BOISSON_CHAUDE: "BOISSON_CHAUDE",
    BOISSON_FROIDE: "BOISSON_FROIDE",
    SUCRE: "SUCRE",
    DIVERS: "DIVERS",
  };
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only Admins can access this route" });
    }

    const {
      name,
      quantitySold,
      purchasePrice,
      sellingPrice,
      category,
      margin,
      totalSoldPerUnit,
      quantityInStock,
      criticalStockLevel,
      icon,
      totalMarginPerUnit,
    } = req.body;

    // Validate the category value
    if (!Object.values(Category).includes(category)) {
      return res
        .status(400)
        .json({ message: "Invalid category value", success: false });
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name,
        icon: icon,
        quantitySold: quantitySold,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        category: category,
        margin: margin,
        totalSoldPerUnit: totalSoldPerUnit,
        quantityInStock: quantityInStock,
        criticalStockLevel: criticalStockLevel,

        totalMarginPerUnit: totalMarginPerUnit,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(`Failed to update product: ${error}`);
    res.status(500).json({
      message: "An error occurred while getting to the route",
      success: false,
      error: error.message,
    });
  }
};
