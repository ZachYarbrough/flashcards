const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
    {
        initialText: {
            type: String,
            required: true,
            trim: true
        },
        revealText: {
            type: String,
            required: true,
            trim: true
        },
        resources: {
            type: String,
            trim: true,
        },
        topics: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        versionKey: false
    }
);

const Card = model('Card', cardSchema);

module.exports = Card;
