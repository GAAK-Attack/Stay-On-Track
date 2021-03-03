const db = require('../server/models/sotModel.js');
const sotController = require('../server/controllers/sotController.js');

beforeAll(() => db.query('TRUNCATE users, contacts, engagements RESTART IDENTITY CASCADE'));

afterAll(async () => await db.end());

describe('sotController user table tests', () => {
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

  it('sotController.addUser successfully adds a user to the users table', async (done) => {
    await sotController.addUser(mockReq, mockRes, mockNext);

    expect(mockRes.locals.newUser.username).toBe('testUser');
    expect(mockRes.locals.newUser.first_name).toBe('Testing');
    expect(mockRes.locals.newUser.last_name).toBe('Tester');
    done();
  });
});
