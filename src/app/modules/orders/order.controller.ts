import { Request, Response } from "express";
import { orderServices } from "./order.serviece";
import { Product } from "../products/product.model";
import { ObjectId } from "mongodb";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const productId = orderData.productId;
     // Check if the product exists
     const product = await Product.findOne({ _id: new ObjectId(productId) });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }
    const result = await orderServices.createOrderToDB(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};
const getAllOrderData = async (req: Request, res: Response) => {
  const {email}= req.query
  try {
   
    const result = await orderServices.getAllOrderFromDB(email as string);
   if(email){
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
    });
    
   }
   else{
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
   }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrderData,
};
