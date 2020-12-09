CREATE TABLE words (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  definition VARCHAR(255) NOT NULL,
  function VARCHAR(255) NOT NULL
);

INSERT INTO words (name, definition, function)
VALUES  ('barter', 'exchange goods without involving money', 'verb')
VALUES  ('wistful', 'vaguely longing, sadly thoughtful', 'adjective')
VALUES  ('contrived', 'artificial; labored', 'adjective')
VALUES  ('balk', 'refuse to proceed or to do something', 'verb')
VALUES  ('vacilitate', 'fluctuating, wavering', 'intransitive verb');