INSERT INTO countries
  (id, name)
VALUES
  (1, 'United Kingdom'),
  (2, 'United States');

INSERT INTO authors
  (id, country_id, name)
VALUES
  (1, 1, 'J.K. Rowling'),
  (2, 1, 'J. R. R. Tolkien'),
  (3, 2, 'Suzanne Collins'),
  (4, 2, 'Stephenie Meyer');

INSERT INTO genres
  (id, name)
VALUES
  (1, 'Fantasy'),
  (2, 'Dystopian'),
  (3, 'Romance');

INSERT INTO books
  (id, author_id, genre_id, title)
VALUES
  (1, 1, 1, 'The Philosopher''s Stone'),
  (2, 1, 1, 'The Chamber of Secrets'),
  (3, 1, 1, 'The Prisoner of Azkaban'),
  (4, 1, 1, 'The Goblet of Fire'),
  (5, 1, 1, 'The Order of the Phoenix'),
  (6, 1, 1, 'The Half-Blood Prince'),
  (7, 1, 1, 'The Deathly Hallows'),
  (8, 2, 1, 'The Fellowship of the Ring'),
  (9, 2, 1, 'The Two Towers'),
  (10, 2, 1, 'The Return of the King'),
  (11, 3, 2, 'The Hunger Games'),
  (12, 3, 2, 'Catching Fire'),
  (13, 3, 2, 'Mockingjay'),
  (14, 4, 3, 'Twilight'),
  (15, 4, 3, 'New Moon'),
  (16, 4, 3, 'Eclipse'),
  (17, 4, 3, 'Breaking Dawn');