import { Request, Response } from "express"
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [[
                'price', 'DESC'
            ]]
        });
        res.json({
            data: products
        })
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({
                error: 'Trying to get the product? Product not found with ID requested :('
            })
            return;
        }
        res.json({ data: product });

    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {

    const product = await Product.create(req.body);

    res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: 'Trying to update? Product not found with ID requested :('
        })
        return;
    }

    // TO UPDATE
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: 'Trying to update? Product not found with ID requested :('
        })
        return;
    }

    // TO UPDATE
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
}

// TO DELETE
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: 'Trying to delete? Product not found with ID requested :('
        })
        return;
    }

    await product.destroy();
    res.json({data: 'Product removed'});

}



