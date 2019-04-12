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

    describe('Random testing of three units', () => {
        beforeAll( async () => {
            return randomIndex = () => Math.floor(Math.random() * response.body.length);
        });

        it('Should respond with an array of objects', () => {
            expect(Array.isArray(response.body)).toBeTruthy;

// type test res array
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
        });

        it('Should have objects in its array response with id, title, genre, and releaseYear properties', () => {

// key test res array
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
        });
    })

});

// Get Indiv EP test
describe('GET /games/id', () => {
    beforeAll( async () => {
        return res = {
            successResponse : await request(server).get('/games/0'),
            failureResponse : await request(server).get('/games/notValidId')
        };
    });

    it('Should respond with JSON', () => {
        expect(res.successResponse.type).toBe('application/json');
        expect(res.failureResponse.type).toBe('application/json');
    });

    describe('Endpoint Failure Tests', () => {
        it('Should respond with a status code of 404 (Not Found) if no game is found with the provided id', () => {
            expect(res.failureResponse.status).toBe(404);
        });

        it('Should respond with an error message if no game is found with the provided id', () => {
            const errorMessage = { errorMessage: "No game was found with an id matching the provided id." };

            expect(res.failureResponse.body).toEqual(errorMessage);
        });
    });

        describe('Endpoint Failure Tests', () => {
        it('Should respond with a status code of 200 (OK) if successful', () => {
            expect(res.successResponse.status).toBe(200);
        });

        it('Should respond with an object with id, title, genre, and releaseYear properties if successful', () => {
            expect(Object.keys(res.successResponse.body)).toEqual(['id','title','genre','releaseYear']);
        });
    });

});
