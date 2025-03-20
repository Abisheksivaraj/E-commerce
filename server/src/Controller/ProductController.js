const productService = require("../Services/ProductService");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllProducts = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getAllProducts(req.query);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createMultipleProducts = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.createMultipleProducts(req.body);
    return res.status(201).send({ message: "products Created Successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createMultipleProducts,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  createProduct,
};
