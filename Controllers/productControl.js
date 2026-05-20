import Product from "../models/product.js";
import { isAdmin } from "./userControl.js";
export async function createProduct(req ,res){
    try{
         if(isAdmin(req)){
            const product = new Product(req.body)
            await product.save()
            res.json({
                message: "Product saved successfully"
            });
         }else{
            res.status(403).json({ message: "You need to login as an admin to create a product" });
         }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
export async function getAllProducts(req ,res){
    try{
         if(isAdmin(req)){
            const products = await Product.find()
            res.json(products);
         }else{
            const products = await Product.find({ isAvailable: true })
            res.json(products);
         }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function deleteProduct(req ,res){  
    try{
        const productID = req.params.x
        if(isAdmin(req)){
            const product = await Product.findOne({productID : productID})
            if(product == null){
                res.status(404).json({ message: "Product does not exist" });
                return;
            }
            await Product.findOneAndDelete({productID : productID})
            res.json({
                message: "Product deleted successfully"
            });
        }else{
            res.status(403).json({ message: "You need to login as an admin to delete a product" });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function updateProduct(req ,res){
    try{
        const productID = req.params.x
        if(isAdmin(req)){
            const product = await Product.findOne({productID : productID})
            if(product == null){
                res.status(404).json({ message: "Product does not exist" });
                return;
            }
            await Product.findOneAndUpdate({productID : productID} , req.body)
            res.json({
                message: "Product updated successfully"
            });
        }else{
            res.status(403).json({ message: "You need to login as an admin to update a product" });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getProductByID(req ,res){
    try{
        const productID = req.params.x
        const product = await Product.findOne({productID : productID})
        if(product == null){
            res.status(404).json({ message: "Product does not exist" });
            return;
        }
        if(product.isAvailable){
            res.json(product);
        }else{
            if(isAdmin(req)){
                res.json(product);
            }else{
            res.status(403).json({ message: "This product is not available" });
        }
    }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}