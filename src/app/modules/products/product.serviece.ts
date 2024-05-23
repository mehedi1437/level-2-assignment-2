import { ObjectId } from "mongodb";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductFromDB = async (searchTerm: string) => {
  if (searchTerm) {
    let query = {};
    const regex = new RegExp(searchTerm, "i");
    query = {
      $or: [{ name: regex }, { category: regex }],
    };
    const result = await Product.find(query);
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const getSpecificProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: new ObjectId(productId) });
  return result;
};
const updateAProductFromDB = async (
  productId: string,
  productData: TProduct
) => {
  const { name, description, price, category } = productData;
  const filter = { _id: new ObjectId(productId) };
  const option = { upsert: true };
  const updatedProduct = {
    $set: {
      name,
      description,
      price,
      category,
    },
  };
  const result = await Product.updateOne(filter, updatedProduct, option);
  return result;
};
const deleteAProductFromDB = async (productId: string) => {
  const filter = { _id: new ObjectId(productId) };
  const result = await Product.deleteOne(filter);
  return result;
};

export const productServiece = {
  createProduct,
  getAllProductFromDB,
  getSpecificProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDB,
};
