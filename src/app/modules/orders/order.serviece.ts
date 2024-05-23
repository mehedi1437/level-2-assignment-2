import { ObjectId } from "mongodb";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};
const getAllOrderFromDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email: email });
    return result;
  } else {
    const result = await Order.find();
    return result;
  }
};

export const orderServices = {
  createOrderToDB,
  getAllOrderFromDB,
  // getOrderFromDBByEmail
};
