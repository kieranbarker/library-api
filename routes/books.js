const express = require("express");
const db = require("../db/db");

const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
  try {
    if (!req.body?.author_id) throw new Error("Missing author_id");
    if (!req.body.genre_id) throw new Error("Missing genre_id");
    if (!req.body.title) throw new Error("Missing title");

    if (!db.authors.count.get({ id: req.body.author_id }))
      throw new Error("Invalid author_id");

    // Hard-coded because they are fixed
    if (![1, 2, 3].includes(req.body.genre_id))
      throw new Error("Invalid genre_id");

    const { lastInsertRowid } = db.books.create.run({
      id: null,
      author_id: req.body.author_id,
      genre_id: req.body.genre_id,
      title: req.body.title,
    });

    const newBook = db.books.findByPk.get({ id: lastInsertRowid });
    res.status(201).set("Location", `/books/${newBook.id}`).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  let books;

  if (req.query.author_id && req.query.genre_id) {
    books = db.books.findByAuthorAndGenreIds.all({
      author_id: req.query.author_id,
      genre_id: req.query.genre_id,
    });
  } else if (req.query.author_id) {
    books = db.books.findByAuthorId.all({ author_id: req.query.author_id });
  } else if (req.query.genre_id) {
    books = db.books.findByGenreId.all({ genre_id: req.query.genre_id });
  } else {
    books = db.books.find.all();
  }

  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = db.books.findByPk.get({ id: req.params.id });

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json(book);
});

router.put("/:id", (req, res) => {
  try {
    if (!req.body?.author_id) throw new Error("Missing author_id");
    if (!req.body.genre_id) throw new Error("Missing genre_id");
    if (!req.body.title) throw new Error("Missing title");

    if (!db.authors.count.get({ id: req.body.author_id }))
      throw new Error("Invalid author_id");

    // Hard-coded because they are fixed
    if (![1, 2, 3].includes(req.body.genre_id))
      throw new Error("Invalid genre_id");

    const updates = {
      id: req.params.id,
      author_id: req.body.author_id,
      genre_id: req.body.genre_id,
      title: req.body.title,
    };

    const { changes } = db.books.update.run(updates);

    if (changes) {
      const updatedBook = db.books.findByPk.get({ id: updates.id });
      res.json(updatedBook);
      return;
    }

    const { lastInsertRowid } = db.books.create.run(updates);
    const newBook = db.books.findByPk.get({ id: lastInsertRowid });
    res.status(201).set("Location", `/books/${newBook.id}`).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  const { changes } = db.books.destroy.run({ id: req.params.id });

  if (!changes) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.status(204).send();
});

router.get("/:id/author", (req, res) => {
  const book = db.books.findByPk.get({ id: req.params.id });

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  const author = db.authors.findByPk.get({ id: book.author_id });
  res.json(author);
});

module.exports = router;
