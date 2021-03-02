TRUNCATE users, contacts, engagements RESTART IDENTITY CASCADE;

-- users table has username, password, first_name, last_name, interval
INSERT INTO users (username, password, first_name, last_name) VALUES
  ('brucealexandernance', 'gaak', 'Alex', 'Nance'),
  ('alvincheng', 'attack', 'Alvin', 'Cheng'),
  ('garrettweaver', 'GAAK', 'Garrett', 'Weaver'),
  ('keithlisiak', 'ATTACK', 'Keith', 'Lisiak');

-- contacts table has contact_id, first_name, last_name, company, email
INSERT INTO contacts (first_name, last_name, company, email) VALUES
  ('Jeff', 'Bezos', 'Amazon', 'jeff.bezos@amazon.com'),
  ('Reed', 'Hastings', 'Netflix', 'reed.hastings@netflix.com'),
  ('Bill', 'Gates', 'Microsoft', 'bill.gates@microsoft.com');

INSERT INTO contacts (first_name, last_name, company) VALUES
  ('Mark', 'Zuckerberg', 'Facebook'),
  ('Tim', 'Cook', 'Apple'),
  ('Sundar', 'Pichai', 'Google');

-- engagements table has username, contact_id, time_created, method, status, notes
INSERT INTO engagements (username, contact_id, method, notes) VALUES
  ('garrettweaver', 5, 'email', 'emailed tim.cook@apple.com'),
  ('keithlisiak', 1, 'emailed Jeff Bezos', 'reached out yesterday');

INSERT INTO engagements (username, contact_id, method) VALUES
  ('brucealexandernance', 4, 'LinkedIn messaged Mark Zuckerberg'),
  ('alvincheng', 6, 'looked up phone number on google and called Sundar Pichai');
