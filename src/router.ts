import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { check, validationResult, body, param } from "express-validator";
import { handleInputErrors } from "./middleware";



const router = Router();

// GET ALL PRODUCTS
router.get('/', getProducts);

// GET PRODUCT BY ID
router.get('/:id',
    param('id')
        .isInt().withMessage('ID not valid, insert a number'),
    handleInputErrors,
    getProductById);

// CREATE ONE PRODUCT
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


// UPDATE A PRODUCT

router.put('/:id',
    param('id')
        .isInt().withMessage('ID not valid, insert a number'),
    body('name')
        .notEmpty()
        .withMessage('Product name can not be empty'),
    body('price')
        .isNumeric().withMessage('Should be a number')
        .notEmpty().withMessage('Price quantity can not be empty')
        .custom(value => value > 0).withMessage('Price not valid'),
    body('availability')
        .isBoolean().withMessage('Value for availability is not valid'),
    handleInputErrors,
    updateProduct);

router.patch('/:id',
    param('id')
        .isInt().withMessage('ID not valid, insert a number'),
    handleInputErrors,
    updateAvailability);

router.delete('/:id',
    param('id')
        .isInt().withMessage('ID not valid, insert a number'),
    handleInputErrors,
    deleteProduct);

export default router;