import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

router.get('/', getProducts)
/**
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: product identifier
 *                      example: 1
 * 
 *                  name: 
 *                      type: string
 *                      description: product name
 *                      example: Wireless Mouse 7000 dpi
 * 
 *                  price:
 *                      type: number
 *                      description: product price
 *                      example: 200
 * 
 *                  availability:
 *                      type: boolean
 *                      description: is on stock?
 *                      example: true
 * 
 */

/**
 * 
 * @swagger
 * /api/products:
 *      get: 
 *          summary: Get a list of all products
 *          tags:
 *              - Products
 *          description: Return a list of all products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */


// PRODUCTS WITH ID

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a single product by ID
 *      tags:
 *          - Products
 *      description: Return a single product based on it's unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product to look up
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 * 
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request / Invalid ID
 * 
 */

router.get('/:id',
    param('id').isInt().withMessage('ID is not valid'),
    handleInputErrors,
    getProductById
)


/**
 * @swagger
 * /api/products/:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new product in database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Curved Monitor 26 inches
 *                          price:
 *                              type: number
 *                              example: 349
 *      responses:
 *          201:
 *                  description: Product created :)
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request, invalid input
 */

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


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates an existing product in database
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of the product to look up
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Curved Monitor 26 inches
 *                          price:
 *                              type: number
 *                              example: 349
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: succesful response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *
 *          400:
 *              description: Bad request - invalid id or invalid input data
 * 
 *
 *          404:
 *              description: Product not found
 * 
 */

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