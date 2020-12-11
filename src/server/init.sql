CREATE DATABASE wordful;

CREATE TABLE words (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  definition VARCHAR(255) NOT NULL,
  function VARCHAR(255) NOT NULL
);

INSERT INTO words (name, definition, function)
VALUES  ('barter', 'exchange goods without involving money', 'verb');
INSERT INTO words (name, definition, function)
VALUES  ('wistful', 'vaguely longing, sadly thoughtful', 'adjective');
INSERT INTO words (name, definition, function)
VALUES  ('contrived', 'artificial; labored', 'adjective');
INSERT INTO words (name, definition, function)
VALUES  ('balk', 'refuse to proceed or to do something', 'verb');
INSERT INTO words (name, definition, function)
VALUES  ('vacilitate', 'fluctuating, wavering', 'intransitive verb');

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (email)
VALUES  ('samuelwjlee@gmail.com');

CREATE TABLE user_words (
  ID SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  words_id VARCHAR(255) NOT NULL
);

INSERT INTO user_words (user_id, words_id)
VALUES  ('samuelwjlee@gmail.com', 1);
INSERT INTO user_words (user_id, words_id)
VALUES  ('samuelwjlee@gmail.com', 2);