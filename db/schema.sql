CREATE TABLE countries (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  country_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries (id)
);

CREATE TABLE genres (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  author_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors (id)
  FOREIGN KEY (genre_id) REFERENCES genres (id)
);
