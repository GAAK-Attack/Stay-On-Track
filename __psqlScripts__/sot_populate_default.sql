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
  ('Tim', 'Cook', 'Apple', 'tim.cook@apple.com');

INSERT INTO contacts (first_name, last_name, company) VALUES
  ('Reed', 'Hastings', 'Netflix'),
  ('Sundar', 'Pichai', 'Google');
  ('Bill', 'Gates', 'Microsoft');

-- engagements table has username, contact_id, time_created, method, status, notes
INSERT INTO engagements (username, contact_id, method, notes) VALUES
  ('brucealexandernance', 1, 'email', 'emailed mark.zuckerberg@facebook.com'),
  ('alvincheng', 4, 'looked up phone number on google and called Sundar Pichai', 'did it yesterday');

INSERT INTO engagements (username, contact_id, method) VALUES
  ('garrettweaver', 2, 'LinkedIn messaged Jeff Bezos'),
  ('keithlisiak', 5, 'emailed sundar.pichai@google.com');
