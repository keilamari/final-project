-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  image VARCHAR(255),
  sports INTEGER[]
);


DROP TABLE IF EXISTS sports CASCADE;

CREATE TABLE sports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255)
);

DROP TABLE IF EXISTS teams CASCADE;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sport_id INTEGER REFERENCES sports(id) ON DELETE CASCADE,
  image_url VARCHAR(255)
);

DROP TABLE IF EXISTS team_member CASCADE;

CREATE TABLE team_member (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  team_id INTEGER REFERENCES teams(id)
);

DROP TABLE IF EXISTS tournaments CASCADE;

CREATE TABLE tournaments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sport_id INTEGER REFERENCES sports(id) NOT NULL,
  number_of_players INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  number_of_matches INTEGER
);

DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE matches(
  id SERIAL PRIMARY KEY,
  tournament_id INTEGER REFERENCES tournaments(id),
  sport_id INTEGER REFERENCES sports(id) NOT NULL,
  match_date DATE DEFAULT now(), 
  match_location VARCHAR(255) NOT NULL 

);

DROP TABLE IF EXISTS match_player CASCADE;

CREATE TABLE match_player (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  match_id INTEGER REFERENCES matches(id) NOT NULL,
  win BOOLEAN
);

DROP TABLE IF EXISTS user_sport CASCADE;

CREATE TABLE user_sport(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  sport_id INTEGER REFERENCES sports(id) NOT NULL  
);

DROP TABLE IF EXISTS match_team CASCADE;

CREATE TABLE match_team (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id) NOT NULL,
  match_id INTEGER REFERENCES matches(id) NOT NULL,
  win BOOLEAN
);

DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message_to INTEGER REFERENCES users(id),
  message_text VARCHAR(255) NOT NULL,
  message_from INTEGER REFERENCES users(id)
);