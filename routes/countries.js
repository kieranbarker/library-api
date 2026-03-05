const express = require("express");
const db = require("../db/db");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  const countries = db.countries.find.all();
  res.json(countries);
});

router.get("/:id", (req, res) => {
  const country = db.countries.findByPk.get({ id: req.params.id });

  if (!country) {
    res.status(404).json({ error: "Country not found" });
    return;
  }

  res.json(country);
});

module.exports = router;
