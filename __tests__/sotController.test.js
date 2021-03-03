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

  it('sotController.addUser successfully adds a user to the users table and stores username, first_name, and last_name, on res.locals.newUser', async (done) => {
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

    expect(mockRes.locals.newUser.username).toBe('testUser');
    expect(mockRes.locals.newUser.first_name).toBe('Testing');
    expect(mockRes.locals.newUser.last_name).toBe('Tester');

    done();
  });
});
