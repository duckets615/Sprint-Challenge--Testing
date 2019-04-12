const server = require('./api/server');
const request = require('supertest');

// GET All Games EP
describe('GET /games Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/games');
    });

    describe('Response Type and Status', () => {
        it('Should respond with JSON', () => {
            expect(response.type).toBe('application/json');
        });

        it('Should respond with a status code of 200 (OK)', () => {
            expect(response.status).toBe(200);
        });
    });
