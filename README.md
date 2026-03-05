# Library API

A simple JSON Data API for a library. [**This is not a REST API!**](https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/)

## Authors

### `POST /authors`

Creates a new author with the given `name` and `country_id`.

### `GET /authors`

Returns all authors, optionally filtered by `country_id`.

### `GET /authors/:id`

Returns the author with the given `id`.

### `PUT /authors/:id`

Replaces the author with the given `id`.

### `DELETE /authors/:id`

Deletes the author with the given `id`.

### `GET /authors/:id/books`

Returns all books written by the author with the given `id`.

## Books

### `POST /books`

Creates a new book with the given `title`, `author_id`, and `genre_id`.

### `GET /books`

Returns all books, optionally filtered by `author_id`, `genre_id`, or both.

### `GET /books/:id`

Returns the book with the given `id`.

### `PUT /books/:id`

Replaces the book with the given `id`.

### `DELETE /books/:id`

Deletes the book with the given `id`.

### `GET /books/:id/author`

Returns the author who wrote the book with the given `id`.

## Countries

### `GET /countries`

Returns all countries.

### `GET /countries/:id`

Returns the country with the given ID.

## Genres

### `GET /genres`

Returns all genres.

### `GET /genres/:id`

Returns the genre with the given ID.
