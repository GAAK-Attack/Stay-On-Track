const request = require('supertest');
const authController = require('../server/controllers/authController.js');
const db = require('../server/models/authModel.js');

const server = 'http://localhost:3000/';

describe('Route integration', () => {
    
    beforeAll(async (done) => {
        
        await db.query(`DELETE FROM users`)
        });
        
        afterAll(async (done) => {
            await db.query(`DELETE FROM users`)
        });
        
        describe('/signup', () => {
            describe('POST ', () => {
                it('responds with 200 status and text/html content type', () => {
                    return request(server)
                    .post('/login')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
                });
            });
        });
    });
