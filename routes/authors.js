const express = require("express");
const db = require("../db/db");

const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
  try {
    if (!req.body?.country_id) throw new Error("Missing country_id");
    if (!req.body.name) throw new Error("Missing name");

    // Hard-coded because they are fixed
    if (req.body.country_id != 1 && req.body.country_id != 2)
      throw new Error("Invalid country_id");

    const { lastInsertRowid } = db.authors.create.run({
      id: null,
      country_id: req.body.country_id,
      name: req.body.name,
    });

    const newAuthor = db.authors.findByPk.get({ id: lastInsertRowid });
    res.status(201).set("Location", `/authors/${newAuthor.id}`).json(newAuthor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  let authors;

  if (req.query.country_id) {
    authors = db.authors.findByCountryId.all({
      country_id: req.query.country_id,
    });
  } else {
    authors = db.authors.find.all();
  }

  res.json(authors);
});

router.get("/:id", (req, res) => {
  const author = db.authors.findByPk.get({ id: req.params.id });

  if (!author) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  res.json(author);
});

router.put("/:id", (req, res) => {
  try {
    if (!req.body?.country_id) throw new Error("Missing country_id");
    if (!req.body.name) throw new Error("Missing name");

    // Hard-coded because they are fixed
    if (req.body.country_id != 1 && req.body.country_id != 2)
      throw new Error("Invalid country_id");

    const updates = {
      id: req.params.id,
      country_id: req.body.country_id,
      name: req.body.name,
    };

    const { changes } = db.authors.update.run(updates);

    if (changes) {
      const updatedAuthor = db.authors.findByPk.get({ id: updates.id });
      res.json(updatedAuthor);
      return;
    }

    const { lastInsertRowid } = db.authors.create.run(updates);
    const newAuthor = db.authors.findByPk.get({ id: lastInsertRowid });
    res.status(201).set("Location", `/authors/${newAuthor.id}`).json(newAuthor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const { changes } = db.authors.destroy.run({ id: req.params.id });

  if (!changes) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  res.status(204).send();
});

router.get("/:id/books", (req, res) => {
  const author = db.authors.findByPk.get({ id: req.params.id });

  if (!author) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  const books = db.books.findByAuthorId.all({ author_id: author.id });
  res.json(books);
});

module.exports = router;
