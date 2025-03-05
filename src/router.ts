import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('Product name can not be empty'),
    body('price')
        .isNumeric().withMessage('Value is not valid')
        .notEmpty().withMessage('Product price can not be empty')
        .custom(value => value > 0).withMessage('Price is not valid'),
    handleInputErrors,
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('ID is not valid'),
    body('name')
        .notEmpty().withMessage('Product name can not be empty'),
    body('price')
        .isNumeric().withMessage('Value is not valid')
        .notEmpty().withMessage('Product price can not be empty')
        .custom(value => value > 0).withMessage('Price is not valid'),
    body('availability')
        .isBoolean().withMessage('Value for availability is not valid'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors,
    deleteProduct
)

export default router