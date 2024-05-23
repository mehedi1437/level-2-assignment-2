import { Request, Response } from "express";
import { productServiece } from "./product.serviece";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await productServiece.createProduct(productData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  try {
    const result = await productServiece.getAllProductFromDB(
      searchTerm as string
    );
    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Products fetched successfully!`,
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const getSpeceficProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productServiece.getSpecificProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateAProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const result = await productServiece.updateAProductFromDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteAProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await productServiece.deleteAProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  getSpeceficProductById,
  updateAProductById,
  deleteAProductById,
};
