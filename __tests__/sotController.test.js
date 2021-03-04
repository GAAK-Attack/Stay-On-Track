const bcrypt = require('bcrypt');

const db = require('../server/models/sotModel.js');
const sotController = require('../server/controllers/sotController.js');

beforeAll(() => db.query('TRUNCATE users, contacts, engagements RESTART IDENTITY CASCADE'));

afterAll(async () => await db.end());

const mockNext = (err) => {
  if (err) console.log('mockNext was passed an error:', err);
  return 'mockNext invoked';
};

describe('sotController users table tests', () => {
  const mockReq = {};
  const mockRes = {};

  it('sotController.addUser successfully adds a user without interval to the users table', async (done) => {
    mockReq.body = {
      username: 'testUser',
      password: 'test',
      first_name: 'Testing',
      last_name: 'Tester',
    }
    mockRes.locals = {};

    await sotController.addUser(mockReq, mockRes, mockNext);

    let response = await db.query("SELECT * FROM users WHERE username='testUser'");
    response = response.rows[0];

    expect(response.username).toBe(mockReq.body.username);
    expect(bcrypt.compareSync(mockReq.body.password, response.password)).toBe(true);
    expect(response.first_name).toBe(mockReq.body.first_name);
    expect(response.last_name).toBe(mockReq.body.last_name);
    expect(response.interval).toBe(null);

    done();
  });

  it('After adding a user to the users table, sotController.addUser should store the username, ' +
    'first_name, and last_name, on res.locals.response.user', () => {
    expect(mockRes.locals.response.user.username).toBe(mockReq.body.username);
    expect(mockRes.locals.response.user.first_name).toBe(mockReq.body.first_name);
    expect(mockRes.locals.response.user.last_name).toBe(mockReq.body.last_name);
  });
});

describe('sotController contacts table tests', () => {
  const mockReq = {};
  const mockRes = {};

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

  it('After adding a contact without an email to the contacts table, sotController.addContact should ' +
    'store the first_name, last_name, company, and email, on res.locals.newContact', () => {
    expect(mockRes.locals.newContact.first_name).toBe(mockReq.body.first_name);
    expect(mockRes.locals.newContact.last_name).toBe(mockReq.body.last_name);
    expect(mockRes.locals.newContact.company).toBe(mockReq.body.company);
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

  it('After adding a contact with an email to the contacts table, sotController.addContact should store' +
    'the the proper key/values on res.locals.newContact', () => {
    expect(mockRes.locals.newContact.first_name).toBe(mockReq.body.first_name);
    expect(mockRes.locals.newContact.last_name).toBe(mockReq.body.last_name);
    expect(mockRes.locals.newContact.company).toBe(mockReq.body.company);
    expect(mockRes.locals.newContact.email).toBe(mockReq.body.email);
  });

  it('sotController.getAllContacts should add all contacts in the database to res.locals.response.allContacts', async (done) => {
    mockRes.locals = {};

    await sotController.getAllContacts(mockReq, mockRes, mockNext);

    expect(mockRes.locals.response.allContacts[0]).toEqual({
      contact_id: 1,
      first_name: 'Contact',
      last_name: 'Person',
      company: 'JavaScript',
      email: null
    });
    expect(mockRes.locals.response.allContacts[1]).toEqual({
      contact_id: 2,
      first_name: 'Type',
      last_name: 'Test',
      company: 'TypeScript',
      email: 'type.test@typescript.com'
    });

    done();
  });
});

describe('sotController engagements table tests', () => {
  const mockReq = {};
  const mockRes = {};

  it('sotController.addEngagement successfully adds an engagement without notes to the engagements table', async (done) => {
    mockReq.body = {
      username: 'testUser',
      contact_id: 1,
      method: 'emailed them',
    }
    mockRes.locals = {};

    await sotController.addEngagement(mockReq, mockRes, mockNext);

    let response = await db.query(`SELECT * FROM engagements WHERE username='${mockReq.body.username}' AND contact_id=${mockReq.body.contact_id}`);
    response = response.rows[0];

    expect(response.username).toBe(mockReq.body.username);
    expect(response.contact_id).toBe(mockReq.body.contact_id);
    expect(response.time_created).toBeInstanceOf(Date);
    expect(response.method).toBe(mockReq.body.method);
    expect(response.status).toBe('pending');
    expect(response.notes).toBe(null);

    done();
  });

  it('After adding an engagement without notes to the engagement table, sotController.addEngagement ' +
    'should store the username, contact_id, contact_first_name, contact_last_name, time_created, method, ' +
    'status, and notes, on res.locals.newEngagement', () => {
    expect(mockRes.locals.newEngagement.username).toBe(mockReq.body.username);
    expect(mockRes.locals.newEngagement.contact_id).toBe(mockReq.body.contact_id);
    expect(mockRes.locals.newEngagement.contact_first_name).toBe('Contact');
    expect(mockRes.locals.newEngagement.contact_last_name).toBe('Person');
    expect(mockRes.locals.newEngagement.time_created).toBeInstanceOf(Date);
    expect(mockRes.locals.newEngagement.method).toBe(mockReq.body.method);
    expect(mockRes.locals.newEngagement.status).toBe('pending');
    expect(mockRes.locals.newEngagement.notes).toBe(null);
  });

  it('sotController.addEngagement successfully adds an engagement with notes to the engagements table', async (done) => {
    mockReq.body = {
      username: 'testUser',
      contact_id: 2,
      method: 'messaged on LinkedIn',
      notes: 'I should send a follow up in two days'
    }
    mockRes.locals = {};

    await sotController.addEngagement(mockReq, mockRes, mockNext);

    let response = await db.query(`SELECT * FROM engagements WHERE username='${mockReq.body.username}' AND contact_id=${mockReq.body.contact_id}`);
    response = response.rows[0];

    expect(response.username).toBe(mockReq.body.username);
    expect(response.contact_id).toBe(mockReq.body.contact_id);
    expect(response.time_created).toBeInstanceOf(Date);
    expect(response.method).toBe(mockReq.body.method);
    expect(response.status).toBe('pending');
    expect(response.notes).toBe(mockReq.body.notes);

    done();
  });

  it('After adding an engagement with notes to the engagement table, sotController.addEngagement ' +
    'should store the proper key/values, on res.locals.newEngagement', () => {
    expect(mockRes.locals.newEngagement.username).toBe(mockReq.body.username);
    expect(mockRes.locals.newEngagement.contact_id).toBe(mockReq.body.contact_id);
    expect(mockRes.locals.newEngagement.contact_first_name).toBe('Type');
    expect(mockRes.locals.newEngagement.contact_last_name).toBe('Test');
    expect(mockRes.locals.newEngagement.time_created).toBeInstanceOf(Date);
    expect(mockRes.locals.newEngagement.method).toBe(mockReq.body.method);
    expect(mockRes.locals.newEngagement.status).toBe('pending');
    expect(mockRes.locals.newEngagement.notes).toBe(mockReq.body.notes);
  });

  it('sotController.getUsersEngagements should get all the engagements for the user passed in and ' +
    'store them on res.locals.userEngagements', async (done) => {
    mockReq.body = {
      username: 'testUser'
    }
    mockRes.locals = {};

    await sotController.getUsersEngagements(mockReq, mockRes, mockNext);

    expect(mockRes.locals.userEngagements[0].username).toBe(mockReq.body.username);
    expect(mockRes.locals.userEngagements[0].contact_id).toBe(1);
    expect(mockRes.locals.userEngagements[0].time_created).toBeInstanceOf(Date);
    expect(mockRes.locals.userEngagements[0].method).toBe('emailed them');
    expect(mockRes.locals.userEngagements[0].status).toBe('pending');
    expect(mockRes.locals.userEngagements[0].notes).toBe(null);

    expect(mockRes.locals.userEngagements[1].username).toBe(mockReq.body.username);
    expect(mockRes.locals.userEngagements[1].contact_id).toBe(2);
    expect(mockRes.locals.userEngagements[1].time_created).toBeInstanceOf(Date);
    expect(mockRes.locals.userEngagements[1].method).toBe('messaged on LinkedIn');
    expect(mockRes.locals.userEngagements[1].status).toBe('pending');
    expect(mockRes.locals.userEngagements[1].notes).toBe('I should send a follow up in two days');

    done();
  });
});
