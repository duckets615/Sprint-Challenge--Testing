const server = require('./server');
const request = require('supertest');

// get all games EP
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



// get indiv EP test
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

// post game ep
describe('POST /games Endpoint', () => {
    beforeAll( async () => {
        return res = await request(server).post('/games').send({
            title: 'Joust',
            genre: 'Arcade',
            releaseYear: 1982
        });
    });


    it('Should respond with JSON', () => {
        expect(res.type).toBe('application/json');
    });


// test fail
    describe('Endpoint Failure Tests', () => {
        // Fail res's
        beforeAll( async () => {
            // valid request for dupe test
            await request(server).post('/games').send({ title: 'Centipede', genre: 'Arcade', releaseYear: 1980 });

            // object with fail res's
            return failureResponses = {
                missingTitle: await request(server).post('/games').send({ title: 'Centipede', releaseYear: 1980 }),
                missingGenre: await request(server).post('/games').send({ genre: 'Arcade', releaseYear: 1980 }),
                missingBoth: await request(server).post('/games').send({ releaseYear: 1980 })
            }
        });

        it ('Should respond with a status code of 422 (Uprocessible Entity) if not sent a title or genre', () => {
            const errorCode = 422;

            expect(failureResponses.missingTitle.status).toBe(errorCode);
            expect(failureResponses.missingGenre.status).toBe(errorCode);
            expect(failureResponses.missingBoth.status).toBe(errorCode);
        })

        it ('Should respond with an errorMessage if not sent a title or genre', () => {
            const errorMessage = { errorMessage: "You must provide a title and genre when adding a game." };

            expect(failureResponses.missingTitle.body).toEqual(errorMessage);
            expect(failureResponses.missingGenre.body).toEqual(errorMessage);
            expect(failureResponses.missingBoth.body).toEqual(errorMessage);
        })

        it('Should respond with a status code of 405 (Not Allowed) if sent a duplicate game title', async () => {
            const errorCode = 405;
            const duplicateTitle = await request(server).post('/games').send({ title: 'Centipede', genre: 'Mobile', releaseYear: 2015 });
            expect(duplicateTitle.status).toBe(errorCode);
        })

        it('Should respond with an errorMessage if sent a duplicate game title', async () => {
            const errorMessage = { errorMessage: "A game with that title was already added. Titles must be unique." };
            const duplicateTitle = await request(server).post('/games').send({ title: 'Centipede', genre: 'Mobile', releaseYear: 2015 });
            expect(duplicateTitle.body).toEqual(errorMessage);
        })

    })

// PASSED TEST
    describe('Endpoint Success Tests', () => {
        beforeAll( async () => {
            return missingReleaseYear = await request(server).post('/games').send({ title: 'Galaga', genre: 'Arcade' });
        });

        it('Should respond with a status code of 201 (Created) after a successful post', () => {
            expect(res.status).toBe(201);

            // release year not req so still pass
            expect(missingReleaseYear.status).toBe(201);
        });

        it('Should respond with the unit after the unit is added.', () => {
            expect({ title: res.body.title, genre: res.body.genre, releaseYear: res.body.releaseYear }).toEqual({
                title: 'Joust',
                genre: 'Arcade',
                releaseYear: 1982
            });

            // release year not req so still pass
            expect({ title: missingReleaseYear.body.title, genre: missingReleaseYear.body.genre, releaseYear: missingReleaseYear.body.releaseYear }).toEqual({
                title: 'Galaga',
                genre: 'Arcade',
                releaseYear: ''
            });
        });

        it('Should have increased the size of the unit resource by 1', async () => {
            const initialGetResponse = await request(server).get('/games');
            await request(server).post('/games').send({ title: 'Frogger', genre: 'Arcade', releaseYear: 1981 });
            const finalGetResponse = await request(server).get('/games');

            expect(finalGetResponse.body.length).toBe(initialGetResponse.body.length + 1);
        });

    });
});

// delete game EP
describe('DELETE: /games/:id', () => {
    // need to add 3 games delete game test
    beforeAll( async () => {
        await request(server).post('/games').send({
            title: 'Donkey Kong',
            genre: 'Arcade',
            releaseYear: 1981
        });
        await request(server).post('/games').send({
            title: 'Dig Dug',
            genre: 'Arcade',
            releaseYear: 1982
        });
        await request(server).post('/games').send({
            title: 'Tetris',
            genre: 'Arcade',
            releaseYear: 1984
        });

// failed to delete
        return failResponse = await request(server).delete('/games/notValidId');
    });

    it('Should respond with JSON', async () => {
        const res = await request(server).delete('/games/0');
        expect(res.type).toBe('application/json');
    })

    describe('Endpoint Failure Tests', () => {
        it('Should respond with a status code of 404 if the deletion fails', () => {
            expect(failResponse.status).toBe(404);
        })

        it('Should respond with an errorMessage if the deletion fails', async () => {
            const errorMessage = {errorMessage: "We were unable to delete the game with the provided id."}
            expect(failResponse.body).toEqual(errorMessage);
        })
    });

    describe('Endpoint Success Tests', () => {
        it('Should respond with a status code of 200 if the deletion is successful', async () => {
            const gameId = 1;
            const res = await request(server).delete(`/games/${gameId}`);
            expect(res.status).toBe(200);
        })

        it('Should respond with the id of the deleted game if the deletion is successful', async () => {
            const gameId = 2;
            const res = await request(server).delete(`/games/${gameId}`);
            expect(res.body).toEqual({gameId:`${gameId}`});
        })

        it('Should have decreased the number of games by one after a successful deletion', async () => {
            const gameId = 3;
            const initialGetResponse = await request(server).get('/games');
            await request(server).delete(`/games/${gameId}`);
            const finalGetResponse = await request(server).get('/games');
            expect(finalGetResponse.body.length).toBe(initialGetResponse.body.length - 1);
        })
    });
});
