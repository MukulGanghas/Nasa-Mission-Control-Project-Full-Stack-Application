const request = require('supertest');
const app = require('../../app');

const {mongoConnect, mongoDisconnect} = require('../../services/mongo');
const { LoadPlanetsData } = require('../../models/planets.model');

const { 
    LoadPlanetsData,
} = require('../../models/planets.model');

describe('Launches API', ()=>{
    beforeAll(async ()=>{
        await mongoConnect();
        await LoadPlanetsData();
    });
    afterAll(async()=>{
        await mongoDisconnect();
    });
    describe('Test GET /launches',()=>{
        test('it should response with 200 success',async ()=>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200);
        });
    });

    describe('Test POST /launch',()=>{

        const completeLaunchData= {
            mission :'USS Enterprise',
            rocket:'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028',
        }
        const launchDatawithoutdate = {
            mission :'USS Enterprise',
            rocket:'NCC 1701-D',
            target: 'Kepler-62 f',
        }

        const Launchdatewithinvaliddate= {
            mission :'USS Enterprise',
            rocket:'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'hello',
        }
        test('it should respond with 201 created',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type',/json/)
            .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchDatawithoutdate)

        });

        test('it should catch missing required properties',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDatawithoutdate)
            .expect('Content-Type',/json/)
            .expect(400);

            expect(response.body).toStrictEqual({
                error : 'Missing required launch property',
            });
            
        });
        test('it should catch invalid dates',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(Launchdatewithinvaliddate)
            .expect('Content-Type',/json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error : 'Invalid Launch Date',
         });
      });

    });
});
