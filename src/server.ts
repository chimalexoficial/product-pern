import express from 'express' 
import colors from 'colors'
import router  from './router'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue( 'Connected to DB :)'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold('There was an error connecting to DB'))
    }
}

connectDB();

const server = express()

// Read data form
server.use(express.json())

server.use('/api/products', router)

// Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server