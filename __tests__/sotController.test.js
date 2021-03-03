const { Client } = require('pg');
const { PG_URI } = require('../server/settings.js');

const sotController = require('../server/controllers/sotController.js');

const client = new Client({
  connectionString: PG_URI
});

// queries to create empty copies of the existing tables
const testUsersQuery = 'CREATE TEMP TABLE test_users AS TABLE users WITH NO DATA';
const testContactsQuery = 'CREATE TEMP TABLE test_contacts AS TABLE contacts WITH NO DATA';
const testEngagementsQuery = 'CREATE TEMP TABLE test_engagements AS TABLE engagements WITH NO DATA';

describe('sotController user table tests', () => {
  it('sotController.addUser successfully adds a user to the users table', async (done) => {
    try {
      await client.connect().then((db) => {
        await db.query(testUsersQuery);
        
        await sotController.addUser()
      })
      await client.query(testUsersQuery);
      const result = await client.query(queryText);
      return result.rows;
    } finally {
      client.release();
    }

    const res = await request.post('/api').send(mockBody);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
    expect(res.body.term).toBe(mockBody.term);
    expect(res.body).toHaveProperty('closedStoreList');
    done();
  });
})






// Connect to a new in-memory database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('mainController unit tests', () => {  
  it('mainController.getClosedStores should add a list of closed stores to res.locals.closedStoresList', async (done) => {
    const mockStore = {
      storeId: 'thisIsATestIdNotRealId'
    }
    
    const mockReq = {
      query: {
        code: 1234567890
      }
    }
    const mockRes = {
      locals: {}
    }
    const mockFunc = jest.fn();

    await ClosedStores.create(mockStore);
    await mainController.getClosedStores(mockReq, mockRes, mockFunc);
    expect(mockRes.locals.closedStoresList).toEqual({ [mockStore.storeId]: true });
    done();
  });

  it('mainController.getResults should add a \'results\' property and \'term\' property to the response', async (done) => {
    const mockReq = {
      body: {
        term: 'pizza',
        latitude: 40.7505989074707,
        longitude: -73.99359893798828,
      }
    }
    const mockRes = {
      locals: {
        closedStoresList: {
          'thisIsATestIdNotRealId': true,
          'thisIsAnotherTestIdHey': true
        }
      }
    }
    const mockFunc = jest.fn();

    await mainController.getResults(mockReq, mockRes, mockFunc);
    expect(mockRes.locals).toHaveProperty('results');
    expect(mockRes.locals.term).toBe(mockReq.body.term);
    done();
  });

  it('mainController.reportClosed should add a new closed store to the database and add the ID to the response', async (done) => {
    const mockReq = {
      body: {
        storeId: 'thisIsATestIdNotRealId'
      }
    }
    const mockRes = {
      locals: {}
    }
    const mockFunc = jest.fn();

    await mainController.reportClosed(mockReq, mockRes, mockFunc);
    const result = await ClosedStores.find({ storeId: mockReq.body.storeId });
    expect(result).toHaveLength(1);
    expect(result[0].storeId).toBe(mockReq.body.storeId);
    done();
  })
});
