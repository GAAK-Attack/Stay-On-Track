TRUNCATE users, contacts, engagements RESTART IDENTITY CASCADE;

-- users table has username, password, first_name, last_name, interval
INSERT INTO users (username, password, first_name, last_name) VALUES
  ('brucealexandernance', 'gaak', 'Alex', 'Nance'),
  ('alvincheng', 'attack', 'Alvin', 'Cheng'),
  ('garrettweaver', 'GAAK', 'Garrett', 'Weaver'),
  ('keithlisiak', 'ATTACK', 'Keith', 'Lisiak');

-- contacts table has contact_id, first_name, last_name, company, email
INSERT INTO contacts (first_name, last_name, company, email) VALUES
  ('Mark', 'Zuckerberg', 'Facebook', 'mark.zuckerberg@facebook.com'),
  ('Jeff', 'Bezos', 'Amazon', 'jeff.bezos@amazon.com'),
  ('Tim', 'Cook', 'Apple', 'tim.cook@apple.com'),
  ('Reed', 'Hastings', 'Netflix', NULL),
  ('Sundar', 'Pichai', 'Google', NULL),
  ('Bill', 'Gates', 'Microsoft', NULL);

-- engagements table has username, contact_id, time_created, method, status, notes
INSERT INTO engagements (username, contact_id, method, notes) VALUES
  ('brucealexandernance', 1, 'email', 'emailed mark.zuckerberg@facebook.com'),
  ('alvincheng', 4, 'looked up phone number on google and called Sundar Pichai', 'did it yesterday'),
  ('garrettweaver', 2, 'LinkedIn messaged Jeff Bezos', NULL),
  ('keithlisiak', 5, 'emailed sundar.pichai@google.com', NULL);
