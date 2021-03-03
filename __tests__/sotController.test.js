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






// // Connect to a new in-memory database before running any tests
// beforeAll(async () => await dbHandler.connect());

// // Clear all test data after every test
// afterEach(async () => await dbHandler.clearDatabase());

// // Remove and close the db and server
// afterAll(async () => await dbHandler.closeDatabase());

// describe('mainController unit tests', () => {  
//   it('mainController.getClosedStores should add a list of closed stores to res.locals.closedStoresList', async (done) => {
//     const mockStore = {
//       storeId: 'thisIsATestIdNotRealId'
//     }
    
//     const mockReq = {
//       query: {
//         code: 1234567890
//       }
//     }
//     const mockRes = {
//       locals: {}
//     }
//     const mockFunc = jest.fn();

//     await ClosedStores.create(mockStore);
//     await mainController.getClosedStores(mockReq, mockRes, mockFunc);
//     expect(mockRes.locals.closedStoresList).toEqual({ [mockStore.storeId]: true });
//     done();
//   });

//   it('mainController.getResults should add a \'results\' property and \'term\' property to the response', async (done) => {
//     const mockReq = {
//       body: {
//         term: 'pizza',
//         latitude: 40.7505989074707,
//         longitude: -73.99359893798828,
//       }
//     }
//     const mockRes = {
//       locals: {
//         closedStoresList: {
//           'thisIsATestIdNotRealId': true,
//           'thisIsAnotherTestIdHey': true
//         }
//       }
//     }
//     const mockFunc = jest.fn();

//     await mainController.getResults(mockReq, mockRes, mockFunc);
//     expect(mockRes.locals).toHaveProperty('results');
//     expect(mockRes.locals.term).toBe(mockReq.body.term);
//     done();
//   });

//   it('mainController.reportClosed should add a new closed store to the database and add the ID to the response', async (done) => {
//     const mockReq = {
//       body: {
//         storeId: 'thisIsATestIdNotRealId'
//       }
//     }
//     const mockRes = {
//       locals: {}
//     }
//     const mockFunc = jest.fn();

//     await mainController.reportClosed(mockReq, mockRes, mockFunc);
//     const result = await ClosedStores.find({ storeId: mockReq.body.storeId });
//     expect(result).toHaveLength(1);
//     expect(result[0].storeId).toBe(mockReq.body.storeId);
//     done();
//   })
// });
