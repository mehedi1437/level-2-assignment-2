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
exports.productServiece = void 0;
const mongodb_1 = require("mongodb");
const product_model_1 = require("./product.model");
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        let query = {};
        const regex = new RegExp(searchTerm, "i");
        query = {
            $or: [{ name: regex }, { category: regex }],
        };
        const result = yield product_model_1.Product.find(query);
        return result;
    }
    else {
        const result = yield product_model_1.Product.find();
        return result;
    }
});
const getSpecificProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: new mongodb_1.ObjectId(productId) });
    return result;
});
const updateAProductFromDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = productData;
    const filter = { _id: new mongodb_1.ObjectId(productId) };
    const option = { upsert: true };
    const updatedProduct = {
        $set: {
            name,
            description,
            price,
            category,
        },
    };
    const result = yield product_model_1.Product.updateOne(filter, updatedProduct, option);
    return result;
});
const deleteAProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: new mongodb_1.ObjectId(productId) };
    const result = yield product_model_1.Product.deleteOne(filter);
    return result;
});
exports.productServiece = {
    createProduct,
    getAllProductFromDB,
    getSpecificProductFromDB,
    updateAProductFromDB,
    deleteAProductFromDB,
};
