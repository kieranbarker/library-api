const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "library.db"));
db.pragma("foreign_keys = ON");

const authors = {
  create: db.prepare(
    "INSERT INTO authors (id, country_id, name) VALUES (:id, :country_id, :name)",
  ),
  find: db.prepare("SELECT id, country_id, name FROM authors"),
  findByCountryId: db.prepare(
    "SELECT id, country_id, name FROM authors WHERE country_id = :country_id",
  ),
  findByPk: db.prepare(
    "SELECT id, country_id, name FROM authors WHERE id = :id",
  ),
  count: db.prepare("SELECT COUNT(*) FROM authors WHERE id = :id").pluck(),
  update: db.prepare(
    "UPDATE authors SET country_id = :country_id, name = :name WHERE id = :id",
  ),
  destroy: db.prepare("DELETE FROM authors WHERE id = :id"),
};

const books = {
  create: db.prepare(
    "INSERT INTO books (id, author_id, genre_id, title) VALUES (:id, :author_id, :genre_id, :title)",
  ),
  find: db.prepare("SELECT id, author_id, genre_id, title FROM books"),
  findByAuthorAndGenreIds: db.prepare(
    "SELECT id, author_id, genre_id, title FROM books WHERE author_id = :author_id AND genre_id = :genre_id",
  ),
  findByAuthorId: db.prepare(
    "SELECT id, author_id, genre_id, title FROM books WHERE author_id = :author_id",
  ),
  findByGenreId: db.prepare(
    "SELECT id, author_id, genre_id, title FROM books WHERE genre_id = :genre_id",
  ),
  findByPk: db.prepare(
    "SELECT id, author_id, genre_id, title FROM books WHERE id = :id",
  ),
  update: db.prepare(
    "UPDATE books SET author_id = :author_id, genre_id = :genre_id, title = :title WHERE id = :id",
  ),
  destroy: db.prepare("DELETE FROM books WHERE id = :id"),
};

const countries = {
  find: db.prepare("SELECT id, name FROM countries"),
  findByPk: db.prepare("SELECT id, name FROM countries WHERE id = :id"),
};

const genres = {
  find: db.prepare("SELECT id, name FROM genres"),
  findByPk: db.prepare("SELECT id, name FROM genres WHERE id = :id"),
};

module.exports = { authors, books, countries, genres };
