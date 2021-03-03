const db = require('../server/models/sotModel.js');
const sotController = require('../server/controllers/sotController.js');

beforeAll(() => db.query('TRUNCATE users, contacts, engagements RESTART IDENTITY CASCADE'));

afterAll(async () => await db.end());

describe('sotController users table tests', () => {
  const mockReq = {
    body: {
      username: 'testUser',
      password: 'test',
      first_name: 'Testing',
      last_name: 'Tester',
    }
  };
  const mockRes = {
    locals: {}
  };
  const mockNext = (err) => {
    if (err) console.log('mockNext was passed an error:', err);
    return 'mockNext invoked';
  };

  it('sotController.addUser successfully adds a user without interval to the users table', async (done) => {
    await sotController.addUser(mockReq, mockRes, mockNext);

    let response = await db.query("SELECT * FROM users WHERE username='testUser'");
    response = response.rows[0];

    expect(response).toEqual({
      username: 'testUser',
      password: 'test',
      first_name: 'Testing',
      last_name: 'Tester',
      interval: null
    })

    done();
  });

  it('After adding a user to the users table, sotController.addUser should store the username, first_name, and last_name, on res.locals.newUser', () => {
    expect(mockRes.locals.newUser.username).toBe('testUser');
    expect(mockRes.locals.newUser.first_name).toBe('Testing');
    expect(mockRes.locals.newUser.last_name).toBe('Tester');
  });
});

describe('sotController contacts table tests', () => {
  const mockReq = {};
  const mockRes = {};
  const mockNext = (err) => {
    if (err) console.log('mockNext was passed an error:', err);
    return 'mockNext invoked';
  };

  it('sotController.addContact successfully adds a contact without an email to the contacts table', async (done) => {
    mockReq.body = {
      first_name: 'Contact',
      last_name: 'Person',
      company: 'JavaScript',
    }
    mockRes.locals = {};

    await sotController.addContact(mockReq, mockRes, mockNext);

    let response = await db.query("SELECT * FROM contacts WHERE contact_id=1");
    response = response.rows[0];

    expect(response).toEqual({
      contact_id: 1,
      first_name: 'Contact',
      last_name: 'Person',
      company: 'JavaScript',
      email: null
    });

    done();
  });

  it('After adding a contact without an email to the contacts table, sotController.addContact should store the first_name, last_name, company, and email, on res.locals.newContact', () => {
    expect(mockRes.locals.newContact.first_name).toBe('Contact');
    expect(mockRes.locals.newContact.last_name).toBe('Person');
    expect(mockRes.locals.newContact.company).toBe('JavaScript');
    expect(mockRes.locals.newContact.email).toBe(null);
  });

  it('sotController.addContact successfully adds a contact with an email to the contacts table', async (done) => {
    mockReq.body = {
      first_name: 'Type',
      last_name: 'Test',
      company: 'TypeScript',
      email: 'type.test@typescript.com'
    };
    mockRes.locals = {};

    await sotController.addContact(mockReq, mockRes, mockNext);

    let response = await db.query("SELECT * FROM contacts WHERE contact_id=2");
    response = response.rows[0];

    expect(response).toEqual({
      contact_id: 2,
      first_name: 'Type',
      last_name: 'Test',
      company: 'TypeScript',
      email: 'type.test@typescript.com'
    });

    done();
  });

  it('After adding a contact with an email to the contacts table, sotController.addContact should store the first_name, last_name, company, and email, on res.locals.newContact', () => {
    expect(mockRes.locals.newContact.first_name).toBe('Type');
    expect(mockRes.locals.newContact.last_name).toBe('Test');
    expect(mockRes.locals.newContact.company).toBe('TypeScript');
    expect(mockRes.locals.newContact.email).toBe('type.test@typescript.com');
  });
});
