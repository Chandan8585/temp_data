const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/categories');
const products = require('../data/product'); // your raw product data
require('dotenv').config();

const MONGODB_URI_MAIN = process.env.MONGODB_URI;

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI_MAIN);

    // Fetch all categories and map by key
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.key] = cat._id;
    });

    // Replace product category (string) with ObjectId
    const updatedProducts = products.map(product => {
      const categoryId = categoryMap[product.category];
      if (!categoryId) {
        throw new Error(`Category not found for key: ${product.category}`);
      }
      return {
        ...product,
        category: categoryId
      };
    });

    await Product.deleteMany({});
    await Product.insertMany(updatedProducts);

    console.log('✅ Products seeded successfully with category ObjectIds!');
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
