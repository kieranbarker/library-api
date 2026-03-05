const express = require("express");
const db = require("../db/db");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  const genres = db.genres.find.all();
  res.json(genres);
});

router.get("/:id", (req, res) => {
  const genre = db.genres.findByPk.get({ id: req.params.id });

  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  res.json(genre);
});

module.exports = router;
