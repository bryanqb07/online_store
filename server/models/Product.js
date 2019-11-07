const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: false
    }
});

ProductSchema.statics.updateProductCategory = (productId, categoryId) => {
    const Product = mongoose.model("product");
    const Category = mongoose.model("category");

    // delete product from old category
    return Product.findById(productId).then(product => {
        if (product.category){
            Category.findById(product.category).then(oldcategory => {
                oldcategory.products.pull(product);
                return oldcategory.save();
            })
        }
        // find the category and push product, then update product's category
        return Category.findById(categoryId).then(newCategory => {
            product.category = newCategory;
            newCategory.products.push(product);

            return Promise.all([product.save(), newCategory.save()]).then(
                ([product, newCategory]) => product
            );
        });
    });
}

module.exports = mongoose.model("product", ProductSchema);