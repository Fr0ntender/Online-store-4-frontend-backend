const mongoose = require('mongoose')

const Product = require('../models/Product')

exports.setUpConnection = () => {
    mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`DB successfully connected`))
        .catch(err => console.log(`Connection error: ${err}`))
}

exports.listProduct = () => Product.find();

exports.findProduct = name => Product.find({ name: { $regex: name, $options: "i" } });

exports.deleteProduct = async id => await Product.deleteOne({ _id: id }, err => { if (err) return err });

exports.createProduct = async data => {
    const product = new Product({
        num: data.num,
        isbn: data.isbn,
        name: data.name,
        vote: data.vote,
        year: data.year,
        price: data.price,
        rating: data.rating,
        imgUrl: data.imgUrl,
        imgName: data.imgName,
        lastName: data.lastName,
        firstName: data.firstName,
    })
    return await product.save()
}

exports.changeProduct = async (id, data) => {
    await Product.updateOne({
        _id: id
    }, {
        $set: {
            num: data.num,
            isbn: data.isbn,
            name: data.name,
            vote: data.vote,
            year: data.year,
            price: data.price,
            rating: data.rating,
            imgUrl: data.imgUrl,
            imgName: data.imgName,
            lastName: data.lastName,
            firstName: data.firstName,
        }
    }, err => { if (err) return err })
}

exports.sortProduct = (state, name) => {
    if (name === 'Name') {
        if (!state) {
            return Product.find({}).sort({ name: -1 })
        } else {
            return Product.find({}).sort({ name: 1 })
        }
    } else {
        if (!state) {
            return Product.find({}).sort({ year: -1 })
        } else {
            return Product.find({}).sort({ year: 1 })
        }
    }
}