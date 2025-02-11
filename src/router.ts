import { Router } from "express";
import { createProduct } from "./handlers/product";
import { check, validationResult, body } from "express-validator";
import { handleInputErrors } from "./middleware";



const router = Router();

router.get('/', (req, res) => {
    res.json('From GET');
})

router.post('/',
    //validation
    body('name')
        .notEmpty()
        .withMessage('Product name can not be empty'),
    body('price')
        .isNumeric().withMessage('Should be a number')
        .notEmpty().withMessage('Price quantity can not be empty')
        .custom(value => value > 0).withMessage('Price not valid'),
    handleInputErrors,
    createProduct);

router.put('/', (req, res) => {
    res.json('From put');
})

router.patch('/', (req, res) => {
    res.json('From patch');
})

router.delete('/', (req, res) => {
    res.json('From delete');
})

export default router;