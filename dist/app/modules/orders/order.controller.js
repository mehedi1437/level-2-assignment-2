"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_serviece_1 = require("./order.serviece");
const product_model_1 = require("../products/product.model");
const mongodb_1 = require("mongodb");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const productId = orderData.productId;
        // Check if the product exists
        const product = yield product_model_1.Product.findOne({ _id: new mongodb_1.ObjectId(productId) });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        const result = yield order_serviece_1.orderServices.createOrderToDB(orderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
const getAllOrderData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const result = yield order_serviece_1.orderServices.getAllOrderFromDB(email);
        if (email) {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrderData,
};
