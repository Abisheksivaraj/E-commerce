const Category = require("../models/CategoryModals");
const Products = require("../models/ProductModals");

async function createProduct(reqData) {
  // Find or create top-level category
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    })
    await topLevel.save();
  }

  // Find or create second-level category
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    })
    await secondLevel.save();
  }

  // Find or create third-level category
  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    })
    await thirdLevel.save();
  }

  // Create the product
  const product = new Products({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    color: reqData.color,
    size: reqData.size,
    image: reqData.image,
    category: thirdLevel._id,
    brand: reqData.brand,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    quantity: reqData.quantity,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await Products.findByIdAndDelete(productId);
  return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
  const updatedProduct = await Products.findByIdAndUpdate(productId, reqData, {
    new: true,
  });
  if (!updatedProduct) {
    throw new Error("Product not found");
  }
  return updatedProduct;
}

async function findProductById(id) {
  const product = await Products.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not found: " + id);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    search,
    pageNumber = 1,
    pageSize = 10,
  } = reqQuery;

  let query = Products.find().populate("category");

  // Filter by category
  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Filter by color
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  // Filter by size
  if (sizes) {
    const sizesSet = new Set(sizes.split(",").map((size) => size.trim()));
    query = query.where("size").in([...sizesSet]);
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  // Filter by minimum discount
  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  // Filter by stock
  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gte(1);
    }
  }

  // Search filter (by title, brand, color, or price)
  if (search) {
    query = query.or([
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { color: { $regex: search, $options: "i" } },
      { discountedPrice: !isNaN(Number(search)) ? Number(search) : undefined },
    ]);
  }

  // Sorting
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Pagination
  const totalProducts = await Products.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);
  return { content: products, currentPage: pageNumber, totalPages };
}


async function createMultipleProducts(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
