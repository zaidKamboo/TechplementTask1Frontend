const express = require("express");
const quotesModel = require("../models/qoutesModel");
const router = express.Router();

router.get("/:page", async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 20;
        const skip = (page - 1) * perPage;

        const quotes = await quotesModel.find().limit(perPage).skip(skip);

        const total = await quotesModel.countDocuments();

        return res.status(200).json({ quotes, total });
    } catch (error) {
        return res.status(500).json({ Err: error.message, error });
    }
});

router.post("/addQuote", async (req, res) => {
    try {
        const { author, quote } = req.body;
        console.log(author, quote);
        if (!author || !quote) {
            return res
                .status(404)
                .json({ message: "Please check the connection." });
        }
        const newQuote = await quotesModel.create({ quote, author });
        console.log(newQuote);
        return res
            .status(200)
            .json({ message: "Added quote successfully.", quote: newQuote });
    } catch (error) {
        return res.status(500).json({ message: error?.message, error });
    }
});

module.exports = router;
