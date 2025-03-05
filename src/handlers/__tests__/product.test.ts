import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    // test if we send an empty object as body
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    // test cases for price field in product
    it('should validate price greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Curved Monitor',
            price: 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('should validate price isa number & greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Curved Monitor',
            price: 'String'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
    })


    // test for creating a new product
    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            "name": "Wireless - Testing",
            "price": 45
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(401);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');



    })
})

describe('GET /api/products', () => {
    it('checking it URL exists', async() => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    })

    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');

        // !
        expect(response.body).not.toHaveProperty('errors');
    })
})

describe('GET /api/products/:id', () => {
    it('should return 404 if product does not exists', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Trying to get the product? Product not found with ID requested :(');
    })

    it('should return 400 if ID is different than a number', async () => {
        const response = await request(server).get('/api/products/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID not valid, insert a number');
    })

    it('should get a JSON response if product exists', async () => {
        const response = await request(server).get('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    })
})