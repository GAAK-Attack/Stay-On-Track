DROP TABLE IF EXISTS users, contacts, engagements CASCADE;

CREATE TYPE status AS ENUM ('pending', 'rejected', 'accepted');

CREATE TABLE users (
  "username" VARCHAR PRIMARY KEY,
  "password" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "interval" INTERVAL
);

CREATE TABLE contacts (
  "contact_id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "company" VARCHAR NOT NULL,
  "email" VARCHAR
);

CREATE TABLE engagements (
  "username" VARCHAR NOT NULL,
  "contact_id" INTEGER NOT NULL,
  "time_created" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "method" VARCHAR NOT NULL,
  "status" status NOT NULL DEFAULT 'pending',
  "notes" VARCHAR,
  PRIMARY KEY (username, contact_id, time_created),
  FOREIGN KEY (username)
    REFERENCES users (username)
    ON DELETE CASCADE,
  FOREIGN KEY (contact_id)
    REFERENCES contacts (contact_id)
    ON DELETE CASCADE
);
