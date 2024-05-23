import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

// Define the schema for Order
const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Create the Order model
export const Order = model<TOrder>("Order", OrderSchema);
