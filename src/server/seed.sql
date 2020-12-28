-- start fresh before seeding
DROP TABLE words;
DROP TABLE users;
DROP TABLE user_words;

CREATE TABLE IF NOT EXISTS words (
  ID SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
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

CREATE TABLE IF NOT EXISTS users (
  ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL
);

INSERT INTO users (email)
VALUES  ('samuelwjlee@gmail.com');

CREATE TABLE IF NOT EXISTS  user_words (
  ID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  words_id INT NOT NULL
);

INSERT INTO user_words (user_id, words_id)
VALUES  ('samuelwjlee@gmail.com', 1);
INSERT INTO user_words (user_id, words_id)
VALUES  ('samuelwjlee@gmail.com', 2);
