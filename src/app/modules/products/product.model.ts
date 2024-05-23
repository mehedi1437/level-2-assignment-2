import  { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';


const VariantSchema = new Schema<TVariant>({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

// Define the schema for Inventory
const InventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
});
const productSchema =  new Schema<TProduct>({
    
   
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        },
        variants: {
            type: [VariantSchema],
            required: true
        },
        inventory: {
            type: InventorySchema,
            required: true
        }
   
});

export const  Product = model<TProduct>('Product', productSchema);