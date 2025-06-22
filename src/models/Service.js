import mongoose from 'mongoose';
import slugify from 'slugify';

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

// Автоматическая генерация/обновление slug при сохранении/обновлении
serviceSchema.pre('save', function(next) {
    if (this.isModified('text')) {
        this.slug = slugify(this.text, { lower: true, strict: true, locale: 'ru' });
    }
    next();
});

serviceSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.text) {
        update.slug = slugify(update.text, { lower: true, strict: true, locale: 'ru' });
        this.setUpdate(update);
    }
    next();
});

export default mongoose.model('Service', serviceSchema);