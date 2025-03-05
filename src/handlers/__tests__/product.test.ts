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