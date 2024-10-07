const Product = require('../models/productModel');
const Category = require('../models/categoryModel')

const createProduct = async (reqdata) => {
    console.log(reqdata, "reqdata");

    // Check for top-level category
    let toplevel = await Category.findOne({ name: reqdata.topLavelCategory });
    console.log(toplevel, "Top Level Category");

    if (!toplevel) {
        toplevel = new Category({
            name: reqdata.topLavelCategory,
            level: 1
        });
        await toplevel.save();
        console.log("Created Top Level Category:", toplevel);
    }

    // Check for second-level category
    let secondlevel = await Category.findOne({
        name: reqdata.secondLavelCategory,
        parentCategory: toplevel._id
    });
    console.log(secondlevel, "Second Level Category");

    if (!secondlevel) {
        secondlevel = new Category({
            name: reqdata.secondLavelCategory,
            parentCategory: toplevel._id,
            level: 2
        });
        await secondlevel.save();
        console.log("Created Second Level Category:", secondlevel);
    }

    // Check for third-level category
    let thirdLevel = await Category.findOne({
        name: reqdata.thirdLavelCategory,
        parentCategory: secondlevel._id
    });
    console.log(thirdLevel, "Third Level Category");

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqdata.thirdLavelCategory,
            parentCategory: secondlevel._id,
            level: 3
        });
        await thirdLevel.save();
        console.log("Created Third Level Category:", thirdLevel);
    }

    // Create the product with the found or created third-level category
    const product = new Product({
        title: reqdata.title,
        color: reqdata.color,
        description: reqdata.description,
        discountedPrice: reqdata.discountedPrice,
        discountedPercent: reqdata.discountPercent,
        imageUrl: reqdata.imageUrl,
        brand: reqdata.brand,
        price: reqdata.price,
        sizes: reqdata.sizes,
        quantity: reqdata.quantity,
        category: thirdLevel._id // Always use the found or created third-level category
    });

    return await product.save();
}


const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

const findProductById = async (productId) => {
    return await Product.findById(productId).populate('category').exec();
};

const getAllProducts = async (reqQuery) => {
    let { category, colors, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

    // Set defaults
    pageSize = parseInt(pageSize) || 0; // Default to 0 to fetch all if not provided
    pageNumber = parseInt(pageNumber) || 1; // Default to 1 if not provided

    const skip = pageSize > 0 ? Math.max((pageNumber - 1) * pageSize, 0) : 0; // Only skip if pageSize is > 0
    let query = Product.find().populate("category");

    // Build query based on filters
    if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { products: [], currentPage: 1, totalPages: 0 };
        }
    }

    // Filter by colors
    if (colors) {
        const colorSet = new Set(colors.split(",").map(color => color.trim().toLowerCase()));
        if (colorSet.size > 0) {
            const colorRegex = new RegExp([...colorSet].join("|"), "i");
            query = query.where("color").regex(colorRegex);
        }
    }

    // Filter by sizes
    if (sizes) {
        const sizeSet = new Set(sizes.split(",").map(size => size.trim()));
        query = query.where("sizes.name").in([...sizeSet]);
    }

    // Filter by price range
    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    // Filter by discount percentage
    if (typeof minDiscount === "number" && minDiscount >= 0) {
        query = query.where("discountedPercent").gte(minDiscount);
    }

    // Filter by stock status
    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }

    // Count total products matching the query
    const totalProduct = await Product.countDocuments(query.getFilter());
    console.log(query.getFilter(), "query.getFilter()");

    // Fetch products (all if pageSize is 0)
    const products = pageSize === 0 ? await query.exec() : await query.skip(skip).limit(pageSize).exec();
    console.log(products.length, "products");

    // Total pages calculation
    const totalPages = pageSize > 0 ? Math.ceil(totalProduct / pageSize) : 1; // Only calculate total pages if pageSize is > 0

    return { products, currentPage: pageNumber, totalPages };
};



const createMultipleProduct = async (products) => {
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
    createMultipleProduct
}