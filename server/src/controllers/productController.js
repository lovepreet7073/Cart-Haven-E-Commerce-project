const productService = require('../Services/productService');


const createProduct = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
     const { data } = req.body;
     if (!data) {
         return res.status(400).send({ error: 'Request body data is required.' });
     }

     const product = await productService.createProduct(data);

     return res.status(201).send(product);
    } catch (error) {
        console.log(error,"error")
        return res.status(500).send({ error: error.message })
    }
}
const deleteProduct = async (req, res) => {

    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const updateProduct = async (req, res) => {

    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const findProductById = async (req, res) => {

    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const getAllProducts = async (req, res) => {

    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const createMutipleProducts = async (req, res) => {

    const productId = req.params.id;
    try {
        const product = await productService.findProductById(req.body);
        return res.status(201).send({message:"Products created Successfully"})
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMutipleProducts
}