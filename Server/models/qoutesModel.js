const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema(
    {
        author: {
            type: String,
            require: true,
        },
        quote: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("quote", quoteSchema);
