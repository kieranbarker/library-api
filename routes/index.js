const express = require("express");
const router = express.Router();

router.use("/authors", require("./authors"));
router.use("/books", require("./books"));
router.use("/countries", require("./countries"));
router.use("/genres", require("./genres"));

router.get("/", (req, res) => {
  res.json({
    authors: "/authors",
    books: "/books",
    countries: "/countries",
    genres: "/genres",
  });
});

module.exports = router;
