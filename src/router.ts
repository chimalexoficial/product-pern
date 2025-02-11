import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json('From GET');
})

router.post('/', (req, res) => {
    res.json('From POST');
})

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