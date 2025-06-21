const mongoose = require('mongoose');

const articleSectionSchema = new mongoose.Schema({
    heading: String,
    text: String,
    list: [String]
}, { _id: false });

const articleSchema = new mongoose.Schema({
    title: String,
    content: [articleSectionSchema]
}, { _id: false });

const serviceSchema = new mongoose.Schema({
    category: { type: String, required: true },
    cost: { type: Number, required: true },
    text: { type: String, required: true },
    article: articleSchema,
    slug: { type: String, unique: true, sparse: true }, // Уникальный slug для SEO
});

module.exports = mongoose.model('Service', serviceSchema);